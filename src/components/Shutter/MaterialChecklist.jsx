import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png'; // Ensure this path is correct

function MaterialChecklist() {
  const [agreement, setAgreement] = useState(null);
  const [materialAvailability, setMaterialAvailability] = useState({});
  const [language, setLanguage] = useState('en');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

// Define categories based on comments in checklistData
const categories = [
  'A: Initial Items',
  'B: Electronic Appliances',
  'B+: Additional Electronic Appliances',
  'C: Kitchen Cutlery',
  'D: Housekeeping Material',
  'E: Stationery',
  'F: Display & Sign Board ACP',
  'F-2: Letter Name Board Work',
  'G: Other Expenses',
];

// Assign categories to checklist items with corrected numbering
const checklistData = [
  { category: 'A: Initial Items', no: 1, particulars_en: "Burner Bhatti", particulars_mr: "बर्नर भट्टी", size: "44*24*30+6", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 2, particulars_en: "Service Counter", particulars_mr: "सर्व्हिस काउंटर", size: "72*24*30+14+12", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 3, particulars_en: "Single Sink Big", particulars_mr: "सिंगल सिंक मोठा", size: "24*24*30+18+12", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 4, particulars_en: "Work Table", particulars_mr: "वर्क टेबल", size: "36*20*30+18+12", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 5, particulars_en: "Side Table", particulars_mr: "साइड टेबल", size: "32*24*30+18+12", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 6, particulars_en: "Fridge 500 Ltr (Blue Star)", particulars_mr: "फ्रिज 500 लिटर (ब्लू स्टार)", size: "66*28*30", qty: 1, defaultAvailability: "no", remarks_en: "1 Year Compressor (Manufacturer)", remarks_mr: "1 वर्ष कंप्रेसर (निर्माता)" },
  { category: 'A: Initial Items', no: 7, particulars_en: "Idli Steamer", particulars_mr: "इडली स्टीमर", size: "42*36*45", qty: 1, defaultAvailability: "no", remarks_en: "Only Boiler 6 Months (Manufacturer)", remarks_mr: "फक्त बॉयलर 6 महिने (निर्माता)" },
  { category: 'A: Initial Items', no: 8, particulars_en: "Round Table", particulars_mr: "गोल टेबल", size: "30x30x48", qty: 4, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 9, particulars_en: "Thatte Idli SS Non-Stick Tray", particulars_mr: "थट्टे इडली स्टेनलेस स्टील नॉन-स्टिक ट्रे", size: "", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 10, particulars_en: "Button Idli SS Non-Stick Tray", particulars_mr: "बटण इडली स्टेनलेस स्टील नॉन-स्टिक ट्रे", size: "", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 11, particulars_en: "KOT Bill", particulars_mr: "KOT बिल", size: "18", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'A: Initial Items', no: 12, particulars_en: "Fryer Kit / Medu Vada", particulars_mr: "फ्रायर किट / मेदू वडा", size: "8 Pieces Fryer Kit", qty: 1, defaultAvailability: "no", remarks_en: "1 Year Manufacturer", remarks_mr: "1 वर्ष निर्माता" },
  { category: 'B: Electronic Appliances', no: 1, particulars_en: "Bill Machine", particulars_mr: "बिल मशीन", size: "Caption POS 15.6 Inch", qty: 1, defaultAvailability: "yes", remarks_en: "1 Year Manufacturer", remarks_mr: "1 वर्ष निर्माता" },
  { category: 'B: Electronic Appliances', no: 2, particulars_en: "Thermal Printer", particulars_mr: "थर्मल प्रिंटर", size: "Caption POS 2 Inch", qty: 1, defaultAvailability: "yes", remarks_en: "1 Year Manufacturer", remarks_mr: "1 वर्ष निर्माता" },
  { category: 'B: Electronic Appliances', no: 3, particulars_en: "Software", particulars_mr: "सॉफ्टवेअर", size: "PetPuja", qty: 1, defaultAvailability: "yes", remarks_en: "1 Year Manufacturer", remarks_mr: "1 वर्ष निर्माता" },
  { category: 'B+: Additional Electronic Appliances', no: 1, particulars_en: "Coffee Machine", particulars_mr: "कॉफी मशीन", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'B+: Additional Electronic Appliances', no: 2, particulars_en: "MS Dustbin Table", particulars_mr: "एमएस डस्टबिन टेबल", size: "20x20x16", qty: 1, defaultAvailability: "yes", remarks_en: "1 Year Manufacturer", remarks_mr: "1 वर्ष निर्माता" },
  { category: 'B+: Additional Electronic Appliances', no: 3, particulars_en: "Store Rack", particulars_mr: "स्टोअर रॅक", size: "36*18*6 Galvanised", qty: 1, defaultAvailability: "yes", remarks_en: "1 Year Manufacturer", remarks_mr: "1 वर्ष निर्माता" },
  { category: 'C: Kitchen Cutlery', no: 1, particulars_en: "Fire Tank", particulars_mr: "फायर टँक", size: "Refill Installation 1 Year - 6KG", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 2, particulars_en: "Cutlery Material Kit Set 8 Nos", particulars_mr: "कटलरी मटेरियल किट सेट 8 नग", size: "Mini Idli, Fry Bottle, Front Scoop, Stainless Steel Spatula, Silicone Brush, 12 No. SS Mug with Plate, Spice Bottle, Tong, 100 Idli Scoop", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 3, particulars_en: "Plates", particulars_mr: "प्लेट्स", size: "10*5, Bowl-3", qty: 70, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 4, particulars_en: "Spoon and Fork", particulars_mr: "चमचा आणि काटा", size: "100 Pcs", qty: 75, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 5, particulars_en: "Spoon", particulars_mr: "चमचा", size: "100 Pcs", qty: 125, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 6, particulars_en: "Aluminium Patila", particulars_mr: "अ‍ॅल्युमिनियम पातेला", size: "3 Piece Set 32, 28, 21", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 7, particulars_en: "Cutting Gattu", particulars_mr: "कटिंग गट्टू", size: "12*3", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 8, particulars_en: "Chopping Pad", particulars_mr: "चॉपिंग पॅड", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 9, particulars_en: "Bill Tochya", particulars_mr: "बिल तोच्या", size: "Height-18", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 10, particulars_en: "Chaku SS Material", particulars_mr: "चाकू स्टेनलेस स्टील मटेरियल", size: "13*3 mm", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 11, particulars_en: "Tea Patila", particulars_mr: "चहा पातेला", size: "4 Ltr - With Kalai", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 12, particulars_en: "Print Roll", particulars_mr: "प्रिंट रोल", size: "27*13 Mtr", qty: 200, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 13, particulars_en: "Acrylic Single Oval Dish", particulars_mr: "अ‍ॅक्रिलिक सिंगल ओव्हल डिश", size: "Bowl Plate Small", qty: 100, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 14, particulars_en: "MS Chaku", particulars_mr: "एमएस चाकू", size: "12*2.5", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 15, particulars_en: "Tea Strainer", particulars_mr: "चहा गाळणी", size: "7 Liter", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'C: Kitchen Cutlery', no: 16, particulars_en: "SS Gang with Lid", particulars_mr: "स्टेनलेस स्टील गंग झाकणासह", size: "5 Liter", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 1, particulars_en: "Uniform T-Shirt", particulars_mr: "युनिफॉर्म टी-शर्ट", size: "Labour-6", qty: 12, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 2, particulars_en: "Apron", particulars_mr: "एप्रन", size: "As Per Branding NB All Staff", qty: 12, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 3, particulars_en: "Cap", particulars_mr: "टोपी", size: "As Per Branding NB All Staff", qty: 12, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 4, particulars_en: "Paper Cup 65 ml", particulars_mr: "पेपर कप 65 मिली", size: "5000 Pcs", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 5, particulars_en: "Paper Cup 85 ml", particulars_mr: "पेपर कप 85 मिली", size: "5000 Pcs", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 6, particulars_en: "Dustbin Swing", particulars_mr: "डस्टबिन स्विंग", size: "Yellow 60 / Pavan/Nakoda", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 7, particulars_en: "Dustbin Small", particulars_mr: "डस्टबिन छोटा", size: "30 Ltr Nakoda Square/Pavan", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 8, particulars_en: "Queue Manager", particulars_mr: "क्यू मॅनेजर", size: "", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 9, particulars_en: "Floor Cleaner", particulars_mr: "फ्लोअर क्लिनर", size: "5 Ltr", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 10, particulars_en: "Floor Duster", particulars_mr: "फ्लोअर डस्टर", size: "", qty: 6, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 11, particulars_en: "Check Duster", particulars_mr: "चेक डस्टर", size: "", qty: 6, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 12, particulars_en: "Cello Mop", particulars_mr: "सेलो मॉप", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 13, particulars_en: "Broom", particulars_mr: "झाडू", size: "Gala Plastic Broom XL", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'D: Housekeeping Material', no: 14, particulars_en: "Green Scrubber", particulars_mr: "हिरवी घासणी", size: "", qty: 10, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 1, particulars_en: "Scissors", particulars_mr: "कात्री", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 2, particulars_en: "NB Pen", particulars_mr: "एनबी पेन", size: "", qty: 50, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 3, particulars_en: "Two-Way Cello Tape", particulars_mr: "द्विमार्गी सेलो टेप", size: "", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 4, particulars_en: "Ribbon Opening-Flower", particulars_mr: "रिबन ओपनिंग-फूल", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 5, particulars_en: "Kitchen NB", particulars_mr: "किचन एनबी", size: "", qty: 50, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 6, particulars_en: "Laminated Sticker", particulars_mr: "लॅमिनेटेड स्टिकर", size: "", qty: 10, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 7, particulars_en: "Notebook", particulars_mr: "नोटबुक", size: "", qty: 2, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 8, particulars_en: "First Aid Kit", particulars_mr: "प्रथमोपचार किट", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 9, particulars_en: "Presence Register", particulars_mr: "उपस्थिती रजिस्टर", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 10, particulars_en: "Calculator", particulars_mr: "कॅल्क्युलेटर", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 11, particulars_en: "Cello Tape Cutter", particulars_mr: "सेलो टेप कटर", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 12, particulars_en: "Rubber Packet", particulars_mr: "रबर पॅकेट", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 13, particulars_en: "Tissue Paper Box", particulars_mr: "टिश्यू पेपर बॉक्स", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 14, particulars_en: "Cello Tape", particulars_mr: "सेलो टेप", size: "1 Inch x 6 Pc Packet", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 15, particulars_en: "Long Book", particulars_mr: "लांब बुक", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'E: Stationery', no: 16, particulars_en: "Pen Drive", particulars_mr: "पेन ड्राइव्ह", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F: Display & Sign Board ACP', no: 1, particulars_en: "Main Board + Shop Partition - ACP", particulars_mr: "मुख्य बोर्ड + शॉप पार्टीशन - एसीपी", size: "3mm ACP Sheet", qty: 470, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F: Display & Sign Board ACP', no: 2, particulars_en: "Fabrication for Board & Partition", particulars_mr: "बोर्ड आणि पार्टीशनसाठी फॅब्रिकेशन", size: "1.5mm Square MS Pipe", qty: 355, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F: Display & Sign Board ACP', no: 3, particulars_en: "Gas Bank", particulars_mr: "गॅस बँक", size: "20x36x32", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F-2: Letter Name Board Work', no: 1, particulars_en: "Photo Frame 4 Pieces", particulars_mr: "फोटो फ्रेम 4 नग", size: "3mm Acrylic & LED", qty: 4, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F-2: Letter Name Board Work', no: 2, particulars_en: "Vinyl Sticker + Foam Sheet", particulars_mr: "विनाइल स्टिकर + फोम शीट", size: "", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F-2: Letter Name Board Work', no: 3, particulars_en: "Letter Work (Marathi)", particulars_mr: "लेटर वर्क (मराठी)", size: "2 & 3 mm Acrylic Sheet, LED", qty: 379, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F-2: Letter Name Board Work', no: 4, particulars_en: "Letter / Board Scrap Hoarding", particulars_mr: "लेटर / बोर्ड स्क्रॅप होर्डिंग", size: "Board / Letter All Material", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'F-2: Letter Name Board Work', no: 5, particulars_en: "Lollipop", particulars_mr: "लॉलीपॉप", size: "3mm Acrylic & LED", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'G: Other Expenses', no: 1, particulars_en: "Steamer Installation Charges", particulars_mr: "स्टीमर स्थापना शुल्क", size: "Transport + Labour + Material", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'G: Other Expenses', no: 2, particulars_en: "Agreement Fee", particulars_mr: "करार शुल्क", size: "Stamp + Draft + Notary", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'G: Other Expenses', no: 3, particulars_en: "Drawing Fee", particulars_mr: "ड्रॉइंग शुल्क", size: "All Civil + Code + Photo", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'G: Other Expenses', no: 4, particulars_en: "Transport Setup Material All", particulars_mr: "सर्व सेटअप मटेरियल वाहतूक", size: "Pune to Your Shop", qty: 1, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
  { category: 'G: Other Expenses', no: 5, particulars_en: "Visit Fee - Owner On-Site Dinner", particulars_mr: "भेट शुल्क - मालक ऑन-साइट डिनर", size: "Plan + Checking + Setup + Opening", qty: 3, defaultAvailability: "yes", remarks_en: "Checking Warranty", remarks_mr: "वॉरंटी तपासणी" },
];

const config = {
  en: {
    title: "Nadbrahma Idli Material List",
    branchName: "Branch Name: A.B. Road, Indore",
    ownerName: "Owner Name: Mr. Raj Anil Sisodiya",
    dateLabel: `Date: ${new Date().toLocaleDateString('en-GB')}`,
    mobileLabel: "Mobile Number: 9133128816",
    tableHeaders: [
      "No",
      "Particulars",
      "Size",
      "Qty",
      "Material Available",
      "Material Not Available",
      "Reason for Material Not Available",
    ],
    availabilityYes: "Yes",
    availabilityNo: "No",
    question: "Do you understand the above material checklist?",
    yes: "Yes",
    no: "No",
    submit: "Submit",
    back: "Back",
    next: "Next",
    availabilityError: "Please select availability for all materials.",
    agreementError: "Please select whether you understand the material checklist.",
    successMessage: "Form submitted successfully!",
    errorMessage: "Error submitting form!",
  },
  mr: {
    title: "नादब्रह्मा इडली मटेरियल यादी",
    branchName: "शाखेचे नाव: ए.बी. रोड, इंदूर",
    ownerName: "मालकाचे नाव: श्री. राज अनिल सिसोदिया",
    dateLabel: `तारीख: ${new Date().toLocaleDateString('en-GB')}`,
    mobileLabel: "मोबाइल क्रमांक: ९१३३१२८८१६",
    tableHeaders: [
      "अनु. क्र.",
      "विशेष",
      "आकार",
      "प्रमाण",
      "मटेरियल उपलब्ध",
      "मटेरियल अनुपलब्ध",
      "मटेरियल अनुपलब्ध असण्याचे कारण",
    ],
    availabilityYes: "होय",
    availabilityNo: "नाही",
    question: "तुम्हाला वरील मटेरियल यादी समजली का?",
    yes: "होय",
    no: "नाही",
    submit: "सबमिट",
    back: "मागे",
    next: "पुढे",
    availabilityError: "कृपया सर्व मटेरियल्ससाठी उपलब्धता निवडा.",
    agreementError: "कृपया वरील मटेरियल यादी समजली आहे का याचे उत्तर निवडा.",
    successMessage: "फॉर्म यशस्वीरित्या सबमिट झाला!",
    errorMessage: "फॉर्म सबमिट करण्यात त्रुटी!",
  },
};

  // Filter items for the current category
  const currentCategory = categories[currentCategoryIndex];
  const filteredItems = checklistData.filter(item => item.category === currentCategory);

  const handleAgreementChange = (value) => {
    setAgreement(value);
  };

  const handleAvailabilityChange = (category, no, value) => {
    setMaterialAvailability((prev) => ({
      ...prev,
      [`${category}-${no}`]: value,
    }));
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const handleNext = () => {
    // Validate that all items in the current category have been answered before moving to the next
    const currentItems = checklistData.filter(item => item.category === currentCategory);
    const allCurrentItemsSelected = currentItems.every(
      (item) => materialAvailability[`${item.category}-${item.no}`] !== undefined
    );
    if (!allCurrentItemsSelected) {
      alert(config[language].availabilityError);
      return;
    }
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all items have an availability selection
    const allMaterialsSelected = checklistData.every(
      (item) => materialAvailability[`${item.category}-${item.no}`] !== undefined
    );
    if (!allMaterialsSelected) {
      alert(config[language].availabilityError);
      return;
    }

    // Check agreement only if on the last category
    if (currentCategoryIndex === categories.length - 1 && agreement === null) {
      alert(config[language].agreementError);
      return;
    }

    // Prepare formatted data with full particulars in the selected language
    const formattedData = checklistData.reduce((acc, item) => {
      const particular = item[`particulars_${language}`] || item.particulars_en;
      const availability = materialAvailability[`${item.category}-${item.no}`] === 'yes' ? config[language].availabilityYes :
                          materialAvailability[`${item.category}-${item.no}`] === 'no' ? config[language].availabilityNo :
                          (language === 'mr' ? 'उत्तर दिले नाही' : 'Not answered');
      return {
        ...acc,
        [particular]: availability,
      };
    }, {
      [config[language].question]: agreement === 'yes' ? config[language].yes :
                                  agreement === 'no' ? config[language].no :
                                  (language === 'mr' ? 'उत्तर दिले नाही' : 'Not answered'),
    });

    // Log formatted data to console
    console.log('Form Data:', formattedData);

    // Send form data to API using Axios
    try {
      const response = await axios.post('API Caaling ', {
        materialAvailability,
        agreement,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log the API response to console
      console.log('API Response:', response.data);

      // Show success alert
      alert(config[language].successMessage);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(config[language].errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#dbeeff] p-6 rounded-xl border border-blue-200">
        {/* Header */}
        <div className="bg-white flex justify-between items-center mb-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="YNK Logo" className="h-12 w-12" />
            <h1 className="text-xl font-bold text-gray-800">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-blue-600 hover:underline text-sm"
          >
            {language === 'en' ? 'मराठी' : 'English'}
          </button>
        </div>
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-left text-gray-700 mb-1">
            {config[language].title}
          </h2>
          <div className="text-left text-gray-500 mb-4">
            <p>{config[language].branchName}</p>
            <p>{config[language].ownerName}</p>
            <p>{config[language].dateLabel}</p>
            <p>{config[language].mobileLabel}</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {currentCategory}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm mb-6">
              <thead className="bg-blue-100">
                <tr>
                  {config[language].tableHeaders.map((header, idx) => (
                    <th
                      key={idx}
                      className={`border border-gray-300 p-2 ${
                        idx === 4 || idx === 5 ? 'text-center' : 'text-center'
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={`${item.category}-${item.no}`} className="  hover:bg-blue-50">
                    <td className="border border-gray-300 p-2">{item.no}</td>
                    <td className="border border-gray-300 p-2">
                      {language === 'en' ? item.particulars_en : item.particulars_mr}
                    </td>
                    <td className="border border-gray-300 p-2">{item.size}</td>
                    <td className="border border-gray-300 p-2">{item.qty}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <label className="flex items-center justify-center gap-2">
                        <input
                          type="radio"
                          name={`availability-${item.category}-${item.no}`}
                          checked={materialAvailability[`${item.category}-${item.no}`] === 'yes'}
                          onChange={() => handleAvailabilityChange(item.category, item.no, 'yes')}
                        />
                        <span className="text-gray-800">{config[language].availabilityYes}</span>
                      </label>
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <label className="flex items-center justify-center gap-2">
                        <input
                          type="radio"
                          name={`availability-${item.category}-${item.no}`}
                          checked={materialAvailability[`${item.category}-${item.no}`] === 'no'}
                          onChange={() => handleAvailabilityChange(item.category, item.no, 'no')}
                        />
                        <span className="text-gray-800">{config[language].availabilityNo}</span>
                      </label>
                    </td>
                    <td className="border border-gray-300 p-2">
                      {language === 'en' ? item.remarks_en : item.remarks_mr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mb-6">
            <button
              onClick={handleBack}
              disabled={currentCategoryIndex === 0}
              className={`px-6 text-gray-500 underline ${
                currentCategoryIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {config[language].back}
            </button>
            <button
              onClick={handleNext}
              disabled={currentCategoryIndex === categories.length - 1}
              className={`px-6 py-2 rounded text-white ${
                currentCategoryIndex === categories.length - 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {config[language].next}
            </button>
          </div>

          {/* Agreement Question and Submit Button (shown only on last category) */}
          {currentCategoryIndex === categories.length - 1 && (
            <>
              <div className="flex items-center gap-6 mb-6">
                <p className="text-gray-700 font-medium">{config[language].question}</p>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="agreement"
                    checked={agreement === 'yes'}
                    onChange={() => handleAgreementChange('yes')}
                  />
                  <span className="text-gray-800">{config[language].yes}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="agreement"
                    checked={agreement === 'no'}
                    onChange={() => handleAgreementChange('no')}
                  />
                  <span className="text-gray-800">{config[language].no}</span>
                </label>
              </div>
              <div className="flex justify-center px-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  {config[language].submit}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MaterialChecklist;