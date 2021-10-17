<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Spot a House!</h1>

      <house-list :houses="sortedHouses">
        <template v-slot:sorting>
          <sort-select
            @change-order-sorting="changeOrderSorting"
          />
        </template>
      </house-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HouseList from '@/components/HouseList.vue'
import SortSelect from '@/components/SortSelect.vue'

import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'App',

  components: {
    HouseList,
    SortSelect
  },

  computed: {
    ...mapGetters(['sortedHouses'])
  },

  methods: {
    ...mapActions(['fetchHouses', 'setSortingOrder']),

    changeOrderSorting (orderKey: string | boolean) {
      this.setSortingOrder(orderKey)
    }
  },

  created () {
    this.fetchHouses()
  }
})
</script>

<style lang="postcss">
:root {
  --main-color: #0a0d77;
  --border-radius: 8px;
  --border-radius-small: 4px;
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
