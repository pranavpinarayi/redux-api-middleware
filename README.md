# Redux Api Middleware
[![npm version](https://img.shields.io/npm/v/redux-api-handling-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-api-handling-middleware)
[![npm downloads](https://img.shields.io/npm/dm/redux-api-handling-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-api-handling-middleware)

Redux Api middleware enables robust handling of async code in [Redux](http://redux.js.org). The middleware enables optimistic updates and dispatches success and failed actions. It can be used to chain async actions.
It allows you to write action creators that return a function instead of an action, you can dispatch more than action in the action creator function.

## Installation

```js
npm i redux-api-handling-middleware
```
## Docs and Help

- [Introduction](/docs/introduction.md)
- [Examples](https://github.com/pranavpinarayi/redux-api-middleware-example)

## Usage

```js
import apiMiddleware from  'redux-api-handling-middleware';
import axios from 'axios';

const middleware = applyMiddleware(apiMiddleware.withClient(axios));
const store = createStore(reducer, middleware);
```

```js
//sample ACTION
export function getSeatLayout() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_LAYOUT',
      promise: client => client.get('/layout'),
    });
    dispatch({
      type: 'UPDATE_SEAT_REQ',
      noOfSeats: 2,
    });
  };
}
```

After dispatching action of type `FETCH_LAYOUT` our middleware automatically dispatches `FETCH_LAYOUT_SUCCESS` and `FETCH_LAYOUT_FAILED` according to the api response.

---
Copyright (c) 2017 Pranav TV. [Licensed with The MIT License (MIT)](https://raw.githubusercontent.com/pranavpinarayi/redux-api-middleware/master/LICENSE.md).
