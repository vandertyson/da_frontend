import axios from 'axios';
export const SERVER = "http://localhost:8080"
export const URL = {
  "getQuot": SERVER + "/quotation/quotations",
  "addQuot": SERVER + "/quotation/addQuotation",
  "getItem": SERVER + "/item/items",
  "getCustomer": SERVER + "/customer/customers",
  "getEmployee": SERVER + "/employee/employees",
  "getSale": SERVER + "/quotation/saleEmployees",
}

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})