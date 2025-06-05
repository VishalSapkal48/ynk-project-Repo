import { useState } from "react";
import logo from "../assets/logo.png"; // Assuming you have this logo file

const formConfig = {
  id: "form_information",
  title_mr: "फॉर्म माहिती",
  title_en: "Form Information",
  fields: [
    {
      id: "material_demolition",
      question_mr: "शॉपमधील आवश्यक मटेरियल ची तोडफोड केली आहे का?",
      question_en: "Has the necessary material demolition been done in the shop?",
      type: "yesno_with_media",
      hasReason: true,
      subQuestions: [
        {
          id: "demolition_flooring",
          question_mr: "फ्लोरीगं तोडणे",
          question_en: "Flooring demolition",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "demolition_wall_chiseling",
          question_mr: "भिंत घासणे",
          question_en: "Wall chiseling",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "demolition_wall_demolition",
          question_mr: "भिंत तोडणे",
          question_en: "Wall demolition",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "demolition_old_water_tank",
          question_mr: "जुनी पाण्याची टाकी काढणे",
          question_en: "Removal of old water tank",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "demolition_old_board",
          question_mr: "जुना बोर्ड काढणे",
          question_en: "Removal of old board",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "demolition_old_pop",
          question_mr: "जुनी POP काढणे",
          question_en: "Removal of old POP",
          type: "yesno_with_media",
          hasReason: true,
        },
      ],
    },
    {
      id: "garbage_removal",
      question_mr: "शॉपमधील कचरा फेकून दिला का?",
      question_en: "Has the garbage in the shop been removed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "shutter_servicing",
      question_mr: "शटर सर्व्हिसिंग केली आहे का?",
      question_en: "Has the shutter servicing been done?",
      type: "yesno_with_media",
      hasReason: true,
      subQuestions: [
        {
          id: "shutter_serviced",
          question_mr: "सर्व्हिसिंग केले",
          question_en: "Servicing done",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "shutter_greased",
          question_mr: "ग्रीसिंग केले",
          question_en: "Greasing done",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "shutter_replaced",
          question_mr: "पूर्ण शटर बदलले",
          question_en: "Entire shutter replaced",
          type: "yesno_with_media",
          hasReason: true,
        },
        {
          id: "shutter_repaired",
          question_mr: "पूर्ण शटर दुरुस्त केले",
          question_en: "Entire shutter repaired",
          type: "yesno_with_media",
          hasReason: true,
        },
      ],
    },
    {
      id: "water_tank_loft",
      question_mr: "आवश्यक असणाऱ्या पाण्याच्या टाकी साठी पोटमाळा केला आहे का?",
      question_en: "Has a loft been made for the water tank?",
      type: "yesno_with_media",
      hasReason: true,
      hasChannelSize: true,
      channelSizes: ["1", "2", "3"],
      supportSizes: ["2ft", "2.5ft", "3ft", "3.5ft"],
    },
    {
      id: "pop_framing",
      question_mr: "पीओपी फ्रेमिंग केली आहे का?",
      question_en: "Has POP framing been done?",
      type: "yesno_with_media",
      hasReason: true,
      hasChannelSize: true,
      channelSizes: ["1", "1.5", "2"],
      supportSizes: ["2ft", "2.5ft", "3ft", "3.5ft"],
    },
    {
      id: "electrical_piping",
      question_mr: "इलेक्ट्रिकल वर्कसाठी भिंतीत झरी मारून पाईप टाकले आहेत का?",
      question_en: "Have pipes been installed through walls for electrical work?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "plumber_piping",
      question_mr: "प्लंबिंग वर्कसाठी भिंतीत झरी मारून पाईप टाकले आहेत का?",
      question_en: "Have pipes been installed through walls for plumbing work?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "tiles_material_ordered",
      question_mr: "टाईल्स चे काम करण्यासाठी आवश्यक मटेरियल मागवले आहे का?",
      question_en: "Has the necessary material for tiles work been ordered?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "urp_chemical_applied",
      question_mr: "यूआरपी केमिकल भिंतीवर मारले आहे का? टाइल्स लावण्यासाठी",
      question_en: "Has URP chemical been applied on walls for tiling?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "wall_tiles_ordered_as_theme",
      question_mr: "वॉल टाईल्स कंपनी च्या थीम प्रमाणे ऑर्डर दिले आहेत का?",
      question_en: "Have wall tiles been ordered according to the company's theme?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "wall_tiles_installed_as_theme",
      question_mr: "वॉल टाईल्स वॉल वर कंपनीच्या थीम प्रमाणे लावले आहे का?",
      question_en: "Have wall tiles been installed on the wall according to the company's theme?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "wall_tiles_installed_at_height",
      question_mr: "वॉल टाईल्स कंपनी थीम प्रमाणे हाईट वर लावले आहे का?",
      question_en: "Have wall tiles been installed at height as per company theme?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "wall_tiles_sound",
      question_mr: "वॉल टाईल्स मधून आवाज वगैरे येतो का?",
      question_en: "Is there any sound coming from wall tiles?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "wall_tiles_white_cement",
      question_mr: "वॉल टाईल्स मध्ये व्हाईट सिमेंट भरले आहे का?",
      question_en: "Has white cement been filled in wall tiles?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "floor_tiles_ordered_as_theme",
      question_mr: "फ्लोअर टाईल्स कंपनी च्या थीम प्रमाणे ऑर्डर दिले आहेत का?",
      question_en: "Have floor tiles been ordered according to the company's theme?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "floor_tiles_installed_as_theme",
      question_mr: "फ्लोअर टाईल्स वॉल वर कंपनीच्या थीम प्रमाणे लावले आहे का?",
      question_en: "Have floor tiles been installed on the wall according to the company's theme?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "floor_tiles_sound",
      question_mr: "फ्लोअर टाईल्स मधून आवाज वगैरे येतो का?",
      question_en: "Is there any sound coming from floor tiles?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "floor_tiles_white_cement",
      question_mr: "फ्लोअर टाईल्स मध्ये व्हाईट सिमेंट भरले आहे का?",
      question_en: "Has white cement been filled in floor tiles?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "floor_tiles_acid_wash",
      question_mr: "फ्लोअर टाईल्स ऍसिड वॉश केले आहेत का?",
      question_en: "Have floor tiles been acid washed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "granite_installed",
      question_mr: "ग्रेनाईट लावले आहे?",
      question_en: "Has granite been installed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "electrical_wiring_done",
      question_mr: "इलेक्ट्रिकल वर्कसाठी आवश्यक असणारे वायर टाकली आहेत का?",
      question_en: "Has necessary wiring for electrical work been installed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "pop_sheet_square_cut",
      question_mr: "पीओपी शीट लावून square गाळे कापले आहेत का?",
      question_en: "Have POP sheets been installed and square grooves cut?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "shop_ceiling_painted",
      question_mr: "शॉप सीलिंग पुट्टी व टचअप करून कलर केला आहे का?",
      question_en: "Has the shop ceiling been puttied, touched up, and painted?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "shop_shutter_painted",
      question_mr: "शॉप शटर ला कलर केला आहे का?",
      question_en: "Has the shop shutter been painted?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "store_room_painted",
      question_mr: "स्टोर रूम ला कलर केला आहे का?",
      question_en: "Has the store room been painted?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "shop_exterior_wall_painted",
      question_mr: "शॉप च्या बाहेरील वॉल ला कलर केला आहे का?",
      question_en: "Has the exterior wall of the shop been painted?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "board_material_ordered",
      question_mr: "बोर्डसाठी आवश्यक असणारे मटेरीअल चे ऑर्डर दिली आहे का?",
      question_en: "Has the necessary material for the board been ordered?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "ordered_material_as_theme",
      question_mr: "ऑर्डर दिलेले मटेरीअल कंपनी च्या थीम प्रमाणे आहे का?(कंपनी, कलर, कोड)",
      question_en: "Is the ordered material according to the company's theme? (Company, color, code)",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "board_shop_partition_ms_framing",
      question_mr: "बोर्ड आणि शॉप पार्टीशन साठी आवश्यक असणारे एमएस फ्रेमिंग बीले आहे का?",
      question_en: "Has the necessary MS framing been done for the board and shop partition?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "board_shop_partition_aluminum_framing",
      question_mr: "बोर्ड आणि शॉप पार्टीशन आवश्यक असणारे ऍल्युमिनियम फ्रेमिंग केले आहे का?",
      question_en: "Has the necessary aluminum framing been done for the board and shop partition?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "acp_sheet_work_done",
      question_mr: "ACP शीट चे काम झाले आहे का?",
      question_en: "Has the ACP sheet work been completed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "letter_work_done",
      question_mr: "लेटर चे काम पूर्ण झाले आहे का?",
      question_en: "Has the letter work been completed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "ss_material_received",
      question_mr: "SS मटेरियल शॉप मध्ये मागवले आहे का?",
      question_en: "Has SS material been ordered to the shop?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "furniture_as_per_plan",
      question_mr: "फर्निचर प्लॅन प्रमाणे लावले आहे का?",
      question_en: "Has furniture been installed according to the plan?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "electrical_fittings_done",
      question_mr: "इलेक्ट्रिक फिटिंग्ज चे काम पूर्ण केले आहे का?",
      question_en: "Has the electrical fittings work been completed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "plumbing_fittings_done",
      question_mr: "प्लंबिंग फिटिंग्ज चे काम पूर्ण केले आहे का?",
      question_en: "Has the plumbing fittings work been completed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "wifi_connection_installed",
      question_mr: "वायफाय कनेक्शन लावले आहे का?",
      question_en: "Has Wi-Fi connection been installed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "cctv_installed",
      question_mr: "सीसीटीव्ही कॅमेरे बसवले आहेत का?",
      question_en: "Have CCTV cameras been installed?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "noc_info_provided",
      question_mr: "NOC आवश्यक असणारी माहिती YNK ऑफिस मध्ये दिले आहे का?",
      question_en: "Has the necessary NOC information been provided to YNK office?",
      type: "yesno_with_media",
      hasReason: true,
      hasSpecialInfo: true,
    },
  ],
  submit_button_mr: "पुढे",
  submit_button_en: "Next",
  back_button_mr: "मागे",
  back_button_en: "Back",
};

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

export default function InternalDepartmentWorking() {
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
      <div className="mb-6 border p-4 rounded-lg bg-white">
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
              className="w-4 h-4 border-gray-300 focus:ring-gray-400 focus:border-gray-400 accent-gray-500"
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
              className="w-4 h-4 border-gray-300 focus:ring-gray-400 focus:border-gray-400 accent-gray-500"
            />
            <span className="ml-3 text-gray-700">
              {language === "mr" ? "नाही" : "No"}
            </span>
          </label>
        </div>

        {(isYesSelected || currentFieldData?.answer === false) && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg mt-4">
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
      <div className="w-full max-w-4xl bg-[#e3f2fd] p-6 rounded-xl border-blue-200">
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="YNK Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-grey-600 underline hover:text-blue-800"
          >
            {language === "mr" ? "English" : "मराठी"}
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