const getArabicHtml = (data) => {
    return `Arabic Something`
}

const getEnglishHtml = (data) => {
    return `Thank you your Order has been placed`
}

const getOrderConfirmationTemplate = (data, language) => {
    const subject = language === 'en' ? 'Order Confirmation' : `Arabic Order Confirmation`
    const html = language === 'en' ? getEnglishHtml(data) : getArabicHtml(data)

    return { html, subject }
}

module.exports = getOrderConfirmationTemplate

// file uploaded successfully
// Order dispatch email
