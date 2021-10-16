<template>
  <div class="house-list--container">
    <ul class="house-list">
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
        <house-item
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
        />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import mockHouses from '@/api/__mocks__/getHouses'
import HouseItem from '@/components/HouseItem.vue'
import IHouse from '@/domain/models/IHouse.interface'
import houseService from '@/domain/services/houseService'

export default Vue.extend({
  name: 'HouseList',

  components: {
    HouseItem
  },

  data () {
    return {
      houses: [] as IHouse[]
    }
  },

  async created () {
    this.houses = await houseService.getList()
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
    border-radius: 4px;
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
