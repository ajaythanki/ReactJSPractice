import axios from "axios";
// const baseUrl = "https://nodejsexercise.akthanki.repl.co/api/login";
const baseUrl = "http://localhost:8080/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response;
};

export default { login };