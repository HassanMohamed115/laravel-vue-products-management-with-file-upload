import { createApp } from 'vue';
import './bootstrap';

import app from './components/App.vue' 

import router from './router'
import Swal from 'sweetalert2'
window.Swal = Swal
const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // didOpen: (toast) => {
    //   toast.onmouseenter = Swal.stopTimer;
    //   toast.onmouseleave = Swal.resumeTimer;
    // }
  });

  window.toast = toast
  
createApp(app).use(router).mount("#app");