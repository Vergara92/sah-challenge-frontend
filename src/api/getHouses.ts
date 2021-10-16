import IHouse from '@/domain/models/IHouse.interface'
import axios from 'axios'

interface rawHouseList {
  message: IHouse[]
}

export default function getHouses (): Promise<IHouse[]> {
  return axios.get<rawHouseList>('http://localhost:8000/get-houses')
    .then(response => {
      return response.data.message
    })
}
