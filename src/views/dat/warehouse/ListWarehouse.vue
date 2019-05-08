<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <div v-if="!ready" class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
      </div>
      <v-layout v-if="ready" row wrap>
        <router-link to="/warehouse/add" tag="button">
          <v-btn round color="success" outline class="text-lg-right">Add new Warehouse</v-btn>
        </router-link>
        <v-flex md4>
          <v-text-field
            label="Search Warehouse"
            v-model="whsName"
            append-icon="search"
            v-on:keyup.enter="searchWhs()"
            clearable
          ></v-text-field>
        </v-flex>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table :headers="headers" :items="warehouses" class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.lock }}</td>
                <td class="text-xs-left">{{ props.item.createdate }}</td>
                <td class="text-xs-left">
                  <router-link v-bind:to="getEditRoute(props.item.code)" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <v-btn flat small color="error" v-on:click="deleteWhs(props.item.code)">Delete</v-btn>
                </td>
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
import { error } from "util";
export default {
  components: {},
  data() {
    return {
      headers: [
        { text: "Warehouse code", align: "left", value: "whscode" },
        { text: "Warehouse name", align: "left", value: "whsname" },
        { text: "Locked", align: "left", value: "lock" },
        { text: "Create Date", align: "left", value: "createdate" },
        { text: "", align: "left", value: "" }
      ],
      warehouses: [],
      ready: false,
      snackbar: false,
      message: null,
      whsName: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  methods: {
    loadData: function() {
      this.$data.ready = false;
      HTTP.get(URL.getWhs)
        .then(response => {
          this.$data.ready = true;
          this.$data.warehouses = response.data;
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    getEditRoute: function(code) {
      return "/warehouse/edit/" + code;
    },
    deleteWhs: function(whsCode) {
      if (confirm("Bạn có chăc chắn muốn xóa?")) {
        HTTP.delete(URL.deleteWhs + whsCode)
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
    searchWhs: function() {
      HTTP.get(URL.getWhs, {
        params: {
          name: this.$data.whsName
        }
      })
        .then(response => {
          this.$data.warehouses = response.data;
        })
        .catch(error => {
          this.$data.message = "Đã có lỗi";
          this.snackbar = true;
        });
    }
  }
};
</script>