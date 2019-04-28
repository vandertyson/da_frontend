<template>
  <v-app id="login" class="primary">
    <div>
      <v-form ref="form" lazy-validation>
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4 lg4>
                <v-card class="elevation-1 pa-3">
                  <v-card-text>
                    <div class="layout column align-center">
                      <img
                        src="https://techcentral.co.za/wp-content/uploads/2019/02/sap-2156-1120-1024x532@2x.jpg"
                        alt="Vue Material Admin"
                        width="300"
                        height="150"
                      >
                      <h1 class="flex my-4 primary--text">DEMO ERP</h1>
                    </div>
                    <v-form>
                      <v-text-field
                        append-icon="person"
                        name="login"
                        label="Login"
                        type="text"
                        v-model="model.username"
                        ref="username"
                        :rules="[(v) => !!v || 'Phải nhập tên đăng nhập']"
                      ></v-text-field>
                      <v-text-field
                        append-icon="lock"
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        v-model="model.password"
                        ref="password"
                        v-on:keyup.enter="login()"
                        :rules="[(v) => !!v || 'Phải nhập mật khẩu']"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn icon>
                      <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red">fa fa-google fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-form>
    </div>
  </v-app>
</template>
<script>
import { read } from "fs";
export default {
  data: () => ({
    loading: false,
    model: {
      username: "",
      password: ""
    }
  }),

  methods: {
    login() {
      var ready = true;
      Object.keys(this.model).forEach(f => {
        if (!this.model[f] || this.model[f] === "") {
          ready = false;
        }
        this.$refs[f].validate(true);
      });
      if (ready) {
        this.loading = true;
        if (this.model.username == "admin") {
          localStorage.setItem("roleID", "admin");
        } else {
          localStorage.setItem("roleID", "emp");
        }
        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 500);
      }
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
