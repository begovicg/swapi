<template>
  <v-app id="app">
    <!--
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" color="primary">
            <v-btn >Logout</v-btn></router-link>
        </div>
    -->

    <v-app-bar color="primary accent-4" dense dark app v-if="authenticated">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Star Wars Fan App</v-toolbar-title>

      <v-spacer></v-spacer>

      <!--
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      -->

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="/login" v-on="on" @click="logout()">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>

      <!---
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      -->
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
  width: 1024px;
  margin: auto;
}
</style>