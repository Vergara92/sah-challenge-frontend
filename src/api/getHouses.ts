import IHouse from '@/domain/models/IHouse.interface'
import axios from 'axios'

export default function getHouses (): Promise<IHouse[]> {
  return axios.get<IHouse[]>('http://localhost:8000')
    .then(response => {
      return response.data
    })
}
