import axios from 'axios'
import { getCookie } from 'src/action/auth-action'
const accessToken = getCookie('jwt')
// export const addVisaDuration = (name) => {
//     return axios.post(`${API}/visa-duration/create`,
//     {name})
// }

export const listVisaDuration = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API}/visa-duration`,{
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

// export const countVisaDuration = async () => {
//     return axios.get(`${API}/visa-duration/count`)
// }
// export const deleteVisaDuration = (ids) => {
//     return axios.post(`${API}/visa-duration/remove`, { ids })
// }
// export const updateVisaDuration = (id, data) => {
//     return axios.put(`${API}/visa-duration/update/${id}`, data)
// }
