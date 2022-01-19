const usersSelectEl = document.querySelector(".users");

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
  usersSelectEl.insertAdjacentHTML(
    "beforeend",
    `<option value=${id}>${username}</option>`
  );

const clearUsers = () => (usersSelectEl.innerHTML = "");

const isUserExist = (id) => usersSelectEl.querySelector(`option[value=${id}]`);

const removeUser = (id) => {
  const optionEl = usersSelectEl.querySelector(`option[value=${id}]`);

  if (optionEl) {
    usersSelectEl.removeChild(optionEl);
  }
};

const clearUserInput = () => {
  document.querySelector(".input").value = "";
};

const addMessage = (username, message) => {
  document
    .querySelector(".messages")
    .insertAdjacentHTML(
      "beforeend",
      `<li><span>${username}: </span>${message}</li>`
    );

  window.scrollTo(0, document.body.scrollHeight);
};

export {
  getUsername,
  addUser,
  clearUsers,
  isUserExist,
  removeUser,
  clearUserInput,
  addMessage,
};
