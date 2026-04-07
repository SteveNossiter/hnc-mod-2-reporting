import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, CheckCircle, FileSpreadsheet, Send, Printer } from 'lucide-react';
import { kpiData } from './data';

function App() {
  // Initialize state from localStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('hnc_report_draft');
    return saved ? JSON.parse(saved) : {};
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-save to localStorage whenever formData changes
  React.useEffect(() => {
    localStorage.setItem('hnc_report_draft', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDownloadExcel = () => {
    const rows = [];
    // Add Reporting Period info to top of Excel
    rows.push({ 'No.': 'REPORTING PERIOD:', 'KPI / Other Data': `${formData.period_start || '---'} to ${formData.period_end || '---'}` });
    rows.push({});

    kpiData.forEach(section => {
      section.questions.forEach((q, index) => {
        if (q.type === 'header') return;
        rows.push({
          'No.': index === 0 ? section.id : '',
          'KPI / Other Data': index === 0 ? section.kpi : '',
          'Reporting Questions': q.label,
          'Reporting Answers': formData[q.id] || ''
        });
      });
      rows.push({}); 
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const wscols = [{ wch: 8 }, { wch: 40 }, { wch: 55 }, { wch: 45 }];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HNC Report');
    XLSX.writeFile(workbook, `HNC_Status_Report_${formData.period_start || 'Draft'}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure? This will delete all entered data for this report.")) {
      setFormData({});
      localStorage.removeItem('hnc_report_draft');
    }
  };

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
          <p><strong>Reporting Period:</strong> {formData.period_start || '---'} to {formData.period_end || '---'}</p>
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
                  <td className="answer-cell">{formData[q.id] || '---'}</td>
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
            <img src="/logo.jpg" alt="Logo" className="header-logo" />
            <div>
              <h1>HNC Quarterly Project Status Report</h1>
              <p className="subtitle">Create Therapy - Model 2 Pilot</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="form-card">
          <div className="top-actions">
            <button type="button" onClick={handleClear} className="btn-secondary danger-hover">
              Clear All
            </button>
            <button type="button" onClick={handlePrint} className="btn-secondary">
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
                value={formData.period_start || ''} 
                onChange={(e) => handleInputChange('period_start', e.target.value)} 
              />
            </div>
            <div className="field-group">
              <label>Reporting Period End Date</label>
              <input 
                type="date" 
                value={formData.period_end || ''} 
                onChange={(e) => handleInputChange('period_end', e.target.value)} 
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
                  <div key={q.id} className="field-group">
                  {q.type === 'header' ? (
                    <h3 className="question-header">{q.label}</h3>
                  ) : (
                    <>
                      <label htmlFor={q.id}>{q.label}</label>
                      {q.type === 'textarea' ? (
                        <textarea
                          id={q.id}
                          placeholder={`Enter details...`}
                          value={formData[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                        />
                      ) : (
                        <input
                          type={q.type}
                          id={q.id}
                          placeholder={q.type === 'number' ? '0' : 'Type here...'}
                          value={formData[q.id] || ''}
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
