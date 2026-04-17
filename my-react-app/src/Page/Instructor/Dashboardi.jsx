import React, { useState, useEffect } from "react";

import axios from "src/api/axiosConfig";

import Headeri from "../../Component/Instructor/Headeri.jsx";

import Sidebari from "../../Component/Instructor/Sidebari.jsx";

import { useNavigate } from "react-router-dom";



const InstructorDashboard = () => {

  const navigate = useNavigate();

  const [insStats, setInsStats] = useState({ total: 0, pending: 0, evaluated: 0 });

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchInsData = async () => {

      try {

        const token = localStorage.getItem("token");

        

        // CRITICAL CHANGE: Updated URL to match your assessmentRoutes.js registration

        // This hits the getInstructorStats function in your assessmentController

        const res = await axios.get("/api/assessments/instructor-stats", {

          headers: { Authorization: `Bearer ${token}` }

        });

        

        setInsStats(res.data);

      } catch (err) {

        console.error("Error fetching instructor stats", err);

      } finally {

        setLoading(false);

      }

    };

    fetchInsData();

  }, []);



  // Updated graph scaling: ensures bars are visible even with low database counts

  const maxVal = Math.max(insStats.total, insStats.pending, insStats.evaluated, 5); 

  const getH = (val) => `${(val / maxVal) * 200}px`;



  const styles = {

    body: { 

      margin: 0, 

      width: "100%", 

      minHeight: "100vh", 

      fontFamily: "Acme, sans-serif", 

      backgroundColor: "#17276B",

      overflowX: "hidden" 

    },

    dashboardContainer: { 

      display: "flex",

      width: "100%"

    },

    mainContent: { 

      flex: 1, 

      width: "87vw",

      marginLeft: "180px", // Sidebar width alignment

      padding: "130px 40px 40px 100px", 

      backgroundColor: "#17276B", 

      minHeight: "100vh", 

      display: "flex", 

      flexDirection: "column", 

      gap: "25px",

      boxSizing: "border-box"

    },

    statsContainer: { 

      display: "flex", 

      justifyContent: "space-around", 

      backgroundColor: "#0A1230", 

      padding: "40px", 

      borderRadius: "20px", 

      color: "white", 

      textAlign: "center",

      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",

      border: "1px solid #1e293b"

    },

    chartCard: { 

      backgroundColor: "#0A1230", 

      borderRadius: "30px", 

      padding: "50px", 

      marginTop: "10px", 

      minHeight: "350px", 

      display: "flex", 

      alignItems: "flex-end", 

      justifyContent: "center", 

      gap: "50px", 

      position: "relative",

      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",

      border: "1px solid #1e293b"

    },

    title: { color: "white", fontSize: "32px", marginBottom: "20px" },

    statBox: { flex: 1 },

    statLabel: { fontSize: "18px", color: "#CBD5E0", marginBottom: "10px" },

    statValue: { fontSize: "56px", fontWeight: "bold", color: "#F8FAFC" },

    

    bar: { 

        width: "60px", 

        borderRadius: "10px 10px 0 0", 

        transition: "height 1s cubic-bezier(0.4, 0, 0.2, 1)",

        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"

    },

    legend: { 

      position: "absolute", 

      right: "30px", 

      top: "30px", 

      color: "white", 

      fontSize: "14px", 

      display: "flex", 

      flexDirection: "column", 

      gap: "12px" 

    },

    legendItem: { display: "flex", alignItems: "center", gap: "10px" },

    createBtn: { 

      backgroundColor: "#7C3AED", 

      color: "white", 

      border: "none", 

      padding: "15px 40px", 

      borderRadius: "50px", 

      cursor: "pointer", 

      fontSize: "16px", 

      fontWeight: "bold",

      textTransform: "uppercase",

      marginTop: "20px",

      alignSelf: "center",

      boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",

      transition: "transform 0.2s"

    },

  };



  return (

    <div style={styles.body}>

      <Headeri />

      <div style={styles.dashboardContainer}>

        <Sidebari />

        <div style={styles.mainContent}>

          <h2 style={styles.title}>Instructor Dashboard</h2>



          <div style={styles.statsContainer}>

            <div style={styles.statBox}>

              <div style={styles.statLabel}>Total Assessments</div>

              <div style={styles.statValue}>{loading ? "..." : insStats.total}</div>

            </div>

            <div style={styles.statBox}>

              <div style={styles.statLabel}>Pending Review</div>

              <div style={styles.statValue}>{loading ? "..." : insStats.pending}</div>

            </div>

            <div style={styles.statBox}>

              <div style={styles.statLabel}>Evaluated</div>

              <div style={styles.statValue}>{loading ? "..." : insStats.evaluated}</div>

            </div>

          </div>



          <div style={styles.chartCard}>

            <div style={{ ...styles.bar, height: getH(insStats.evaluated), backgroundColor: "#38BDF8" }} title={`Evaluated: ${insStats.evaluated}`}></div>

            <div style={{ ...styles.bar, height: getH(insStats.total), backgroundColor: "#7C3AED" }} title={`Total: ${insStats.total}`}></div>

            <div style={{ ...styles.bar, height: getH(insStats.pending), backgroundColor: "#2563EB" }} title={`Pending: ${insStats.pending}`}></div>



            <div style={styles.legend}>

              <div style={styles.legendItem}><div style={{ width: 14, height: 14, backgroundColor: "#38BDF8", borderRadius: "3px" }}></div> Evaluated</div>

              <div style={styles.legendItem}><div style={{ width: 14, height: 14, backgroundColor: "#2563EB", borderRadius: "3px" }}></div> Pending Review</div>

              <div style={styles.legendItem}><div style={{ width: 14, height: 14, backgroundColor: "#7C3AED", borderRadius: "3px" }}></div> Total Assessments</div>

            </div>

          </div>



          <button 

            onClick={() => navigate('/create')} 

            style={styles.createBtn} 

            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} 

            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}

          >

            + Create New Assessment

          </button>



          <footer style={{ color: "#CBD5E0", textAlign: "center", marginTop: "auto", padding: "20px", fontSize: "12px" }}>

            © copyrights 2026 AssessVerse

          </footer>

        </div>

      </div>

    </div>

  );

};



export default InstructorDashboard;