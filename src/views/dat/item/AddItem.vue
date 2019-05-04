<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex md12>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin chung</h4>

              <v-text-field label="Nhập mã vật tư hàng hóa" v-model="code"></v-text-field>
              <v-text-field label="Nhập tên vật tư" v-model="name"></v-text-field>

              <v-autocomplete
                v-model="selectedGroup"
                label="Nhóm hàng hóa"
                :items="group"
                item-text="name"
                item-value="code"
                :rules="[(v) => !!v || 'Phải nhập nhóm hàng']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>

              <v-text-field label="Nhập VAT" v-model="vat"></v-text-field>
              <v-text-field label="Nhập số lượng trong kho" v-model="onhand"></v-text-field>
              <v-text-field label="Nhập unit" v-model="uomcode"></v-text-field>
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
            <router-link to="/item" tag="button">
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
      selectedGroup: null,
      group: [],
      vat: "",
      onhand: 0,
      uomcode: "",
      createdate: new Date().toISOString().substr(0, 10),
      menu_create_date: false,
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    var p1 = HTTP.get(URL.getGroup);
    p1.then(res => {
      this.$data.group = res.data;
      this.$data.ready = true;
      if (this.$route.params.code) {
        HTTP.get(URL.getItembyId + this.$route.params.code)
          .then(response => {
            //doan nay gan lai cac bien vao trong
            console.log(response.data);
            this.$data.selectedGroup = parseInt(response.data.groupname);
            this.$data.code = response.data.code;
            this.$data.name = response.data.name;
            this.$data.vat = response.data.vat;
            this.$data.onhand = response.data.onhand;
            this.$data.uomcode = response.data.uomcode;
            this.$data.createdate = response.data.createdate;
            console.log(this.$data.groupname);
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
        code: this.$data.code,
        name: this.$data.name,
        groupname: this.$data.selectedGroup,
        vat: this.$data.vat,
        onhand: this.$data.onhand,
        uomcode: this.$data.uomcode,
        createdate: this.$data.createdate
      };
      //neu duong dan co cai bien id nay thi tuc la dang sua
      //neu ko thi them moi

      if (this.$route.params.code) {
        post_param["code"] = this.$route.params.code;
        HTTP.put(URL.updateItem, post_param)
          .then(response => {
            this.$data.message = "Item editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
        HTTP.post(URL.addNewItem, post_param)
          .then(response => {
            this.$data.message = "Item added successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      }
    }
  }
};
</script>