const modifyResponseByLanguage = (dataObject) => {
    // returns if includes both english and arabic language
    if (dataObject.en && dataObject.ar) {
        return dataObject;
    }

    let lang
    if (dataObject.en) lang = 'en'
    else if (dataObject.ar) lang = 'ar'

    if (lang && dataObject[lang]) {

        dataObject = {
            ...dataObject,
            ...dataObject[lang],
        }
        delete dataObject[lang]
    }

    return dataObject
}

module.exports = modifyResponseByLanguage