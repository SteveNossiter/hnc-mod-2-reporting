import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { 
  Plus, FileText, Trash2, Edit3, ChevronRight, 
  ArrowLeft, Download, CheckCircle, FileSpreadsheet, Send, Printer, Loader2, CloudOff, Cloud
} from 'lucide-react';
import { kpiData } from './data';
import { supabase } from './supabaseClient';

function App() {
  const [reports, setReports] = useState([]);
  const [activeReportId, setActiveReportId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // 1. Initial Load
  useEffect(() => {
    initApp();
  }, []);

  async function initApp() {
    setLoading(true);
    setErrorStatus(null);
    
    // Load from LocalStorage first (as a baseline)
    const local = localStorage.getItem('hnc_fallback_reports');
    const localData = local ? JSON.parse(local) : [];
    
    if (!supabase) {
      console.warn("Offline Mode: Supabase keys not set.");
      setReports(localData);
      setLoading(false);
      return;
    }

    try {
      // 3-second timeout for cloud fetch
      const result = await Promise.race([
        supabase.from('reports').select('*').order('last_modified', { ascending: false }),
        new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000))
      ]);

      if (result.data) {
        setReports(result.data);
        // Backup to local storage
        localStorage.setItem('hnc_fallback_reports', JSON.stringify(result.data));
      } else {
        throw new Error(result.error?.message || 'Database connection failed');
      }
    } catch (err) {
      console.error("Using Local Storage because:", err.message);
      setErrorStatus("Cloud disconnected—using local storage.");
      setReports(localData);
    } finally {
      setLoading(false);
    }
  }

  // 2. Auto-save
  useEffect(() => {
    const report = reports.find(r => r.id === activeReportId);
    if (!report || !activeReportId) return;

    const timer = setTimeout(() => {
      saveReport(report);
    }, 1200);

    return () => clearTimeout(timer);
  }, [reports, activeReportId]);

  async function saveReport(report) {
    // 1. Always save to LocalStorage immediately
    localStorage.setItem('hnc_fallback_reports', JSON.stringify(reports));

    // 2. Attempt Cloud Save if available
    if (!supabase) return;
    
    setSyncing(true);
    try {
      const { error } = await supabase
        .from('reports')
        .upsert({
          id: report.id, // upsert handles both create and update
          data: report.data,
          period_start: report.period_start,
          period_end: report.period_end,
          last_modified: new Date().toISOString()
        });
      
      if (error) throw error;
      setErrorStatus(null);
    } catch (err) {
      console.error("Autosave to cloud failed:", err.message);
      setErrorStatus("Autosave offline");
    } finally {
      setSyncing(false);
    }
  }

  const activeReport = reports.find(r => r.id === activeReportId);

  const handleCreateNew = async () => {
    const tempId = Date.now().toString(); // Use a temp ID for local first
    const newEntry = {
      id: tempId,
      period_start: '',
      period_end: '',
      data: {},
      last_modified: new Date().toISOString()
    };

    setReports([newEntry, ...reports]);
    setActiveReportId(tempId);
    
    // We'll save it to the cloud on the first auto-save or explicitly
    if (supabase) {
      setSyncing(true);
      try {
        const { data, error } = await supabase.from('reports').insert([{ data: {} }]).select();
        if (error) throw error;
        // Swap temp ID with cloud ID if successful
        if (data?.[0]) {
           setReports(prev => prev.map(r => r.id === tempId ? data[0] : r));
           setActiveReportId(data[0].id);
        }
      } catch (err) {
        console.error("Cloud entry failed, using local temporary ID.");
        setErrorStatus("Using local storage—cloud busy.");
      } finally {
        setSyncing(false);
      }
    }
  };

  const handleUpdateActiveReport = (updates) => {
    setReports(prev => prev.map(r => 
      r.id === activeReportId ? { ...r, ...updates, last_modified: new Date().toISOString() } : r
    ));
  };

  const handleInputChange = (fieldId, value) => {
    if (!activeReport) return;
    handleUpdateActiveReport({
      data: { ...activeReport.data, [fieldId]: value }
    });
  };

  const handleDeleteReport = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this report forever?")) return;
    
    setReports(prev => prev.filter(r => r.id !== id));
    if (activeReportId === id) setActiveReportId(null);

    // Sync deletion to cloud
    if (supabase) {
      try {
        await supabase.from('reports').delete().eq('id', id);
      } catch (err) {
        console.error("Cloud delete failed.");
      }
    }
  };

  const handleDownloadExcel = () => {
    const rows = [];
    rows.push({ 'No.': 'REPORTING PERIOD:', 'KPI / Other Data': `${activeReport.period_start || '---'} to ${activeReport.period_end || '---'}` });
    rows.push({});

    kpiData.forEach(section => {
      section.questions.forEach((q, index) => {
        if (q.type === 'header') return;
        rows.push({
          'No.': index === 0 ? section.id : '',
          'KPI / Other Data': index === 0 ? section.kpi : '',
          'Reporting Questions': q.label,
          'Reporting Answers': activeReport.data[q.id] || ''
        });
      });
      rows.push({}); 
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet['!cols'] = [{ wch: 8 }, { wch: 40 }, { wch: 55 }, { wch: 45 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HNC Report');
    XLSX.writeFile(workbook, `HNC_Report_${activeReport.period_start || 'Draft'}.xlsx`);
  };

  /* --- Dashboard View --- */
  if (!activeReportId) {
    return (
      <div className="container dashboard-view">
        <header className="dashboard-header">
           <img src="/logo.jpg" alt="Logo" className="header-logo-small" />
           <div className="title-group">
             <h1>Reporting Dashboard</h1>
             <p className="subtitle">Official HNC Quarterly Status Reports</p>
           </div>
           
           <div className={`status-pill ${errorStatus ? 'offline' : 'online'}`}>
             {errorStatus ? (
               <><CloudOff size={16} /> {errorStatus}</>
             ) : (
               <><Cloud size={16} /> Cloud Connected</>
             )}
             {syncing && <Loader2 className="animate-spin" size={14} style={{marginLeft: 8}} />}
           </div>
        </header>

        <div className="dashboard-actions">
           <button onClick={handleCreateNew} className="btn-primary create-btn">
             <Plus size={20} /> Create New Quarterly Report
           </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <Loader2 className="animate-spin" size={48} />
            <p>Scanning for reports...</p>
          </div>
        ) : (
          <div className="reports-list">
             {reports.length === 0 ? (
               <div className="empty-state">
                  <FileText size={48} />
                  <p>No reports found. Click the button above to start your first draft.</p>
               </div>
             ) : (
               reports.map(report => (
                 <div 
                   key={report.id} 
                   className="report-card" 
                   onClick={() => setActiveReportId(report.id)}
                 >
                   <div className="report-info">
                     <div className="report-icon"><FileText /></div>
                     <div>
                       <h3>{report.period_start || 'New Draft'} {report.period_end ? ` to ${report.period_end}` : ''}</h3>
                       <p className="last-modified">Last saved: {new Date(report.last_modified).toLocaleString()}</p>
                     </div>
                   </div>
                   <div className="report-actions-mini">
                     <button className="btn-icon" title="Edit"><Edit3 size={18} /></button>
                     <button 
                       className="btn-icon danger" 
                       onClick={(e) => handleDeleteReport(report.id, e)}
                       title="Delete"
                     >
                       <Trash2 size={18} />
                     </button>
                     <ChevronRight size={20} className="chevron" />
                   </div>
                 </div>
               ))
             )}
          </div>
        )}
      </div>
    );
  }

  /* --- Form View --- */
  return (
    <div className="app-wrapper">
      {/* Printable Report Section */}
      <div id="printable-report" className="print-only">
        <div className="letterhead">
          <div className="letterhead-logo">
            <img src="/logo.jpg" alt="Create Therapy Logo" />
          </div>
          <div className="letterhead-info">
            <h2>Create Therapy</h2>
            <p>Level 1, 131 Keen Street, Lismore, NSW 2480</p>
            <p><strong>Phone:</strong> 0402 630 184 | <strong>Email:</strong> sil@createtherapy.com.au</p>
          </div>
        </div>
        <hr />
        <div className="report-title">
          <h1>HNC Quarterly Project Status Report</h1>
          <p><strong>Reporting Period:</strong> {activeReport.period_start || '---'} to {activeReport.period_end || '---'}</p>
        </div>
        
        <table className="report-table">
          <thead>
            <tr>
              <th style={{width: '5%'}}>No.</th>
              <th style={{width: '30%'}}>KPI / Other Data</th>
              <th style={{width: '40%'}}>Reporting Questions</th>
              <th style={{width: '25%'}}>Reporting Answers</th>
            </tr>
          </thead>
          <tbody>
            {kpiData.flatMap((section) => 
              section.questions.filter(q => q.type !== 'header').map((q, idx) => (
                <tr key={`${section.id}-${q.id}`}>
                  <td>{idx === 0 ? section.id : ''}</td>
                  <td className="kpi-cell">{idx === 0 ? section.kpi : ''}</td>
                  <td>{q.label}</td>
                  <td className="answer-cell">{activeReport.data[q.id] || '---'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Main Interactive UI */}
      <div className="container screen-only">
        <header>
          <div className="brand-header">
            <button className="btn-back" onClick={() => { setActiveReportId(null); initApp(); }}>
               <ArrowLeft size={24} /> Back
            </button>
            <div className="title-group">
              <h1>HNC Report Form</h1>
              <p className="subtitle">{activeReport.period_start ? `Period: ${activeReport.period_start} to ${activeReport.period_end}` : 'Drafting Report'}</p>
            </div>
            {syncing && <div className="sync-status small"><Loader2 className="animate-spin" size={16} /> Cloud Saving...</div>}
            {errorStatus && <div className="sync-status small offline"><CloudOff size={16} /> {errorStatus}</div>}
          </div>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); }} className="form-card">
          <div className="top-actions">
            <button type="button" onClick={() => window.print()} className="btn-secondary">
              <Printer size={18} /> Print PDF
            </button>
            <button type="button" onClick={handleDownloadExcel} className="btn-secondary">
              <FileSpreadsheet size={18} /> Excel Export
            </button>
          </div>

          <div className="report-period-selection">
            <div className="field-group">
              <label>Reporting Period Start Date</label>
              <input 
                type="date" 
                value={activeReport.period_start || ''} 
                onChange={(e) => handleUpdateActiveReport({ period_start: e.target.value })} 
              />
            </div>
            <div className="field-group">
              <label>Reporting Period End Date</label>
              <input 
                type="date" 
                value={activeReport.period_end || ''} 
                onChange={(e) => handleUpdateActiveReport({ period_end: e.target.value })} 
              />
            </div>
          </div>

          {kpiData.map((section) => (
            <div key={section.id} className="section">
              <div className="section-header">
                <span className="section-number">KPI {section.id}</span>
                <h2 className="section-title">{section.category}</h2>
                <p className="kpi-description">{section.kpi}</p>
              </div>

              <div className="questions-grid">
                {section.questions.map((q) => (
                  <div key={q.id} className={`field-group ${q.label.match(/^[ivx]+\)/) ? 'sub-question' : ''}`}>
                  {q.type === 'header' ? (
                    <h3 className="question-header">{q.label}</h3>
                  ) : (
                    <>
                      <label htmlFor={q.id}>{q.label}</label>
                      {q.type === 'textarea' ? (
                        <textarea
                          id={q.id}
                          placeholder={`Enter details...`}
                          value={activeReport.data[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                        />
                      ) : (
                        <input
                          type={q.type}
                          id={q.id}
                          placeholder={q.type === 'number' ? '0' : 'Type here...'}
                          value={activeReport.data[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                        />
                      )}
                    </>
                  )}
                </div>
                ))}
              </div>
            </div>
          ))}

          <div className="form-footer-actions">
            <button type="submit" className="btn-primary main-submit">
              {submitted ? (
                <>
                  <CheckCircle size={20} /> Current Progress Saved
                </>
              ) : (
                <>
                  <Send size={20} /> Finish Editing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
