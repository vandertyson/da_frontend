<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex md10>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin khách hàng</h4>

              <v-text-field
                label="Mã khách hàng"
                v-model="code"
                counter
                maxlength="15"
                hint="BusinessPartner Code, including Numbers and Characters"
                clearable
                :rules="[(v) => !!v || 'Phải nhập mã khách hàng']"
              ></v-text-field>
              <v-text-field
                label="Tên khách hàng"
                v-model="name"
                counter
                maxlength="100"
                clearable
                :rules="[(v) => !!v || 'Phải nhập tên khách hàng']"
              ></v-text-field>
              <v-text-field
                label="Người liên hệ"
                v-model="contactperson"
                counter
                maxlength="90"
                hint="Contact name"
                clearable
              ></v-text-field>
              <v-text-field label="E-mail" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
              <v-text-field
                label="Số fax"
                v-model="fax"
                counter
                maxlength="20"
                clearable
                type="number"
              ></v-text-field>
              <v-text-field
                label="Số điện thoại"
                v-model="phone1"
                counter
                maxlength="20"
                clearable
                type="number"
                :rules="[(v) => !!v || 'Phải nhập số điện thoại']"
              ></v-text-field>
              <v-text-field
                label="Tài khoản ngân hàng"
                v-model="bankcode"
                counter
                maxlength="30"
                clearable
                :rules="[(v) => !!v || 'Phải nhập tài khoản ngân hàng']"
              ></v-text-field>
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
            <v-btn primary large color="warning" v-on:click="clear">CLEAR</v-btn>
            <!-- <router-link to="/customer" tag="button"> -->
            <v-btn primary large v-on:click="dialog=true">CANCEL</v-btn>
            <!-- </router-link> -->
            <v-btn primary large color="success" v-on:click="save">SAVE</v-btn>
          </v-layout>
          <v-snackbar v-model="snackbar" top :timeout="3000">
            {{message}}
            <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-layout>
      </v-container>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure you want to cancel ?</v-card-title>
          <v-card-text>All your actions might be unsaved</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
            <router-link to="/customer" tag="button">
              <v-btn color="green darken-1" flat @click="dialog = false">Yes</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      dialog: false,
      ready: false,
      code: "",
      name: "",
      contactperson: "",
      email: "",
      bankcode: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      fax: 0,
      phone1: 0,
      createdate: new Date().toISOString().substr(0, 10),
      menu_create_date: false,
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
          this.$data.bankcode = response.data.bankcode;
          this.$data.createdate = response.data.createdate;
        })
        .catch(error => {});
    }
  },
  computed: {},
  methods: {
    save: function() {
      if (!this.$refs.form.validate()) {
        this.$data.message = "Một số trường chưa được nhập. Không thể lưu";
        this.snackbar = true;
        return;
      }
      var post_param = {
        code: this.$data.code,
        name: this.$data.name,
        contactperson: this.$data.contactperson,
        email: this.$data.email,
        fax: this.$data.fax,
        phone1: this.$data.phone1,
        bankcode: this.$data.bankcode,
        createdate: this.$data.createdate
      };

      if (this.$route.params.code) {
        post_param["code"] = this.$route.params.code;
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
    },
    clear: function() {
      this.code = "";
      this.name = "";
      this.contactperson = "";
      this.email = "";
      this.fax = 0;
      this.phone1 = 0;
      this.bankcode = "";
    }
  }
};
</script>