import React from 'react';
import './App.css';
import OnlineSurveyForm from './components/OnlineSurveyForm/OnlineSurveyForm';
import CivilWorkChecklistForm from './components/CivilWorkChecklistForm/CivilWorkChecklistForm';
import InternalDeprmentWorking from './components/InternalDeprmentWorking/InternalDepermentWorking';
import MaterialChecklist from './components/MaterialChecklist/MaterialChecklist';

import ShopMeasurementsForm from './components/ShopMeasurementsForm/ShopMeasurementsForm';
import ShopSetupChecklistForm from './components/ShopSetupChecklistForm/ShopSetupChecklistForm';

import SurveyCompletionSummaryForm from './components/Shutter/SurveyCompletionSummaryForm';
import TermsandCondition from './components/TermsandCondition/TermsandCondition';
import ContactInfo from './components/Registerfrom/ContactInfo';
import TablePage from './components/PopTiles/TablePage';
import InspectionChecklist from './components/InspectionChecklist/InspectionChecklist';
import ElectricianForm from './components/ElectricianForm/ElectricianForm';
import ProjectWorkFollowup from './components/ProjectWorkFollowup/ProjectWorkFollowup';


function App() {
  return (
  <div className="App">
    
    <OnlineSurveyForm/>
      

  {/* 
   <InternalDeprmentWorking/>
  <OnlineSurveyForm/>
  <ShopSetupChecklistForm/>
   <TermsandCondition/> 
    <CivilWorkChecklistForm/>
   <ElectricianForm/>
     <MaterialChecklist/>
<InspectionChecklist/>
 
    <TablePage/>



   <ShopMeasurementsForm/>
 
    <SurveyCompletionSummaryForm/>*/}

    </div>

  )
}

export default App;