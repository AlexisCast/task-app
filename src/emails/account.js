const nodemailer = require("nodemailer");

const sendMail = () => {
	console.log("sendemail");
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.NODEMAILER_AUTH_USER,
			pass: process.env.NODEMAILER_AUTH_PASS,
		},
		// debug: true, // show debug output
		// logger: true, // log information in console
	});

	const mailOptions = {
		from: process.env.NODEMAILER_FROM,
		to: "destinationemail@mail.com",
		subject: "Test abs once again",
		// text: "That was easy!",
		html: "<h1>Welcome</h1><p>That was easy! test</p>",
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(info.response);
			console.log("Message sent: %s", info.messageId);
		}
	});
};

sendMail();

module.exports = sendMail;
