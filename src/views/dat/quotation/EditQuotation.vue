<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <div v-if="!ready" class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
      </div>
      <v-layout v-if="ready" row wrap>
        <v-flex xs6>
          <v-autocomplete
            label="Nhập mã khách hàng"
            :items="customers"
            item-text="code"
            item-value="code"
            v-on:change="customnerSelect"
          >
            <template slot="selection" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
            <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
          </v-autocomplete>
          <v-autocomplete
            label="Chọn người đại diện"
            :items="customers"
            item-text="code"
            item-value="code"
            v-on:change="customnerSelect"
          >
            <template slot="selection" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
            <template slot="item" slot-scope="data">{{ data.item.code }} - {{ data.item.name }}</template>
          </v-autocomplete>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { HTTP } from "@/api/http-common";
import Customer from "@/api/customer";
import Countries from "@/api/country";
export default {
  components: {},
  data() {
    return {
      ready: false,
      customers: [],
      selectedCustomer: null
    };
  },
  created() {
    setTimeout(() => {
      this.$data.customers = Customer;
      this.selectedCustomer = Customer[0];
      this.$data.ready = true;
    }, 1000);
  },
  computed: {},
  methods: {
    customnerSelect: function(a) {
      this.$data.selectedCustomer = this.$data.customers.filter(function(itm) {
        return itm.code == a;
      })[0];
      console.log(this.$data.selectedCustomer);
    }
  }
};
</script>