import React from 'react';
import './App.css';
import InternalDepartmentWorking from './components/InternalDepartmentWorking';
import  SurveyForms from './components/SurveyForms';
import ElectricianForm  from './components/ElectricianForm';
import TablePage from './components/TablePage';
import InspectionChecklist from './components/InspectionChecklist';
import EndForm from './components/EndForm';

function App() {
  return (
    <div className="App">
  <InternalDepartmentWorking />
  
  
  
  <EndForm/>
      {/* 
     
     
     
   

  
   <InspectionChecklist/>
   <ElectricianForm/>
  <TablePage/> 
      */}
    
      
    </div>
  );
}

export default App;