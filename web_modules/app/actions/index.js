import axios from "axios"

import { FETCH_PAGES } from "./types"

const ROOT_URL = "https://powerful-bayou-78909.herokuapp.com"

export function fetchPages(query) {
  const url = `${ROOT_URL}/search/${query}`
  const request = axios.get(url)

  return {
    type: FETCH_PAGES,
    payload: request,
  }
}
