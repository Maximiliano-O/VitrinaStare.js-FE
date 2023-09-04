import { reactive } from 'vue';

const state = reactive({
  //user: JSON.parse(localStorage.getItem('user')) || null,
  user: localStorage.getItem('user') || 'Invitado',
  guest: localStorage.getItem('guest') !== 'false'
  });
  
  export default state;