<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md12>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin chung</h4>

              <v-text-field label="Nhập id nhân viên" v-model="id"></v-text-field>
              <v-text-field label="Nhập họ" v-model="firstname"></v-text-field>
              <v-text-field label="Nhập tên" v-model="lastname"></v-text-field>
              <v-text-field label="Nhập giới tính" v-model="sex"></v-text-field>
              <v-text-field label="Nhập bộ phận làm việc" v-model="dept"></v-text-field>
              <v-text-field label="Nhập email" v-model="email"></v-text-field>
              <v-text-field label="Nhập nghề nghiệp" v-model="jobtitle"></v-text-field>
              <v-text-field label="Nhập quê quán" v-model="homecity"></v-text-field>
              <v-menu
                v-model="menu_update_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="updatedate" label="Ngày cập nhật" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="docdate" @input="menu_update_date = false"></v-date-picker>
              </v-menu>
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
      id: "",
      firstname: "",
      lastname: "",
      sex: "",
      dept: "",
      email: "",
      jobtitle: "",
      homecity: "",
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
        id: this.$data.id,
        firstname: this.$data.firstname,
        lastname: this.$data.lastname,
        sex: this.$data.vat,
        dept: this.$data.dept
      };

      HTTP.post(URL.addNewEmployee, post_param)
        .then(response => {
          this.posts = response.data;
          this.$data.message = "Employee added successfully!";
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