import Vue from 'vue'
import Vuex, { ActionTree, MutationTree, GetterTree } from 'vuex'
import IHouse from '@/domain/models/IHouse.interface'
import houseService from '@/domain/services/houseService'

Vue.use(Vuex)

export class State {
  houses:IHouse[] = []
  sortingKey: 'city' | 'address' | boolean = false
}

export const getters: GetterTree<State, State> = {
  sortedHouses (state):IHouse[] | [] {
    const sortingKey = state.sortingKey
    console.log(state.houses)
    if (typeof sortingKey !== 'string') return state.houses

    const housesToSort = state.houses.slice()

    return housesToSort.sort((houseA, houseB) => {
      const stringA = houseA[sortingKey].toUpperCase()
      const stringB = houseB[sortingKey].toUpperCase()

      if (stringA < stringB) return -1
      if (stringA > stringB) return 1
      return 0
    })
  }
}

export const mutations = <MutationTree<State>> {
  SET_HOUSES (state, houses: IHouse[]) {
    state.houses = houses
  },
  SET_SORTING_ORDER (state, sortingKey) {
    state.sortingKey = sortingKey
  }
}

export const actions = <ActionTree<State, State>> {
  async fetchHouses ({ commit }) {
    const houses = await houseService.getList()

    commit('SET_HOUSES', houses)
  },
  setSortingOrder ({ commit }, sortingKey: string | boolean) {
    commit('SET_SORTING_ORDER', sortingKey)
  }
}

export default new Vuex.Store({
  state: new State(),
  getters,
  mutations,
  actions
})
