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
                <v-btn icon @click.stop="showResourceDetails(item)">
                  <v-icon color="primary lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resource details dialog -->
    <!-- TODO: encapsulate in separate component -->

    <v-dialog v-model="dialog" @keydown.esc="dialog = false" scrollable>
      <v-card>
        <v-card-title class="headline" v-if="activeCategory=='films'">{{dialogResource.title}}</v-card-title>
        <v-card-title class="headline" v-else>{{dialogResource.name}}</v-card-title>

        <v-card-text>
          <vue-json-pretty :data="dialogResource"></vue-json-pretty>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="dialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "overview",
  components: {
    VueJsonPretty
  },
  data() {
    return {
      categories: CATEGORIES,
      activeCategory: null,
      activeCategoryData: null,
      dialog: false,
      dialogResource: {}
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
        })
        .catch(error => {
          this.$swal("Error encountered while fetching data: ", error);
        });
    },
    showResourceDetails(resource) {
      this.dialogResource = resource;
      this.dialog = true;
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