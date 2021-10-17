import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import IHouse from '@/domain/models/IHouse.interface'
import houseService from '@/domain/services/houseService'

Vue.use(Vuex)

export class State {
  houses:IHouse[] = []
}

export const mutations = <MutationTree<State>> {
  SET_HOUSES (state, houses: IHouse[]) {
    state.houses = houses
  }
}

export const actions = <ActionTree<State, State>> {
  async fetchHouses ({ commit }) {
    const houses = await houseService.getList()

    commit('SET_HOUSES', houses)
  }
}

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions
})
