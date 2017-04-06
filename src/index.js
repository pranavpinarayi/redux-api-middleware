function apiMiddlewareCreator(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, client);
    }

    const { promise, type, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    next({ ...rest, type: type });
    const actionPromise = promise(client);

    actionPromise
      .then(result => next({ ...rest, result, type: `${type}_SUCCESS` }))
      .catch(error => next({ ...rest, error, type: `${type}_FAILED` }));

    return actionPromise;
  };
}

const apiMiddleware = apiMiddlewareCreator();

apiMiddleware.withClient = apiMiddlewareCreator;

export default apiMiddleware;
