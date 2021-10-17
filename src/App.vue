<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Spot a House!</h1>

      <house-list :houses="houses"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HouseList from '@/components/HouseList.vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'App',

  components: {
    HouseList
  },

  computed: {
    ...mapState(['houses'])
  },

  methods: {
    ...mapActions(['fetchHouses'])
  },

  created () {
    this.fetchHouses()
  }
})
</script>

<style lang="postcss">
:root {
  --main-color: #0a0d77;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 25px;
  text-align: center;
  font-weight: bold;
}
</style>
