<template>
  <li class="house-item" data-test-id="house-item">
    <div class="house-item--field">
      <div class="house-item--image"
        :style="{ backgroundImage: `url(${house.image})` }"
        :aria-label="`Image of a house in ${house.address}`"
        data-test-id="house-image"
      />
    </div>

    <div class="house-item--field">
      <p class="house-item--city" data-test-id="house-city">{{ house.city }}</p>
    </div>

    <div class="house-item--field">
      <p class="house-item--address" data-test-id="house-address">{{ house.address }}</p>
    </div>

    <div class="house-item--field">
      <a class="house-item--link"
        data-test-id="house-link"
        :href="house.link"
        target="_blank"
      >
        Details
      </a>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import IHouse from '@/domain/models/IHouse.interface'

export default Vue.extend({
  name: 'HouseItem',

  props: {
    house: {
      required: true,
      type: Object as () => IHouse
    }
  }
})
</script>

<style lang="postcss" scoped>
.house-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: color-mod(#000 alpha(50%));
    border-radius: var(--border-radius-small);
  }

  &:last-child {
    &:before {
      content: none;
    }
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

.house-item--image {
  height: 75px;
  width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-small);

  @media (min-width: 600px) {
    height: 100px;
  }

  @media (min-width: 1020px) {
    height: 150px;
  }
}

.house-item--city {
  text-transform: capitalize;
}

.house-item--link {
  color: var(--main-color);
  text-decoration: none;
  font-weight: bold;
}
</style>
