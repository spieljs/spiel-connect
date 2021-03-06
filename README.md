# Spiel Connect

Spiel Connect get all the endpoints and its methods therefore you don't need to set any endpoints and services in your frontend application. It is adapted to spiel-server but you can build your own alternatives.

## Api documentation

* [Spiel Connect API](https://spieljs.github.io/spiel-connect/)

## How use it

### Config the server connection

```typescript
import { Connect, IRequestConfigConnect } from "spiel-connect";
import { IServerTest } from "./services";

const requestConnect: IRequestConfigConnect = {
    domain: "http://localhost:3000",
};

const connect = new Connect(request).getEndpoints();

connect.then((server: IServerTest) => {
    ...
});
    
```

### Make a request with Spiel Connect
```typescript
connect.then(async (server: IServerTest) => {
    const user = {id: 5};
    const permission = { permission: "root"};

    const response = await server.User.updateUser(user, null, permission);
    console.log(response);
});
```

## Use alternatives to spiel-server
You can use another backend framework but you need to build the endpoints response and it has to look like this:
```
[{ name: 'ClassName1',
    props: [ { method: 'methodName', name: 'classMethodName', path: '/pathname' },
             { method: 'methodName', name: 'classMethodName', path: '/pathname' },
             { method: 'methodName', name: 'classMethodName', path: '/pathname' },
                ...
            ]
  },
  { name: 'ClassName2',
    props: [{ method: 'methodName', name: 'classMethodName', path: '/pathname' },
             { method: 'methodName', name: 'classMethodName', path: '/pathname' },
             { method: 'methodName', name: 'classMethodName', path: '/pathname' },
                ... 
            ]
  },
    ...
}]
```
To get some idea to do it see more [here](https://github.com/spieljs/spiel-server/blob/master/src/server/set-router.ts)

## Run Spiel Connect tests
* `npm run server`
* `npm test`

## License
Spiel Connect is MIT licensed. See [license](LICENSE)
