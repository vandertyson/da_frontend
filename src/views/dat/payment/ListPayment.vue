<template>
  <div id="page-forms">
    <div v-if="!ready" class="text-xs-center">
      <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
    </div>
    <v-container v-if="ready" grid-list-xl fluid>
      <v-layout row wrap>
        <v-card-title>
          <h3>PAYMENT</h3>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-flex md4>
          <v-text-field
            label="Search Payment"  
            v-model="cardcode"
            append-icon="search"
            clearable
            counter="100"
          ></v-text-field>
        </v-flex>
        <router-link v-if="!isSelect" to="/payment/add" tag="button">
          <v-btn round color="success" class="text-lg-right">Add New Payment Form</v-btn>
        </router-link>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table
              :headers="headers"
              :items="quotations"
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
                <td v-if="!isSelect" class="text-xs-left">
                  <router-link v-bind:to="getEditRoute(props.item.id)" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <v-btn flat small color="error" v-on:click="deleteQuot(props.item.id)">Delete</v-btn>
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
import Quotation from "@/api/quotations/quotation";
import { error } from "util";
export default {
  name: "list-quotation",
  props: {
    isSelect: false
  },
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
      quotations: [],
      ready: false,
      //sủa biến này thành true thì nó sẽ hiện len
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
      HTTP.get(URL.getQuot)
        .then(response => {
          this.$data.ready = true;
          this.$data.quotations = response.data;
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    getEditRoute: function(id) {
      return "/quotation/edit/" + id;
    },
    getName: function(first_name, last_name) {
      if (first_name && last_name) {
        return last_name + " " + first_name;
      }
      return "N/A";
    },
    deleteQuot: function(quotID) {
      if (confirm("Bạn có chăc chắn muốn xóa?")) {
        HTTP.delete(URL.deleteQuot + quotID)
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
      this.$emit("selectCopy", { id: id, type: "quot" });
    }
  }
};
</script>