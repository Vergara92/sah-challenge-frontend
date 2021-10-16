import { shallowMount } from '@vue/test-utils'
import HouseList from '@/components/HouseList.vue'

describe('HouseList Component', () => {
  const renderWrapper = () => {
    return shallowMount(HouseList)
  }
  it('render as many houseItem components as houseList array length', () => {
    const wrapper = renderWrapper()
    const housesNumber = wrapper.vm.$data.houses.length
    const housesComponents = wrapper.findAllComponents({ name: 'HouseItem' })

    expect(housesComponents).toHaveLength(housesNumber)
  })
})
