<template>
  <v-layout row wrap>
    <v-flex v-if="roleID=='admin'" sm6 md6 xs12 class="pa-4">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>New Quotation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="refreshQuot()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line style="overflow:auto; height:400px">
          <div v-if="quots.length == 0" class="text-lg-center display-1 mt-4">No new quotation</div>
          <template v-for="(item, index) in quots">
            <v-list-tile :key="index" avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p
                    class="hover"
                    style="cursor: pointer"
                    @click="gotoQuout(item.id)"
                  >{{ item.headline }}</p>
                </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn class="success" @click="approve(item.id)">Approve</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < quots.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>

    <v-flex v-if="roleID=='admin'" sm6 md6 xs12 class="pa-4">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>New Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="refreshOrder()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line style="overflow:auto; height:400px">
          <div v-if="orders.length == 0" class="text-lg-center display-1 mt-4">No new order</div>
          <template v-for="(item, index) in orders">
            <v-list-tile :key="index" avatar ripple>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p
                    class="hover"
                    style="cursor: pointer"
                    @click="gotoOrder(item.id)"
                  >{{ item.headline }}</p>
                </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn class="success" @click="approve(item.id)">Approve</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < orders.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <template v-for="stat in stats">
      <v-flex md3 sm3 xs12 class="pa-4">
        <v-card color="info">
          <v-card-title primary-title class="white--text justify-center">
            <div class="text-center display-4">{{stat.number}}</div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn flat dark>{{stat.name}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </template>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{message}}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>
<style scoped>
.hover:hover {
  color: blue;
}
</style>
<script>
import { HTTP, URL } from "@/api/http-common";
import AppQuot from "@/api/quotations/approve_quotation";
import Stat from "@/api/quotations/stat";
// import Countries from "@/api/country";
export default {
  data() {
    return {
      roleID: localStorage.getItem("roleID"),
      orders: [],
      quots: [],
      stats: [],
      snackbar: false,
      message: null
    };
  },
  created() {
    this.stats = Stat;
    // this.orders = AppQuot;
    this.getQuot();
  },
  methods: {
    // lấy về những quotation chưa confirm
    // ông thử viết đi
    getQuot: function() {
      HTTP.get(URL.getQuot, {
        params: {
          status: "O"
        }
      })
        .then(response => {
          this.$data.quots = []
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            var x = {
              id: element.id,
              headline: element.name,
              title: element.dueDate,
              subtitle: element.slpname
            };
            this.$data.quots.push(x);
          }
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    refreshQuot: function() {
      this.getQuot()
    },
    refreshOrder: function() {
      this.orders = [];
    },
    gotoQuout: function(id) {
      console.log("/quotation/edit/" + id);
      this.$router.push("/quotation/edit/" + id);
    },
    gotoOrder: function() {},
    approve: function(id) {      
      HTTP.get(URL.confirm, {
        params: {
          id: parseInt(id),
          confirm: "C"
        }
      })
        .then(response => {
          this.getQuot()
          this.$data.message = "Quotation approved successfully!";
          this.$data.snackbar = true;
        })
        .catch(error => {
          this.$data.message = "Some errors happened!";
          this.$data.snackbar = true;
        });
    }
  }
};
</script>