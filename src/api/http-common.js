import axios from 'axios';
export const SERVER = "http://localhost:8080"
export const URL = {
  "getQuot":SERVER + "/addQuotations",
  "addQuot": SERVER + "/quotation/addQuotation",
  "getItem": SERVER + "/item/items",
}

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})