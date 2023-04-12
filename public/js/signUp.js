/* eslint-disable */
import { showAlert } from './alerts.js';

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });

    // console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', 'Account successfuly created!');
      // alert('Logged in successfully!');
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
