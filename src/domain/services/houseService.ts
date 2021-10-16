import getHouses from '@/api/getHouses'
import House from '@/domain/models/House'
import IHouse from '../models/IHouse.interface'

const houseService = {
  getList: async ():Promise<IHouse[]> => {
    const houseList = await getHouses()
    return houseList.map(house => new House(house))
  }
}

export default houseService
