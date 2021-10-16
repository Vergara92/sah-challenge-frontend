import { mount } from '@vue/test-utils'
import HouseItem from '@/components/HouseItem.vue'
import IHouse from '@/domain/models/IHouse.interface'
import getHousesMocked from '@/api/__mocks__/getHouses'

const houseList = getHousesMocked()

describe('HouseItem Component', () => {
  const renderWrapper = (house: IHouse) => {
    return mount(HouseItem, {
      propsData: {
        house
      }
    })
  }

  it('Has an image with the house image', () => {
    const exampleHouse = houseList[0]
    const wrapper = renderWrapper(exampleHouse)
    const houseImage = wrapper.find('[data-test-id="house-image"]')
    const expectedBackgroundStyle = `background-image: url(${exampleHouse.image});`

    expect(houseImage.attributes('style')).toBe(expectedBackgroundStyle)
  })

  it('Has the city name of the house', () => {
    const exampleHouse = houseList[0]
    const wrapper = renderWrapper(exampleHouse)
    const houseCity = wrapper.find('[data-test-id="house-city"]')

    expect(houseCity.text()).toBe(exampleHouse.city)
  })

  it('Has the house address name', () => {
    const exampleHouse = houseList[0]
    const wrapper = renderWrapper(exampleHouse)
    const houseAddress = wrapper.find('[data-test-id="house-address"]')

    expect(houseAddress.text()).toBe(exampleHouse.address)
  })

  it('Has the house link to more information', () => {
    const exampleHouse = houseList[0]
    const wrapper = renderWrapper(exampleHouse)
    const houseLink = wrapper.find('[data-test-id="house-link"]')

    expect(houseLink.attributes('href')).toBe(exampleHouse.link)
  })
})
