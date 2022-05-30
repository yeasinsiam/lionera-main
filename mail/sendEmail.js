const transport = require('./config');
const Templates = require("./templates/index")

const sendEmail = (sender,type,data) => {

    // console.log(sender,data)

    const mailOptions = {
        from: 'admin@lionera.com',
        to: sender,
        ...Templates(type,data)

    };

    console.log( {})

    transport.sendMail(mailOptions)
        .then((res) => console.log('Email Sent!'))
        .catch((err) => console.log(err));
}

module.exports = sendEmail;