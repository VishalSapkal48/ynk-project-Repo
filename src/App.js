import React from 'react';
import './App.css';
import OnlineSurveyForm from './components/OnlineSurveyForm';
import CivilWorkChecklistForm from './components/Shutter/CivilWorkChecklistForm';
import InternalDeprmentWorking from './components/Shutter/InternalDepermentWorking';
import MaterialChecklist from './components/Shutter/MaterialChecklist';

import ShopMeasurementsForm from './components/Shutter/ShopMeasurementsForm';
import ShopSetupChecklistForm from './components/Shutter/ShopSetupChecklistForm';

import SurveyCompletionSummaryForm from './components/Shutter/SurveyCompletionSummaryForm';
import TermsandCondition from './components/Shutter/TermsandCondition';
import ContactInfo from './components/Shutter/ContactInfo';


function App() {
  return (
  <div className="App">
    <ContactInfo/>
    <OnlineSurveyForm/>
  {/*  <ShopSetupChecklistForm/>
       
       <InternalDeprmentWorking/>
    <CivilWorkChecklistForm/>
   <TermsandCondition/>
     <MaterialChecklist/>





   <ShopMeasurementsForm/>
 
    <SurveyCompletionSummaryForm/>*/}

    </div>

  )
}

export default App;