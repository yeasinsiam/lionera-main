const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport(
    {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "267861a392e64d",
            pass: "c3686e399f012d"
        }
    }
);

module.exports = transport

// const nodemailer = require('nodemailer');
// const transport = nodemailer.createTransport(
//     {
//         host: "smtp://smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: "267861a392e64d",
//             pass: "c3686e399f012d"
//         }
//     }
// );

module.exports = transport