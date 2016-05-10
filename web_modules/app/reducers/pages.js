import { FETCH_PAGES } from "../actions/types"

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_PAGES:
    console.log(action)
    return [ action.payload.data, ...state  ]
  }
  return state
}
