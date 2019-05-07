<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <div v-if="!ready" class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
      </div>
      <v-layout v-if="ready" row wrap>
        <router-link to="/item/add" tag="button">
          <v-btn round color="success" outline class="text-lg-right">Add new item</v-btn>
        </router-link>
        <v-flex md5>
          <v-text-field
            label="Search Item"
            v-model="itemName"
            append-icon="search"
            v-on:keyup.enter="searchItem()"
            clearable
            counter="100"
            hint="Item name"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table :headers="headers" :items="items" class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.groupname }}</td>
                <td class="text-xs-left">{{ props.item.onhand }}</td>
                <td class="text-xs-left">{{ props.item.uomcode }}</td>
                <td class="text-xs-left">{{ props.item.createdate }}</td>
                <td class="text-xs-left">
                  <router-link v-bind:to="getEditRoute(props.item.code)" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <v-btn flat small color="error" v-on:click="deleteItem(props.item.code)">Delete</v-btn>
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
import Item from "@/api/quotations/item";
import { error } from "util";
export default {
  components: {},
  data() {
    return {
      headers: [
        { text: "Item code", align: "left", value: "code" },
        { text: "Item name", align: "left", value: "name" },
        { text: "Item group", align: "left", value: "groupname" },
        { text: "In Stock", align: "left", value: "onhand" },
        { text: "Unit", align: "left", value: "uomcode" },
        { text: "Create Date", align: "left", value: "createdate" },
        { text: "", align: "left", value: "" }
      ],
      items: [],
      ready: false,
      snackbar: false,
      message: null,
      itemName: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  methods: {
    loadData: function() {
      this.$data.ready = false;
      HTTP.get(URL.getItem)
        .then(response => {
          this.$data.ready = true;
          this.$data.items = response.data;
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    getEditRoute: function(code) {
      return "/item/edit/" + code;
    },
    deleteItem: function(itemCode) {
      if (confirm("Bạn có chăc chắn muốn xóa?")) {
        HTTP.delete(URL.deleteItem + itemCode)
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
    searchItem: function() {
      HTTP.get(URL.getItem, {
        params: {
          name: this.$data.itemName
        }
      })
        .then(response => {
          this.$data.items = response.data;
        })
        .catch(error => {
          this.$data.message = "Đã có lỗi";
          this.snackbar = true;
        });
    }
  }
};
</script>
