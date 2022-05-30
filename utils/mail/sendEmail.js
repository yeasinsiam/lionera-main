const transport = require('./config');
const getFileUploadConfirmationTemplate = require('./templates/fileUpload');
const getOrderConfirmationTemplate = require('./templates/orderConfirmation');
const getOrderDispatchConfirmationTemplate = require('./templates/orderDispatch');

const getEmailTemplate = (template, data, language) => {

    switch (template) {
        case 'orderConfirmation':
            return getOrderConfirmationTemplate(data, language)

        case 'orderDispatchConfirmation':
            return getOrderDispatchConfirmationTemplate(data, language)

        case 'fileUploadConfirmation':
            return getFileUploadConfirmationTemplate(data, language)

        default:
            return { subject: 'No Subject', html: 'Blank Html' }
    }

}

const sendEmail = (userEmail, template, data, language) => {

    // console.log(userEmail, subj, message);
    const mailOptions = {
        from: 'admin@lionera.com',
        to: userEmail,
        ...getEmailTemplate(template, data, language)
        // subject: subj,
        // html: message
    };

    console.log("email---")

    transport.sendMail(mailOptions)
        .then((res) => console.log('Email Sent!'))
        .catch((err) => console.log(err));
}

module.exports = sendEmail;