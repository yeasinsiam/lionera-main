const getArabicHtml = (data) => {
    return `Arabic Something`
}

const getEnglishHtml = (data) => {
    return `English Something`
}

const getOrderDispatchConfirmationTemplate = (data, language) => {
    const subject = language === 'en' ? 'Order has been Updated in AR' : `Arabic Order Updated`
    const html = language === 'en' ? getEnglishHtml(data) : getArabicHtml(data)

    return { html, subject }
}

module.exports = getOrderDispatchConfirmationTemplate