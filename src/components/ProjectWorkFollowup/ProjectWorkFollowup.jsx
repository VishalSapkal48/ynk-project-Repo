import { useState } from "react";
import logo from "../../assets/logo.png"; // Assuming you have this logo file
import ProjectWorkFollowupQuestion from "./ProjectWorkFollowupQuestion";
const {
  formConfig
}= ProjectWorkFollowupQuestion;

const validationMessages = {
  en: {
    answerRequired: "Please provide an answer to the question.",
    followupRequired: "Please provide a value for the follow-up question.",
    imageRequired: "Please upload at least one image or video.",
    checkboxRequired: "Please select at least one option.",
    inputRequired: "Please specify details for 'Other'.",
    submitError: "Failed to submit the form. Please try again.",
    submitSuccess: "Form submitted successfully!",
    invalidDateFormat: "Please enter a valid date (YYYY-MM-DD)",
    invalidDate: "Please enter a valid date",
    pastDate: "Date cannot be in the past",
  },
  mr: {
    answerRequired: "कृपया प्रश्नाचे उत्तर द्या.",
    followupRequired: "कृपया फॉलो-अप प्रश्नासाठी मूल्य प्रदान करा.",
    imageRequired: "कृपया किमान एक प्रतिमा किंवा व्हिडिओ अपलोड करा.",
    checkboxRequired: "कृपया किमान एक पर्याय निवडा.",
    inputRequired: "कृपया 'इतर' साठी तपशील निर्दिष्ट करा.",
    submitError: "फॉर्म सबमिट करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    submitSuccess: "फॉर्म यशस्वीपणे सबमिट झाला!",
    invalidDateFormat: "कृपया वैध तारीख प्रविष्ट करा (YYYY-MM-DD)",
    invalidDate: "कृपया वैध तारीख प्रविष्ट करा",
    pastDate: "तारीख भूतकाळातील असू शकत नाही",
  },
};

