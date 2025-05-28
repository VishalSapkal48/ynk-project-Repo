import React, { useEffect, useState } from "react";
import questions from "../data/questions";
import QuestionRenderer from "../components/QuestionRenderer";
import logo from "../assets/logo.png";
import SummaryCard from "./SummaryCard";

export default function MultilingualForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState("mr");
  const [answers, setAnswers] = useState({});
  const [followupValue, setFollowupValue] = useState("");
  const [data, setData]=useState();
  const [uploadedFiles, setUploadedFiles] = useState({}); // State to track uploaded files

  const currentQ = questions[currentIndex];
  const selectedAnswer = answers[currentQ.id];

  // useEffect(() => {
  //   if (followupValue) {
  //     setData(prev => [...prev, followupValue]);
  //   }
  // }, [followupValue]);
  
  // Handle normal text answer
  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  // Handle file uploads for image components
  const handleImageUpload = (files, componentType) => {
    // Convert FileList to an array
    const fileArray = Array.from(files);

    // Update state with the uploaded files per component type
    setUploadedFiles((prevFiles) => ({
      ...prevFiles,
      [componentType]: fileArray,
    }));

    console.log(uploadedFiles); // Log the updated uploaded files (for debugging)
  };

  // Handle next button click
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Form submitted:\n" + JSON.stringify({ ...answers, followupValue }, null, 2));
    }
    setFollowupValue("");
  };

  // Handle back button click
  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFollowupValue("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SummaryCard language="en" />

      <div className="w-full max-w-lg bg-[#e3f2fd] p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="bg-white flex justify-between items-center mb-4 px-3 py-2 rounded">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">YNK</h1>
          </div>
          <button
            onClick={() => setLang(lang === "mr" ? "en" : "mr")}
            className="text-sm text-gray-600 underline"
          >
            {lang === "mr" ? "English" : "मराठी"}
          </button>
        </div>

        <h2 className="text-lg text-center font-bold mb-4">
          {lang === "mr" ? "फॉर्म माहिती" : "Form Information"}
        </h2>

        {/* Question Renderer */}
        <QuestionRenderer
          lang={lang}
          question={currentQ}
          selectedAnswer={selectedAnswer}
          followupValue={followupValue}
          setFollowupValue={setFollowupValue}
          handleAnswer={handleAnswer}
          handleImageUpload={handleImageUpload} // Pass the image upload handler
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goBack}
            className="text-gray-500 underline"
            disabled={currentIndex === 0}
          >
            {lang === "mr" ? "मागे" : "Back"}
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {lang === "mr" ? "पुढे" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
