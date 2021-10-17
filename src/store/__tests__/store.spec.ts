import { ActionContext, Commit } from 'vuex'
import { State, getters, mutations, actions } from '@/store'
import houseService from '@/domain/services/houseService'
import getHousesMocked from '@/api/__mocks__/getHouses'
describe('Store', () => {
  let state: State
  let actionContext: ActionContext<State, State>

  beforeEach(() => {
    state = new State()
  })

  describe('Store getters', () => {
    it('doesnt sort items when sortingKey is false', () => {
      state.houses = getHousesMocked()
      state.sortingKey = false
      const rootState = state
      const rootGetters = getters

      const sortedHouses = getters.sortedHouses(state, rootGetters, rootState, rootGetters)

      expect(sortedHouses[0].address).toBe('Paseo de la Castellana')
    })

    it('Sort items by address when its setted in sortingKey', () => {
      state.houses = getHousesMocked()
      state.sortingKey = 'address'
      const rootState = state
      const rootGetters = getters

      const sortedHouses = getters.sortedHouses(state, rootGetters, rootState, rootGetters)

      expect(sortedHouses[0].address).toBe('Calle Cartagena')
    })
  })

  describe('Store mutations', () => {
    it('Set the houses when SET_HOUSES is executed', () => {
      const houses = getHousesMocked()

      mutations.SET_HOUSES(state, houses)

      expect(state.houses).toBe(houses)
    })
    it('Sets sortingKey with SET_SORTING_ORDER mutation', () => {
      mutations.SET_SORTING_ORDER(state, 'address')

      expect(state.sortingKey).toBe('address')
    })
  })
  describe('Store actions', () => {
    actionContext = {
      dispatch: jest.fn(),
      commit: jest.fn(),
      state,
      rootState: state,
      getters: {},
      rootGetters: {}
    }
    it('calls getList in houseService when fetchHouses is called', () => {
      const getHousesSpy = jest.spyOn(houseService, 'getList').mockImplementation()
      const fetchHouses = actions.fetchHouses as (ctx: typeof actionContext) => Commit

      fetchHouses(actionContext)

      expect(getHousesSpy).toHaveBeenCalledTimes(1)
    })

    it('commits SET_HOUSES with the getHouses data when fetchHouses is called', async () => {
      jest.spyOn(houseService, 'getList').mockImplementation(() => Promise.resolve(getHousesMocked()))
      const fetchHouses = actions.fetchHouses as (ctx: typeof actionContext) => Commit

      await fetchHouses(actionContext)

      expect(actionContext.commit).toBeCalledWith('SET_HOUSES', getHousesMocked())
    })

    it('trigger SET_SORTING_ORDER on setSortingOrder call', () => {
      const setSortingOrder = actions.setSortingOrder as (ctx: typeof actionContext, sortingKey: string) => Commit

      setSortingOrder(actionContext, 'city')

      expect(actionContext.commit).toBeCalledWith('SET_SORTING_ORDER', 'city')
    })
  })
})
