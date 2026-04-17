import React from "react";

import { useNavigate } from "react-router-dom";



const ViewAssessment = () => {

  const navigate = useNavigate();



  const handleAccept = () => {

    alert("Assessment Accepted Successfully");

  };



  const handleReject = () => {

    alert("Assessment Rejected Successfully");

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



        .sidebar h2 {

          margin-bottom: 20px;

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



        .logout {

          margin-top: 20px;

          color: red;

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



        .header input {

          padding: 6px;

          border-radius: 5px;

          border: 1px solid #ccc;

        }



        .section {

          background: white;

          padding: 20px;

          margin-top: 20px;

          border-radius: 10px;

          box-shadow: 0px 2px 6px rgba(0,0,0,0.1);

        }



        .section h3 {

          margin-bottom: 15px;

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



        .flag {

          color: red;

          font-weight: bold;

        }



        .button-group {

          margin-top: 20px;

          display: flex;

          gap: 15px;

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



        .accept-btn:hover {

          background: #15803d;

        }



        .reject-btn:hover {

          background: #b91c1c;

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

            <li className="logout">Logout</li>

          </ul>

        </div>



        {/* Main Content */}

        <div className="main">



          <div className="header">

            <h2>View Assessment</h2>

            <input type="text" placeholder="Search..." />

          </div>



          {/* Basic Information */}

          <div className="section">

            <h3>Basic Information</h3>



            <div className="info-grid">

              <div><span className="label">Title:</span> DBMS Test</div>

              <div><span className="label">Instructor:</span> Raji</div>

              <div><span className="label">Type:</span> MCQ</div>

              <div><span className="label">Status:</span> Active</div>

              <div><span className="label">Flags:</span> 1</div>

            </div>

          </div>



          {/* Question Preview */}

          <div className="section">

            <h3>Question Preview</h3>



            <div className="question-box">

              <strong>Q1:</strong> What is the full form of DBMS?

            </div>



            <div className="question-box">

              <strong>Q2:</strong> Difference between DBMS & RDBMS?

            </div>



            <div className="question-box">

              <strong>Q3:</strong> What is Database?

            </div>



            <p style={{marginTop:"10px", color:"#2563eb", cursor:"pointer"}}>

              View All Questions

            </p>

          </div>



          {/* Assessment Configuration */}

          <div className="section">

            <h3>Assessment Configuration</h3>



            <div className="info-grid">

              <div><span className="label">Questions:</span> 10</div>

              <div><span className="label">Duration:</span> 10 Minutes</div>

              <div><span className="label">Pass %:</span> 75%</div>

              <div><span className="label">Difficulty:</span> Beginner</div>

            </div>



            <div style={{marginTop:"15px"}}>

              <span className="label flag">Flag Reason:</span>

              <p>Duplicate question detected in Q2</p>

            </div>



            <div className="button-group">

              <button className="reject-btn" onClick={handleReject}>

                Reject Assessment

              </button>



              <button className="accept-btn" onClick={handleAccept}>

                Accept Assessment

              </button>

            </div>

          </div>



          <footer>

            © copyrights 2026 AssessVerse

          </footer>



        </div>

      </div>

    </>

  );

};



export default ViewAssessment;