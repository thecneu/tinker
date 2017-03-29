import axios from 'axios'
import omit from 'lodash.omit'
import cuid from 'cuid'
import data from './data.json'

const url = 'http://localhost:9000'

export const getExercises = () => {
  return axios.get(`${url}/exercises`).then(res => res.json())
}

export const getEntries = () => {
  return axios.get(`${url}/entries`).then(res => res.json())
}

export const importData = () => {
  // return axios.get(`${url}/data.json`)
  // .then(res => res.json())
  // .then(data => omit(data, ['phase', 'week', 'group']))
  return data.map(exercise => {
    exercise.id = cuid()
    exercise.image = `assets/${exercise.image.split('/').pop()}`
    // axios.get(`${url}/download/${encodeURIComponent(exercise.image)}`)
    return omit(exercise, ['phase', 'week', 'group'])
  })
}