<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex md12>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin chung</h4>

              <v-text-field label="Nhập mã khách hàng" v-model="code"></v-text-field>
              <v-text-field label="Nhập tên khách hàng" v-model="name"></v-text-field>
              <v-text-field label="Nhập người liên hệ" v-model="contactperson"></v-text-field>
              <v-text-field label="Nhập email" v-model="email"></v-text-field>
              <v-text-field label="Nhập số fax" v-model="fax"></v-text-field>
              <v-text-field label="Nhập số điện thoại" v-model="phone1"></v-text-field>
            </v-card>
          </v-flex>

          <v-layout align-end justify-end class="mr-4">
            <router-link to="/quotation" tag="button">
              <v-btn primary large>CANCEL</v-btn>
            </router-link>
            <v-btn primary large color="success" v-on:click="save">SAVE</v-btn>
          </v-layout>
          <v-snackbar v-model="snackbar" top :timeout="3000">
            {{message}}
            <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { HTTP, URL } from "@/api/http-common";
// import Customer from "@/api/quotations/customer";
// import Countries from "@/api/country";
import Currency from "@/api/quotations/currency";
// import Sales from "@/api/quotations/sales";
// import Employees from "@/api/quotations/employee";
// import Items from "@/api/quotations/item";

export default {
  components: {},
  data() {
    return {
      ready: false,
      code: "",
      name: "",
      contactperson: "",
      email: "",
      fax: 0,
      phone1: 0,
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {},
  computed: {},
  methods: {
    save: function() {
      var post_param = {
        code: this.$data.code,
        name: this.$data.name,
        contactperson: this.$data.contactperson,
        email: this.$data.email,
        fax: this.$data.fax,
        phone1: this.$data.phonse1
      };

      HTTP.post(URL.addNewCustomer, post_param)
        .then(response => {
          this.posts = response.data;
          this.$data.message = "Customer added successfully!";
          this.$data.snackbar = true;
        })
        .catch(e => {
          console.log(e);
          this.$data.message = "Some errors happened!";
          this.$data.snackbar = true;
        });
    }
  }
};
</script>