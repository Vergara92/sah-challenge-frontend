<template>
  <div class="sort-select--container">
    <select class="sort-select" data-test-id="sort-select">
      <option
        v-for="filterOption in filterOptions"
        :key="filterOption.value"
        :value="filterOption.value"
        @click="$emit('change-order-sorting', filterOption.value)"
      >
        {{ filterOption.title }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SortSelect',

  data () {
    return {
      filterOptions: {
        none: {
          value: false,
          title: 'Sort by:'
        },
        city: {
          value: 'city',
          title: 'City: A-Z'
        },
        address: {
          value: 'address',
          title: 'Address: A-Z'
        }
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.sort-select--container {
   margin: 15px 5px 15px 0;
   text-align: right;
 }

.sort-select {
  padding: 5px;
  background-color: white;
  border: 1px solid color-mod(#000 alpha(50%));
  border-radius: var(--border-radius);
}
</style>
