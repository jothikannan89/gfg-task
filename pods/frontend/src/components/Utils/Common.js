// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  //console.log("gettingToken...");

  let accessToken = sessionStorage.getItem("accessToken");
  return accessToken || null;
};



// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