export default function ProjectWorkFollowup() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState("mr");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = formConfig.fields.length;

  const handleYesNoChange = (id, value, parentId = null) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      if (parentId) {
        newFormData[parentId] = {
          ...newFormData[parentId],
          subQuestions: {
            ...newFormData[parentId]?.subQuestions,
            [id]: {
              ...newFormData[parentId]?.subQuestions?.[id],
              answer: value === "yes" ? true : false,
              reason:
                value === "no"
                  ? undefined
                  : newFormData[parentId]?.subQuestions?.[id]?.reason,
              media:
                value === "yes" &&
                formConfig.fields
                  .find((f) => f.id === parentId)
                  ?.subQuestions?.find((sq) => sq.id === id)?.type ===
                  "yesno_with_media"
                  ? newFormData[parentId]?.subQuestions?.[id]?.media
                  : undefined,
            },
          },
        };
      } else {
        newFormData[id] = {
          ...newFormData[id],
          answer: value === "yes" ? true : false,
          reason: value === "no" ? undefined : newFormData[id]?.reason,
          media:
            value === "yes" &&
            formConfig.fields.find((f) => f.id === id)?.type ===
              "yesno_with_media"
              ? newFormData[id]?.media
              : undefined,
        };
      }
      return newFormData;
    });
  };

  const handleInputChange = (id, field, value, parentId = null) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      if (parentId) {
        newFormData[parentId] = {
          ...newFormData[parentId],
          subQuestions: {
            ...newFormData[parentId]?.subQuestions,
            [id]: {
              ...newFormData[parentId]?.subQuestions?.[id],
              [field]: value,
            },
          },
        };
      } else {
        newFormData[id] = {
          ...newFormData[id],
          [field]: value,
        };
      }
      return newFormData;
    });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "mr" ? "en" : "mr");
  };

  const validateField = (field, fieldData, parentId = null) => {
    const errorMessages = [];
    const isYesSelected = fieldData?.answer === true;

    if (fieldData?.answer === undefined) {
      errorMessages.push(validationMessages[language].answerRequired);
    }

    if (fieldData?.answer === false && field.hasReason) {
      if (!fieldData?.reason || fieldData.reason.trim() === "") {
        errorMessages.push(validationMessages[language].inputRequired);
      }
    }

    if (isYesSelected) {
      if (field.type === "yesno_with_media" && !fieldData?.media) {
        errorMessages.push(validationMessages[language].imageRequired);
      }

      if (field.hasChannelSize) {
        if (!fieldData?.channelSize) {
          errorMessages.push(validationMessages[language].followupRequired);
        }
        if (!fieldData?.supportSize) {
          errorMessages.push(validationMessages[language].followupRequired);
        }
      }

      if (field.hasSpecialInfo) {
        if (!fieldData?.specialInfo || fieldData.specialInfo.trim() === "") {
          errorMessages.push(validationMessages[language].inputRequired);
        }
        if (!fieldData?.shopVideo || fieldData.shopVideo.trim() === "") {
          errorMessages.push(validationMessages[language].inputRequired);
        }
        if (!fieldData?.infoBoard || fieldData.infoBoard.trim() === "") {
          errorMessages.push(validationMessages[language].inputRequired);
        }
      }
    }

    if (field.subQuestions && fieldData?.answer === true) {
      field.subQuestions.forEach((subQ) => {
        const subFieldData = fieldData?.subQuestions?.[subQ.id];
        const subErrorMessages = validateField(subQ, subFieldData);
        errorMessages.push(...subErrorMessages);
      });
    }

    return errorMessages;
  };

  const handleNext = () => {
    const currentField = formConfig.fields[currentQuestionIndex];
    const currentFieldData = formData[currentField.id];
    const errorMessages = validateField(currentField, currentFieldData);

    if (errorMessages.length > 0) {
      window.alert(errorMessages.join("\n"));
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        console.log("Final submission:", formData);
        window.alert(validationMessages[language].submitSuccess);
      } catch (error) {
        window.alert(validationMessages[language].submitError);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderField = (field, parentId = null) => {
    const question = field[`question_${language}`] || field.question_mr;
    const id = field.id;
    const currentFieldData = parentId
      ? formData[parentId]?.subQuestions?.[id]
      : formData[id];
    const isYesSelected = currentFieldData?.answer === true;

    return (
      <div className="">
        <p className="text-gray-700 text-base mb-4 leading-relaxed">
          {question}
        </p>

        <div className="space-y-3 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name={parentId ? `${parentId}-${id}` : id}
              checked={currentFieldData?.answer === true}
              onChange={() => handleYesNoChange(id, "yes", parentId)}
              className="w-4 h-4  focus:ring-gray-400  accent-gray-500"
            />
            <span className="ml-3 text-gray-700">
              {language === "mr" ? "होय" : "Yes"}
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name={parentId ? `${parentId}-${id}` : id}
              checked={currentFieldData?.answer === false}
              onChange={() => handleYesNoChange(id, "no", parentId)}
              className="w-4 h-4  accent-gray-500"
            />
            <span className="ml-3 text-gray-700">
              {language === "mr" ? "नाही" : "No"}
            </span>
          </label>
        </div>

        {(isYesSelected || currentFieldData?.answer === false) && (
          <div className="space-y-4 bg-blue-50 p-4 rounded-lg mt-4">
            {isYesSelected && field.hasChannelSize && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {language === "mr" ? "चॅनल साईझ" : "Channel Size"}
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    value={currentFieldData?.channelSize || ""}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        "channelSize",
                        e.target.value,
                        parentId
                      )
                    }
                  >
                    <option value="">
                      {language === "mr" ? "निवडा" : "Select"}
                    </option>
                    {(field.channelSizes || []).map((size, index) => (
                      <option key={index} value={size}>
                        {size}"
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {language === "mr" ? "सपोर्ट साईझ" : "Support Size"}
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    value={currentFieldData?.supportSize || ""}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        "supportSize",
                        e.target.value,
                        parentId
                      )
                    }
                  >
                    <option value="">
                      {language === "mr" ? "निवडा" : "Select"}
                    </option>
                    {(field.supportSizes || []).map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {isYesSelected && field.hasSpecialInfo && (
              <div className="space-y-3">
                <div>
                  <textarea
                    placeholder={
                      language === "mr"
                        ? "CCTV, सिरीयल नं. आणि पासवर्ड"
                        : "CCTV, Serial No. and Password"
                    }
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    value={currentFieldData?.specialInfo || ""}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        "specialInfo",
                        e.target.value,
                        parentId
                      )
                    }
                  />
                </div>
                <div>
                  <textarea
                    placeholder={
                      language === "mr"
                        ? "पूर्ण शॉप चा विडिओ"
                        : "Complete shop video"
                    }
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    value={currentFieldData?.shopVideo || ""}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        "shopVideo",
                        e.target.value,
                        parentId
                      )
                    }
                  />
                </div>
                <div>
                  <textarea
                    placeholder={
                      language === "mr"
                        ? "पूर्ण शॉप मध्ये माहिती बोर्ड लावले का?"
                        : "Information board installed in complete shop?"
                    }
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    value={currentFieldData?.infoBoard || ""}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        "infoBoard",
                        e.target.value,
                        parentId
                      )
                    }
                  />
                </div>
              </div>
            )}

            {isYesSelected && field.type === "yesno_with_media" && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {language === "mr" ? "फोटो किंवा व्हिडिओ" : "Photo or Video"}
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    handleInputChange(id, "media", e.target.files[0], parentId)
                  }
                />
              </div>
            )}

            {(isYesSelected || currentFieldData?.answer === false) &&
              field.hasReason && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {language === "mr" ? "कारण" : "Reason"}
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder={
                      language === "mr" ? "कारण लिहा..." : "Write reason..."
                    }
                    value={currentFieldData?.reason || ""}
                    onChange={(e) =>
                      handleInputChange(id, "reason", e.target.value, parentId)
                    }
                  />
                </div>
              )}

            {isYesSelected && field.subQuestions && (
              <div className="ml-4 border-l-2 border-gray-200 pl-4 mt-4">
                {field.subQuestions.map((subQ) => (
                  <div key={subQ.id} className="mb-4">
                    {renderField(subQ, id)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const currentField = formConfig.fields[currentQuestionIndex];

  return (
     <div className="min-h-screen flex items-center justify-center p-4">
       <div className="w-full max-w-lg bg-[#e3f2fd] p-6 rounded-xl shadow-md">
         {/* Header */}
             <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
                   <div className="flex items-center space-x-3">
                     <img src={logo} alt="YNK Logo" className="h-10 w-10" />
                     <h1 className="text-xl font-bold">YNK</h1>
                   </div>
                   <button
                     onClick={handleLanguageToggle}
                     className="text-sm text-gray-600 underline hover:text-blue-600"
                   >
                     {language === 'mr' ? 'English' : 'मराठी'}
                   </button>
                 </div>

        <h2 className="text-center text-lg font-semibold mb-6 text-gray-800">
          {formConfig[`title_${language}`]}
        </h2>

        <div className="mb-6">{renderField(currentField)}</div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-blue-600 underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentQuestionIndex === 0}
          >
            {language === "mr" ? "मागे" : "Back"}
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {currentQuestionIndex < totalQuestions - 1
              ? language === "mr"
                ? "पुढे"
                : "Next"
              : language === "mr"
              ? "सबमिट करा"
              : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}