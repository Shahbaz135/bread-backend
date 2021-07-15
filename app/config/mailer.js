const nodemailer = require("nodemailer");
const path = require("path");

// async..await is not allowed in global scope, must use a wrapper
async function sendInvoice(data) {
  let fileName = "invoice-" + data.invoiceNumber + ".pdf";
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: 'nodeserver.broetchengold.de',
    service: "gmail",
    // port: 587,
    // secure: false,
    auth: {
      user: "broetchengold@gmail.com",
      pass: "mwa3329461930",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Broetchengold" <broetchengold@gmail.com>', // sender address
    to: data.email,
    subject: "Monthly Invoice", // Subject line
    attachments: [
      {
        filename: fileName,
        path: path.join("documents", "invoices", fileName),
        contentType: "application/pdf",
      },
    ],
    html:
      "<br><p>Dear " +
      data.name +
      " </p><br>" +
      "<p>This is your monthly invoice:</p>" +
      "<p>Email: <b>" +
      data.email +
      "</b></p>",
    // '<p>VerificationCode: <b>' +
    // VerificationCode +
    // '</b></p>',
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendInvoice,
};
