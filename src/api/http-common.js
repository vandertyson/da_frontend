import axios from 'axios';
export const SERVER = "http://localhost:8080"
export const URL = {
  "getQuot": SERVER + "/quotation/quotations",
  "addQuot": SERVER + "/quotation/addQuotation",
  "getQuotById": SERVER + "/quotation/quotation/",
  "getItem": SERVER + "/item/items",
  "getItembyId": SERVER + "/item/item/",
  "getCustomer": SERVER + "/customer/customers",
  "getEmployee": SERVER + "/employee/employees",
  "getSale": SERVER + "/quotation/saleEmployee",
  "getContacts":SERVER + "/quotation/contacts",
  "updateQuotation": SERVER + "/quotation/updateQuotation",
  "updateItem":SERVER+"/item/updateItem",
  "updateCustomer":SERVER+"/customer/updateCustomer",
  "updateEmployee":SERVER+"/employee/updateEmployee",
  "addNewItem":SERVER + "/item/addnewItem",
  "addNewCustomer":SERVER + "/customer/addCustomer",
  "addNewEmployee":SERVER + "/employee/addEmployee",
  "deleteQuot":SERVER+"/quotation/deleteQuotation/",
  "deleteItem":SERVER+"/item/deleteItem/",
  "deleteCustomer":SERVER+"/customer/deleteCustomer/",
  "deleteEmployee":SERVER+"/employee/deleteEmployee/"

}

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})