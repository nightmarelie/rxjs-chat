const usersEl = document.querySelector(".users");

const getUsername = () => {
  const username = window.sessionStorage.getItem("username");

  if (username) return username;

  let newUsername = prompt("Please enter a username", "");

  if (!newUsername) {
    const randomNum = Math.floor(Math.random() * 1000);
    newUsername = `user${randomNum}`;
  }

  window.sessionStorage.setItem("username", newUsername);

  return newUsername;
};

const addUser = (id, username) =>
  usersEl.insertAdjacentHTML(
    "beforeend",
    `<option value=${id}>${username}</option>`
  );

const clearUsers = () => (usersEl.innerHTML = "");

const isUserExist = (id) => usersEl.querySelector(`option[value=${id}]`);

const removeUser = (id) => {
  const optionEl = usersEl.querySelector(`option[value=${id}]`);

  if (optionEl) {
    usersEl.removeChild(optionEl);
  }
};

export { getUsername, addUser, clearUsers, isUserExist, removeUser };
