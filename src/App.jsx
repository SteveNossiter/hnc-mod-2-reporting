import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { 
  Plus, FileText, Trash2, Edit3, ChevronRight, 
  ArrowLeft, Download, CheckCircle, FileSpreadsheet, Send, Printer 
} from 'lucide-react';
import { kpiData } from './data';

function App() {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('hnc_all_reports');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeReportId, setActiveReportId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Auto-save the full list to localStorage
  useEffect(() => {
    localStorage.setItem('hnc_all_reports', JSON.stringify(reports));
  }, [reports]);

  // Current active report object
  const activeReport = reports.find(r => r.id === activeReportId);

  const handleCreateNew = () => {
    const newReport = {
      id: Date.now().toString(),
      period_start: '',
      period_end: '',
      data: {},
      last_modified: new Date().toISOString()
    };
    setReports([newReport, ...reports]);
    setActiveReportId(newReport.id);
  };

  const handleUpdateActiveReport = (updates) => {
    setReports(prev => prev.map(r => 
      r.id === activeReportId ? { ...r, ...updates, last_modified: new Date().toISOString() } : r
    ));
  };

  const handleInputChange = (fieldId, value) => {
    handleUpdateActiveReport({
      data: { ...activeReport.data, [fieldId]: value }
    });
  };

  const handleDeleteReport = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this report forever?")) {
      setReports(prev => prev.filter(r => r.id !== id));
      if (activeReportId === id) setActiveReportId(null);
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
           <div>
             <h1>Reporting Dashboard</h1>
             <p className="subtitle">HNC Quarterly Status Reports</p>
           </div>
        </header>

        <div className="dashboard-actions">
           <button onClick={handleCreateNew} className="btn-primary">
             <Plus size={20} /> Create New Report
           </button>
        </div>

        <div className="reports-list">
           {reports.length === 0 ? (
             <div className="empty-state">
                <FileText size={48} />
                <p>No reports found. Click "Create New" to start your first quarterly report.</p>
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
                     <h3>{report.period_start || 'New Draft'} {report.period_end ? `- ${report.period_end}` : ''}</h3>
                     <p className="last-modified">Last saved: {new Date(report.last_modified).toLocaleDateString()}</p>
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
            <button className="btn-back" onClick={() => setActiveReportId(null)}>
               <ArrowLeft size={24} /> Back to Dashboard
            </button>
            <div className="title-group">
              <h1>HNC Report Form</h1>
              <p className="subtitle">{activeReport.period_start || 'Draft'}</p>
            </div>
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
                  <CheckCircle size={20} /> Changes Saved Successfully
                </>
              ) : (
                <>
                  <Send size={20} /> Save Reporting Data
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
