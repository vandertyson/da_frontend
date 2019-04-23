<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <div v-if="!ready" class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
      </div>
      <v-layout v-if="ready" row wrap>
        <router-link to="/customer/add" tag="button">
          <v-btn color="success" class="text-lg-right">Add new Customer</v-btn>
        </router-link>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table :headers="headers" :items="customers" class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.contactperson }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.fax }}</td>
                <td class="text-xs-left">{{ props.item.phone1 }}</td>
                <td class="text-xs-left">{{ props.item.createdate }}</td>
                <td class="text-xs-left">
                  <router-link to="/quotation/add" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <router-link to="/quotation/edit" tag="button">
                    <v-btn
                      flat
                      small
                      color="error"
                      v-on:click="deleteCustomer(props.item.code)"
                    >Delete</v-btn>
                  </router-link>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { HTTP, URL } from "@/api/http-common";
import { error } from "util";
export default {
  components: {},
  data() {
    return {
      headers: [
        { text: "Customer name", align: "left", value: "code" },
        { text: "Customer code", align: "left", value: "name" },
        { text: "Contact person", align: "left", value: "contactperson" },
        { text: "Email", align: "left", value: "email" },
        { text: "Fax", align: "left", value: "fax" },
        { text: "Phone 1", align: "left", value: "phone1" },
        { text: "Create Date", align: "left", value: "createdate" },
        { text: "", align: "left", value: "" }
      ],
      customers: [],
      ready: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  methods: {
    loadData: function() {
      this.$data.ready = false;
      //console.log(URL.getCustomer);
      HTTP.get(URL.getCustomer)
        .then(response => {
          this.$data.ready = true;
          this.$data.customers = response.data;
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    getEditRoute: function(code) {
      return "/customer/edit/" + code;
    },
    deleteCustomer: function(custCode) {
      if (confirm("Bạn có chăc chắn muốn xóa?")) {
        HTTP.delete(URL.deleteCustomer + custCode)
          .then(response => {
            this.$data.message = "Đã xóa thành công. Đang tải lại dữ liệu ...";
            this.snackbar = true;
            this.loadData();
          })
          .catch(error => {
            this.$data.message = "Đã có lỗi không xóa được";
            this.snackbar = true;
          });
      }
    }
  }
};
</script>