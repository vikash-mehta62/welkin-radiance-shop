exports.contactUsEmail = ({
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
}) => {
    return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="UTF-8">
    <title>Consultation Request</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }

      .message {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }

      .details p {
        margin: 8px 0;
      }

      .highlight {
        font-weight: bold;
      }

      .footer {
        font-size: 14px;
        color: #999999;
        margin-top: 30px;
        text-align: center;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="message">New Consultation Request Received</div>
      <div class="details">
        <p><span class="highlight">Doctor Name:</span> ${doctorName}</p>
        <p><span class="highlight">Age:</span> ${yourAge}</p>
        <p><span class="highlight">Gender:</span> ${gender}</p>
        <p><span class="highlight">First Consultation:</span> ${isFirstConsultation}</p>
        <p><span class="highlight">Consultation Type:</span> ${consultationType}</p>
        <p><span class="highlight">Preferred Date:</span> ${preferredDate}</p>
        <p><span class="highlight">Preferred Time:</span> ${preferredTime}</p>
        <p><span class="highlight">Phone Number:</span> ${phoneNumber}</p>
        <p><span class="highlight">Email Address:</span> ${emailAddress}</p>
        <p><span class="highlight">Address:</span> ${yourAddress}</p>
        <p><span class="highlight">Message:</span> ${yourMessage}</p>
      </div>
      <div class="footer">We will follow up with the patient shortly.</div>
    </div>
  </body>
  
  </html>`;
};
