import getHouses from '@/api/getHouses'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
describe('getHouses API call', () => {
  it('Calls to axios get with the expected URL', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: [] }))

    await getHouses()

    expect(mockedAxios.get).toBeCalledWith('http://localhost:8000')
  })
})
