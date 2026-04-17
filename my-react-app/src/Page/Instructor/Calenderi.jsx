import React, { useState } from "react";
import Headeri from "../../Component/Instructor/Headeri.jsx";
import Sidebari from "../../Component/Instructor/Sidebari.jsx";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPage = () => {
  // State to manage dropdown values
  const [assessment, setAssessment] = useState("Assessment");
  const [evaluation, setEvaluation] = useState("Evaluation");

  const handleAssessmentChange = (e) => {
    const value = e.target.value;
    if (value === "Clear Filter") {
      setAssessment("Assessment");
    } else {
      setAssessment(value);
    }
  };

  const handleEvaluationChange = (e) => {
    const value = e.target.value;
    if (value === "Clear Filter") {
      setEvaluation("Evaluation");
    } else {
      setEvaluation(value);
    }
  };

  const styles = {
    body: {
      margin: 0,
      width: "100vw",
      minHeight: "100vh",
      fontFamily: "Acme, sans-serif",
      backgroundColor: "#0A1230",
    },
    pageContainer: {
      display: "flex",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      backgroundColor: "#17276B",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      color: "white",
      marginBottom: "20px",
    },
    filterRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    select: {
      padding: "8px 15px",
      borderRadius: "20px",
      border: "none",
      marginRight: "10px",
      fontSize: "14px",
      cursor: "pointer",
      backgroundColor: "white",
      outline: "none",
    },
    viewToggle: {
      display: "flex",
      gap: "5px",
    },
    viewBtn: {
      padding: "8px 20px",
      borderRadius: "5px",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
    },
    calendarGridArea: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: "30px",
    },
    calendarCard: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "25px",
      color: "#333",
    },
    detailsCard: {
      backgroundColor: "#D1D5DB",
      borderRadius: "15px",
      padding: "25px",
      color: "#1F2937",
    },
    calendarHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      textAlign: "center",
      gap: "10px",
    },
    dayName: {
      fontWeight: "bold",
      color: "#9CA3AF",
      fontSize: "14px",
    },
    dateCell: {
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
    },
    selectedDate: {
      backgroundColor: "#1F2937",
      color: "white",
    },
    quizItem: {
      borderBottom: "1px solid #9CA3AF",
      paddingBottom: "15px",
      marginBottom: "15px",
    },
    evaluateBtn: {
      backgroundColor: "#10B981",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      width: "100%",
      marginTop: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    legend: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      color: "white",
      fontSize: "14px",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    footer: {
      color: "#CBD5E0",
      textAlign: "center",
      marginTop: "auto",
      padding: "20px",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.body}>
      <Headeri />
      <div style={styles.pageContainer}>
        <Sidebari />

        <div style={styles.mainContent}>
          <div style={styles.headerRow}>
            <CalendarIcon size={32} />
            <h2 style={{ margin: 0, fontSize: "32px" }}>Calendar</h2>
          </div>

          <div style={styles.filterRow}>
            <div>
              {/* Assessment Dropdown */}
              <select 
                style={styles.select} 
                value={assessment} 
                onChange={handleAssessmentChange}
              >
                <option value="Assessment" disabled>Assessment</option>
                <option value="React Test">React Test</option>
                <option value="JS Mock Test">JS Mock Test</option>
                <option value="Clear Filter">Clear Filter</option>
              </select>

              {/* Evaluation Dropdown */}
              <select 
                style={styles.select} 
                value={evaluation} 
                onChange={handleEvaluationChange}
              >
                <option value="Evaluation" disabled>Evaluation</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Clear Filter">Clear Filter</option>
              </select>
            </div>
            
            <div style={styles.viewToggle}>
              <button style={{ ...styles.viewBtn, backgroundColor: "#059669" }}>Month</button>
              <button style={{ ...styles.viewBtn, backgroundColor: "#064E3B" }}>Week</button>
              <button style={{ ...styles.viewBtn, backgroundColor: "#064E3B" }}>Day</button>
            </div>
          </div>

          <div style={styles.calendarGridArea}>
            <div style={styles.calendarCard}>
              <div style={styles.calendarHeader}>
                <ChevronLeft cursor="pointer" />
                <div style={{ display: "flex", gap: "10px" }}>
                  <select style={{ border: "1px solid #ddd" }}><option>Jan</option></select>
                  <select style={{ border: "1px solid #ddd" }}><option>2026</option></select>
                </div>
                <ChevronRight cursor="pointer" />
              </div>

              <div style={styles.grid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} style={styles.dayName}>{d}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const isSelected = day === 20 || day === 21;
                  return (
                    <div 
                      key={day} 
                      style={{ 
                        ...styles.dateCell, 
                        ...(isSelected ? styles.selectedDate : {}) 
                      }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.detailsCard}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontWeight: "bold" }}>Selected Date Details</span>
                <span style={{ fontSize: "12px" }}>Jan 20, 2026</span>
              </div>

              <div style={styles.quizItem}>
                <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color: "#3B82F6" }}>🛡️</span> HTML Basics – Quiz 1
                </div>
                <div style={{ fontSize: "12px", color: "#4B5563", marginTop: "5px" }}>
                   • Submissions pending: 15 <br />
                   • Deadline: Jan 20, 11:59 PM
                </div>
                <button style={styles.evaluateBtn}>Evaluate Now</button>
              </div>

              <div style={styles.quizItem}>
                <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color: "#3B82F6" }}>🛡️</span> SQL Basics – Quiz 2
                </div>
                <div style={{ fontSize: "12px", color: "#4B5563", marginTop: "5px" }}>
                   • Submissions pending: 8 <br />
                   • Deadline: Jan 21, 11:59 PM
                </div>
                <button style={styles.evaluateBtn}>Evaluate Now</button>
              </div>
            </div>
          </div>

          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }}></div>
              Completed evaluations : 5
            </div>
            <div style={styles.legendItem}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FBBF24" }}></div>
              Pending reviews : 8
            </div>
            <div style={styles.legendItem}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }}></div>
              Overdue evaluations : 15
            </div>
          </div>

          <footer style={styles.footer}>
            © copyrights 2026 AssessVerse
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;