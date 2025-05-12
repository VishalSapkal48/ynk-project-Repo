// src/data/questions.js
import tapeImg from "../assets/tape.jpg";
import parkingImg from "../assets/parking.jpg"
import shutterImg from '../assets/shutter_size.jpg'
import boardImg from '../assets/board.jpg'
import lws1Img from "../assets/Left_wall_Side_1.jpg"
import lws2Img from "../assets/Left_wall_Side_2.jpg"
import lws3Img from "../assets/Left_wall_Side_3.jpg"
import rwsImg from "../assets/Right_wall_side.jpg"
import bwsImg from "../assets/B_wall_side.jpg"

const questions = [
  {
    id: "q1",
    question_mr: "सर तुम्हाला measurment टेप बदल माहिती आहे का?",
    question_en: "Sir, do you know about the measuring tape?",
    type: "yesno",
    followup: {
      no: {
        type: "guide",
        message_mr: "सर ज्यांना माहिती आहे त्यांना शॉप वर घेऊन या ",
        message_en: "Sir, please bring those who have the information to the shop."
      },
    },
  },
  {
    id: "q2",
    question_mr: "सर आपल्याकडे measurment टेप आहे का ?",
    image: tapeImg,
    type: "yesno",
    followup: {
      no: {
        type: "guide",
        message_mr: "सर हार्डवेअर मधून घेऊन या ",
        message_en: "Sir, please bring it from the hardware store."
      },
    },
  },
  {
    id: "q3",
    question_mr: "सर मला google चे करंट लोकेशन पाठवा ",
    question_en: "Sir, please send me your current Google location.",
    type: "input",
  },
  {
    id: "q4",
    question_mr: "सर पूर्ण शॉप चे वेगवेगळ्या अँगल ने फोटो पाठवा.",
    question_en: "Please upload photos of the entire shop from different angles.",
    type: "multi",
    components: [
      {
        type: "imageupload",
        image:boardImg,
        message_en: "Please upload photos of the entire shop from different angles. Upload photo of the board",
        message_mr: "सर पूर्ण शॉप चे वेगवेगळ्या अँगल ने फोटो पाठवा. बोर्डचा फोटो अपलोड करा",
        multiple: true,
      },
      {
        type: "imageupload",
        image:shutterImg,
        message_en: "Upload photo of the shutter size",
        message_mr: "शटरचा आकार फोटो अपलोड करा",
        multiple: true,
      },
      {
        type: "imageupload",
        image:lws1Img,
        message_en: "Upload photo of the left-side wall",
        message_mr: "डाव्या बाजूच्या भिंतीचा फोटो अपलोड करा",
        multiple: true,
      },
      {
        type: "imageupload",
        image:rwsImg,
        message_en: "Upload photo of the right-side wall",
        message_mr: "उजव्या बाजूच्या भिंतीचा फोटो अपलोड करा",
        multiple: true,
      },
      {
        type: "imageupload",
        image:bwsImg,
        message_en: "Upload photo of the back-side wall",
        message_mr: "पाठीमागच्या भिंतीचा फोटो अपलोड करा",
        multiple: true,
      }
    ]

  },
  {
    id: "q5",
    question_mr: "पार्किंगची सोय आहे का?",
    question_en: "Do you have parking?",
    image: parkingImg,
    type: "yesno",
    followup: {
      yes: {
        type: "imageupload",
        message_en: "Upload parking photos",
        message_mr: "पार्किंगचे फोटो अपलोड करा",
        multiple: true,
      },
    },
  },
  {
    id: "q6",
    question_mr: "मटेरियल टाकण्यासाठी जागा आहे का?",
    question_en: "Is there space to store material?",
    type: "yesno",
    followup: {
      yes: {
        type: "imageupload",
        message_en: "Upload photos",
        message_mr: "फोटो अपलोड करा",
        multiple: true,
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "Who will provide the storage space?",
            question_mr: "साठवण जागा कोण देणार?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q7",
    question_mr: "पाणी कनेक्शन आहे का?",
    question_en: "Is there space to store material?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "What is the source of water connection?",
            question_mr: "पाणी कनेक्शन आहे का?",
            options: [
              { value: "corporation", label_en: "Municipal Corporation", label_mr: "कॉरपोरेशन" },
              { value: "borewell", label_en: "Borewell", label_mr: "बोअरवेल" },
              { value: "society", label_en: "Society", label_mr: "सोसायटी" },
            ]
          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "Who will provide the storage space?",
            question_mr: "साठवण जागा कोण देणार?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q8",
    question_mr: "पाणी किती वेळ असते?",
    question_en: "For how long is the water available?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "For how long is the water available?",
            question_mr: "पाणी किती वेळ असते?",
            options: [
              { value: "24_hours", label_en: "24 hours", label_mr: "२४ तास" },
              { value: "2_hours_morning", label_en: "2 hours in the morning", label_mr: "सकाळी २ तास" },
              { value: "2_hours_morning_evening", label_en: "2 hours in the morning and evening", label_mr: "सकाळी आणि सायंकाळी २ , २ तास" },
              { value: "alternate_day", label_en: "Every alternate day", label_mr: "एक दिवस आड" },
              { value: "every_3_days", label_en: "Once every 3 days", label_mr: "तीन दिवस आड" },
              { value: "other", label_en: "Other", label_mr: "इतर" }
            ]
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },

        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            statement_en: "Arrange a water tank as a provision:",
            statement_mr: "पाणी साठवण्यासाठी टाकीची व्यवस्था करा:",
            options: [
              { value: "1000_ltr", label_en: "1000 liters", label_mr: "१००० लिटर" },
              { value: "2000_ltr", label_en: "2000 liters", label_mr: "२००० लिटर" },
              { value: "other_provision", label_en: "Any other provision", label_mr: "इतर कोणतीही व्यवस्था" }
            ]
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },

        ],
      },
    },
  },
  {
    id: "q9",
    question_mr: "लाईट मीटर कनेक्शन आहे का?",
    question_en: "Is there an electricity meter connection?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "What type of electricity meter connection is available?",
            question_mr: "लाईट मीटर कनेक्शन कोणत्या प्रकारचे आहे?",
            options: [
              { value: "single_phase", label_en: "Single Phase", label_mr: "सिंगल" },
              { value: "three_phase", label_en: "Three Phase", label_mr: "3 फेज" },
              { value: "other", label_en: "Other", label_mr: "इतर" }
            ]
          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "Who will provide the storage space?",
            question_mr: "साठवण जागा कोण देणार?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q10",
    question_mr: "लाइट मीटर आहे का?",
    question_en: "Where is the electricity meter located?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "लाइट मीटर कोठे आहे?",
            question_en: "Where is the electricity meter located?",
            options: [
              { value: "inside_shop", label_en: "Inside the shop", label_mr: "शॉप मध्ये" },
              { value: "outside_shop", label_en: "Outside the shop", label_mr: "शॉप च्या बाहेर" },
              { value: "in_parking", label_en: "In the parking area", label_mr: "पार्किंग मध्ये आहे" },
              { value: "behind_shop", label_en: "Behind the shop", label_mr: "शॉप च्या पाठीमागे" },
              { value: "other", label_en: "Other", label_mr: "इतर" }
            ]
          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "लाईट मीटर कोण पुरवणार?",
            question_en: "Who will provide the electricity meter?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q11",
    question_mr: "शॉप मध्ये अर्थिंग आहे का?",
    question_en: "Is there earthing in the shop?",
    type: "yesno",
    followup: {
      yes: {
        type: "imageupload",
        message_mr: "अर्थिंगचे फोटो अपलोड करा",
        message_en: "Upload earthing photos",
        multiple: true,
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "Who will provide the storage space?",
            question_mr: "साठवण जागा कोण देणार?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q12",
    question_mr: "ड्रनेज  कनेक्शन आहे का?",
    question_en: "Is there a drainage connection?",
    type: "yesno",
    followup: {
      yes: {
        type: "imageupload",
        message_mr: "ड्रनेज कनेक्शनचे फोटो अपलोड करा",
        message_en: "Upload photos of the drainage connection.",
        multiple: true,
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "Who will provide the drainage connection?",
            question_mr: "ड्रनेज कनेक्शन कोण देणार?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q13",
    question_mr: "चेंबर चालू आहे का?",
    question_en: "Is the chamber functioning?",
    type: "yesno",
    followup: {
      yes: {
        type: "imageupload",
        message_mr: "कृपया चेंबरचा  फोटो अपलोड करा.",
        message_en: "Please upload pictures of the chamber.",
        multiple: true,
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "त?",
            question_en: "Who will restart that?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ],
          },
          {
            type: "input",
            question_mr: "इतर असल्यास माहिती लिहा",
          },
        ],
      },
    },
  },
  {
    id: "q14",
    question_mr: "झाकण उघडून तपासणी होते का?",
    question_en: "Does the lid get opened and checked?",
    type: "yesno",
    followup: {
      yes: {
        type: "imageupload",
        message_mr: "कृपया फोटो अपलोड करा.",
        message_en: "Please upload pictures.",
        multiple: true,
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "Who will check and maintain it?",
            question_mr: "झाकणाची तपासणी आणि देखभाल कोण करणार?",
            options: [
              { value: "shop_owner", label_en: "Shop Owner", label_mr: "शॉप मालक" },
              { value: "franchise_owner", label_en: "Franchise Owner", label_mr: "फ्रँचाईझ मालक" },
              { value: "other", label_en: "Other Provision", label_mr: "इतर व्यवस्था" },
            ]
          },
          // {
          //   type: "input",
          //   question_en: "If other, please specify.",
          //   question_mr: "इतर असल्यास माहिती लिहा",
          // },
          {
            type: "radio",
            question_en: "What is the routine maintenance frequency?",
            question_mr: "देखभाल किती वेळाने केली जाते?",
            options: [
              { value: "weekly", label_en: "Weekly", label_mr: "साप्ताहिक" },
              { value: "monthly", label_en: "Monthly", label_mr: "मासिक" },
              { value: "other", label_en: "Other provision", label_mr: "इतर व्यवस्था" }
            ]
          },
          // {
          //   type: "input",
          //   question_en: "If other, please specify.",
          //   question_mr: "इतर असल्यास माहिती लिहा",
          // }

        ],
      },
    },
  },
  {
    id: "q15",
    question_mr: "पोटमाळा आहे का?",
    question_en: "Is there a loft?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "imageupload",
            message_mr: "कृपया पोटमाळ्याचा फोटो अपलोड करा.",
            message_en: "Please upload pictures of the loft.",
            multiple: true,
          },
          {
            type: "input",
            question_mr: "पोटमाळ्याचा आकार किती आहे? (लांबी × रुंदी फूटमध्ये)",
            question_en: "What is the size of the loft (length × width in feet)?",
          },
        ],
      },
      no: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "पाणीसाठ्याची व्यवस्था काय आहे?",
            question_en: "What is the water storage arrangement?",
          },
        ],
      },
    },
  },
  {
    id: "q16",
    question_mr: "पोटमाळा करायचा आहे का?",
    question_en: "Do you want to have a loft?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "तुम्हाला किती आकाराची पोटमाळा हवी आहे? (कृपया मापांची माहिती द्या)",
            question_en: "What size of loft would you like to have? (Please specify the dimensions).",
          },
        ],
      },
      no: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "पोटमाळ्यासाठी इतर कोणती व्यवस्था आहे का?",
            question_en: "Is there any other provision for the loft?",
          },
        ],
      },
    },
  },
  {
    id: "q17",
    question_mr: "शॉप चे शटर चेक करणे?",
    question_en: "Check the shop shutter?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "What action is required for the shop shutter?",
            question_mr: "शॉप च्या शटर साठी कोणती क्रिया आवश्यक आहे?",
            options: [
              { value: "servicing_required", label_en: "Servicing required", label_mr: "सर्विसिंग करावी लागेल" },
              { value: "repairing_required", label_en: "Repairing required", label_mr: "रिपेरिंग करावी लागेल" },
              { value: "other", label_en: "Other", label_mr: "इतर" }
            ]
          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "नवीन शटर आवश्यक आहे का?",
            question_en: "Is a new shutter required?",
          },
        ],
      },
    },
  },
  {
    id: "q18",
    question_mr: "भिंतीला  प्लास्टर  आहे  का ?",
    question_en: "Is there plaster on the wall?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "भिंतीला कोणते प्लास्टर आहे?",
            question_en: "What type of plaster is on the wall?",
            options: [
              { value: "cement_plaster", label_en: "Cement plaster", label_mr: "सीमेंट प्लास्टर" },
              { value: "pop_plaster", label_en: "Repairing required", label_mr: "POP प्लास्टर" },
              { value: "other", label_en: "Other", label_mr: "इतर" }
            ]
          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "imageupload",
            message_mr: "कृपया भिंतीला कोणते प्लास्टर आहे ते दर्शवणारा फोटो अपलोड करा.",
            message_en: "Please upload a picture showing the type of plaster on the wall.",
            multiple: true
          }

        ],
      },
    },
  },
  {
    id: "q19",
    question_mr: "रोलिंग शेड कराचे आहे का?",
    question_en: "Is a rolling shed required?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "imageupload",
            message_mr: "कृपया रोलिंग शेडचा फोटो अपलोड करा.",
            message_en: "Please upload pictures of the rolling shed.",
            multiple: true
          },
          {
            type: "input",
            question_mr: "रोलिंग शेडचा आकार किती आहे? (लांबी × रुंदी फूटमध्ये)",
            question_en: "What is the size of the rolling shed (length × width in feet)?"
          }
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "इतर कोणती व्यवस्था आहे का?",
            question_en: "Is there any other provision?",
          }
        ]
      }
    }
  },
  {
    id: "q20",
    question_mr: " पाण्याची टाकी आहे का?",
    question_en: "Is there a water tank?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: " टाकी किती लिटरची आहे?",
            question_en: "What is the capacity of the water tank (in liters)?",
            options: [
              { value: "1000ltr", label_en: "1000 liters", label_mr: "१००० लिटर" },
              { value: "2000ltr", label_en: "2000 liters", label_mr: "२००० लिटर" },
              { value: "3000ltr", label_en: "3000 liters", label_mr: "३००० लिटर" }
            ]
          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "इतर कोणती व्यवस्था आहे का?",
            question_en: "Is there any other provision?",
          }
        ]
      },
    },
  },
  {
    id: "q21",
    question_mr: "टाकीत पाणी चढवण्यासाठी मोटर आहे का?",
    question_en: "Is there a motor to pump water into the tank?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "पाणी पंपाच्या मोटरची क्षमता किती आहे?",
            question_en: "What is the capacity of the water pump motor?",
            options: [
              { value: "0.5", label_en: "0.5 HP", label_mr: "०.५ एचपी" },
              { value: "1", label_en: "1 HP", label_mr: "१ एचपी" },
              { value: "2", label_en: "2 HP", label_mr: "२ एचपी" },
            ]

          },
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "input",
            question_mr: "इतर कोणती व्यवस्था आहे का?",
            question_en: "Is there any other provision?",
          }
        ]
      },
    },
  },
  {
    id: "q22",
    question_mr: "पोटमाळ्यासाठी जिना आहे का?",
    question_en: "Is there a staircase/ladder for the loft?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "imageupload",
            message_mr: "कृपया पोटमाळ्याच्या जिन्याचा फोटो अपलोड करा.",
            message_en: "Please upload pictures of the loft staircase.",
            multiple: true
          }
        ]
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_en: "What is the way to access the loft?",
            question_mr: "पोटमाळ्यावर जाण्याची व्यवस्था कोणती आहे?",
            options: [
              { value: "separate_staircase", label_en: "Separate staircase", label_mr: "स्वतंत्र जिना" },
              { value: "other", label_en: "Other", label_mr: "इतर" }
            ]
          },
          {
            type: "input",
            question_en: "Please specify if other:",
            question_mr: "इतर असल्यास कृपया नमूद करा:"
          }
        ]

      }
    }
  },
  {
    id: "q23",
    question_mr: "काम करताना शेजारील दुकानदाराची परवानगी आहे का?",
    question_en: "Do you have permission from the neighboring shopkeeper to carry out the work?",
    type: "yesno",
    followup: {
      // yes: {
      //   type: "radio",
      //   question_mr: "परवानगी कोणत्या वेळेपर्यंत आहे?",
      //   question_en: "Till what time is the permission granted?",
      //   options: [
      //     { value: "giving", label_mr: "परमिशन घेऊन देणार", label_en: "Will arrange permission" },
      //     { value: "6pm", label_mr: "सायंकाळी सहा वाजेपर्यंत आहे", label_en: "Till 6 PM" },
      //     { value: "afternoon", label_mr: "दुपारी बारा नंतर आहे", label_en: "After 12 PM" }
      //   ]
      // },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            // question_en: "Please obtain permission before starting the work.",
            // question_mr: "काम सुरू करण्यापूर्वी कृपया शेजारील दुकानदाराची परवानगी घ्या.",
            options: [
              { value: "giving", label_mr: "परमिशन घेऊन देणार", label_en: "Will arrange permission" },
              { value: "6pm", label_mr: "सायंकाळी सहा वाजेपर्यंत आहे", label_en: "Till 6 PM" },
              { value: "afternoon", label_mr: "दुपारी बारा नंतर आहे", label_en: "After 12 PM" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "q24",
    question_mr: "शॉपमध्ये टॉयलेट-बाथरूम आहे का?",
    question_en: "Is there a toilet/bathroom in the shop?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "टॉयलेट/बाथरूममध्ये काही दुरुस्तीचे काम करायचे आहे का?",
            question_en: "Is there any repair work needed in the toilet/bathroom?",
            options: [
              {
                value: "leakage",
                label_mr: "पाण्याचा गळतीचा प्रश्न आहे",
                label_en: "There is a water leakage issue"
              },
              {
                value: "tiles",
                label_mr: "फ्लोअर टाईल खराब आहे",
                label_en: "Floor tiles are damaged"
              },
              {
                value: "wash_basin",
                label_mr: "वॉश बेसिन खराब आहे",
                label_en: "Wash basin is damaged"
              },
              {
                value: "no_work",
                label_mr: "काहीच काम करायचे नाही",
                label_en: "No work needed"
              }
            ]
          }
        ]
      },
      // no: {
      //   type: "guide",
      //   message_mr: "ठीक आहे. पुढील प्रश्नासाठी पुढे जा.",
      //   message_en: "Alright. Proceed to the next question."
      // }
    }
  }, {
    id: "q25",
    question_mr: "शॉपमध्ये काही तोडफोडचे काम आहे का?",
    question_en: "Is there any demolition work required in the shop?",
    type: "yesno",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "checkbox",
            question_mr: "कोणकोणते तोडफोडचे काम करायचे आहे?",
            question_en: "Which demolition works are required?",
            options: [
              { value: "floor_breaking", label_mr: "फ्लोरींग तोडणे", label_en: "Breaking floor" },
              { value: "wall_scraping", label_mr: "भीत घासणे", label_en: "Scraping wall" },
              { value: "wall_breaking", label_mr: "भीत तोडणे", label_en: "Breaking wall" },
              { value: "remove_old_tank", label_mr: "जुनी पाण्याची टाकी काढणे", label_en: "Remove old water tank" },
              { value: "remove_old_board", label_mr: "जुना बोर्ड काढणे", label_en: "Remove old board" },
              { value: "remove_old_pop", label_mr: "जुनी POP काढणे", label_en: "Remove old POP" },
              { value: "remove_rabbit", label_mr: "रॅबीट उचलणे", label_en: "Remove rabbit (raised floor structure)" }
            ]
          }
        ]
      },
      no: {
        type: "guide",
        message_mr: "ठीक आहे. पुढील प्रश्नाकडे चला.",
        message_en: "Alright, proceed to the next question."
      }
    }
  },
  {
    id: "q26",
    type: "yesno",
    question_mr: "शॉप मध्ये काही वीट बांधकामाचं काम आहे का?",
    question_en: "Is there any brick construction work in the shop?",
  },
  {
    id: "q27",
    type: "yesno",
    question_mr: "इंटरनेट कनेक्शन आहे का?",
    question_en: "Is there an internet connection?",
    followup: {
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "जर इंटरनेट नसेल तर दुसरी कोणती व्यवस्था आहे?",
            question_en: "If not, what is the alternative provision?",
            options: [
              { value: "new", label_mr: "नवीन कनेक्शनसाठी बोलत आहोत", label_en: "Talking to a new provider" },
              { value: "other", label_mr: "इतर", label_en: "Other" }]
          },
          {
            type: "input",
            question_en: "Please specify if other:",
            question_mr: "इतर असल्यास कृपया नमूद करा:"
          }
        ]
      }
    }
  },
  {
    id: "q28",
    type: "input",
    question_mr: "इलेक्ट्रिकलचे काम किती आहे?",
    question_en: "How much electrical work is required?"
  },
  {
    id: "q29",
    type: "yesno",
    question_mr: "एक्स्जॉस्ट पॉइंट आहे का?",
    question_en: "Is there an exhaust point?",
    followup:
    {
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "इतर पर्याय कोणते आहेत?",
            question_en: "What is the other provision?",
            options: [
              { value: "talking_to_new_one", label_mr: "नवीन काढणार", label_en: "Talking to new one" },
              { value: "other", label_mr: "इतर", label_en: "Other" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "q31",
    type: "yesno",
    question_mr: "चिमणी करायची आहे का?",
    question_en: "Is a chimney required?",
    followup: {
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "इतर पर्याय कोणते आहेत?",
            question_en: "What is the other provision?",
            options: [
              { value: "talking_to_new_one", label_mr: "नवीन काढणार", label_en: "Talking to new one" },
              { value: "other", label_mr: "इतर", label_en: "Other" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "q32",
    type: "yesno",
    question_mr: "स्टेज टाकण्यासाठी जागा आहे का?",
    question_en: "Is there space to install a stage?",
    followup: {
      yes: {
        type: "imageupload",
        message_mr: "स्टेज टाकण्यासाठी जागेचा फोटो अपलोड करा",
        message_en: "Upload photo of the space for stage",
        multiple: false
      },
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "इतर पर्याय कोणते आहेत?",
            question_en: "What is the other provision?",
            options: [
              { value: "talking_to_new_one", label_mr: "नवीन काढणार", label_en: "Talking to new one" },
              { value: "other", label_mr: "इतर", label_en: "Other" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "q33",
    type: "yesno",
    question_mr: "प्लंबर चे काम आहे का ?",
    question_en: "Is there a plumbing work?",
    followup: {
      yes: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "किती स्क्वेअर फूट?",
            question_en: "How many square feet?",
            options: [
              { value: "100", label_mr: "१०० स्क्वेअर फूट", label_en: "100 sq ft" },
              { value: "500", label_mr: "५०० स्क्वेअर फूट", label_en: "500 sq ft" },
              { value: "other", label_mr: "इतर", label_en: "Other" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "q34",
    type: "yesno",
    question_mr: "बॅटरी बॅकअप आहे का?",
    question_en: "Is there a battery backup?",
    followup: {
      no: {
        type: "multi",
        components: [
          {
            type: "radio",
            question_mr: "इतर पर्याय कोणते आहेत?",
            question_en: "What is the other provision?",
            options: [
              { value: "talking_to_new_one", label_mr: "नवीन जोडणार", label_en: "Talking to new one" },
              { value: "other", label_mr: "इतर", label_en: "Other" }
            ]
          },
          {
            type: "input",
            question_mr: "इतर माहिती लिहा",
            question_en: "Enter other details"
          }
        ]
      }
    }
  },
  {
    id: "q35",
    type: "radio",
    question_mr: "शॉप ची एन्ट्री कोणत्या दिशेला आहे?",
    question_en: "In which direction is the shop entrance?",
    options: [
      { value: "east", label_mr: "पूर्व", label_en: "East" },
      { value: "west", label_mr: "पश्चिम", label_en: "West" },
      { value: "south", label_mr: "दक्षिण", label_en: "South" },
      { value: "north", label_mr: "उत्तर", label_en: "North" }
    ]
  }










];

export default questions;
