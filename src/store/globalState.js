import { reactive } from 'vue';

const state = reactive({
  user: localStorage.getItem('user') || 'Guest',
  userID: localStorage.getItem('userID') || null,
  userIcon: localStorage.getItem('userIcon') || '',
  guest: localStorage.getItem('guest') !== 'false',
});

export function setUser(user) {
  state.user = user.username;
  state.userID = user._id;
  state.userIcon = user.imageURL;
  state.guest = false;

  localStorage.setItem("user", user.username);
  localStorage.setItem("userID", user._id);
  localStorage.setItem("userIcon", user.imageURL);
  localStorage.setItem("guest", "false");
}

export function clearUser() {
  state.user = 'Guest';
  state.userID = null;
  state.userIcon = '';
  state.guest = true;

  localStorage.setItem("user", "Guest");
  localStorage.setItem("guest", "true");
  localStorage.removeItem("userID");
  localStorage.removeItem("userIcon");
}

export default state;
