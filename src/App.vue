<template>
  <v-app id="app">

    <v-app-bar color="accent-4" dense dark app v-if="authenticated" id="header">

      <v-toolbar-title>Star Wars Fan App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="/login" v-on="on" @click="logout()" color="#FFE81F">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      
    </v-app-bar>

    <router-view @authenticated="setAuthenticated" />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "Ahsoka Tano",
        password: "Snips"
      }
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  /*width: 1024px;*/
  margin: auto;
  background-image: url(https://labourenergy.org/wp-content/uploads/2019/11/star-wars-background.jpg);
}

#app #header {
  color: #FFE81F;
  background-color: black;
}
</style>