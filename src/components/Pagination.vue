<template>
  <div class="pagination">
    <div class="pagination--container" v-if="housesQuantity > 1">
      <p
        v-for="pageNumber in pagesQuantity"
        :key="pageNumber"
        v-text="pageNumber"
        @click="$emit('change-page', pageNumber)"
        :class="{ 'current-page': activePage === pageNumber }"
        data-test-id="pagination-item"
        class="pagination--item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PaginationList',
  props: {
    housesQuantity: {
      type: Number,
      default: 0
    },
    activePage: {
      type: [Number, Boolean],
      default: false
    }
  },
  computed: {
    pagesQuantity () {
      const quantityNumber = this.housesQuantity

      if (typeof quantityNumber !== 'number') return 0
      if (quantityNumber <= 10) return 0

      const divisibleByFive = quantityNumber % 10 === 0

      if (divisibleByFive) return quantityNumber / 10
      return Math.floor(quantityNumber / 10) + 1
    }
  }
})
</script>

<style lang="postcss" scoped>
.pagination--container {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.pagination--item {
  margin: 0 10px;
  color: var(--main-color);
  font-weight: bold;
  cursor: pointer;
  transition: color .6 ease;

  &.current-page {
    color: var(--text-color);
    font-weight: normal;
    cursor: default;
  }
}
</style>
