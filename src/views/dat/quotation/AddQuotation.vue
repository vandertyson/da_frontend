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
                label="Nhập mã khách hàng"
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
              <v-text-field label="Nhập tên người đại diện" v-model="contactpersonname"></v-text-field>
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
                  <v-text-field v-model="duedate" label="Ngày hết hạn" readonly v-on="on"></v-text-field>
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
                label="Nhân viên bán hàng"
                :items="sales"
                item-text="name"
                item-value="code"
                v-on:change="saleSelect"
                :rules="[(v) => !!v || 'Phải nhập nhân viên bán hàng']"
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >{{ data.item.code }} - {{ data.item.name }}</template>
                <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
              </v-autocomplete>
              <v-autocomplete
                label="Nhân viên nhập chứng từ"
                :items="employees"
                item-text="name"
                item-value="id"
                v-on:change="employeeSelect"
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
              <h4 class="headline mb-0">Chi tiết báo giá</h4>
              <v-layout>
                <v-flex md5>
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
                    v-model="current_item.chiet_khau"
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
                  <td class="text-xs-left">{{ props.item.code }}</td>
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ props.item.quantity }}</td>
                  <td class="text-xs-left">{{ formatMoney(props.item.price, 0, ".", ",") }}</td>
                  <td class="text-xs-left">{{ props.item.chiet_khau }}</td>
                  <td class="text-xs-left">{{ props.item.vat }}</td>
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
      selectedCustomer: null,
      contactpersonname: null,
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
    HTTP.get(URL.getCustomer)
      .then(response => {
        this.$data.customers = response.data;
        this.$data.ready = true;
      })
      .catch(error => {});

    HTTP.get(URL.getItem)
      .then(response => {
        this.$data.items = response.data;
      })
      .catch(error => {});

    HTTP.get(URL.getEmployee)
      .then(response => {
        this.$data.employees = response.data;
      })
      .catch(error => {});

    HTTP.get(URL.getSale)
      .then(response => {
        this.$data.sales = response.data;
      })
      .catch(error => {});
  },
  computed: {},
  methods: {
    customnerSelect: function(a) {
      this.$data.selectedCustomer = this.$data.customers.filter(function(itm) {
        return itm.code == a;
      })[0];
      this.$data.contactpersonname = this.$data.selectedCustomer.contactperson;
    },
    saleSelect: function(a) {
      this.$data.selectedSale = this.$data.sales.filter(function(itm) {
        return itm.code == a;
      })[0];
    },
    employeeSelect: function(a) {
      this.$data.selectedEmployee = this.$data.employees.filter(function(itm) {
        return itm.id == a;
      })[0];
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
        chiet_khau: this.$data.current_item.chiet_khau,
        vat: this.$data.current_item.item.vat,
        total: this.calculate_total(),
        uom_code: this.$data.current_item.item.uom_code
      };
      console.log(row);
      this.$data.selected_items.push(row);
      this.calculate_sum();
    },
    calculate_total: function() {
      return (
        this.$data.current_item.quantity *
        this.$data.current_item.price *
        (1 + this.$data.current_item.item.vat / 100) *
        (1 - this.$data.current_item.chiet_khau / 100)
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
        name: this.$data.selectedCustomer.name,
        code: this.$data.selectedCustomer.code,
        saleemployee: this.$data.selectedSale.code,
        employee: this.$data.selectedEmployee.id,
        contactpersonname: this.$data.selectedCustomer.contactperson,
        docdate: this.$data.docdate,
        duedate: this.$data.duedate,
        taxdate: this.$data.taxdate,
        listItem: []
      };
      var si = this.$data.selected_items;
      for (let i = 0; i < si.length; i++) {
        post_param.listItem.push({
          itemcode: si[i].code,
          description: si[i].name,
          quantity: si[i].quantity,
          price: si[i].price,
          vatgroup: si[i].chiet_khau,
          taxcode: si[i].vat,
          total: si[i].total,
          currency: this.$data.selected_currency
        });
      }
      console.log(post_param);

      HTTP.post(URL.addQuot, post_param)
        .then(response => {
          this.posts = response.data;
          this.$data.message = "Quotaion added successfully!";
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