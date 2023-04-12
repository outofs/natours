const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(viewController.alerts);

router.use(authController.isLogedIn);

router.route('/').get(viewController.getOverview);

router.route('/tour/:slug').get(viewController.getTour);
router.route('/login').get(viewController.getLoginForm);
router.route('/sign-up').get(viewController.getSignUpForm);

router.route('/forgot-password').get(viewController.getForgotPassForm);
router.route('/reset-password').get(viewController.getResetPassForm);

router.route('/me').get(authController.protect, viewController.getAccount);
router
  .route('/my-tours')
  .get(
    bookingController.createBookingCheckout,
    authController.protect,
    viewController.getMyTours
  );

router
  .route('/submit-user-data')
  .post(authController.protect, viewController.updateUserData);

module.exports = router;
