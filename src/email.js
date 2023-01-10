const sendgrid = require("@sendgrid/mail");
const emailFrom = "nitinkawdal@gmail.com";
require("dotenv").config();

const api_key = process.env.api_key;

class EmailService {
  constructor() {
    sendgrid.setApiKey(api_key);
  }

  sucessfulLogin({ name, email }) {
    let msg = {
      to: email, // Change to your recipient
      from: emailFrom, // Change to your verified sender
      subject: "Movie Booked",
      text: "Ticket Confirmed",
      html: `<strong><h1>Hello ${name}!</h1>Your ticket is confirmed & booking id is </strong>`,
    };

    return this.emailData(msg);
  }

  emailData(data) {
    if (!data) {
      return "Email Data is not avilable";
    } else {
      return sendgrid.send(data);
    }
  }
}
module.exports = EmailService;
