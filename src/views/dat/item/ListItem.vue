<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <div v-if="!ready" class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
      </div>
      <v-layout v-if="ready" row wrap>
        <router-link to="/quotation/add" tag="button">
          <v-btn color="success" class="text-lg-right">Add new item</v-btn>
        </router-link>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table :headers="headers" :items="items" class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.groupname }}</td>
                <td class="text-xs-left">{{ props.item.onhand }}</td>
                <td class="text-xs-left">{{ props.item.uomcode }}</td>
                <td class="text-xs-left">
                  <router-link to="/quotation/add" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <router-link to="/quotation/edit" tag="button">
                    <v-btn flat small color="error">Delete</v-btn>
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
        { text: "Item code", align: "left", value: "code" },
        { text: "Item name", align: "left", value: "name" },
        { text: "Item group", align: "left", value: "groupname" },
        { text: "Stock", align: "left", value: "onhand" },
        { text: "Unit", align: "left", value: "uomcode" },
        { text: "", align: "left", value: "" }
      ],
      items: [],
      ready: false
    };
  },
  created() {
    console.log(URL.getItem);
    HTTP.get(URL.getItem)
      .then(response => {
        this.$data.ready = true;
        this.$data.items = response.data;
      })
      .catch(error => {
        this.$data.ready = true;
      });
  },
  computed: {},
  methods: {}
};
</script>