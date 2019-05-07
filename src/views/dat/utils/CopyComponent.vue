<template>
  <v-card md6>
    <v-card-title>
      <span class="headline">Select a source to copy</span>
    </v-card-title>
    <v-card-text>
      <v-tabs v-model="active" tabs grow>
        <v-tab v-for="source in copySource" :key="source.type">{{source.name}}</v-tab>
        <v-tab-item v-for="source in copySource" :key="source.type">
          <list-quotation></list-quotation>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="blue darken-1" flat large @click="select">Select</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { HTTP, URL } from "@/api/http-common";
import ListQuotation from "../quotation/ListQuotation";
export default {
  name: "copy-component",
  components: {
    ListQuotation
  },
  props: {
    copyObject: null
  },
  data() {
    return {
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
        }
      ],
      acvtive: "quot"
    };
  },
  computed: {},
  created() {
    console.log(this.$props.copyObject);
  },
  methods: {
    select: function() {
      this.$props.copyObject["haha"] = "dm";
      this.$emit("select", { ok: "ok" });
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
