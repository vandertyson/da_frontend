import axios from 'axios';
export const SERVER = "http://localhost:8080"
export const URL = {
  "getQuot":SERVER + "/quotations/",
  "addQuot": SERVER + "/quotations/addquotation"  
}

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})