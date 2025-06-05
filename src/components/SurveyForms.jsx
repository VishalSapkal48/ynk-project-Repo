import { useState } from "react";
import logo from "../assets/logo.png";
import boardImg from "../assets/board.jpg";
import shutterSizeImg from "../assets/shutter_size.jpg";
import rSideWallImg from "../assets/Right_wall_side.jpg";
import bSideWallImg from "../assets/B_wall_side.jpg";

const formConfig = {
  id: "form_information",
  title_mr: "फॉर्म माहिती",
  title_en: "Form Information",
  fields: [
    {
      id: "measurement_tape_info",
      question_mr: "सर तुम्हाला मेजरमेंट टेप बद्दल माहिती आहे का?",
      question_en: "Sir, do you have information about the measurement tape?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "yes", label_mr: "आहे", label_en: "Yes" },
        {
          value: "yes_take_to_shop",
          label_mr: "आहे, त्यांना शॉप वर घेऊन या",
          label_en: "Yes, take them to the shop",
        },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "measurement_tape_available",
      question_mr: "सर आपल्याकडे मेजरमेंट टेप आहे का?",
      question_en: "Sir, do you have a measurement tape?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "yes", label_mr: "आहे", label_en: "Yes" },
        {
          value: "no_get_from_hardware",
          label_mr: "नाही, हार्डवेअर मधून घेऊन या",
          label_en: "No, get it from hardware",
        },
      ],
    },
    {
      id: "google_location",
      question_mr: "सर मला Google चेकर ट लोके शन पाठवा",
      question_en: "Sir, please send me the Google location",
      type: "text",
      placeholder_mr: "Google लोकेशन लिंक",
      placeholder_en: "Google location link",
    },
    {
      id: "shop_photos",
      question_mr: "सर पूर्ण शॉप चे वेगवेगळ्या अँगल ने फोटो पाठवा",
      question_en: "Sir, please send photos of the shop from different angles",
      type: "yesno_with_media",
      hasReason: true,
      subFields: [
        { id: "board", label_mr: "बोर्ड", label_en: "Board", imgSrc: boardImg },
        {
          id: "shutter_size",
          label_mr: "शटर साईझ",
          label_en: "Shutter size",
          imgSrc: shutterSizeImg,
        },
        {
          id: "r_side_wall",
          label_mr: "R – साईड वॉल",
          label_en: "R – Side wall",
          imgSrc: rSideWallImg,
        },
        {
          id: "b_side_wall",
          label_mr: "B – साईड वॉल",
          label_en: "B – Side wall",
          imgSrc: bSideWallImg,
        },
      ],
    },
    {
      id: "parking_facility",
      question_mr: "पार्किंगची सोय आहे का?",
      question_en: "Is there a parking facility?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "yes_two_wheeler",
          label_mr: "टू व्हीलर",
          label_en: "Two-wheeler",
        },
        {
          value: "yes_four_wheeler",
          label_mr: "फोर व्हीलर",
          label_en: "Four-wheeler",
        },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "material_space",
      question_mr: "मटेरियल टाकण्यासाठी जागा आहे का?",
      question_en: "Is there space for unloading material?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "water_connection",
      question_mr: "पाणी कनेक्शन आहे का?",
      question_en: "Is there a water connection?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "corporation",
          label_mr: "कॉर्पोरेशन",
          label_en: "Corporation",
        },
        { value: "borewell", label_mr: "बोरवेल", label_en: "Borewell" },
        { value: "society", label_mr: "सोसायटी", label_en: "Society" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "water_availability",
      question_mr: "पाणी कधी उपलब्ध असते?",
      question_en: "When is water available?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "24_hours", label_mr: "२४ तास", label_en: "24 hours" },
        {
          value: "morning_2_hours",
          label_mr: "सकाळी २ तास",
          label_en: "Morning 2 hours",
        },
        {
          value: "morning_evening_2_hours",
          label_mr: "सकाळी आणि सायंकाळी २, २ तास",
          label_en: "Morning and evening 2 hours each",
        },
        {
          value: "alternate_day",
          label_mr: "एक दिवस आड",
          label_en: "Alternate day",
        },
        {
          value: "every_third_day",
          label_mr: "तीन दिवस आड",
          label_en: "Every third day",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
      ],
    },
    {
      id: "material_unloading_provision",
      question_mr: "मटेरियल अनलोडिंगसाठी इतर कोणती सोय आहे?",
      question_en: "Any other place for unloading of material?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "shop_owner", label_mr: "शॉप ओनर", label_en: "Shop owner" },
        {
          value: "franchise_owner",
          label_mr: "फ्रँचायझी ओनर",
          label_en: "Franchise owner",
        },
        { value: "other", label_mr: "इतर", label_en: "Any other provision" },
      ],
    },
    {
      id: "water_tank_arrangement",
      question_mr: "पाण्याची टाकी व्यवस्था कोण करेल?",
      question_en: "Who will arrange the water tank?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "1000ltr", label_mr: "१००० लिटर", label_en: "1000 ltr" },
        { value: "2000ltr", label_mr: "२००० लिटर", label_en: "2000 ltr" },
        { value: "other", label_mr: "इतर", label_en: "Any other provision" },
      ],
    },
    {
      id: "light_meter_connection",
      question_mr: "लाईट मीटर कनेक्शन आहे का?",
      question_en: "Is there a light meter connection?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "single_phase",
          label_mr: "सिंगल फेज",
          label_en: "Single phase",
        },
        { value: "three_phase", label_mr: "थ्री फेज", label_en: "Three phase" },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "light_meter_location",
      question_mr: "लाईट मीटर कोठे आहे?",
      question_en: "Where is the light meter located?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "inside_shop",
          label_mr: "शॉप मध्ये",
          label_en: "Inside shop",
        },
        {
          value: "outside_shop",
          label_mr: "शॉप च्या बाहेर",
          label_en: "Outside shop",
        },
        {
          value: "in_parking",
          label_mr: "पार्किंग मध्ये",
          label_en: "In parking",
        },
        {
          value: "behind_shop",
          label_mr: "शॉप च्या पाठीमागे",
          label_en: "Behind shop",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
      ],
    },
    {
      id: "earthing",
      question_mr: "शॉप मध्ये अर्थिंग आहे का?",
      question_en: "Is there earthing in the shop?",
      type: "yesno_with_media",
      hasReason: true,
      subFields: [
        {
          id: "provider",
          label_mr: "कोण व्यवस्था करेल?",
          label_en: "Who will arrange that?",
          options: [
            {
              value: "shop_owner",
              label_mr: "शॉप ओनर",
              label_en: "Shop owner",
            },
            {
              value: "franchise_owner",
              label_mr: "फ्रँचायझी ओनर",
              label_en: "Franchise owner",
            },
            {
              value: "other",
              label_mr: "इतर",
              label_en: "Any other provision",
            },
          ],
        },
      ],
    },
    {
      id: "drainage_connection",
      question_mr: "ड्रेनेज कनेक्शन आहे का?",
      question_en: "Is there a drainage connection?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "drainage_chamber",
      question_mr: "ड्रेनेज चेंबर आहे का?",
      question_en: "Is there a drainage chamber?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "chamber_functional",
      question_mr: "चेंबर चालू आहे का?",
      question_en: "Is the chamber functional?",
      type: "yesno_with_media",
      hasReason: true,
      subFields: [
        {
          id: "provider",
          label_mr: "कोण व्यवस्था करेल?",
          label_en: "Who will provide that?",
          options: [
            {
              value: "shop_owner",
              label_mr: "शॉप ओनर",
              label_en: "Shop owner",
            },
            {
              value: "franchise_owner",
              label_mr: "फ्रँचायझी ओनर",
              label_en: "Franchise owner",
            },
            {
              value: "other",
              label_mr: "इतर",
              label_en: "Any other provision",
            },
          ],
        },
      ],
    },
    {
      id: "chamber_check",
      question_mr: "झाकण खोलून चेक करणे",
      question_en: "Check by opening the chamber lid",
      type: "yesno_with_media",
      hasReason: true,
      subFields: [
        {
          id: "maintenance",
          label_mr: "कोण चेक करेल आणि रुटीन मेंटेनन्स वेळ?",
          label_en: "Who will check and routine maintenance time?",
          options: [
            { value: "weekly", label_mr: "साप्ताहिक", label_en: "Weekly" },
            { value: "monthly", label_mr: "मासिक", label_en: "Monthly" },
            {
              value: "other",
              label_mr: "इतर",
              label_en: "Any other provision",
            },
          ],
        },
      ],
    },
    {
      id: "loft_available",
      question_mr: "पोटमाळा आहे का?",
      question_en: "Is there a loft?",
      type: "yesno_with_media",
      hasReason: true,
      hasChannelSize: true,
      subFields: [
        {
          id: "water_storage_plan",
          label_mr: "पाण्याचा साठवणूक प्लॅन काय आहे?",
          label_en: "What was the water storage plan?",
          type: "text",
        },
      ],
    },
    {
      id: "loft_required",
      question_mr: "पोटमाळा करायचा आहे का?",
      question_en: "Is a loft required?",
      type: "yesno_with_size",
      hasReason: true,
      hasChannelSize: true,
    },
    {
      id: "shutter_check",
      question_mr: "शॉप चे शटर चेक करणे?",
      question_en: "Check the shop shutter?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "servicing_needed",
          label_mr: "सर्व्हिसिंग करावी लागेल",
          label_en: "Servicing needed",
        },
        {
          value: "repairing_needed",
          label_mr: "रिपेअरिंग करावी लागेल",
          label_en: "Repairing needed",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "new_shutter", label_mr: "नवीन शटर", label_en: "New shutter" },
      ],
    },
    {
      id: "wall_plaster",
      question_mr: "भिंतीला प्लास्टर आहे का?",
      question_en: "Is there plaster on the wall?",
      type: "yesno_with_media",
      hasReason: true,
      options: [
        {
          value: "cement_plaster",
          label_mr: "सिमेंट प्लास्टर",
          label_en: "Cement plaster",
        },
        {
          value: "pop_plaster",
          label_mr: "POP प्लास्टर",
          label_en: "POP plaster",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "rolling_shed",
      question_mr: "रोलिंग शेड करायचे आहे का?",
      question_en: "Is a rolling shed required?",
      type: "yesno_with_media",
      hasReason: true,
      hasChannelSize: true,
      subFields: [
        {
          id: "provision",
          label_mr: "इतर कोणती सोय?",
          label_en: "Any other provision?",
          type: "text",
        },
      ],
    },
    {
      id: "water_tank",
      question_mr: "पाण्याची टाकी आहे का? किती लिटर आहे?",
      question_en: "Is there a water tank? How many liters?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "1000ltr", label_mr: "१००० लिटर", label_en: "1000 ltr" },
        { value: "2000ltr", label_mr: "२००० लिटर", label_en: "2000 ltr" },
        { value: "3000ltr", label_mr: "३००० लिटर", label_en: "3000 ltr" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "water_tank_motor",
      question_mr: "टाकीत पाणी चढवण्याची मोटर आहे का?",
      question_en: "Is there a motor for filling the water tank?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "0.5hp", label_mr: "०.५ एचपी", label_en: "0.5 HP" },
        { value: "1hp", label_mr: "१ एचपी", label_en: "1 HP" },
        { value: "2hp", label_mr: "२ एचपी", label_en: "2 HP" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "loft_access",
      question_mr: "पोटमाळ्याला जाण्याचा मार्ग आहे का?",
      question_en: "Is there a way to access the loft?",
      type: "yesno_with_media",
      hasReason: true,
      options: [
        {
          value: "staircase",
          label_mr: "दुसरी जिना",
          label_en: "Another staircase",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "neighbor_permission",
      question_mr: "काम करताना शेजारील दुकानदाराची परवानगी आहे का?",
      question_en: "Is there permission from neighboring shopkeepers for work?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "yes", label_mr: "आहे", label_en: "Yes" },
        { value: "no", label_mr: "नाही", label_en: "No" },
        {
          value: "permission_to_be_taken",
          label_mr: "परवानगी घेऊन देणार",
          label_en: "Permission to be taken",
        },
        {
          value: "till_6pm",
          label_mr: "सायंकाळी सहा वाजेपर्यंत आहे",
          label_en: "Till 6 PM",
        },
        {
          value: "after_12pm",
          label_mr: "दुपारी बारा नंतर आहे",
          label_en: "After 12 PM",
        },
      ],
    },
    {
      id: "toilet_bathroom",
      question_mr:
        "शॉप मध्ये टॉयलेट/बाथरूम आहे का? त्याचे काही काम करायचे आहे का?",
      question_en: "Is there a toilet/bathroom in the shop? Any work needed?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "water_leakage",
          label_mr: "पाण्याची गळती",
          label_en: "Water leakage",
        },
        {
          value: "floor_tile_damage",
          label_mr: "फ्लोअर टाइल डॅमेज",
          label_en: "Floor tile damage",
        },
        {
          value: "wash_basin_damage",
          label_mr: "वॉश बेसिन डॅमेज",
          label_en: "Wash basin damage",
        },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "demolition_work",
      question_mr: "शॉप मध्ये काही तोडफोड चे काम आहे का?",
      question_en: "Is there any demolition work in the shop?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "flooring_break",
          label_mr: "फ्लोअरिंग तोडणे",
          label_en: "Breaking flooring",
        },
        {
          value: "wall_grinding",
          label_mr: "भिंत घासणे",
          label_en: "Wall grinding",
        },
        {
          value: "wall_break",
          label_mr: "भिंत तोडणे",
          label_en: "Breaking wall",
        },
        {
          value: "remove_old_tank",
          label_mr: "जुनी पाण्याची टाकी काढणे",
          label_en: "Remove old water tank",
        },
        {
          value: "remove_old_board",
          label_mr: "जुना बोर्ड काढणे",
          label_en: "Remove old board",
        },
        {
          value: "remove_old_pop",
          label_mr: "जुनी POP काढणे",
          label_en: "Remove old POP",
        },
        {
          value: "remove_rubble",
          label_mr: "रॅबिट उचलणे",
          label_en: "Remove rubble",
        },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "civil_work",
      question_mr: "शॉप मध्ये काही सिव्हिल बांधकाम चे काम आहे का?",
      question_en: "Is there any civil construction work in the shop?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "internet_connection",
      question_mr: "इंटरनेट कनेक्शन आहे का?",
      question_en: "Is there an internet connection?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "new_connection",
          label_mr: "नवीन कनेक्शन घेणे",
          label_en: "Taking a new one",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "electrical_work",
      question_mr: "इलेक्ट्रिकल चे काम किती आहे?",
      question_en: "How much electrical work is there?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "exhaust_point",
      question_mr: "एक्झॉस्ट पॉइंट आहे का?",
      question_en: "Is there an exhaust point?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "new_connection",
          label_mr: "नवीन घेणे",
          label_en: "Taking a new one",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "chimney",
      question_mr: "चिमणी करायची आहे का?",
      question_en: "Is a chimney required?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        {
          value: "new_connection",
          label_mr: "नवीन घेणे",
          label_en: "Taking a new one",
        },
        { value: "other", label_mr: "इतर", label_en: "Other" },
        { value: "no", label_mr: "नाही", label_en: "No" },
      ],
    },
    {
      id: "stage_space",
      question_mr: "स्टेज टाकण्यासाठी जागा आहे का?",
      question_en: "Is there space for installing a stage?",
      type: "yesno_with_media",
      hasReason: true,
      subFields: [
        {
          id: "provision",
          label_mr: "इतर कोणती सोय?",
          label_en: "Any other provision?",
          type: "text",
        },
      ],
    },
    {
      id: "plumbing_work",
      question_mr: "प्लंबर चे काम किती आहे?",
      question_en: "How much plumbing work is there?",
      type: "yesno_with_media",
      hasReason: true,
    },
    {
      id: "battery_backup",
      question_mr: "बॅटरी बॅकअप आहे का?",
      question_en: "Is there a battery backup?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "yes", label_mr: "आहे", label_en: "Yes" },
        { value: "no", label_mr: "नाही", label_en: "No" },
        { value: "other", label_mr: "इतर", label_en: "Other" },
      ],
    },
    {
      id: "shop_entry_direction",
      question_mr: "शॉप ची एन्ट्री कोणत्या दिशेला आहे?",
      question_en: "Which direction is the shop's entry facing?",
      type: "yesno_with_info",
      hasReason: true,
      options: [
        { value: "east", label_mr: "पूर्व", label_en: "East" },
        { value: "west", label_mr: "पश्चिम", label_en: "West" },
        { value: "south", label_mr: "दक्षिण", label_en: "South" },
        { value: "north", label_mr: "उत्तर", label_en: "North" },
      ],
    },
  ],
  submit_button_mr: "पुढे",
  submit_button_en: "Next",
  back_button_mr: "मागे",
  back_button_en: "Back",
};

