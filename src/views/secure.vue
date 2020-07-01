<template>
  <div id="secure">
    <h1>Secure Area</h1>
    <p>This is a secure area</p>

    <div class="columns medium-3" v-for="category in categories" :key="category">
      <div class="card">
        <div class="card-divider">{{ category.name }}</div>
        <div class="card-section">
          <p>{{ category }}.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: "Secure",
  data() {
    return {
      categories: {}
    };
  },
  mounted() {
    axios.get("https://swapi.dev/api/")
    .then(response => {
        // Categories - array of key-value pairs, key is category name, value is API uri
        this.categories = response.data;
        })
  }
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>