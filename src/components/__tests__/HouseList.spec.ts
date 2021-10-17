import { shallowMount } from '@vue/test-utils'
import HouseList from '@/components/HouseList.vue'
import getHousesMocked from '@/api/__mocks__/getHouses'

describe('HouseList Component', () => {
  const renderWrapper = (slots = {}) => {
    return shallowMount(HouseList, {
      propsData: {
        houses: getHousesMocked()
      },
      slots
    })
  }
  it('render as many houseItem components as houseList array length', () => {
    const wrapper = renderWrapper()
    const housesNumber = wrapper.vm.$props.houses.length
    const housesComponents = wrapper.findAllComponents({ name: 'HouseItem' })

    expect(housesComponents).toHaveLength(housesNumber)
  })
  it('doesnt render sorting row if the slot isnt passed', () => {
    const wrapper = renderWrapper()
    const sortingRow = wrapper.find('[data-test-id="sorting-row"]')

    expect(sortingRow.exists()).toBeFalsy()
  })
  it('renders sorting row if the slot is passed', () => {
    const wrapper = renderWrapper({ sorting: '<div />' })
    const sortingRow = wrapper.find('[data-test-id="sorting-row"]')

    expect(sortingRow.exists()).toBeTruthy()
  })
})
