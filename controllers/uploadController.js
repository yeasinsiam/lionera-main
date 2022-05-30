'use strict';

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


// Function to create a occasion
const uploadFile = catchAsync(async (req, res, next) => {
    const file = req.file
    const url = req.protocol + '://' + req.get('host')
    let uri = `${url}/files/${file.filename}`;

    res.status(200).json({
        success: true,
        body: { url: uri, title: req.body.title },
    });
});

module.exports = {
    uploadFile
};
