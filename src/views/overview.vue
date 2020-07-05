<template>
  <v-container style="margin-top: 150px">
    <v-row justify="center">
      <v-col class cols="12" sm="5">
        <v-row>
          <v-card class="infoCard">
            <v-card-text>
              <div>Category filter</div>
              <br />
              <p>NOTE - filter applies before fuzzy search criteria</p>
            </v-card-text>
          </v-card>

          <v-select
            :items="categories"
            label="Select category"
            v-model="activeCategory"
            outlined
            auto
            dark
          ></v-select>
        </v-row>

        <v-row>
          <v-card class="infoCard">
            <v-card-text>
              <div>Fuzzy search</div>
              <br />
              <p>NOTE - Entire result set will be parsed, any record whose property contains entered string will be displayed in the right sections</p>
            </v-card-text>
          </v-card>
          <v-text-field label="Fuzzy search records" placeholder v-model="fuzzySearch" outlined dark></v-text-field>
        </v-row>

        <v-row>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="showRandomRecord()">Random</v-btn>
            </template>
            <span>Random record from current set</span>
          </v-tooltip>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- List fetched items by their basic property -->
        <!-- Title for films, name for others -->
        <v-card width="100%" height="max-content">
          <v-list>
            <v-list-item v-for="item in filteredRecords" :key="item.url">
              <v-list-item-avatar color="black">
                <span class="white--text sw">SW</span>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" v-if="item.title"></v-list-item-title>
                <v-list-item-title v-text="item.name" v-else></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click.stop="showResourceDetails(item)">
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </template>
                  <span>Show details</span>
                </v-tooltip>
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
        <v-card-title class="headline" v-if="dialogResource.title">{{dialogResource.title}}</v-card-title>
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
const SUBCATEGORIES = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles"
];

const CATEGORIES = [
  "all",
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
      activeCategory: "all",
      records: [],
      dialog: false,
      dialogResource: {},
      fuzzySearch: ""
    };
  },
  mounted() {
    this.getResources();
  },
  methods: {
    getResources() {
      // Reset active category data
      this.records = [];

      let urlArray = [];
      SUBCATEGORIES.forEach(sub => {
        let axiosRequest = axios.get(buildUrl(sub));
        urlArray.push(axiosRequest);
      });

      axios
        .all(urlArray)
        .then(
          axios.spread((...responses) => {
            responses.forEach(responseSet => {
              this.records.push(...responseSet.data.results);
            });
          })
        )
        .catch(errors => {
          this.$swal("Error encountered while fetching data: ", errors);
        });
    },
    showResourceDetails(resource) {
      this.dialogResource = resource;
      this.dialog = true;
    },
    // NOTE: try generating random record from result set and displaying it in dialog
    showRandomRecord() {
      let idx = Math.floor(Math.random() * this.filteredRecords.length);
      this.showResourceDetails(this.filteredRecords[idx]);
    }
  },
  computed: {
    // TODO: Expand filtered records with 1st step - filter against value in dropdown
    filteredRecords: function() {
      return this.records
        .filter(record => {
          let recordCategory = record.url
            .split("http://swapi.dev/api/")
            .pop()
            .split("/")[0];
          if (this.activeCategory == "all") return true;
          return recordCategory == this.activeCategory;
        })
        .filter(
          record =>
            JSON.stringify(record)
              .toLowerCase()
              .indexOf(this.fuzzySearch.toLowerCase()) !== -1
        );
    }
  }
};
</script>

<style scoped>
.infoCard {
  width: 100%;
  margin-bottom: 15px;
  padding: 6px;
  padding-bottom: 0px;
}

.v-btn:not(.v-btn--icon) {
  color: #FFE81F;
  background-color: black !important;
}

.white--text.sw{
  color: #FFE81F !important;
}
</style>