const getArabicHtml = (data) => {
    return `Arabic Something`
}

const getEnglishHtml = (data) => {
    return `English Something`
}

const getFileUploadConfirmationTemplate = (data, language) => {
    const subject = language === 'en' ? 'Order Confirmation' : `Arabic Order Confirmation`
    const html = language === 'en' ? getEnglishHtml(data) : getArabicHtml(data)

    return { html, subject }
}

module.exports = getFileUploadConfirmationTemplate

// file uploaded successfully
// Order dispatch email
