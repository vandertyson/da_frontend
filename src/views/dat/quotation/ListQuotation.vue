<template>
  <div id="page-forms">
    <div v-if="!ready" class="text-xs-center">
      <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
    </div>
    <v-container v-if="ready" grid-list-xl fluid>
      <v-layout row wrap>
        <router-link to="/quotation/add" tag="button">
          <v-btn color="success" class="text-lg-right">Add new quotation</v-btn>
        </router-link>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table :headers="headers" :items="quotations" class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.currency }}</td>
                <td class="text-xs-left">{{ props.item.employee }}</td>
                <td class="text-xs-left">{{ props.item.series }}</td>
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
import Quotation from "@/api/quotations/quotation";
import { error } from "util";
export default {
  components: {},
  data() {
    return {
      headers: [
        { text: "ID", align: "left", value: "id" },
        { text: "Customer name", align: "left", value: "name" },
        { text: "Customer code", align: "left", value: "code" },
        { text: "Currency", align: "left", value: "currency" },
        { text: "Saleperson name", align: "left", value: "protein" },
        { text: "Series", align: "left", value: "series" },
        { text: "", align: "left", value: "" }
      ],
      quotations: [],
      ready: false
    };
  },
  created() {
    console.log(URL.getQuot)
    HTTP.get(URL.getQuot)
      .then(response => {
        ready = true;
        console.log(response)       
        this.$data.quotations = response 
      })
      .catch(error => {
        this.$data.ready = true;
      });
  },
  computed: {},
  methods: {}
};
</script>