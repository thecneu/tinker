import axios from 'axios'

const url = 'http://localhost:3001'

export const getExercises = () => {
  return axios.get(`${url}/exercises`).then(res => res.json())
}

export const getEntries = () => {
  return axios.get(`${url}/entries`).then(res => res.json())
}