<template>
  <div id="overview" class="container">
    <h1>overview Area</h1>
    <p>This is a overview area</p>

    <section class="callout secondary">
      <h5 class="text-center">Filter by Category</h5>
      <form>
        <div class="row">
          <div class="large-6 columns">
            <v-select :options="categories" v-model="activeCategory"></v-select>
          </div>
          <div class="medium-6 columns">
            <a @click="getResources()" class="button expanded">Retrieve</a>
          </div>
        </div>
      </form>
    </section>
  </div>
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
  return SWAPI_base_url + url;
}

import axios from "axios";
export default {
  name: "overview",
  data() {
    return {
      categories: CATEGORIES,
      activeCategory: null
    };
  },
  mounted() {
    // Upon mounting, get resources for chosen category
    // this.getResources(this.activeCategory);
    /*
    axios.get("https://swapi.dev/api/")
    .then(response => {
        this.categories = response.data;
        })
    */
  },
  methods: {
    getResources() {
      let url = buildUrl(this.activeCategory);
      axios
        .get(url)
        .then(response => {
          this.results = response;
        })
        .catch(error => {
          console.log(error);
        });
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