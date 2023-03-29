import { getConsoleToken } from "camunda-saas-oauth";
import { getConsoleCredentials } from "camunda-8-credentials-from-env"
import got from 'got';
import { Cluster, ClusterClient, ClusterClientConnectionDetails, CreateClusterBody, CreatedClusterClient, Parameters } from "./APIObjects";
const pkg = require('../../package.json')
const debug = require('debug')('consoleapi')

export class ConsoleApiClient {
    private userAgentString: string
    private gotOptions: { prefixUrl: string }

    constructor(userAgent?: string) {
        const customAgent = userAgent ? ` ${userAgent}`: ``
        this.userAgentString =  `console-client-nodejs/${pkg.version}${customAgent}`
        const creds = getConsoleCredentials()
        this.gotOptions = {
            prefixUrl: `${creds.CAMUNDA_CONSOLE_BASE_URL}/clusters`
        }
        debug('prefixUrl', `${creds.CAMUNDA_CONSOLE_BASE_URL}/clusters`)
    }

    private async getHeaders() {
        return {
            'content-type': 'application/json',
            'authorization': `Bearer ${await getConsoleToken(this.userAgentString)}`,
            'user-agent': this.userAgentString,
            'accept': '*/*'
        }       
    }

    /**
     * 
     * @description Get an array of the current API clients for this cluster. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClients) for more details.
     * @param clusterUuid - The cluster UUID
     *  
     */
    async getClients(clusterUuid: string): Promise<ClusterClient[]> {
        const headers = await this.getHeaders()
        return got(`${clusterUuid}/clients`, {
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * @description Create a new API client for a cluster. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/CreateClient) for more details.
     * @param clusterUuid - The cluster UUID
     * @param clientName - The name for the new API client
     * @returns 
     */
    async createClient(clusterUuid: string, clientName: string): Promise<CreatedClusterClient> {
        const headers = await this.getHeaders()
        return got.post(`${clusterUuid}/clients`, {
            body: JSON.stringify({clientName}),
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * @description Get the details of an API client. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClient) for more details.     
     * @param clusterUuid 
     * @param clientId 
     * @returns 
     */
    async getClient(clusterUuid: string, clientId: string): Promise<ClusterClientConnectionDetails> {
        const headers = await this.getHeaders()
        return got(`${clusterUuid}/clients/${clientId}`, {
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * @description See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/DeleteClient) for more details.
     * @param clusterUuid 
     * @param clientId 
     */
    async deleteClient(clusterUuid: string, clientId: string): Promise<null> {
        const headers = await this.getHeaders()
        return got.delete(`${clusterUuid}/clients/${clientId}`, {
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * 
     * @description Return an array of clusters. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClusters) for more details.
     */
    async getClusters(): Promise<Cluster[]> {
        const headers = await this.getHeaders()
        return got('', {
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * 
     * @description Create a new cluster. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/CreateCluster) for more details.
     */
    async createCluster(createClusterRequest: CreateClusterBody): Promise<{clusterId: string}> {
        const headers = await this.getHeaders()
        return got.post('', {
            body: JSON.stringify(createClusterRequest),
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * 
     * @description Retrieve the metadata for a cluster. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetCluster) for more details. 
     * 
     */
    async getCluster(clusterUuid: string): Promise<Cluster> {
        const headers = await this.getHeaders()
        return got(`${clusterUuid}`, {
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * 
     * @description Delete a cluster. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/DeleteCluster) for more details.   
     *  
     */
    async deleteCluster(clusterUuid: string): Promise<null> {
        const headers = await this.getHeaders()
        return got.delete(`${clusterUuid}`, {
            headers,
            ...this.gotOptions
        }).json()
    }

    /**
     * 
     * @description Retrieve the available parameters for cluster creation. See [the API Documentation](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetParameters) for more details.
     */
    async getParameters(): Promise<Parameters> {
        const headers = await this.getHeaders()
        return got(`parameters`, {
            headers,
            ...this.gotOptions
        }).json()
    }
} 