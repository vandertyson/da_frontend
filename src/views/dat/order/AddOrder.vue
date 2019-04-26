<template>
  <div id="page-forms">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container grid-list-xl fluid>
        <div v-if="!ready" class="text-xs-center">
          <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
        </div>
        <v-layout v-if="ready" row wrap>
          <v-flex md5>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Thông tin chung</h4>
              <v-autocomplete
                v-model="selectedCustomer"
                label="Mã khách hàng"
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
                :rules="[(v) => !!v || 'Phải nhập ngườii liên hệ']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>

              <v-select label="Chọn currency" :items="currency" v-model="selected_currency"></v-select>
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
                  <v-text-field v-model="duedate" label="Ngày hết hạn chứng từ" readonly v-on="on"></v-text-field>
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
              <v-autocomplete
                v-model="selectedSale"
                label="Nhân viên bán hàng"
                :items="sales"
                item-text="name"
                item-value="code"
                :rules="[(v) => !!v || 'Phải nhập nhân viên bán hàng']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>
              <v-autocomplete
                v-model="selectedEmployee"
                label="Nhân viên nhập chứng từ"
                :items="employees"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Phải nhập nhân viên chứng từ']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.lastname }}, {{ data.item.firstname }}</template>
                <template
                  slot="item"
                  slot-scope="data"
                >{{ data.item.lastname }}, {{ data.item.firstname }}</template>
              </v-autocomplete>
            </v-card>
          </v-flex>
          <v-flex md7>
            <v-card class="pa-4">
              <h4 class="headline mb-0">Chi tiết đơn hàng bán</h4>
              <v-layout>
                <v-flex md4>
                  <v-autocomplete
                    label="Chọn item"
                    :items="items"
                    item-text="name"
                    item-value="code"
                    v-on:change="itemSelect"
                  >
                    <template slot="selection" slot-scope="data">{{ data.item.name }}</template>
                    <template
                      slot="item"
                      slot-scope="data"
                    >{{ data.item.code }} - {{ data.item.name }}</template>
                  </v-autocomplete>
                </v-flex>
                <v-flex md2>
                  <v-text-field
                    v-bind:label="getOnHand()"
                    type="number"
                    v-model="current_item.quantity"
                  ></v-text-field>
                </v-flex>
                <v-flex md2>
                  <v-text-field label="Nhập đơn giá" type="number" v-model="current_item.price"></v-text-field>
                </v-flex>
                <v-flex md2>
                  <v-text-field
                    label="Nhập chiết khấu (%)"
                    type="number"
                    v-model="current_item.discount"
                  ></v-text-field>
                </v-flex>
                <v-flex md1>
                  <v-btn small fab dark color="success" v-on:click="addItem">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-data-table :headers="headers" :items="selected_items" class="elevation-1 mt-4">
                <template v-slot:items="props">
                  <td class="text-xs-left">{{ props.item.code || props.item.itemcode }}</td>
                  <td class="text-xs-left">{{ props.item.name || props.item.description }}</td>
                  <td class="text-xs-left">{{ props.item.quantity }}</td>
                  <td class="text-xs-left">{{ formatMoney(props.item.price, 0, ".", ",") }}</td>
                  <td class="text-xs-left">{{ props.item.discount || 0 }}</td>
                  <td class="text-xs-left">{{ props.item.vat || 0}}</td>
                  <td class="text-xs-left">{{ formatMoney(props.item.total, 0, ".", ",") }}</td>
                  <td class="text-xs-left">{{ props.item.uom_code }}</td>
                  <td class="text-xs-left">
                    <v-btn flat small color="error" v-on:click="removeItem(props.index)">Remove</v-btn>
                  </td>
                </template>
              </v-data-table>
              <v-divider></v-divider>
              <v-flex md6 offset-md6 class="mt-4">
                <v-text-field
                  label="Tổng số trước chiết khấu"
                  readonly
                  v-bind:value="formatMoney(tong_truoc_chiet_khau,0, '.', ',')"
                ></v-text-field>
                <v-text-field
                  label="Chiết khấu (%)"
                  v-model="chiet_khau"
                  v-on:change="calculate_sum"
                ></v-text-field>
                <v-text-field label="Thuế" readonly v-bind:value="formatMoney(thue,0, '.', ',')"></v-text-field>
                <v-text-field
                  label="Làm tròn"
                  readonly
                  v-bind:value="formatMoney(lam_tron,0, '.', ',')"
                ></v-text-field>
                <v-text-field
                  label="Tổng thanh toán"
                  readonly
                  v-bind:value="formatMoney(tong_thanh_toan,0, '.', ',')"
                ></v-text-field>
              </v-flex>
            </v-card>
          </v-flex>

          <v-layout align-end justify-end class="mr-4">
            <router-link to="/order" tag="button">
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
import { setTimeout } from "timers";
import { Promise } from "q";
// import Sales from "@/api/quotations/sales";
// import Employees from "@/api/quotations/employee";
// import Items from "@/api/quotations/item";

