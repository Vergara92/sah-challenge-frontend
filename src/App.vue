<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Spot a House!</h1>

      <house-list :houses="paginatedHouses">
        <template v-slot:sorting>
          <sort-select
            @change-order-sorting="changeOrderSorting"
          />
        </template>
      </house-list>
      <pagination
        :housesQuantity="sortedHouses.length"
        :activePage="currentPage"
        @change-page="changeCurrentPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HouseList from '@/components/HouseList.vue'
import SortSelect from '@/components/SortSelect.vue'

import { mapActions, mapGetters, mapState } from 'vuex'
import Pagination from './components/Pagination.vue'

export default Vue.extend({
  name: 'App',

  components: {
    HouseList,
    SortSelect,
    Pagination
  },

  computed: {
    ...mapState(['currentPage']),
    ...mapGetters(['sortedHouses', 'paginatedHouses'])
  },

  methods: {
    ...mapActions(['fetchHouses', 'setSortingOrder', 'changePage']),

    changeOrderSorting (orderKey: string | boolean) {
      this.setSortingOrder(orderKey)
    },

    changeCurrentPage (newCurrentPage: number) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.changePage(newCurrentPage)
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
  --text-color: #2c3e50;
  --border-radius: 8px;
  --border-radius-small: 4px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
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
