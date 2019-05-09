<template>
  <div id="page-forms">
    <div v-if="!ready" class="text-xs-center">
      <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
    </div>
    <v-container v-if="ready" grid-list-xl fluid>
      <v-layout row wrap>
        <v-card-title>
          <h3>AR INVOICE</h3>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-flex md4>
          <v-text-field
            label="Search Invoice"
            v-model="cardcode"
            append-icon="search"
            clearable
            counter="100"
          ></v-text-field>
        </v-flex>
        <router-link to="/invoice/add" tag="button">
          <v-btn round color="success" class="text-lg-right">Add new Invoice</v-btn>
        </router-link>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table
              :headers="headers"
              :items="invoices"
              :search="cardcode"
              class="elevation-1"
              v-bind:disable-initial-sort="true"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.currency }}</td>
                <td class="text-xs-left">{{ props.item.slpname }}</td>
                <td
                  class="text-xs-left"
                >{{ getName(props.item.emfirstname, props.item.emplastname) }}</td>
                <td class="text-xs-left">{{ props.item.dueDate }}</td>
                <td class="text-xs-left">
                  <router-link v-bind:to="getEditRoute(props.item.id)" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <v-btn flat small color="error" v-on:click="deleteInvoice(props.item.id)">Delete</v-btn>
                </td>
                <td v-if="isSelect">
                  <v-btn color="blue darken-1" flat @click="selectToCopy(props.item.id)">Select</v-btn>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ cardcode }}" found no results.</v-alert>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar" top :timeout="3000">
        {{message}}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { HTTP, URL } from "@/api/http-common";
//import Quotation from "@/api/quotations/quotation";
import Delivery from "@/api/quotations/delivery";
import { error } from "util";
export default {
  components: {},
  data() {
    return {
      cardcode: "",
      headers: [
        { text: "ID", align: "left", value: "id" },
        { text: "Customer name", align: "left", value: "name" },
        { text: "Customer code", align: "left", value: "code" },
        { text: "Currency", align: "left", value: "currency" },
        { text: "Saleperson name", align: "left", value: "slpname" },
        { text: "Owner", align: "left", value: "employee" },
        { text: "Due date", align: "left", value: "dueDate" },
        { text: "", align: "left", value: "" }
      ],
      invoices: [],
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
      HTTP.get(URL.getInvoice)
        .then(response => {
          this.$data.ready = true;
          this.$data.invoices = response.data;
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    getEditRoute: function(id) {
      return "/invoice/edit/" + id;
    },
    getName: function(first_name, last_name) {
      if (first_name && last_name) {
        return last_name + " " + first_name;
      }
      return "N/A";
    },
    deleteInvoice: function(invID) {
      if (confirm("Bạn có chăc chắn muốn xóa?")) {
        HTTP.delete(URL.deleteInvoice + invID)
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
    },
    selectToCopy: function(id) {
      this.$emit("selectCopy", { id: id, type: "delv" });
    }
  }
};
</script>