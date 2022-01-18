export const getUsername = () => {
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
