
import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import axios from "src/api/axiosConfig";

import Headers from "../../Component/Student/Headers.jsx";

import Sidebars from "../../Component/Student/Sidebars.jsx";

import { ChevronDown, Clock, Loader2 } from "lucide-react";



const AssessmentCatalog = () => {

  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [subjectFilter, setSubjectFilter] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);



  useEffect(() => {

    const fetchAssessments = async () => {

      try {

        setLoading(true);
        const token = localStorage.getItem("token"); 
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        // Change this line
const res = await axios.get("/api/submissions/get-assessments", config);        // UPDATED URL: Calling the main assessment route defined in server.js
        console.log("Data from DB:", res.data);
        setAssessments(res.data || []); 

      } catch (err) {

        console.error("Catalog Fetch Error:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchAssessments();

  }, []);



  // Filter Logic: Ensuring exact match with "Published" status in MongoDB

  const filteredData = assessments.filter((item) => {

    const matchesSubject = subjectFilter === "" || item.title === subjectFilter;

    const isPublished = item.status === "Published"; 

    return matchesSubject && isPublished;

  });



  const uniqueSubjects = [...new Set(assessments.map(a => a.title))];



  const styles = {

    pageWrapper: { margin: 0, padding: 0, width: "100vw", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#0A1230",paddingLeft:"300px"},

    layoutBody: { display: "flex", flex: 1, width: "100%", overflow: "hidden" },

    mainContent: { flex: 1, backgroundColor: "#17276B", padding: "20px 40px", display: "flex", flexDirection: "column", color: "white", overflowY: "auto",marginLeft:"160px",marginTop:"100px" },

    titleRow: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", borderLeft: "5px solid #00C853", paddingLeft: "20px" },

    filterBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "25px", padding: "8px 20px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "15px" },

    dropdownTrigger: { backgroundColor: "white", color: "#17276B", padding: "8px 18px", borderRadius: "25px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", minWidth: "160px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" },

    dropdownMenu: { position: 'absolute', top: '115%', left: '0', width: '100%', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.4)', zIndex: 100 },

    dropdownItem: { padding: '10px 20px', cursor: 'pointer', fontSize: '13px', color: '#17276B', borderBottom: '1px solid #f0f0f0' },

    table: { width: "90%", borderCollapse: "separate", borderSpacing: "0 6px" },

    th: { padding: "8px 15px", fontSize: "12px", textAlign: "left", color: "#94A3B8" },

    tr: { backgroundColor: "rgba(255, 255, 255, 0.07)" },

    td: { padding: "10px 15px", fontSize: "14px" },

    startBtn: { backgroundColor: "#00C853", color: "white", border: "none", padding: "6px 15px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }

  };



  return (

    <div style={styles.pageWrapper}>

      <Headers />

      <div style={styles.layoutBody}>

        <Sidebars />

        <main style={styles.mainContent}>

          <div style={styles.titleRow}>

            <h1 style={{ margin: 0, fontSize: "28px" }}>Assessment Catalog</h1>

          </div>



          <div style={styles.filterBar}>

            <div style={{ position: "relative" }}>

              <div style={styles.dropdownTrigger} onClick={() => setOpenDropdown(openDropdown === "subject" ? null : "subject")}>

                Subject: {subjectFilter || "All"} <ChevronDown size={16} />

                {openDropdown === "subject" && (

                  <div style={styles.dropdownMenu}>

                    <div style={styles.dropdownItem} onClick={() => {setSubjectFilter(""); setOpenDropdown(null);}}>All Subjects</div>

                    {uniqueSubjects.map(s => (

                      <div key={s} style={styles.dropdownItem} onClick={() => {setSubjectFilter(s); setOpenDropdown(null);}}>{s}</div>

                    ))}

                  </div>

                )}

              </div>

            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#CBD5E0" }}>

              <Clock size={20} color="#00C853" />

              <span>Standard Time: 60 Min</span>

            </div>

          </div>



          {loading ? (

            <div style={{ textAlign: "center", marginTop: "50px" }}><Loader2 className="animate-spin" /></div>

          ) : (

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>Assessment Title</th>

                  <th style={styles.th}>Duration</th>

                  <th style={styles.th}>Questions</th>

                  <th style={{ ...styles.th, textAlign: "right" }}>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredData.length > 0 ? (

                  filteredData.map((item) => (

                    <tr key={item._id} style={styles.tr}>

                      <td style={styles.td}>{item.title}</td>

                      <td style={styles.td}>{item.duration} mins</td>

                      <td style={styles.td}>{item.questions?.length || 0} Items</td>

                      <td style={{ ...styles.td, textAlign: "right" }}>

                        <button style={styles.startBtn} onClick={() => navigate(`/assessmentinterface/${item._id}`)}>

                          START TEST

                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "50px" }}>No published assessments available.</td></tr>

                )}

              </tbody>

            </table>

          )}

        </main>

      </div>

    </div>

  );

};



export default AssessmentCatalog;