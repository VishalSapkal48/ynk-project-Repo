  // Data for the three forms (unchanged)
  const formData = {
    popWork: [
      {
        no: 1,
        particulars_en: "POP Work",
        particulars_mr: "पीओपी वर्क",
        company_en: "Chamunda",
        company_mr: "चामुंडा",
        specification: "1x10 feet White Colour-065",
        qty: 1,
        work_en: "As per Shop",
        work_mr: "दुकानानुसार",
      },
      {
        no: 2,
        particulars_en: "POP Work",
        particulars_mr: "पीओपी वर्क",
        company_en: "Gypsum Sheet",
        company_mr: "जिप्सम शीट",
        specification: "4x8 sheet",
        qty: 1,
        work_en: "As per Shop",
        work_mr: "दुकानानुसार",
      },
    ],
    tilesWork: [
      {
        no: 1,
        particulars_en: "Flooring Tiles Work",
        particulars_mr: "फ्लोअरिंग टाइल्स वर्क",
        company_en: "ANY LOCAL BRAND COMPANY",
        company_mr: "कोणतीही स्थानिक ब्रँड कंपनी",
        specification: "FAST QUALITY 2x2 feet size nano tiles Cream colour",
        qty: 1,
        work_en: " ",
        work_mr: " ",
      },
      {
        no: 2,
        particulars_en: "Wall Tiles",
        particulars_mr: "वॉल टाइल्स",
        company_en: "ANY LOCAL BRAND COMPANY",
        company_mr: "कोणतीही स्थानिक ब्रँड कंपनी",
        specification: "FAST QUALITY 2x1 feet size Milk White colour",
        qty: " ",
        work_en: " ",
        work_mr: " ",
      },
      {
        no: 3,
        particulars_en: "Granite Patti",
        particulars_mr: "ग्रॅनाइट पट्टी",
        company_en: "BLACK TELEPHONE",
        company_mr: "ब्लॅक टेलिफोन",
        specification: "BLACK TELEPHONE",
        qty: "",
        work_en: " ",
        work_mr: " ",
      },
    ],
    gasPiping: [
      {
        no: 1,
        particulars_en: "Gas Piping",
        particulars_mr: "गॅस पाइपिंग",
        company_en: "Jindal",
        company_mr: "जिंदाल",
        specification:
          "2 Inlet Wall, 20ft Outlet Wall, NRV WALL YELLOW PAINT WORK",
        qty: 1,
        work_en: "As per Shop",
        work_mr: "दुकानानुसार",
      },
    ],
  };

  const config = {
    en: {
      title: "Work Checklist",
      subtitles: {
        popWork: "POP Work Information",
        tilesWork: "Tiles Work Information",
        gasPiping: "Gas Piping Information",
      },
      sectionTitles: {
        popWork: "POP WORK",
        tilesWork: "TILES WORK",
        gasPiping: "GAS PIPING",
      },
      tableHeaders: ["No", "Item", "Company", "Specification", "Qty", "Work"],
      question: "Do you understand the above work information?",
      yes: "Yes",
      no: "No",
      back: "Back",
      next: "Next",
      submit: "Submit",
    },
    mr: {
      title: "वर्क तपासणी यादि",
      subtitles: {
        popWork: "पीओपी वर्क माहिती",
        tilesWork: "टाइल्स वर्क माहिती",
        gasPiping: "गॅस पाइपिंग माहिती",
      },
      sectionTitles: {
        popWork: "पीओपी वर्क",
        tilesWork: "टाइल्स वर्क",
        gasPiping: "गॅस पाइपिंग",
      },
      tableHeaders: [
        "अनु. क्र.",
        "आयटम",
        "कंपनी",
        "विशिष्टता",
        "प्रमाण",
        "काम",
      ],
      question: "तुम्हाला वरील कामाची माहिती समजली का?",
      yes: "होय",
      no: "नाही",
      back: "मागे",
      next: "पुढे",
      submit: "सबमिट",
    },
  };

  const  PopTIlesQuestion = {
    formData,
    config
  }
  export default PopTIlesQuestion;
