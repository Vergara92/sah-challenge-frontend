import IHouse from '@/domain/models/IHouse.interface'

export default class House implements IHouse {
  address: string
  city: string
  image: string
  link: string

  constructor (data: IHouse) {
    this.address = data.address
    this.city = data.city
    this.image = data.image
    this.link = data.link
  }
}
