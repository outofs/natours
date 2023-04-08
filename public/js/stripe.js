/* eslint-disable */
// import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  //   const stripe = Stripe(
  //     'pk_test_51MtRRoKt6f6NIBem8NVp2lIrZ6txCAq1G7f4FISmAXHdYsBAWkKb0wfHwj1fn76AwploMTVmBISRhmafauyz4GA700r2zjRqhb'
  //   );

  // 1) Get checkout session from endpoint
  try {
    let session = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    session = await session.json();
    // console.log(session);

    // 2) Create checkout form + charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: se,
    // });
    window.location.replace(session.session.url);
  } catch (error) {
    console.log(error);
    // showAlert('error', error);
  }
};
