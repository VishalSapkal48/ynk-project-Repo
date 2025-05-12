import React from "react";

// Radio Component
const RadioComponent = ({ lang, comp, setFollowupValue }) => (
  <div>
    <p>{lang === "mr" ? comp.question_mr : comp.question_en}</p>
    {comp.options.map((option, i) => (
      <div key={i}>
        <input
          type="radio"
          name={comp.question_mr || comp.question_en}
          value={option.value}
          onChange={(e) => setFollowupValue(e.target.value)}
        />
        <label>{lang === "mr" ? option.label_mr : option.label_en}</label>
      </div>
    ))}
  </div>
);

// Input Component
const InputComponent = ({ lang, comp, followupValue, setFollowupValue }) => (
  <div>
    <p>{lang === "mr" ? comp.question_mr : comp.question_en}</p>
    <input
      type="text"
      value={followupValue}
      onChange={(e) => setFollowupValue(e.target.value)}
    />
  </div>
);

// Image Upload Component for multiple images
const ImageUploadComponent = ({ lang, comp, handleImageUpload }) => (
  <div>
    <p>{lang === "mr" ? comp.message_mr : comp.message_en}</p>
    <div className="flex justify-between"> 
      {comp.image && (
        <img
          src={comp.image}
          alt="Question related visual"
          className="mb-4 w-36 h-auto rounded"
        />
      )}
      <input
        type="file"
        accept="image/*"
        multiple={comp.multiple}
        onChange={(e) => handleImageUpload(e.target.files, comp.type)}
      />
    </div>

  </div>
);

//Checkbox Component
const CheckboxComponent = ({ lang, comp, followupValue = [], setFollowupValue }) => {
  const handleChange = (value) => {
    if (followupValue.includes(value)) {
      // Remove if already selected
      setFollowupValue(followupValue.filter((item) => item !== value));
    } else {
      // Add if not selected
      setFollowupValue([...followupValue, value]);
    }
  };

  return (
    <div>
      <p>{lang === "mr" ? comp.question_mr : comp.question_en}</p>
      {comp.options.map((option, i) => (
        <div key={i}>
          <input
            type="checkbox"
            name={comp.question_mr || comp.question_en}
            value={option.value}
            checked={followupValue.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
          <label>{lang === "mr" ? option.label_mr : option.label_en}</label>
        </div>
      ))}
    </div>
  );
};


const QuestionRenderer = ({
  lang,
  question,
  selectedAnswer,
  followupValue,
  setFollowupValue,
  handleAnswer,
  handleImageUpload,
}) => {
  // Render follow-up based on selected answer
  const renderFollowup = (selectedAnswer) => {
    const followup = question.followup[selectedAnswer];

    if (followup.type === "imageupload") {
      return <ImageUploadComponent lang={lang} comp={followup} handleImageUpload={handleImageUpload} />;
    }

    if (followup.type === "guide") {
      return (
        <div className="my-2 p-2 bg-red-50 border border-red-300 rounded">
          <p>{lang === "mr" ? followup.message_mr : followup.message_en}</p>
        </div>
      );
    }

    if (followup.type === "radio") {
      return renderRadio(followup);
    }

    if (followup.type === "multi") {
      return renderMulti(followup);
    }

    return null;
  };

  // Render multi-type follow-up (radio, input, etc.)
  const renderMulti = (followup) => {

    console.log(followup);
    return (
      <div>
        {followup.components.map((comp, idx) => {
          if (comp.type === "radio") {
            return <RadioComponent key={idx} lang={lang} comp={comp} setFollowupValue={setFollowupValue} />;
          }

          if (comp.type === "input") {
            return <InputComponent key={idx} lang={lang} comp={comp} followupValue={followupValue} setFollowupValue={setFollowupValue} />;
          }

          if (comp.type === "imageupload") {
            return <ImageUploadComponent key={idx} lang={lang} comp={comp} />;
          }
          if (comp.type === "checkbox") {
            return (
              <CheckboxComponent
                key={idx}
                lang={lang}
                comp={comp}
                followupValue={followupValue}
                setFollowupValue={setFollowupValue}
              />
            );
          }

          return null;
        })}
      </div>)
  };

  // Render Yes/No questions
  const renderYesNo = () => (
    <div className="question">
      <h3>{lang === "mr" ? question.question_mr : question.question_en}</h3>
      {question.image && (
        <img
          src={question.image}
          alt="Question related visual"
          className="mb-4 max-w-full h-auto rounded"
        />
      )}
      <div className="flex space-x-4">
        <div>
          <input
            type="radio"
            id="yes"
            name="yesno"
            value="yes"
            checked={selectedAnswer === "yes"}
            onChange={() => handleAnswer("yes")}
          />
          <label htmlFor="yes">{lang === "mr" ? "आहे" : "Yes"}</label>
        </div>
        <div>
          <input
            type="radio"
            id="no"
            name="yesno"
            value="no"
            checked={selectedAnswer === "no"}
            onChange={() => handleAnswer("no")}
          />
          <label htmlFor="no">{lang === "mr" ? "नाही" : "No"}</label>
        </div>
      </div>
      {/* Conditional follow-up logic */}
      {selectedAnswer && question.followup && question.followup[selectedAnswer] && renderFollowup(selectedAnswer)}
    </div>
  );

  // Render radio question directly
  const renderRadio = () => {
    return (
      <div className="question">
        <h3>{lang === "mr" ? question.question_mr : question.question_en}</h3>
        {question.image && (
          <img
            src={question.image}
            alt="Question related visual"
            className="mb-4 max-w-full h-auto rounded"
          />
        )}
        {question.options.map((option, idx) => (
          <div key={idx}>
            <input
              type="radio"
              id={option.value}
              name={question.question_mr || question.question_en}
              value={option.value}
              checked={selectedAnswer === option.value}
              onChange={() => handleAnswer(option.value)}
            />
            <label htmlFor={option.value}>{lang === "mr" ? option.label_mr : option.label_en}</label>
          </div>
        ))}
        {/* Conditional follow-up logic */}
        {selectedAnswer && question.followup && question.followup[selectedAnswer] && renderFollowup(selectedAnswer)}
      </div>
    )
  };

  // Render input type question (e.g., location)
  const renderInput = () => (
    <div className="question">
      <h3>{lang === "mr" ? question.question_mr : question.question_en}</h3>
      <input
        type="text"
        value={followupValue}
        onChange={(e) => setFollowupValue(e.target.value)}
      />
    </div>
  );

  // Choose which type of question to render
  if (question.type === "yesno") return renderYesNo();
  if (question.type === "radio") return renderRadio();
  if (question.type === "input") return renderInput();
  if (question.type === "multi") return renderMulti(question);


  return null;
};

export default QuestionRenderer;
