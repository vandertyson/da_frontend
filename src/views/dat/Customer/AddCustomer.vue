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
              <v-menu
                v-model="menu_create_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="createdate" label="Ngày tạo" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="createdate" @input="menu_create_date = false"></v-date-picker>
              </v-menu>
            </v-card>
          </v-flex>

          <v-layout align-end justify-end class="mr-4">
            <router-link to="/customer" tag="button">
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
import Currency from "@/api/quotations/currency";

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
      createdate: new Date().toISOString().substr(0, 10),
      menu_create_date:false,
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
        if (this.$route.params.code) {
      HTTP.get(URL.getCustomerbyId + "/" + this.$route.params.code)
        .then(response => {
          //doan nay gan lai cac bien vao trong
          console.log(response.data);
          this.$data.code = response.data.code;
          this.$data.name = response.data.name;
          this.$data.contactperson = response.data.contactperson;
          this.$data.email = response.data.email;
          this.$data.fax = response.data.fax;
          this.$data.phone1 = response.data.phone1;
          this.$data.createdate = response.data.createdate;
        })
        .catch(error => {});
    }
  },
  computed: {},
  methods: {
    save: function() {
      var post_param = {
        code: this.$data.code,
        name: this.$data.name,
        contactperson: this.$data.contactperson,
        email: this.$data.email,
        fax: this.$data.fax,
        phone1: this.$data.phone1,
        createdate: this.$data.createdate
      };

      if (this.$route.params.code) {
        post_param["code"] = this.$route.params.code
        HTTP.put(URL.updateCustomer, post_param)
          .then(response => {            
            this.$data.message = "Customer editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {            
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
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
  }
};
</script>