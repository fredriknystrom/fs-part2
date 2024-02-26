import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data).catch(error => {
    throw error
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(error => {
    throw error
  })
}

const del = id => {
    const itemUrl = baseUrl + "/" + id
    const request = axios.delete(itemUrl)    
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data).catch(error => {
    throw error
  })
}

export default { getAll, create, del, update }