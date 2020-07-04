
<template>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
            <v-card class="elevation-12" style="width: 40%">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="input.username" 
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="input.password" 
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          // TODO: refactor, store mock account data in Vuex store
          this.input.username == this.$parent.$parent.mockAccount.username &&
          this.input.password == this.$parent.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "overview" });
        } else {
          this.showAlert("The username and / or password is incorrect");
        }
      } else {
        // TODO: replace with sweetalert
        this.showAlert("A username and password must be present");
      }
    },

    showAlert(message) {
      // Use sweetalert2
      this.$swal(message);
    }
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>