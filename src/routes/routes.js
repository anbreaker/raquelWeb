const {Router} = require('express');
const sgMail = require('@sendgrid/mail');
const router = Router();

router.post('/send-email', async (req, res) => {
  const {name, email, phone, message} = req.body;

  let contentHtml = `
    <h1>User Information:</h1>
    <ul>
      <li>Username: ${name}</li>
      <li>User Email: ${email}</li>      
    </ul>
    <p>Message: El correo lo manda--> <b>${email}</b> ${message}</p>
  `;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'antunez19+raquelweb@gmail.com', // Change to your recipient
    from: `${email}`, // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: contentHtml,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });

  res.redirect('/index.html');
});

module.exports = router;
