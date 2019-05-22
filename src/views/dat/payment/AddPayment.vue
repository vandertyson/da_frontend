<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex md12>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin thanh toán</h4>

              <v-radio-group v-model="doctype" row>
                <v-radio label="Customer" value="C"></v-radio>
                <v-radio label="Vendor" value="S"></v-radio>
                <v-radio label="Account" value="A"></v-radio>
              </v-radio-group>
              <v-autocomplete
                v-model="selectedCustomer"
                label="Mã số"
                :items="customers"
                item-text="code"
                item-value="code"
                v-on:change="customnerSelect"
                :rules="[(v) => !!v || 'Phải nhập khách hàng']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>

              <v-autocomplete
                v-model="selected_contact_person"
                label="Mã người liên hệ"
                :items="contacts"
                item-text="name"
                item-value="code"
                :rules="[(v) => !!v || 'Phải nhập người liên hệ']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>

              <v-menu
                v-model="menu_doc_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="docdate" label="Ngày nhập" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="docdate" @input="menu_doc_date = false"></v-date-picker>
              </v-menu>
              <v-menu
                v-model="menu_due_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="duedate" label="Due Date" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="duedate" @input="menu_due_date = false"></v-date-picker>
              </v-menu>
              <v-menu
                v-model="menu_tax_date"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="taxdate" label="Ngày chứng từ" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="taxdate" @input="menu_tax_date = false"></v-date-picker>
              </v-menu>

              <v-text-field
                label="Tổng số tiền phải thanh toán"
                v-model="doctotal"
                type="number"
                hint="số tiền thực tế (đã tính toán các khoản khác)"
                clearable
                :rules="[(v) => !!v || 'Phải nhập']"
              ></v-text-field>
              <v-select label="Chọn ngân hàng" :items="bankcode" v-model="selected_bankcode"></v-select>
              <v-text-field
                label="Số tài khoản"
                v-model="bankacount"
                clearable
                counter
                maxlength="100"
              ></v-text-field>
            </v-card>
          </v-flex>

          <v-layout align-end justify-end class="mr-4">
            <v-btn primary large color="warning" v-on:click="clear">CLEAR</v-btn>
            <!-- <router-link to="/item" tag="button"> -->
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
            <router-link to="/payment" tag="button">
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
// import Customer from "@/api/quotations/customer";
// import Countries from "@/api/country";
import Bankcode from "@/api/quotations/bankcode";
import Currency from "@/api/quotations/currency";
// import Sales from "@/api/quotations/sales";
// import Employees from "@/api/quotations/employee";
// import Items from "@/api/quotations/item";

export default {
  components: {},
  data() {
    return {
      dialog: false,
      ready: false,
      doctype: null,
      customers: [],
      contacts: [],
      selectedCustomer: null,
      selectedCustomerObj: null,
      selected_contact_person: null,
      selected_contact: null,
      menu_due_date: false,
      menu_doc_date: false,
      menu_tax_date: false,
      docdate: new Date().toISOString().substr(0, 10),
      duedate: new Date().toISOString().substr(0, 10),
      taxdate: new Date().toISOString().substr(0, 10),
      doctotal: "",
      bankcode: Bankcode,
      selected_bankcode: Bankcode[0],
      bankacount: "",
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    var p1 = HTTP.get(URL.getCustomer);
    var p2 = HTTP.get(URL.getContacts);
    var pAll = Promise.all([p1, p2]);
    pAll
      .then(res => {
        this.$data.customers = res[0].data;
        this.$data.contacts = res[1].data;
        this.$data.ready = true;
        if (this.$route.params.id) {
          HTTP.get(URL.getPaymentById + this.$route.params.id)
            .then(response => {
              console.log(response.data);
              this.$data.doctype = response.data.doctype;
              this.$data.selectedCustomer = response.data.code;
              this.customnerSelect(response.data.code);
              this.$data.selected_contact_person = parseInt(
                response.data.contactCode
              );
              this.$data.duedate = response.data.dueDate;
              this.$data.docdate = response.data.docDate;
              this.$data.taxdate = response.data.taxDate;
              this.$data.doctotal = response.data.doctotal;
              this.$data.selected_bankcode = response.data.bankcode;
              this.$data.bankacount = response.data.bankacount;
              console.log(this.$data.selectedCustomer);
            })
            .catch(error => {
              console.log(error);
              this.$data.ready = true;
            });
        } else {
          this.$data.ready = true;
        }
      })
      .catch(error => {
        this.$data.message = "Một số thông tin lấy lỗi";
        this.$data.snackbar = true;
        this.$data.ready = true;
      });
  },
  computed: {},
  methods: {
    customnerSelect: function(a) {
      try {
        this.$data.selectedCustomerObj = this.$data.customers.filter(function(
          itm
        ) {
          return itm.code == a;
        })[0];
        var name = this.$data.selectedCustomerObj.contactperson;
        var available_contacts = this.$data.contacts.filter(function(itm) {
          return itm.name == name;
        });
        if (available_contacts.length > 0) {
          this.$data.selected_contact_person = available_contacts[0].code;
        }
      } catch (error) {
        console.log(error);
      }
    },
    save: function() {
      if (!this.$refs.form.validate()) {
        this.$data.message = "Một số trường chưa được nhập. Không thể lưu";
        this.snackbar = true;
        return;
      }
      var post_param = {
        doctype: this.$data.doctype,
        name: this.$data.selectedCustomerObj.name,
        code: this.$data.selectedCustomerObj.code,
        contactCode: this.$data.selected_contact_person,
        docDate: this.$data.docdate,
        dueDate: this.$data.duedate,
        taxDate: this.$data.taxdate,
        doctotal: this.$data.doctotal,
        bankcode: this.$data.selected_bankcode,
        bankacount: this.$data.bankacount
      };

      if (this.$route.params.id) {
        post_param["id"] = this.$route.params.id;
        HTTP.put(URL.updatePayment, post_param)
          .then(response => {
            this.$data.message = "Payment editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
        HTTP.post(URL.addPayment, post_param)
          .then(response => {
            this.$data.message = "Payment added successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      }
    },
    clear: function() {
      this.doctotal = "";
    }
  }
};
</script>

