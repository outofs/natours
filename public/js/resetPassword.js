/* eslint-disable */
import { showAlert } from './alerts.js';

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });

    // console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', 'Your password is updated!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
    // alert(error.response.data.message);
  }
};
