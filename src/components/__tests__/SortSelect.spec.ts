import SortSelect from '@/components/SortSelect.vue'
import { mount } from '@vue/test-utils'

describe('SortSelect Component', () => {
  const renderWrapper = () => mount(SortSelect)

  it('Have 4 select options', () => {
    const wrapper = renderWrapper()
    const optionsInDom = wrapper.findAll('option')

    expect(optionsInDom.length).toBe(3)
  })

  it('Emit filterOption value when an option is clicked', () => {
    const wrapper = renderWrapper()
    const optionsInDom = wrapper.findAll('option')

    optionsInDom.at(2).trigger('click')

    expect(wrapper.emitted('change-order-sorting')).toEqual([['address']])
  })
})
