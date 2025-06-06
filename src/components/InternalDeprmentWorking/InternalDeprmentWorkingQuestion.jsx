const InternalDeprmentWorkingQuestion = {
  id: 'form_information',
  title_mr: 'आंतर विभागीय कार्य',
  title_en: 'Internal Department Work',
  fields: [
    {
      id: 'developer_quotation',
      question_mr: 'डेवलपर टीमने सेल्स डिपार्टमेंटला कोटेशन पाठवले का?',
      question_en: 'Did the developer team send the quotation to the sales department?',
      type: 'yesno',
    },
    {
      id: 'sales_to_owner_quotation',
      question_mr: 'सेल्स डिपार्टमेंटला ओनरला कोटेशन पाठवले का?',
      question_en: 'Did the sales department send the quotation to the owner?',
      type: 'yesno',
    },
    {
      id: 'owner_received_quotation',
      question_mr: 'ओनरला कोटेशन मिळाले का?',
      question_en: 'Did the owner receive the quotation?',
      type: 'yesno',
    },
    {
      id: 'owner_checked_quotation',
      question_mr: 'ओनर ने पूर्ण कोटेशन चेक केले का?',
      question_en: 'Did the owner check the complete quotation?',
      type: 'yesno',
    },
    {
      id: 'quotation_finalized',
      question_mr: 'ओनर सोबत सेल्स डिपार्टमेंटचे कोटेशन फायनल झाले का?',
      question_en: 'Has the quotation from the sales department been finalized with the owner?',
      type: 'yesno',
    },
    {
      id: 'sample_layout_ready',
      question_mr: 'शॉपचे सॅम्पल लेआउट तयार आहे का?',
      question_en: 'Is the shop sample layout ready?',
      type: 'yesno',
    },
    {
      id: 'layout_discussed_finalized',
      question_mr: 'लेआउट ओनरसोबत चर्चा करून फायनल केले का?',
      question_en: 'Was the layout discussed and finalized with the owner?',
      type: 'yesno',
    },
    {
      id: 'engineer_assigned',
      question_mr: 'लेआउट फायनल झाल्यानंतर त्या साईटसाठी इंजिनिअर नेमले का?',
      question_en: 'Was an engineer assigned to the site after layout finalization?',
      type: 'yesno',
    },
    {
      id: 'engineer_got_owner_info',
      question_mr: '   ओनर माहिती ला इंजिनिअर मिळाले का?',
      question_en: 'Did the engineer get the owner’s information?',
      type: 'yesno',
    },
    {
      id: 'shop_measurement_taken',
      question_mr: 'पूर्ण शॉपचे मोजमाप घेतले आहे का?',
      question_en: 'Has the complete shop measurement been taken?',
      type: 'yesno',
    },
  ],
  submit_button_mr: 'सबमिट करा',
  submit_button_en: 'Submit',
  navigation_buttons: {
    back_mr: 'मागे',
    back_en: 'Back',
    next_mr: 'पुढे',
    next_en: 'Next',
  },
};
export default InternalDeprmentWorkingQuestion;