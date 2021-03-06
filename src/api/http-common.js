import axios from 'axios';
export const SERVER = "http://localhost:8080"
export const URL = {
  "getQuot": SERVER + "/quotation/quotations",
  "addQuot": SERVER + "/quotation/addQuotation",
  "getQuotById": SERVER + "/quotation/quotation/",
  "confirmQuot": SERVER + "/quotation/confirm/",
  "download": SERVER + "/quotation/export/",

  "getOrder": SERVER + "/salesorder/Orders",
  "addOrder": SERVER + "/salesorder/addOrder",
  "getOrderById": SERVER + "/salesorder/Order/",
  "confirmOrder": SERVER + "/salesorder/confirm/",
  "print": SERVER + "/salesorder/print/",

  "getDelivery": SERVER + "/delivery/deliveries",
  "addDelivery": SERVER + "/delivery/addDelivery",
  "getDeliveryById": SERVER + "/delivery/delivery/",
  "updateDelivery": SERVER + "/delivery/updateDelivery",
  "deleteDelivery": SERVER + "/delivery/deleteDelivery/",

  "getInvoice": SERVER + "/invoice/invoices",
  "addInvoice": SERVER + "/invoice/addInvoice",
  "getInvoiceById": SERVER + "/invoice/invoice/",
  "updateInvoice": SERVER + "/invoice/updateInvoice",
  "deleteInvoice": SERVER + "/invoice/deleteInvoice/",

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
  "export": SERVER + "/salesorder/export",
  "count": SERVER + "/quotation/count",
  "getPaymentById": SERVER + "/payment/payment",
  "updatePayment": SERVER + "/payment/updatePayment",
  "addPayment": SERVER + "/payment/addPayment",



}

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})