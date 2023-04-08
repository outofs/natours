const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.isLogedIn);

router
  .route('/overview')
  .get(
    bookingController.createBookingCheckout,
    authController.isLogedIn,
    viewController.getOverview
  );
router
  .route('/tour/:slug')
  .get(authController.isLogedIn, viewController.getTour);
router
  .route('/login')
  .get(authController.isLogedIn, viewController.getLoginForm);

router.route('/me').get(authController.protect, viewController.getAccount);
router
  .route('/my-tours')
  .get(authController.protect, viewController.getMyTours);

router
  .route('/submit-user-data')
  .post(authController.protect, viewController.updateUserData);

module.exports = router;
