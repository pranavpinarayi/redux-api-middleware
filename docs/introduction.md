## Introduction

First, install with npm: `npm i redux-api-handling-middleware`

Second, import the middleware and include it in `applyMiddleware` along with api client (like axios) when creating the Redux store:

```js
import apiMiddleware from  'redux-api-handling-middleware';
import axios from 'axios';

const middleware = applyMiddleware(apiMiddleware.withClient(axios));
const store = createStore(reducer, middleware);
```

To use the middleware, dispatch a promise as the value of the `promise` property of the action.

```js
//sample action creator
export function getSeatLayout() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_LAYOUT',
      promise: client => client.get('/layout'),
    });
  };
}

//you can dispatch multiple actions in the same dispatcher function

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

A actio is dispatched immediately with the original type .

```js
{
  type: 'FETCH_LAYOUT'
}
```

After the promise is settled, a second action will be dispatched. If the the promise is resolved, e.g., if it was successful, a "SUCCESS" action is dispatched. If the promise is rejected, e.g., if an error occurred, the "FAILED" action is dispatched. The fulfilled and rejected type suffixes are `_SUCCESS` and `_FAILED` respectively. The middleware will *always* dispatch one of these two actions.

```js
// fulfilled action
{
  type: 'FETCH_LAYOUT_SUCCESS'
  promise: {
    ...
  }
}

// rejected action
{
  type: 'FETCH_LAYOUT_FAILED'
  promise: {
    ...
  }
}
```

```js
//sample reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case `${FETCH_LAYOUT}_SUCCESS`:
      return {
        ...state,
        seatLayout: action.result.data,
      };
    default:
      return state;
  }
}

```
