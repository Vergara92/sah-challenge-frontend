import { shallowMount } from '@vue/test-utils'
import HouseList from '@/components/HouseList.vue'
import getHousesMocked from '@/api/__mocks__/getHouses'

describe('HouseList Component', () => {
  const renderWrapper = () => {
    return shallowMount(HouseList, {
      propsData: {
        houses: getHousesMocked()
      }
    })
  }
  it('render as many houseItem components as houseList array length', () => {
    const wrapper = renderWrapper()
    const housesNumber = wrapper.vm.$props.houses.length
    const housesComponents = wrapper.findAllComponents({ name: 'HouseItem' })

    expect(housesComponents).toHaveLength(housesNumber)
  })
})
