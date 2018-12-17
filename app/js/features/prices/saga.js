import { fork, takeEvery, call, put } from 'redux-saga/effects'
import cc from 'cryptocompare'
import { FETCH_PRICES, FETCH_PRICES_SUCCEEDED, FETCH_PRICES_FAILED } from './constants';

export function *doFetchPrices(action) {
  try {
    const { payload: { from, to } } = action
    const data = yield call(cc.priceMulti, from, to)
    yield put({type: FETCH_PRICES_SUCCEEDED, data})
  } catch (error) {
    yield put({type: FETCH_PRICES_FAILED, error})
  }
}

export function *onFetchPrices() {
  yield takeEvery(FETCH_PRICES, doFetchPrices)
}

export default [
  fork(onFetchPrices),
]