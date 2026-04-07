import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, CheckCircle, FileSpreadsheet, Send } from 'lucide-react';
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
    // Transform data for Excel
    const rows = [];
    kpiData.forEach(section => {
      section.questions.forEach(q => {
        rows.push({
          'No.': section.id,
          'KPI / Category': section.category,
          'KPI Description': section.kpi,
          'Reporting Question': q.label,
          'Response': formData[q.id] || ''
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HNCL Reporting');

    // Add some styling (if possible in simple XLSX, but mostly just export)
    XLSX.writeFile(workbook, 'HNCL_Reporting_Data.xlsx');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container">
      <header>
        <h1>HNCL Services Reporting</h1>
        <p className="subtitle">KPI & Data Requirements Form (Model 2)</p>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
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
                      placeholder={`Enter details for ${q.label}...`}
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

        <div className="actions">
          <button type="submit" className="btn-primary">
            {submitted ? (
              <>
                <CheckCircle size={20} /> Data Saved
              </>
            ) : (
              <>
                <Send size={20} /> Save Progress
              </>
            )}
          </button>
          
          <button 
            type="button" 
            onClick={handleDownloadExcel} 
            className="btn-secondary"
          >
            <FileSpreadsheet size={20} /> Download Excel (.xlsx)
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
