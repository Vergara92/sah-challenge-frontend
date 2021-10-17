import App from '@/App.vue'
import { State, getters } from '@/store'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'

describe('App Component', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const renderWrapper = (store: Store<State>) => {
    return mount(App, { store })
  }

  let actions: { fetchHouses: jest.Mock, setSortingOrder: jest.Mock }
  let state: State
  let store: Store<State>

  beforeEach(() => {
    state = new State()
    actions = { fetchHouses: jest.fn(), setSortingOrder: jest.fn() }

    store = new Vuex.Store({
      state,
      getters,
      actions
    })
  })

  it('triggers fetchHouses when App is mounted', () => {
    renderWrapper(store)

    expect(actions.fetchHouses).toBeCalledTimes(1)
  })
  it('triggers setSortingOrder when SortSelect component emit event', async () => {
    const wrapper = renderWrapper(store)
    const SortSelectComponent = wrapper.findComponent({ name: 'SortSelect' })

    SortSelectComponent.vm.$emit('change-order-sorting', 'city')

    expect(actions.setSortingOrder).toHaveBeenCalledWith(expect.any(Object), 'city')
  })
})
