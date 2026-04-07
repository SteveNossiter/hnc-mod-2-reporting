import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, CheckCircle, FileSpreadsheet, Send, Printer } from 'lucide-react';
import { kpiData } from './data';

function App() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDownloadExcel = () => {
    // Transform data for Excel matching the screenshot format
    const rows = [];
    kpiData.forEach(section => {
      section.questions.forEach((q, index) => {
        rows.push({
          'No.': index === 0 ? section.id : '', // Only show number on first row of section for clarity
          'KPI / Other Data': index === 0 ? section.kpi : '', // Only show KPI on first row
          'Reporting Questions': q.label,
          'Reporting Answers': formData[q.id] || ''
        });
      });
      // Add an empty row between sections for better readability in Excel
      rows.push({}); 
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    
    // Set column widths for better default view
    const wscols = [
      { wch: 5 },  // No.
      { wch: 40 }, // KPI / Other Data
      { wch: 50 }, // Reporting Questions
      { wch: 40 }  // Reporting Answers
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HNCL Reporting');
    XLSX.writeFile(workbook, 'HNCL_Reporting_Data.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="app-wrapper">
      {/* Printable Report Section (Hidden in Screen View) */}
      <div id="printable-report" className="print-only">
        <div className="letterhead">
          <div className="letterhead-logo">
            <img src="/logo.jpg" alt="Create Therapy Logo" />
          </div>
          <div className="letterhead-info">
            <h2>Create Therapy</h2>
            <p>Level 1, 131 Keen Street, Lismore, NSW 2480</p>
            <p><strong>Phone:</strong> 0402 630 184</p>
            <p><strong>Email:</strong> sil@createtherapy.com.au</p>
          </div>
        </div>
        <hr />
        <div className="report-title">
          <h1>HNCL Services Reporting - Model 2</h1>
          <p>Date: {new Date().toLocaleDateString()}</p>
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
              section.questions.map((q, idx) => (
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
              <h1>HNCL Reporting Portal</h1>
              <p className="subtitle">Create Therapy - Model 2 Pilot</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="form-card">
          <div className="top-actions">
             <button type="button" onClick={handlePrint} className="btn-secondary">
              <Printer size={18} /> Print Report
            </button>
            <button type="button" onClick={handleDownloadExcel} className="btn-secondary">
              <FileSpreadsheet size={18} /> Export Excel
            </button>
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
