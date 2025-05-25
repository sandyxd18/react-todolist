export const setToken = (newToken) => {
  localStorage.setItem("token", newToken);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setRole = (userRole) => { 
  localStorage.setItem("role", userRole);
}

export const getRole = () => { 
  return localStorage.getItem("role");
}

export const getUsername = () => { 
  return localStorage.getItem("username");
}

export const setUsername = (username) => { 
  localStorage.setItem("username", username)
}

export const setUser = (user) => { 
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => { 
  var user = localStorage.getItem("user");

  return JSON.parse(user);
}