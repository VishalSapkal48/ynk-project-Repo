import React from 'react';

const summaryData = [
  {
    question: {
      en: "Do you want a mezzanine floor?",
      mr: "आपण मेझानाइन मजला हवा आहे का?",
    },
    answer: {
      en: "Yes",
      mr: "होय",
    },
    followUp: {
      area: {
        label: { en: "Area", mr: "क्षेत्रफळ" },
        value: { en: "200 m²", mr: "२०० चौ.मी." },
      },
      type: {
        label: { en: "Type", mr: "प्रकार" },
        value: { en: "Steel Deck", mr: "स्टील डेक" },
      },
    },
  },
  {
    question: {
      en: "Include a crane system?",
      mr: "क्रेन सिस्टम आवश्यक आहे का?",
    },
    answer: {
      en: "No",
      mr: "नाही",
    },
    followUp: null,
  },
  {
    question: {
      en: "Do you need partition walls?",
      mr: "आपल्याला विभाजक भिंती हव्या आहेत का?",
    },
    answer: {
      en: "Yes",
      mr: "होय",
    },
    followUp: {
      material: {
        label: { en: "Material", mr: "साहित्य" },
        value: { en: "Cement Board", mr: "सिमेंट बोर्ड" },
      },
      height: {
        label: { en: "Height", mr: "उंची" },
        value: { en: "3 m", mr: "३ मी." },
      },
    },
  },
  {
    question: {
      en: "Do you want roof insulation?",
      mr: "आपल्याला छपराचे इन्सुलेशन हवे आहे का?",
    },
    answer: {
      en: "No",
      mr: "नाही",
    },
    followUp: null,
  },
];


const SummaryCard = ({language = 'en' }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 mt-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {language === 'en' ? 'Summary' : 'सारांश'}
      </h2>

      <div className="space-y-3">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-3 rounded-xl border border-gray-100"
          >
            <p className="text-gray-700 font-medium">
              <strong>Q:</strong> {item.question[language]}
            </p>
            <p className="text-gray-600 pl-4">
              <strong>A:</strong> {item.answer[language]}
            </p>

            {item.answer.en === 'Yes' && item.followUp && (
              <div className="pl-4 mt-1 text-sm text-gray-500">
                {Object.values(item.followUp).map((field, i) => (
                  <p key={i}>
                    • {field.label[language]}: {field.value[language]}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
