import axios from "axios";
// const baseUrl = "https://nodejsexercise.akthanki.repl.co/api/login";
const baseUrl = "http://localhost:8080/api/";

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}login`, credentials);
  return response;
};
const signup = async (credentials) => {
  const response = await axios.post(`${baseUrl}users`, credentials);
  return response;
};

const authService = { login, signup }
export default authService;
