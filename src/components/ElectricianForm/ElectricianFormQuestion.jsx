import ElectricianForm from "./ElectricianForm";

const table1Data = [
    {
      item: "Meter",
      company: "Any",
      specification: "3kg w/5kg w",
      qty: "1",
      work: "-",
    },

    {
      item: "Shop Earthing",
      company: "-",
      specification: "compulsory",
      qty: "1",
      work: "-",
    },
    {
      item: "MCB Box",
      company: "Anchor, Legrand (Colour-White)",
      specification: "As per Shop Load",
      qty: "1",
      work: "-",
    },
    {
      item: "All Points Control Board",
      company: "Anchor, Legrand (Colour-White)",
      specification: "12 Model / 18 Model",
      qty: "2",
      work: "-",
    },
    {
      item: "Fridge Elec-Point",
      company: "Anchor, Legrand (Colour-White)",
      specification: "3 Model  Board(16Amp)",
      qty: "2",
      work: "As per Layout",
    },
    {
      item: "Fryer Elec-Point",
      company: "Anchor, Legrand (Colour-White)",
      specification: "LCB Board (16Amp)",
      qty: "1",
      work: "As per Layout",
    },
    {
      item: "Heater Elec-Point",
      company: "Anchor, Legrand (Colour-White)",
      specification: "MCB Board (16Amp)",
      qty: "1",
      work: "As per Layout",
    },
    {
      item: "Work Table Elec-Point",
      company: "Anchor, Legrand (Colour-White)",
      specification: "12 Model Board (16Amp)",
      qty: "4",
      work: "As per Layout",
    },
    {
      item: "Bill Machine + Printer",
      company: "Anchor, Legrand (Colour-White)",
      specification: "8 Model Board (5Amp)",
      qty: "2",
      work: "As per Layout",
    },
    {
      item: "Speaker Amplifier + Wall Fan",
      company: "Anchor, Legrand (Colour-White)",
      specification: "5Amp",
      qty: "2",
      work: "As per Layout",
    },
    {
      item: "Exhaust",
      company: "Anchor, Legrand (Colour-White)",
      specification: "5Amp",
      qty: "1",
      work: "As per Layout",
    },
    {
      item: "CCTV",
      company: "Anchor, Legrand (Colour-White)",
      specification: "5Amp",
      qty: "4",
      work: "As per Layout",
    },
    {
      item: "Menu Frame",
      company: "Anchor, Legrand (Colour-White)",
      specification: "5Amp",
      qty: "2",
      work: "As per Layout",
    },
    {
      item: "Name Board",
      company: "Anchor, Legrand (Colour-White)",
      specification: "16AMP Out Off Shop",
      qty: "5",
      work: "-",
    },
  ];

  const table2Data = [
    {
      item: "Meter",
      company: "Polycab, RR Kabel, KEI",
      specification: "4mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "Shop Earthing",
      company: "Polycab, RR Kabel, KEI",
      specification: "2.5mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "Power Points (MCB/LCB)",
      company: "Polycab, RR Kabel, KEI",
      specification: "2.5mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "Power Points 16Amp",
      company: "Polycab, RR Kabel, KEI",
      specification: "2.5mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "Half Points 5Amp",
      company: "Polycab, RR Kabel, KEI",
      specification: "1.5mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "Name Board 16Amp",
      company: "Polycab, RR Kabel, KEI",
      specification: "2.5mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "All Ceiling Light",
      company: "Polycab, RR Kabel, KEI",
      specification: "1mm",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "Speaker Amplifier",
      company: "Polycab, RR Kabel, KEI",
      specification: "-",
      qty: "As per Shop",
      work: "As per Layout",
    },
    {
      item: "CCTV",
      company: "Polycab, RR Kabel, KEI",
      specification: "4+1",
      qty: "As per Shop",
      work: "As per Layout",
    },
  ];

  const table3Data = [
    {
      item: "Wall Fan",
      company: "Crompton",
      specification: "White Colour 16 inch",
      qty: "2",
      work: "",
    },
    {
      item: "Exhaust Fan",
      company: "eco",
      specification: "15 inch Fan",
      qty: "1",
      work: "",
    },
    {
      item: "22W Board Ceiling Light",
      company: "Any Brand Company",
      specification: "Warm White Square",
      qty: "As per Layout",
      work: "",
    },
    {
      item: "15W Shop Ceiling Light",
      company: "Any Brand Company",
      specification: "Warm White Square (Service Area)",
      qty: "As per Layout",
      work: "",
    },
    {
      item: "15W Shop Ceiling Light",
      company: "Any Brand Company",
      specification: "Full White Square (Kitchen Area)",
      qty: "As per Layout",
      work: "",
    },
    {
      item: "10W",
      company: "Any Brand Company",
      specification: "Warm White Round",
      qty: "As per Layout",
      work: "",
    },
  ];

  const config = {
    en: {
      title1: "Electrical Work Switch + Socket",
      title2: "Electrical Work Wire",
      title3: "Electrical Material",
      table1Headers: ["Item", "Company", "Specification", "Qty", "Work"],
      table2Headers: ["Item", "Company", "Specification", "Qty", "Work"],
      table3Headers: ["Item", "Company", "Specification", "Qty", "Work"],
      backButton: "Back",
      nextButton: "Next",
      submitButton: "Submit",
      question: "Do you understand the above work information?",
      yesLabel: "Yes",
      noLabel: "No",
    },
    mr: {
      title1: "इलेक्ट्रिकल वर्क स्विच + सॉकेट",
      title2: "इलेक्ट्रिकल वर्क वायर",
      title3: "इलेक्ट्रिकल मटेरियल",
      table1Headers: ["आयटम", "कंपनी", "स्पेसिफिकेशन", "प्रमाण", "काम"],
      table2Headers: ["आयटम", "कंपनी", "स्पेसिफिकेशन", "प्रमाण", "काम"],
      table3Headers: ["आयटम", "कंपनी", "स्पेसिफिकेशन", "प्रमाण", "काम"],
      backButton: "मागे",
      nextButton: "पुढे",
      submitButton: "सबमिट",
      question: "तुम्हाला वरील कामाची माहिती समजली आहे का?",
      yesLabel: "होय",
      noLabel: "नाही",
    },
  };

  const ElectricianFormQuestion = {
    table1Data,
    table2Data,
    table3Data,
    config
  };
  export default ElectricianFormQuestion;