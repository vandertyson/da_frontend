import axios from 'axios';
export const SERVER = "http://localhost:8080"
export const URL = {
  "getQuot": SERVER + "/quotation/quotations",
  "addQuot": SERVER + "/quotation/addQuotation",
  "getQuotById": SERVER + "/quotation/quotation/",
  "confirm": SERVER + "/quotation/confirm/",

  "getOrder": SERVER + "/salesorder/Orders",
  "addOrder": SERVER + "/salesorder/addOrder",
  "getOrderById": SERVER + "/salesorder/Order/",

  "getDelivery": SERVER + "/delivery/deliveries",
  "addDelivery": SERVER + "/delivery/addDelivery",
  "getDeliveryById": SERVER + "/delivery/delivery/",
  "updateDelivery": SERVER + "/delivery/updateDelivery",
  "deleteDelivery": SERVER + "/delivery/deleteDelivery/",

  "getItem": SERVER + "/item/items",
  "getItembyId": SERVER + "/item/item/",
  "getCustomer": SERVER + "/customer/customers",
  "getCustomerbyId": SERVER + "/customer/customer/",
  "getTrans": SERVER + "/salesorder/transport/",
  
  "getEmployee": SERVER + "/employee/employees",
  "getEmployeeById": SERVER + "/employee/employee/",
  "getSale": SERVER + "/quotation/saleEmployee",
  "getContacts": SERVER + "/quotation/contacts",
  "getDept": SERVER + "/employee/department",
  "updateQuotation": SERVER + "/quotation/updateQuotation",
  "updateOrder": SERVER + "/salesorder/updateOrder",
  "updateItem": SERVER + "/item/updateItem",
  "updateCustomer": SERVER + "/customer/updateCustomer",
  "updateEmployee": SERVER + "/employee/updateEmployee",
  "addNewItem": SERVER + "/item/addnewItem",
  "addNewCustomer": SERVER + "/customer/addCustomer",
  "addNewEmployee": SERVER + "/employee/addEmployee",
  "deleteQuot": SERVER + "/quotation/deleteQuotation/",
  "deleteOrder": SERVER + "/salesorder/deleteOrder/",
  "deleteItem": SERVER + "/item/deleteItem/",
  "deleteCustomer": SERVER + "/customer/deleteCustomer/",
  "deleteEmployee": SERVER + "/employee/deleteEmployee/",
  "getGroup": SERVER + "/item/group",

  "getWhs": SERVER + "/warehouse/warehouses",
  "getWhsByCode": SERVER + "/warehouse/warehouse/",
  "updateWhs": SERVER + "/warehouse/updateWarehouse",
  "addWhs": SERVER + "/warehouse/addWarehouse",
  "deleteWhs": SERVER + "/warehouse/deleteWarehouse/",


}

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})