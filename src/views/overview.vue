<template>
  <v-container class="fill-height" fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="categories"
          label="Select category"
          v-model="activeCategory"
          outlined
          @change="getResources()"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" v-if="activeCategoryData">
        <!--
        <vue-json-pretty :data="activeCategoryData" v-if="activeCategoryData"></vue-json-pretty>
        -->

        <!-- List fetched items by their basic property -->
        <!-- Title for films, name for others -->

        <v-card width="100%">
          <v-list>
            <v-list-item v-for="item in activeCategoryData" :key="item.url">

              <v-list-item-avatar color="black">
                <span class="white--text">SW</span>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" v-if="activeCategory=='films'"></v-list-item-title>
                <v-list-item-title v-text="item.name" v-else></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="primary lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const CATEGORIES = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles"
];
const SWAPI_base_url = "https://swapi.dev/api/";

function buildUrl(url) {
  return SWAPI_base_url + url + "/";
}

import axios from "axios";
//import VueJsonPretty from "vue-json-pretty";

export default {
  name: "overview",
  components: {
    //VueJsonPretty
  },
  data() {
    return {
      categories: CATEGORIES,
      activeCategory: null,
      activeCategoryData: null
    };
  },
  mounted() {},
  methods: {
    getResources() {
      let url = buildUrl(this.activeCategory);
      axios
        .get(url)
        .then(response => {
          this.activeCategoryData = response.data.results;
          console.log("fetched category results: ", this.activeCategoryData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCategoryKey(category) {
      if (category == "films") return "title";
      return "name";
    }
  }
};
</script>

<style scoped>
#overview {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}

.container {
  padding: 20px 0;
}

.column:last-child:not(:first-child),
.columns:last-child:not(:first-child) {
  float: left;
}

.main_heading {
  margin: 10px 0 30px;
}

.callout {
  margin-bottom: 40px;
}

select {
  text-transform: capitalize;
}

.loader {
  text-align: center;
  padding: 40px;
}

.uppercase {
  text-transform: uppercase;
}
</style>