export default {
  components: {},
  data() {
    return {      
      headers: [
        { text: "Mã hàng hóa", align: "left" },
        { text: "Mô tả hàng hóa", align: "left" },
        { text: "Số lượng", align: "left" },
        { text: "Đơn giá", align: "left" },
        { text: "Chiết khấu (%)", align: "left" },
        { text: "Thuể (%)", align: "left" },
        { text: "Thành tiền", align: "left" },
        { text: "Đơn vị", align: "left" },
        { text: "", align: "left" }
      ],
      ready: false,
      customers: [],
      contacts: [],
      selectedCustomer: null,
      selectedCustomerObj: null,
      selected_contact_person: null,
      selected_contact: null,
      selectedSale: null,
      selectedEmployee: null,
      currency: Currency,
      menu_due_date: false,
      menu_doc_date: false,
      menu_tax_date: false,
      sales: [],
      employees: [],
      items: [],
      selected_currency: Currency[0],
      current_item: {
        item: null,
        quantity: 0,
        price: 0,
        chiet_khau: 0
      },
      selected_items: [],
      docdate: new Date().toISOString().substr(0, 10),
      duedate: new Date().toISOString().substr(0, 10),
      taxdate: new Date().toISOString().substr(0, 10),
      docStatus: "Open",
      tong_truoc_chiet_khau: 0,
      tong_thanh_toan: 0,
      chiet_khau: 0,
      thue: 0,
      lam_tron: 0,
      valid: false,
      snackbar: false,
      message: null
    };
  },
  created() {
    var p1 = HTTP.get(URL.getCustomer);
    var p2 = HTTP.get(URL.getContacts);
    var p3 = HTTP.get(URL.getItem);
    var p4 = HTTP.get(URL.getEmployee);
    var p5 = HTTP.get(URL.getSale);
    var pAll = Promise.all([p1, p2, p3, p4, p5]);
    pAll
      .then(res => {
        this.$data.customers = res[0].data;
        this.$data.contacts = res[1].data;
        this.$data.items = res[2].data;
        this.$data.employees = res[3].data;
        this.$data.sales = res[4].data;
        this.$data.ready = true;
        if (this.$route.params.id) {
          HTTP.get(URL.getOrderById + this.$route.params.id)
            .then(response => {
              console.log(response.data);
              this.$data.selectedCustomer = response.data.code;
              this.customnerSelect(response.data.code);
              this.$data.selected_contact_person = parseInt(
                response.data.contactCode
              );
              this.$data.selectedSale = parseInt(response.data.saleEmployee);
              this.$data.selectedEmployee = parseInt(response.data.employee);
              this.$data.selected_items = response.data.listItem;
              this.$data.duedate = response.data.dueDate;
              this.$data.docdate = response.data.docDate;
              this.$data.selected_currency = response.data.currency;
              this.calculate_sum();
              console.log(this.$data.selectedCustomer);
              console.log(this.$data.saleEmployee);
              console.log(this.$data.employee);
            })
            .catch(error => {
              console.log(error);
              this.$data.ready = true;
            });
        } else {
          this.$data.ready = true;
        }
      })
      .catch(err => {
        console.log(err);
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
        console.log(error)
      }
    },
    itemSelect: function(a) {
      this.$data.current_item.item = this.$data.items.filter(function(itm) {
        return itm.code == a;
      })[0];
    },
    addItem: function(a) {
      var row = {
        code: this.$data.current_item.item.code,
        name: this.$data.current_item.item.name,
        quantity: this.$data.current_item.quantity,
        price: this.$data.current_item.price,
        discount: this.$data.current_item.discount,
        vat: this.$data.current_item.item.vat,
        total: this.calculate_total(this.$data.current_item),
        uom_code: this.$data.current_item.item.uom_code
      };
      console.log(row);
      this.$data.selected_items.push(row);
      this.calculate_sum();
    },
    calculate_total: function(item) {
      var ck = item.discount || item.taxcode;
      console.log(
        item.quantity * item.price * (1 + item.vat / 100) * (1 - ck / 100)
      );
      console.log(ck);
      console.log(item);
      return (
        item.quantity * item.price * (1 + item.item.vat / 100) * (1 - ck / 100)
      );
    },
    calculate_sum: function() {
      this.$data.tong_truoc_chiet_khau = 0;
      this.$data.thue = 0;
      this.$data.lam_tron = 0;
      this.$data.tong_thanh_toan = 0;
      for (let i = 0; i < this.$data.selected_items.length; i++) {
        this.$data.tong_truoc_chiet_khau +=
          this.$data.selected_items[i].quantity *
          this.$data.selected_items[i].price;
        this.$data.thue +=
          (this.$data.selected_items[i].quantity *
            this.$data.selected_items[i].price *
            this.$data.selected_items[i].vat) /
          100;
      }
      this.$data.lam_tron = this.$data.tong_truoc_chiet_khau + this.$data.thue;
      this.$data.tong_thanh_toan =
        this.$data.lam_tron * (1 - this.$data.chiet_khau / 100);
    },
    removeItem: function(a) {
      this.$data.selected_items.splice(a, 1);
    },
    getOnHand: function(a) {
      if (this.$data.current_item.item != null) {
        return (
          "Nhập số lượng (max: " + this.$data.current_item.item.onhand + ")"
        );
      }
      return "Nhập số lượng";
    },
    formatMoney: function(n, c, d, t) {
      var c = isNaN((c = Math.abs(c))) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
        j = (j = i.length) > 3 ? j % 3 : 0;

      return (
        s +
        (j ? i.substr(0, j) + t : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
        (c
          ? d +
            Math.abs(n - i)
              .toFixed(c)
              .slice(2)
          : "")
      );
    },
    save: function() {
      if (!this.$refs.form.validate()) {
        this.$data.message = "Một số trường chưa được nhập. Không thể lưu";
        this.snackbar = true;
        return;
      }
      if (
        this.$data.selected_items === undefined ||
        this.$data.selected_items.length == 0
      ) {
        this.$data.message = "Phải thêm mặt hàng trong phần chi tiết báo giá";
        this.$data.snackbar = true;
        return;
      }
      var post_param = {
        name: this.$data.selectedCustomerObj.name,
        code: this.$data.selectedCustomerObj.code,
        contactCode: this.$data.selected_contact_person,
        saleEmployee: this.$data.selectedSale,
        employee: this.$data.selectedEmployee,
        docDate: this.$data.docdate,
        dueDate: this.$data.duedate,
        taxDate: this.$data.taxdate,
        currency: this.$data.selected_currency,
        docstatus: "O",
        listItem: []
      };
      var si = this.$data.selected_items;
      for (let i = 0; i < si.length; i++) {
        post_param.listItem.push({
          itemcode: si[i].code || si[i].itemcode,
          description: si[i].name || si[i].description,
          quantity: si[i].quantity,
          price: si[i].price,
          discount: si[i].chiet_khau || si[i].vat,
          vat: si[i].vat || 10,
          total: si[i].total || this.calculate_total(si[i]),
          currency: this.$data.selected_currency,
          uomcode: si[i].uomcode
        });
      }

      //có id tức là đang sửa. ko có tức là đang thêm
      if (this.$route.params.id) {
        post_param["id"] = parseInt(this.$route.params.id);
        console.log(post_param);
        HTTP.put(URL.updateOrder, post_param)
          .then(response => {
            this.posts = response.data;
            this.$data.message = "SalesOrder editted successfully!";
            this.$data.snackbar = true;
          })
          .catch(e => {
            console.log(e);
            this.$data.message = "Some errors happened!";
            this.$data.snackbar = true;
          });
      } else {
        console.log(post_param);
        HTTP.post(URL.addOrder, post_param)
          .then(response => {
            this.posts = response.data;
            this.$data.message = "SalesOrder added successfully!";
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