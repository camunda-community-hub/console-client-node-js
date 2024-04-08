# console-client-node-js

The Camunda 8 Web Console API client for Node.js.
# DEPRECATED

This package is deprecated. Please use the official SDK package @camunda8/sdk. See: https://github.com/camunda/camunda-8-js-sdk
---
## Installation


```bash
npm i camunda-console-client
```

## Usage

Set the credential for the Camunda SaaS Console in the environment, then:

```typescript
import {ConsoleApiClient} from 'camunda-console-client'

const console = new ConsoleApiClient()

async function main() {
    const res = await console.getClusters()
    console.log(res)
    const params = await console.getParameters()
    console.log(params)
}

main()
```
 

