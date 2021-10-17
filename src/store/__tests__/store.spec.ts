import { ActionContext, Commit } from 'vuex'
import { State, mutations, actions } from '@/store'
import houseService from '@/domain/services/houseService'
import getHousesMocked from '@/api/__mocks__/getHouses'
describe('Store', () => {
  let state: State
  let actionContext: ActionContext<State, State>

  beforeEach(() => {
    state = new State()
  })

  describe('Store mutations', () => {
    it('Set the houses when SET_HOUSES is executed', () => {
      const houses = getHousesMocked()

      mutations.SET_HOUSES(state, houses)

      expect(state.houses).toBe(houses)
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
  })
})
