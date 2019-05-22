import * as types from './types'

export default {
  'mutateCheckPeople': (state, payload) => {
    state.people = payload;
  }
}
