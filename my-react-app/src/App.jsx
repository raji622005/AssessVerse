import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./Page/Auth/Landingpage";
import Loginpage from "./Page/Auth/Loginpage";
import Signuppage from "./Page/Auth/Signuppage";
import Contactus from "./Page/Auth/Contactus";
import Homepage from "./Page/Auth/Homepage";
import Dashboard1 from "./Page/Admin/Dashboard1"
import Newpassword from "./Page/Auth/newpassword";
import HeaderA from "./Component/Admin/HeaderA";
import SidebarA from "./Component/Admin/SidebarA";
import UserManagement from "./Page/Admin/UserManagement";
import Forgotpassword from "./Page/Auth/Forgotpassword";
import AddUser from "./page/Admin/AddUser";
import EditUser from "./Page/Admin/EditUser";
import Verifyotp from "./Page/Auth/Verifyotp";
import AssessmentOversight from "./Page/Admin/AssessmentOversight";
import ViewAssessment from "./Page/Admin/ViewAssessment";
import LogsReports from "./Page/Admin/LogReports";
import PlatformSettings from "./Page/Admin/PlatformSettings";
import Profile from "./Page/Admin/Profile";
import Branding from "./Page/Admin/Branding";
import RoleManagement from "./Page/Admin/RoleManagement";
import Euser from "./Page/Admin/Euser";
import Aview from  "./Page/Admin/Aview";
import Notificationa from "./Page/Admin/Notification";

import Headeri from "./Component/Instructor/Headeri";
import Sidebari from "./Component/Instructor/Sidebari";
import Dashboardi from "./Page/Instructor/Dashboardi";
import Create from "./Page/Instructor/Create";
import Manage from "./Page/Instructor/Manage";
import Evaluate from "./Page/Instructor/Evaluate";
import StudentOverview from "./Page/Instructor/StudentOverview";
import  Profilei from "./Page/Instructor/Profilei";
import ProfileSettings from "./Page/Instructor/ProfileSettings";
import Calenderi from "./Page/Instructor/Calenderi";
import Eview from "./Page/Instructor/Eview";
import Eedit from "./Page/Instructor/Eedit";
import Redit from "./Page/Instructor/Redit";
import Rview from "./Page/Instructor/Rview";
import Notificationi from  "./Page/Instructor/Notificationi";

import AssessmentFlow from "./Page/Instructor/Assessmentflow";



import Dashboards from "./Page/Student/Dashboards";
import AssessmentCatalog from "./Page/Student/AssessmentCatalog";
import AssessmentInterface from "./Page/Student/Assessmentinterface";
import MySubmissions from "./Page/Student/Mysubmission";
import Profiles from "./Page/Student/Profiles";
import NotificationS from "./Page/Student/Notifications";
import StudentReport from "./Page/Student/StudentReport";

function App() {
  return (
    
      <Routes>
        
        
          <Route path="/" element={<Landingpage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/forget" element={<Forgotpassword/>}/>
          <Route path="/otp" element={<Verifyotp/>}/>
          <Route path="/new" element={<Newpassword/>}/>

          <Route Path="/HeaderA" element={<HeaderA/>}/>
          <Route path="/sideA" element={<SidebarA/>}/>
          <Route path="/DashboardA" element={<Dashboard1/>}/>
          <Route path="/UserManagement" element={<UserManagement/>}/>
          <Route path="/adduser" element={<AddUser/>} />
          <Route path="/edituser" element={<EditUser/>}/>
          <Route path="/assessmentoversight" element={<AssessmentOversight/>}/>
          <Route path="/viewassessement" element={<ViewAssessment/>}/>
          <Route path="/logsreport" element={<LogsReports/>}/>
          <Route path="/platformsettings" element={<PlatformSettings/>}/>
          <Route path="/profileA" element={<Profile/>}/>
          <Route path="/branding" element={<Branding/>}/>
          <Route path="/role" element={<RoleManagement/>}/>
          <Route path="/admin/edit-user/:id" element={<Euser />} />
          <Route path="/admin/view-assessment/:id" element={<Aview />} />
          <Route path="/notificationa" element={<Notificationa/>}/>
          <Route path="/studentreport/:submissionId" element={<StudentReport/>}/>


          <Route path="/headeri" element={<Headeri/>}/>
          <Route path="/sidebari" element={<Sidebari/>}/>
          <Route path="/Dashboardi" element={<Dashboardi/>}/>
          <Route path="/manage" element={<Manage/>}/>
          <Route path="/evaluate" element={<Evaluate/>}/>
          <Route path="/studoverview" element={<StudentOverview/>}/>
          <Route path="/profilei" element={<Profilei/>}/>          
          <Route path="/profilesi" element={<ProfileSettings/>}/> 
          <Route path="/create" element={<Create/>}/>
          <Route path="/calenderi" element={<Calenderi/>}/>
          <Route path="/assessmentflow" element={<AssessmentFlow />} /> 
          <Route path="/assessmentinterface/:assessmentId" element={<AssessmentInterface />} />    
          <Route path="/view-assessment/:id" element={<Eview />} />
          <Route path="/edit-assessment/:id" element={<Eedit />} /> 
          <Route path="/edit1-assessment/:id" element={<Redit/>}/>
          <Route path="/view1-assessment/:id" element={<Rview/>}/>
          <Route path="/notificationi" element={<Notificationi/>}/> 



          <Route path="/Dashboards" element={<Dashboards/>}/>
          <Route path="/assessmentcatalog" element={<AssessmentCatalog/>}/>
          <Route path="/assessmentinterface" element={<AssessmentInterface/>}/>
          <Route path="/mysubmission" element={<MySubmissions/>}/>
          <Route path="/profiles" element={<Profiles/>}/> 
          <Route path="/notifications" element={<NotificationS/>}/>




          


        
      </Routes>
    
  );
}

export default App;