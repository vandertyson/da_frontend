<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex md12>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin chung</h4>

              <v-text-field
                label="Nhập mã kho"
                v-model="code"
                clearable
                maxlength="8"
                counter
                :rules="[(v) => !!v || 'Phải nhập mã kho']"
              ></v-text-field>
              <v-text-field
                label="Nhập tên kho"
                v-model="name"
                clearable
                counter
                maxlength="100"
                :rules="[(v) => !!v || 'Phải nhập tên kho hàng']"
              ></v-text-field>
              <v-text-field
                label="Nhập trạng thái"
                v-model="lock"
                clearable
                counter
                maxlength="1"
                hint="N: changeable, Y: Locked"
                value="text"
                :rules="[(v) => !!v || 'Phải nhập trạng thái']"
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
            <!-- <router-link to="/warehouse" tag="button"> -->
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
            <router-link to="/warehouse" tag="button">
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
// import Currency from "@/api/quotations/currency";
export default {
  components: {},
  data() {
    return {
      dialog: false,
      ready: false,
      code: "",
      name: "",
      lock: "",
      createdate: new Date().toISOString().substr(0, 10),
      menu_create_date: false,
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    if (this.$route.params.code) {
      HTTP.get(URL.getWhsByCode + this.$route.params.code)
        .then(response => {
          //doan nay gan lai cac bien vao trong
          console.log(response.data);
          this.$data.code = response.data.code;
          this.$data.name = response.data.name;
          this.$data.lock = response.data.lock;
          this.$data.createdate = response.data.createdate;
        })
        .catch(error => {
          console.log(error);
          this.$data.ready = true;
        });
    } else {
      this.$data.ready = true;
    }
  },
  computed: {},
  methods: {
    save: function() {
      var post_param = {
        code: this.$data.code,
        name: this.$data.name,
        lock: this.$data.lock,
        createdate: this.$data.createdate
      };

      if (this.$route.params.code) {
        post_param["code"] = this.$route.params.code;
        HTTP.put(URL.updateWhs, post_param)
          .then(response => {
            this.$data.message = "Warehouse editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
        HTTP.post(URL.addWhs, post_param)
          .then(response => {
            this.posts = response.data;
            this.$data.message = "Warehouse added successfully!";
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
      //this.group = [];
      this.vat = "";
      this.onhand = 0;
      this.uomcode = "";
    }
  }
};
</script>