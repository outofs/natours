/* eslint-disable */
// const showAlert = require('./alerts');;

import { showAlert } from './alerts.js';

// const loginForm = document.querySelector('.form');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email: email,
        password: password,
      },
    });

    // console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
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

export const logout = async () => {
  try {
    // const res = await axios({
    //   method: 'GET',
    //   url: '/api/v1/users/logout',
    // });
    // if (res.data.status === 'success') {
    //   location.reload(true);
    // }

    const res = await fetch('/api/v1/users/logout', {
      method: 'GET',
    });

    if (res.status === 200) {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    // console.log(res);
  } catch (error) {
    // console.log(error);
    showAlert('error', 'Error loggin out! Try again!');
  }
};
