import {ConsoleApiClient} from '../index'

jest.setTimeout(10000)

test('getParameters', async () => {
    const c = new ConsoleApiClient()
    const res = await c.getParameters()
    console.log(res)
    expect(c).toBeTruthy()
})

test('getClusters', async () => {
    const c = new ConsoleApiClient()
    const res = await c.getClusters()
    console.log(res)
    expect(c).toBeTruthy()
})
