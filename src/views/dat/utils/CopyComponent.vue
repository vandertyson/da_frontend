<template>
  <v-card md6>
    <v-card-text>
      <v-tabs v-model="active" tabs grow>
        <v-tab v-for="source in copySource" :key="source.type">Copy from {{source.name}}</v-tab>
        <v-tab-item v-for="source in copySource" :key="source.type">
          <list-quotation v-if="source.type === 'quot'" :isSelect="true" @selectCopy="onSelect"></list-quotation>
          <list-order v-if="source.type === 'order'" :isSelect="true" @selectCopy="onSelect"></list-order>
          <list-delivery v-if="source.type === 'delv'" :isSelect="true" @selectCopy="onSelect"></list-delivery>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="blue darken-1" flat large @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { HTTP, URL } from "@/api/http-common";
import ListQuotation from "../quotation/ListQuotation";
import ListOrder from "../order/ListOrder";
import ListDelivery from "../delivery/ListDelivery";
export default {
  name: "copy-component",
  components: {
    ListQuotation,
    ListOrder,
    ListDelivery
  },
  data() {
    return {
      active: "quot",
      active: "order",
      active: "delv",
      copySource: [
        {
          type: "quot",
          name: "Quotation",
          get_link: URL.getQuot
        },
        {
          type: "order",
          name: "Order",
          get_link: URL.getOrder
        },
        {
          type: "delv",
          name: "Delivery",
          get_link: URL.getDelivery
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    onSelect: function(event) {
      this.$emit("select", event);
    },
    cancel: function() {
      this.$emit("select", {"type":"cancel"});
    }
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';
#appDrawer {
  overflow: hidden;

  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
</style>
