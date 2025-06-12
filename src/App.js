import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { UserProvider } from "./components/context/UserContext";
import ContactInfo from "./components/ContactInfo";
import TermsandCondition from "./components/TermsandCondition/TermsandCondition";
import ShopSetupChecklistForm from "./components/ShopSetupChecklistForm/ShopSetupChecklistForm";
import OnlineSurveyForm from "./components/OnlineSurveyForm/OnlineSurveyForm";
import CivilWorkChecklistForm from "./components/CivilWorkChecklistForm/CivilWorkChecklistForm";
import InternalDepartmentWorking from "./components/InternalDeprmentWorking/InternalDepermentWorking"; // Fix typo in folder/file name
import MaterialChecklist from "./components/MaterialChecklist/MaterialChecklist";
import ShopMeasurementsForm from "./components/ShopMeasurementsForm/ShopMeasurementsForm";
import InspectionChecklist from "./components/InspectionChecklist/InspectionChecklist";
import ProjectWorkFollowup from "./components/ProjectWorkFollowup/ProjectWorkFollowup";
import Admin from "./components/Admin";
import useCurrentTime from "./components/hook/useCurrentTime";

function App() {
  const [language, setLanguage] = useState("en");
  const { formatDateTime } = useCurrentTime();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  const Dashboard = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {language === "en" ? "Dashboard" : "डॅशबोर्ड"}
        </h2>
        <p className="text-gray-600 mb-4">
          {language === "en" ? "Welcome to YNK!" : "YNK मध्ये स्वागत आहे!"}
        </p>
        <p className="text-gray-500 mb-6">{formatDateTime(language)}</p>
        <div className="space-y-4">
          <Link
            to="/online-survey"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {language === "en" ? "Online Survey" : "ऑनलाइन सर्वेक्षण"}
          </Link>
          <Link
            to="/civil-work-checklist"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {language === "en"
              ? "Civil Work Checklist"
              : "सिव्हिल वर्क चेकलिस्ट"}
          </Link>
          <Link
            to="/shop-measurements"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {language === "en" ? "Shop Measurements" : "शॉप मोजमाप"}
          </Link>
        </div>
        <button
          onClick={toggleLanguage}
          className="mt-6 text-sm text-gray-600 underline hover:text-blue-600"
        >
          {language === "mr" ? "English" : "मराठी"}
        </button>
      </div>
    </div>
  );

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/contact-info" />} />
            <Route
              path="/contact-info"
              element={
                <ContactInfo
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/terms-and-condition"
              element={<TermsandCondition language={language} />}
            />
            <Route
              path="/shop-setup-checklist"
              element={<ShopSetupChecklistForm language={language} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/online-survey"
              element={
                <OnlineSurveyForm
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/civil-work-checklist"
              element={
                <CivilWorkChecklistForm
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/shop-measurements"
              element={
                <ShopMeasurementsForm
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/service-process"
              element={
                <InternalDepartmentWorking
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/project-work-followup"
              element={
                <ProjectWorkFollowup
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/material-checklist"
              element={
                <MaterialChecklist
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/inspection-checklist"
              element={
                <InspectionChecklist
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
