import Pagination from '@/components/Pagination.vue'
import { mount } from '@vue/test-utils'

describe('Pagination Component', () => {
  const renderWrapper = (housesQuantity = 0) => mount(Pagination, {
    propsData: {
      housesQuantity
    }
  })
  it('Renders 5 pages with 50 items', () => {
    const wrapper = renderWrapper(50)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(5)
  })
  it('Renders 6 pages with 51 items', () => {
    const wrapper = renderWrapper(51)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(6)
  })
  it('didnt render pages with less than 10 items', () => {
    const wrapper = renderWrapper(9)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(0)
  })
  it('didnt render pages with less than 0 items', () => {
    const wrapper = renderWrapper(-4)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]')

    expect(paginationItems.length).toBe(0)
  })
  it('emit change-page event when any paginationItem is clicked', async () => {
    const wrapper = renderWrapper(50)
    const paginationItems = wrapper.findAll('[data-test-id="pagination-item"]').at(2)

    await paginationItems.trigger('click')

    expect(wrapper.emitted('change-page')).toEqual([[3]])
  })
})