export default function InternalDepartmentWorking() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState("mr");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = formConfig.fields.length;

  const handleYesNoChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: { ...formData[id], answer: value },
    });
  };

  const handleInputChange = (id, field, value) => {
    setFormData({
      ...formData,
      [id]: {
        ...formData[id],
        [field]: value,
      },
    });
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "mr" ? "en" : "mr");
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Final submission:", formData);
      alert(
        language === "mr" ? "फॉर्म सबमिट झाला!" : "Form submitted successfully!"
      );
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderField = (field) => {
    const question = field[`question_${language}`] || field.question_mr;
    const id = field.id;

    return (
      <div className="mb-6">
        {/* Question Text */}
        <p className="text-gray-700 text-base mb-4 leading-relaxed">
          {question}
        </p>

        {/* Input Types */}
        {field.type === "text" ? (
          <textarea
            placeholder={
              field[`placeholder_${language}`] || field.placeholder_mr
            }
            className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            onChange={(e) => handleInputChange(id, "text", e.target.value)}
          />
        ) : (
          <>
            {/* Radio Button Options */}
            <div className="space-y-3 mb-4">
              {field.options ? (
                field.options.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name={id}
                      checked={formData[id]?.answer === option.value}
                      onChange={() => handleYesNoChange(id, option.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">
                      {option[`label_${language}`] || option.label_mr}
                    </span>
                  </label>
                ))
              ) : (
                <>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={id}
                      checked={formData[id]?.answer === true}
                      onChange={() => handleYesNoChange(id, "yes")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">
                      {language === "mr" ? "होय" : "Yes"}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={id}
                      checked={formData[id]?.answer === false}
                      onChange={() => handleYesNoChange(id, "no")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">
                      {language === "mr" ? "नाही" : "No"}
                    </span>
                  </label>
                </>
              )}
            </div>

            {/* Additional fields */}
            {(field.type === "yesno_with_media" ||
              field.type === "yesno_with_info" ||
              field.type === "yesno_with_size") && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                {field.hasChannelSize && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        {language === "mr" ? "चॅनल साईझ" : "Channel Size"}
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) =>
                          handleInputChange(id, "channelSize", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="1">1"</option>
                        <option value="1.5">1.5"</option>
                        <option value="2">2"</option>
                        <option value="3">3"</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        {language === "mr" ? "सपोर्ट साईझ" : "Support Size"}
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) =>
                          handleInputChange(id, "supportSize", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="2ft">2 ft</option>
                        <option value="2.5ft">2.5 ft</option>
                        <option value="3ft">3 ft</option>
                        <option value="3.5ft">3.5 ft</option>
                      </select>
                    </div>
                  </div>
                )}

                {field.subFields && (
                  <div className="space-y-4">
                    {field.subFields.map((subField) => (
                      <div key={subField.id}>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          {subField[`label_${language}`] || subField.label_mr}
                        </label>
                        {subField.imgSrc && (
                          <div className="mb-2">
                            <img
                              src={subField.imgSrc}
                              alt={
                                subField[`label_${language}`] ||
                                subField.label_mr
                              }
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        {subField.type === "text" ? (
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            onChange={(e) =>
                              handleInputChange(id, subField.id, e.target.value)
                            }
                          />
                        ) : (
                          <select
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) =>
                              handleInputChange(id, subField.id, e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            {subField.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option[`label_${language}`] || option.label_mr}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {field.type === "yesno_with_media" && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      {language === "mr"
                        ? "नवीन फोटो किंवा व्हिडिओ अपलोड करा"
                        : "Upload new photo or video"}
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) =>
                        handleInputChange(id, "media", e.target.files[0])
                      }
                    />
                  </div>
                )}

                {field.hasReason && (
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
                      onChange={(e) =>
                        handleInputChange(id, "reason", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const currentField = formConfig.fields[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Form Container */}
        <div className="bg-blue-100 rounded-lg p-6 shadow-md">
          {/* Header */}
          <div className="bg-white rounded-lg flex justify-between items-center mb-6 px-4 py-3">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img
                  src={logo}
                  alt="YNK Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-800">YNK</h1>
            </div>
            <button
              onClick={handleLanguageToggle}
              className="text-sm text-gray-600 underline hover:text-blue-600"
            >
              {language === "mr" ? "English" : "मराठी"}
            </button>
          </div>

          {/* Title */}
          <h2 className="text-center text-lg font-semibold mb-6 text-gray-800">
            {formConfig[`title_${language}`]}
          </h2>

          {/* Current Question */}
          <div className="mb-6">{renderField(currentField)}</div>

          {/* Navigation */}
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
    </div>
  );
}
