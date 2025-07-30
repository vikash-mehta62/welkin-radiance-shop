const { contactUsEmail } = require("../mail/contactFormRes");
const mailSender = require("../utils/mailSenderr");




exports.contactUsController = async (req, res) => {
  const {
    doctorName,
    yourAge,
    gender,
    isFirstConsultation,
    consultationType,
    preferredDate,
    preferredTime,
    phoneNumber,
    emailAddress,
    yourMessage,
    yourAddress
  } = req.body;

  try {
    await mailSender(
      "rishimaheshwari040@gmail.com",
      "New Consultation Request",
      contactUsEmail({
        doctorName,
        yourAge,
        gender,
        isFirstConsultation,
        consultationType,
        preferredDate,
        preferredTime,
        phoneNumber,
        emailAddress,
        yourMessage,
        yourAddress
      })
    );

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};




