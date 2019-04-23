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
              <v-text-field label="Nhập nhóm hàng" v-model="group"></v-text-field>
              <v-text-field label="Nhập VAT" v-model="vat"></v-text-field>
              <v-text-field label="Nhập số lượng trong kho" v-model="onhand"></v-text-field>
              <v-text-field label="Nhập unit" v-model="uomcode"></v-text-field>
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
      group: 0,
      vat: "",
      onhand: 0,
      uomcode: "",
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    if (this.$route.params.id) {
      HTTP.get(URL.getItem)
        .then(response => {
          //doan nay gan lai cac bien vao trong
          this.$data.code = response.data;
          this.$data.name = response.data;
          this.$data.group = response.data;
          this.$data.vat = response.data;
          this.$data.onhand = response.data;
          this.$data.uomcode = response.data;
          console.log(response.data);
          this.$data.code = response.data.code;
          this.$data.name = response.data.name;
          this.$data.group = response.data.group;
          this.$data.vat = response.data.vat;
          this.$data.onhand = response.data.onhand;
          this.$data.uomcode = response.data.uomcode;
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
        group: this.$data.group,
        vat: this.$data.vat,
        onhand: this.$data.onhand,
        uomcode: this.$data.uomcode
      };
      //neu duong dan co cai bien id nay thi tuc la dang sua
      //neu ko thi them moi

      if (this.$route.params.code) {
        HTTP.put(URL.updateItem, post_param)
          .then(response => {
            this.posts = response.data;
            this.$data.message = "Item editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            console.log(e);
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
        HTTP.post(URL.addNewItem, post_param)
          .then(response => {
            this.posts = response.data;
            this.$data.message = "Item added successfully!";
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