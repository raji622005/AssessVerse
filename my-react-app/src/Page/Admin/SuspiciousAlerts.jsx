import React from "react";

const AlertDetailPanel = () => {
  return (
    <div className="app-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">AssessVerse</h2>

        <ul className="menu">
          <li>Dashboard</li>
          <li className="active">Suspicious Activity Alerts</li>
          <li>User Management</li>
          <li>Assessment Oversight</li>
          <li>Alert Detail Panel</li>
          <li>Logs & Reports</li>
        </ul>

        <div className="bottom-menu">
          <p>Platform Settings</p>
          <p>Profile</p>
          <p>Logout</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="header">
          <input type="text" placeholder="Search" className="search-bar" />
        </div>

        {/* Alert Detail Card */}
        <div className="card">
          <h2>Alert Detail Panel</h2>

          <div className="form-group">
            <label>Role</label>
            <p>Instructor</p>
          </div>

          <div className="form-group">
            <label>Action</label>
            <p>Created Test</p>
          </div>

          <div className="form-group">
            <label>Date</label>
            <p>06.09.2025</p>
          </div>

          <div className="form-group">
            <label>Flags</label>
            <p>3</p>
          </div>

          <div className="form-group">
            <label>Status</label>
            <p>Failed</p>
          </div>

          <div className="form-group">
            <label>Suspicious Reason</label>
            <ul className="reason-list">
              <li>Multiple failed attempts within 5 minutes</li>
              <li>Unusual IP detected</li>
              <li>System validation error</li>
            </ul>
          </div>

          {/* Admin Actions */}
          <div className="actions">
            <h3>Admin Actions</h3>

            <button className="action-btn">Send Warning</button>
            <button className="action-btn">Mark as Investigated</button>
            <button className="action-btn">Temporaily Block User</button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>© copyrights 2026 AssessVerse</p>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailPanel;