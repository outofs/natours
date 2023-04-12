/* eslint-disable */
import { showAlert } from './alerts.js';

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email: email,
      },
    });

    // console.log(res);

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'To continue, please check your email. And follow the instructions.'
      );
      window.setTimeout(() => {
        location.assign('/reset-password');
      }, 2500);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
    // alert(error.response.data.message);
  }
};
