<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <div v-if="!ready" class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
      </div>
      <v-layout v-if="ready" row wrap>
        <router-link to="/employee/add" tag="button">
          <v-btn color="success" class="text-lg-right">Add new Employee</v-btn>
        </router-link>
        <v-flex md6>
          <v-text-field
            label="Search Employee"
            v-model="empName"
            append-icon="search"
            v-on:keyup.enter="searchEmployee()"
          ></v-text-field>
        </v-flex>
        <v-flex lg12 text-xs-right>
          <v-card class="pa-12">
            <v-data-table :headers="headers" :items="employees" class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ getName(props.item.firstname, props.item.lastname) }}</td>
                <td class="text-xs-left">{{ props.item.sex }}</td>
                <td class="text-xs-left">{{ props.item.deptname }}</td>
                <td class="text-xs-left">{{ props.item.jobtitle }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.homecity }}</td>
                <td class="text-xs-left">{{ props.item.updatedate }}</td>

                <td class="text-xs-left">
                  <router-link v-bind:to="getEditRoute(props.item.id)" tag="button">
                    <v-btn flat small color="info">Edit</v-btn>
                  </router-link>
                  <v-btn flat small color="error" v-on:click="deleteEmployee(props.item.id)">Delete</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar" top :timeout="3000">
        {{message}}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { HTTP, URL } from "@/api/http-common";
import { error } from "util";
export default {
  components: {},
  data() {
    return {
      headers: [
        { text: "Employee ID", align: "left", value: "id" },
        { text: "Employee Name", align: "left", value: "name" },
        { text: "Sex", align: "left", value: "sex" },
        { text: "Department", align: "left", value: "deptname" },
        { text: "Job", align: "left", value: "jobtitle" },
        { text: "Email", align: "left", value: "email" },
        { text: "City", align: "left", value: "homecity" },
        { text: "Date", align: "left", value: "updatedate" },
        { text: "", align: "left", value: "" }
      ],
      employees: [],
      ready: false,
      snackbar: false,
      message: null,
      empName: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  methods: {
    getName: function(first_name, last_name) {
      if (first_name && last_name) {
        return last_name + " " + first_name;
      }
      return "N/A";
    },
    loadData: function() {
      this.$data.ready = false;
      //console.log(URL.getEmployee);
      HTTP.get(URL.getEmployee)
        .then(response => {
          this.$data.ready = true;
          this.$data.employees = response.data;
        })
        .catch(error => {
          this.$data.ready = true;
        });
    },
    getEditRoute: function(id) {
      return "/employee/edit/" + id;
    },
    deleteEmployee: function(empID) {
      if (confirm("Bạn có chăc chắn muốn xóa?")) {
        HTTP.delete(URL.deleteEmployee + empID)
          .then(response => {
            this.$data.message = "Đã xóa thành công. Đang tải lại dữ liệu ...";
            this.snackbar = true;
            this.loadData();
          })
          .catch(error => {
            this.$data.message = "Đã có lỗi không xóa được";
            this.snackbar = true;
          });
      }
    },
    searchEmployee: function() {
      HTTP.get(URL.getEmployee, {
        params: {
          name: this.$data.empName
        }
      })
        .then(response => {
          this.$data.employees = response.data;
        })
        .catch(error => {
          this.$data.message = "Đã có lỗi";
          this.snackbar = true;
        });
    }
  }
};
</script>