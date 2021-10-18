<template>
  <div class="house-list--container">
    <ul class="house-list" data-test-id="house-list">
      <li class="house-list--header">
        <div class="house-item--field"></div>
        <div class="house-item--field">
          <p class="house-item--text">City</p>
        </div>
        <div class="house-item--field">
          <p class="house-item--text">Address</p>
        </div>
        <div class="house-item--field">
        </div>
      </li>

      <li class="house-list--sort" data-test-id="sorting-row" v-if="$slots.sorting">
        <slot name="sorting" />
      </li>

        <template v-if="houses.length > 0">
          <house-item
            v-for="(house, index) in houses"
            :key="index"
            :house="house"
          />
        </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HouseItem from '@/components/HouseItem.vue'
import IHouse from '@/domain/models/IHouse.interface'

export default Vue.extend({
  name: 'HouseList',

  components: {
    HouseItem
  },

  props: {
    houses: {
      required: true,
      type: Array as () => IHouse[]
    }
  }
})
</script>

<style lang="postcss" scoped>
.house-list {
  padding: 0;
  list-style: none;
}

.house-list--header {
  position: relative;
  display: flex;
  margin-bottom: 40px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: black;
    border-radius: var(--border-radius-small);
  }
}

.house-item--field {
  flex: 0 0 25%;
  padding-left: 5px;

  @media (min-width: 1020px) {
    padding-left: 30px;
  }

  &:nth-child(1) {
    padding: 0;
  }

  &:nth-child(3) {
    flex: 1 0 25%;
  }

  &:last-child {
    padding-right: 5;
    flex: 0 0 40px;
  }
}

.house-item--text {
  font-size: 17px;
  font-weight: bold;
}
</style>
