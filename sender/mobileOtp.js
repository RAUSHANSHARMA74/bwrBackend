const twilio = require('twilio');

// Twilio credentials
const accountSid = 'AC5b09ad27da990f9dcc6e23d79b64732a';
const authToken = '006406cdb84aab7520798cdf48921133';
const twilioPhoneNumber = '+917462872872';

const client = twilio(accountSid, authToken);

const sendOtpOnMobileNumber = (phoneNumber, otp) => {
  console.log(phoneNumber, otp);

  return client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })
    .then(() => {
      console.log(`OTP sent successfully to ${phoneNumber}`);
      return 'OTP sent successfully';
    })
    .catch((error) => {
      console.error(`Error sending OTP: ${error.message}`);
      throw new Error('Error sending OTP');
    });
};

module.exports = { sendOtpOnMobileNumber };
