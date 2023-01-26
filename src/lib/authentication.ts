export const isLoggedIn = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};
