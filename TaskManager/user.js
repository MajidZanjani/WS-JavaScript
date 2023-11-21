const loginBtn = document.getElementById('loginBtn');
const newUserBtn = document.getElementById('newUserBtn');
const userField = document.getElementById('userName');
const passField = document.getElementById('password');

loginBtn.addEventListener('click', () => {
  login(userField.value, passField.value);
});

newUserBtn.addEventListener('click', () => {
  newUser(userField.value, passField.value);
});

function login(user, pass) {
  console.log(user, pass);
}

function newUser(user, pass) {
  console.log(user, pass);
}
