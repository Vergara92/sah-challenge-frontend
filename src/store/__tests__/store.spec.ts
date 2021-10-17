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

      expect(sortedHouses[0].address).toBe('Breton de los Herreros')
    })

    it('show only 10 items in paginatedHouses', () => {
      state.houses = getHousesMocked()
      const mockedGetters = {
        sortedHouses: state.houses
      }
      const rootState = state
      const rootGetters = mockedGetters

      const paginatedHouses = getters.paginatedHouses(state, mockedGetters, rootState, rootGetters)

      expect(paginatedHouses.length).toBe(10)
    })

    it('show items related with the currentPage', () => {
      state.houses = getHousesMocked()
      state.currentPage = 2
      const mockedGetters = {
        sortedHouses: state.houses
      }
      const rootState = state
      const rootGetters = mockedGetters

      const paginatedHouses = getters.paginatedHouses(state, mockedGetters, rootState, rootGetters)

      expect(paginatedHouses[0]).toBe(mockedGetters.sortedHouses[10])
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

    it('Sets currentPage with SET_CURRENT_PAGE mutation', () => {
      mutations.SET_CURRENT_PAGE(state, 3)

      expect(state.currentPage).toBe(3)
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

    it('trigger SET_CURRENT_PAGE on changePage call', () => {
      const changePage = actions.changePage as (ctx: typeof actionContext, currentPage: number) => Commit

      changePage(actionContext, 10)

      expect(actionContext.commit).toBeCalledWith('SET_CURRENT_PAGE', 10)
    })
  })
})
