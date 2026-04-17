import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewAssessment = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("Active");
  const [modalType, setModalType] = useState(null); 
  // accept | reject | restore

  const handleConfirm = () => {
    if (modalType === "accept") {
      setStatus("Approved");
      alert("Assessment Accepted Successfully");
    }

    if (modalType === "reject") {
      setStatus("Rejected");
      alert("Assessment Rejected Successfully");
    }

    if (modalType === "restore") {
      setStatus("Active");
      alert("This assessment has been restored successfully");
    }

    setModalType(null);

    setTimeout(() => {
      navigate("/admin/assessments");
    }, 1200);
  };

  const handleCancelRedirect = () => {
    navigate("/admin/assessments");
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .container {
          display: flex;
        }

        .sidebar {
          width: 230px;
          background: #1e293b;
          color: white;
          min-height: 100vh;
          padding: 20px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          padding: 10px 0;
          cursor: pointer;
        }

        .sidebar li:hover {
          color: #38bdf8;
        }

        .active {
          color: #38bdf8;
          font-weight: bold;
        }

        .main {
          flex: 1;
          padding: 20px;
          background: #f1f5f9;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section {
          background: white;
          padding: 20px;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .label {
          font-weight: bold;
        }

        .question-box {
          margin-top: 10px;
          padding: 10px;
          background: #f8fafc;
          border-radius: 5px;
        }

        .status-active { color: #2563eb; font-weight: bold; }
        .status-approved { color: green; font-weight: bold; }
        .status-rejected { color: red; font-weight: bold; }

        .button-group {
          margin-top: 20px;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .accept-btn {
          background: #16a34a;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .reject-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .restore-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .cancel-btn {
          background: gray;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 25px;
          border-radius: 10px;
          width: 360px;
          text-align: center;
        }

        .modal-buttons {
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
        }

        footer {
          margin-top: 30px;
          text-align: center;
          color: gray;
        }
      `}</style>

      <div className="container">

        {/* Sidebar */}
        <div className="sidebar">
          <h2>AssessVerse</h2>
          <ul>
            <li>Dashboard</li>
            <li>User Management</li>
            <li className="active">Assessment Oversight</li>
            <li>Logs & Reports</li>
            <li>Platform Settings</li>
            <li>Profile</li>
          </ul>
        </div>

        {/* Main */}
        <div className="main">

          <div className="header">
            <h2>View Assessment</h2>
            <input type="text" placeholder="Search..." />
          </div>

          {/* Basic Info */}
          <div className="section">
            <h3>Basic Information</h3>

            <div className="info-grid">
              <div><span className="label">Title:</span> DBMS Test</div>
              <div><span className="label">Instructor:</span> Raji</div>
              <div><span className="label">Type:</span> MCQ</div>
              <div>
                <span className="label">Status:</span>{" "}
                <span className={
                  status === "Approved"
                    ? "status-approved"
                    : status === "Rejected"
                    ? "status-rejected"
                    : "status-active"
                }>
                  {status}
                </span>
              </div>
              <div><span className="label">Flags:</span> 1</div>
            </div>
          </div>

          {/* Question Preview */}
          <div className="section">
            <h3>Question Preview</h3>
            <div className="question-box"><strong>Q1:</strong> What is the full form of DBMS</div>
            <div className="question-box"><strong>Q2:</strong> Difference between DBMS & RDBMS</div>
            <div className="question-box"><strong>Q3:</strong> What is Database</div>
            <p style={{color:"#2563eb", cursor:"pointer"}}>View All Questions</p>
          </div>

          {/* Configuration */}
          <div className="section">
            <h3>Assessment Configuration</h3>

            <div className="info-grid">
              <div><span className="label">Questions:</span> 10</div>
              <div><span className="label">Duration:</span> 10 Minutes</div>
              <div><span className="label">Pass %:</span> 75%</div>
              <div><span className="label">Difficulty:</span> Beginner</div>
            </div>

            <div style={{marginTop:"10px"}}>
              <span className="label">Flag Reason:</span>
              <p>No Flags</p>
            </div>

            <div className="button-group">
              <button className="reject-btn" onClick={() => setModalType("reject")}>
                Reject Assessment
              </button>

              <button className="accept-btn" onClick={() => setModalType("accept")}>
                Accept Assessment
              </button>

              <button className="restore-btn" onClick={() => setModalType("restore")}>
                Restore
              </button>

              <button className="cancel-btn" onClick={handleCancelRedirect}>
                Cancel
              </button>
            </div>
          </div>

          <footer>© copyrights 2026 AssessVerse</footer>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              Are you sure you want to{" "}
              {modalType === "accept"
                ? "Accept"
                : modalType === "reject"
                ? "Reject"
                : "Restore"}{" "}
              this assessment?
            </h3>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setModalType(null)}>
                Cancel
              </button>

              <button className="restore-btn" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAssessment;  