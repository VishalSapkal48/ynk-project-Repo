

const equipmentConfig = {
  title_mr: 'सिव्हिल वर्क तपासणी यादी',
  title_en: 'Civil Work Checklist',
  submit_button_mr: 'सबमिट करा',
  submit_button_en: 'Submit',
  next_button_mr: 'पुढे',
  next_button_en: 'Next',
  back_button_mr: 'मागे',
  back_button_en: 'Back',
};

const questions = [
  {
    key: 'step1_understood',
     question_mr: 'तुम्हाला वरील कामाची माहिती समजली का?',
    question_en: 'Do you understand the above work information?',
  },
  {
    key: 'step2_understood',
    question_mr: 'तुम्हाला वरील कामाची माहिती समजली का?',
    question_en: 'Do you understand the above work information?',
  },
  {
    key: 'step3_understood',
    question_mr: 'तुम्हाला वरील कामाची माहिती समजली का?',
    question_en: 'Do you understand the above work information?',
  },
  {
    key: 'step4_understood',
    question_mr: 'तुम्हाला वरील कामाची माहिती समजली का?',
    question_en: 'Do you understand the above work information?',
  },
  {
    key: 'step5_understood',
    question_mr: 'तुम्हाला वरील कामाची माहिती समजली का?',
    question_en: 'Do you understand the above work information?',
  },
];

const tableData1 = [
  { item: 'CCTV', company: 'CP+ Only', specification: '1 Megapixel', qty: '-' },
  { item: 'Camera', company: 'CP+ Only', specification: 'Dome', qty: '3' },
  { item: 'Camera', company: 'CP+ Only', specification: 'Bullet', qty: '1' },
  { item: 'DVR', company: 'CP+ Only', specification: '4 Channel', qty: '1' },
  { item: 'Hard Disk', company: 'CP+ Only', specification: '500GB', qty: '1' },
  { item: 'SMPS (5 AMP)', company: 'CP+ Only', specification: '-', qty: '1' },
  { item: '2U Rack', company: 'CP+ Only', specification: '-', qty: '1' },
  { item: 'BNC', company: 'CP+ Only', specification: '-', qty: '8' },
  { item: 'DC Connector', company: '-', specification: '-', qty: '4' },
  { item: 'CAT 6 Patch Cord', company: '-', specification: '-', qty: '1' },
];

const tableData2 = [
  { item: 'Internet', company: 'Any Local Brand', specification: 'Above 40 Mbps', qty: '1 Year' },
];

const tableData3 = [
  { item: 'Speaker + Amplifier', company: 'Any Local Brand', specification: 'Base-1, Speaker-4', qty: '1' },
];

const tableData4 = [
  { item: 'Shutter', company: 'Asian', specification: 'Grey-0616 (Oil Paint)', qty: 'As Per Shop' },
  { item: 'Ceiling', company: 'Asian', specification: 'Grey-0616 (Oil Paint)', qty: 'As Per Shop' },
  { item: 'Outside Wall', company: 'Asian', specification: 'Grey-0616 (Oil Paint)', qty: 'As Per Shop' },
  { item: 'Shutter Logo', company: 'Asian', specification: '36 inch x 36 inch Round (As Per Board Name Logo)', qty: '1' },
];

const tableData5 = [
  { item: 'Water Tank', company: 'Any Brand', specification: '1000 Litre', qty: '2', work: 'As Per Shop Layout' },
  { item: 'Sink Inlet', company: 'Paras, Prince, Plasto, or Any Brand', specification: '0.5 inch UPVC Pipe', qty: '-', work: 'As Per Shop, 43 inch Height From Floor' },
  { item: 'Sink Outlet', company: 'Paras, Prince, Plasto, or Any Brand', specification: '2.5 inch PVC Pipe', qty: '-', work: 'As Per Underground Drainage Line' },
  { item: 'Water Tap (Sink)', company: 'Paras, Prince, Plasto, or Any Brand', specification: 'Stainless Steel', qty: '1', work: '' },
  { item: 'Steamer Inlet', company: 'Paras, Prince, Plasto, or Any Brand', specification: '0.5 inch CPVC Pipe (Attach NRV Valve)', qty: '-', work: 'As Per Shop, 18 inch Height From Floor' },
  { item: 'Steamer Outlet', company: 'Paras, Prince, Plasto, or Any Brand', specification: '2.5 inch CPVC Pipe', qty: '-', work: 'As Per Underground Drainage Line' },
  { item: 'Steamer Tap', company: 'Paras, Prince, Plasto, or Any Brand', specification: 'Stainless Steel', qty: '1', work: '' },
];






const CivilWorkChecklistFormQuestion = {
  equipmentConfig,
  questions,
  tableData1,
  tableData2,
  tableData3,
  tableData4,
  tableData5
};

export default CivilWorkChecklistFormQuestion;