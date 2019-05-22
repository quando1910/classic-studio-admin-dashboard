import * as types from './types'

export default {
  'checkPeople': ({commit}, payload) => {
    var member = JSON.parse(localStorage.getItem('MEMBER') || localStorage.getItem('USER'));
    commit('mutateCheckPeople', member)
  }
}
