import axios from 'axios'
import cuid from 'cuid'
import omit from 'lodash/omit'
import data from '../../data/data.json'

const url = 'http://localhost:9000'

export const getExercises = () => {
  return axios.get(`${url}/exercises`).then(res => res.json())
}

export const getEntries = () => {
  return axios.get(`${url}/entries`).then(res => res.json())
}

export const importData = () => {
  return data.map(exercise => {
    exercise.id = cuid()
    exercise.image = `/assets/${exercise.image.split('/').pop()}`
    return omit(exercise, ['group'])
  })
}