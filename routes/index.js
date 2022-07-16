('use strict');

// Importing the app error class
const AppError = require('../utils/appError');
const userRouter = require('./userRoutes');
const occasionRouter = require('./occasionRoutes');
const uploadRouter = require('./uploadRoutes');
const designRouter = require('./designRoutes');
const formRouter = require('./formRoutes');
const addonRouter = require('./addonRoutes');
const packageRouter = require('./packageRoutes');
const slideshowRouter = require('./slideshowRoutes');
const shippingRouter = require('./shippingRoutes');
const shippingAreaRouter = require('./shippingAreaRoutes');
const orderRouter = require('./orderRoutes');
const formDataRouter = require('./formDataRoutes');
const paymentRouter = require('./payment');

// Importing express router
const router = require('express').Router();

// Registering all routers
router.use('/users', userRouter);
router.use('/occasions', occasionRouter);
router.use('/upload', uploadRouter);
router.use('/designs', designRouter);
router.use('/forms', formRouter);
router.use('/addons', addonRouter);
router.use('/packages', packageRouter);
router.use('/slideshows', slideshowRouter);
router.use('/shippings', shippingRouter);
router.use('/shipping-areas', shippingAreaRouter);
router.use('/orders', orderRouter);
router.use('/form-data', formDataRouter);
router.use('/payment', paymentRouter);

// The 404 route
router.all('*', (req, res, next) => next(new AppError('Not found', 404)));

module.exports = router;
