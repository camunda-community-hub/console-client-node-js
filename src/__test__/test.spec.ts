import {ConsoleApiClient} from '../index'

jest.setTimeout(10000)

test('getParameters', async () => {
    const c = new ConsoleApiClient()
    const res = await c.getParameters()
    expect(c).toBeTruthy()
})

test('getClusters', async () => {
    const c = new ConsoleApiClient()
    const res = await c.getClusters()
    expect(c).toBeTruthy()
})

test('createClient', async () => {
    const c = new ConsoleApiClient()
    const clusters = await c.getClusters()
    const clusterUuid = clusters[0].uuid
    const res = await c.createClient({clusterUuid, clientName: 'testors', permissions: ["Zeebe"]})
    console.log('res', res)
    const client = await c.getClient(clusterUuid, res.clientId)
    console.log('client', client)
    await c.deleteClient(clusterUuid, res.clientId)
    expect(c).toBeTruthy()
})