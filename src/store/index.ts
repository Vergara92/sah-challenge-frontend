import Vue from 'vue'
import Vuex, { ActionTree, MutationTree, GetterTree } from 'vuex'
import IHouse from '@/domain/models/IHouse.interface'
import houseService from '@/domain/services/houseService'

Vue.use(Vuex)

export class State {
  houses:IHouse[] = []
  sortingKey: 'city' | 'address' | boolean = false
  currentPage = 1
}

export const getters: GetterTree<State, State> = {
  sortedHouses (state):IHouse[] | [] {
    const sortingKey = state.sortingKey

    if (typeof sortingKey !== 'string') return state.houses

    const housesToSort = state.houses.slice()

    return housesToSort.sort((houseA, houseB) => {
      const stringA = houseA[sortingKey].toUpperCase()
      const stringB = houseB[sortingKey].toUpperCase()

      if (stringA < stringB) return -1
      if (stringA > stringB) return 1
      return 0
    })
  },

  paginatedHouses (state, getters): IHouse[] | [] {
    const currentPage = state.currentPage
    const firstHouseIndex = currentPage * 10 - 10
    const lastHouseIndex = currentPage * 10 - 1

    return getters.sortedHouses.filter((house: IHouse, index: number) => {
      if (index >= firstHouseIndex && index <= lastHouseIndex) {
        return true
      }
      return false
    })
  }
}

export const mutations = <MutationTree<State>> {
  SET_HOUSES (state, houses: IHouse[]) {
    state.houses = houses
  },
  SET_SORTING_ORDER (state, sortingKey) {
    state.sortingKey = sortingKey
  },
  SET_CURRENT_PAGE (state, currentPage: number) {
    state.currentPage = currentPage
  }
}

export const actions = <ActionTree<State, State>> {
  async fetchHouses ({ commit }) {
    const houses = await houseService.getList()

    commit('SET_HOUSES', houses)
  },
  setSortingOrder ({ commit }, sortingKey: string | boolean) {
    commit('SET_SORTING_ORDER', sortingKey)
  },
  changePage ({ commit }, currentPage: number) {
    commit('SET_CURRENT_PAGE', currentPage)
  }
}

export default new Vuex.Store({
  state: new State(),
  getters,
  mutations,
  actions
})
