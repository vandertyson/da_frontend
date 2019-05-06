<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin nhân viên</h4>
              <v-text-field label="ID nhân viên" v-model="id"></v-text-field>
              <v-text-field label="Nhập họ" v-model="firstname"></v-text-field>
              <v-text-field
                label="Nhập tên"
                v-model="lastname"
                :rules="[(v) => !!v || 'Phải nhập tên nhân viên']"
              ></v-text-field>
              <v-menu
                v-model="menu_birth_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="birthdate" label="Ngày sinh" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="birthdate" @input="menu_birth_date = false"></v-date-picker>
              </v-menu>
              <v-text-field label="Giới tính" v-model="sex"></v-text-field>
              <v-autocomplete
                v-model="selectedDept"
                label="Bộ phận làm việc"
                :items="dept"
                item-text="name"
                item-value="code"
                :rules="[(v) => !!v || 'Phải nhập bộ phận làm việc']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 md6>
            <v-card class="pa-4">
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field
                label="Nhập nghề nghiệp"
                v-model="jobtitle"
                :rules="[(v) => !!v || 'Phải nhập nghề nghiệp']"
              ></v-text-field>
              <v-text-field label="Quê quán" v-model="homecity"></v-text-field>
              <v-select label="Chọn ngân hàng" :items="bankcode" v-model="selected_bankcode"></v-select>
              <v-text-field label="Số tài khoản" v-model="bankacount"></v-text-field>
              <v-menu
                v-model="menu_start_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="startdate" label="Ngày cập nhật" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="startdate" @input="menu_start_date = false"></v-date-picker>
              </v-menu>
            </v-card>
          </v-flex>

          <v-layout align-end justify-end class="mr-4">
            <v-btn primary large color="warning" v-on:click="clear">CLEAR</v-btn>
            <router-link to="/employee" tag="button">
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
import Bankcode from "@/api/quotations/bankcode";
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
      menu_birth_date: false,
      birthdate: new Date().toISOString().substr(0, 10),
      sex: "",
      selectedDept: null,
      dept: [],
      email: "",
      jobtitle: "",
      homecity: "",
      bankcode: Bankcode,
      selected_bankcode: Bankcode[0],
      bankacount: "",
      startdate: new Date().toISOString().substr(0, 10),
      menu_start_date: false,
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    var p1 = HTTP.get(URL.getDept);
    p1.then(res => {
      this.$data.dept = res.data;
      this.$data.ready = true;
      if (this.$route.params.id) {
        HTTP.get(URL.getEmployeeById + this.$route.params.id)
          .then(response => {
            //doan nay gan lai cac bien vao trong
            console.log(response.data);
            this.$data.selectedDept = parseInt(response.data.deptname);
            this.$data.id = response.data.id;
            this.$data.firstname = response.data.firstname;
            this.$data.lastname = response.data.lastname;
            this.$data.birthdate = response.data.birthdate;
            this.$data.sex = response.data.sex;
            this.$data.email = response.data.email;
            this.$data.jobtitle = response.data.jobtitle;
            this.$data.homecity = response.data.homecity;
            this.$data.selected_bankcode = response.data.bankcode;
            this.$data.bankacount = response.data.bankacount;
            this.$data.startdate = response.data.startdate;
            console.log(this.$data.deptname);
          })
          .catch(error => {
            console.log(error);
            this.$data.ready = true;
          });
      } else {
        this.$data.ready = true;
      }
    }).catch(error => {
      this.$data.message = "Một số thông tin lấy lỗi";
      this.$data.snackbar = true;
      this.$data.ready = true;
    });
  },

  computed: {},
  methods: {
    save: function() {
      var post_param = {
        id: this.$data.id,
        firstname: this.$data.firstname,
        lastname: this.$data.lastname,
        birthdate: this.$data.birthdate,
        sex: this.$data.vat,
        deptname: this.$data.selectedDept,
        email: this.$data.email,
        jobtitle: this.$data.jobtitle,
        homecity: this.$data.homecity,
        bankcode: this.$data.selected_bankcode,
        bankacount: this.$data.bankacount,
        startdate: this.$data.startdate
      };

      if (this.$route.params.id) {
        post_param["id"] = this.$route.params.id;
        HTTP.put(URL.updateEmployee, post_param)
          .then(response => {
            this.$data.message = "Employee editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
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
    },
    clear: function() {
      this.id = "";
      this.firstname = "";
      this.lastname = "";
      this.sex = "";
      this.birthdate = new Date().toISOString().substr(0, 10);
      //this.dept = [];
      this.email = "";
      this.jobtitle = "";
      this.homecity = "";
      //this.bankcode = Bankcode;
      this.bankacount = "";
      this.startdate = new Date().toISOString().substr(0, 10);
    }
  }
};
</script>