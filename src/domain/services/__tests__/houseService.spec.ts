import getHouses from '@/api/getHouses'
import getHousesMocked from '@/api/__mocks__/getHouses'
import House from '@/domain/models/House'
import houseService from '@/domain/services/houseService'

const mockedCall = getHousesMocked()
jest.mock('@/api/getHouses', () => jest.fn(() => Promise.resolve(mockedCall)))

describe('houseService', () => {
  it('calls to getHouses with getList is called', async () => {
    await houseService.getList()

    expect(getHouses).toHaveBeenCalled()
  })
  it('returns an array of modeled houses', async () => {
    const houseList = await houseService.getList()

    expect(houseList[0]).toBeInstanceOf(House)
  })
})
