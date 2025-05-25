import { request } from "../request";
import { setRole, setToken, setUser } from "../token";

export const auth = {
  register: async (data) => {
    const result = await request("/auth/register", "POST", data);
    setToken(JSON.stringify(result.data.access_token));
    setRole(JSON.stringify(result.data.data.role));
    setUser(result.data.data);

    return result;
  },
  login: async (data) => {
    const result = await request("/auth/login", "POST", data);
    setToken(JSON.stringify(result.data.access_token));
    setRole(JSON.stringify(result.data.data.role));
    setUser(result.data.data);
    
    return result;
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },
};
