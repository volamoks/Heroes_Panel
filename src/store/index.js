import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filter from '../components/heroesFilters/filterSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => next => action => {
    typeof action === 'string'
        ? next({
              type: action,
          })
        : next(action);
};

const store = configureStore({
    reducer: { heroes, filter, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware, stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
