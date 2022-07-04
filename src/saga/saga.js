import axios from "axios";
import {call, put, takeLatest} from 'redux-saga/effects'
import { getListPostSuccess,getListPostFail } from "../action/addStore";
function* getListPostSaga(action) {
    try {
        const data = yield call (async () => {
            return await axios.get('https://api.escuelajs.co/api/v1/products');
        });
        yield put(getListPostSuccess(data));
    } catch (error) {
        // yield put(getListPostFail(error));
    }
}
function* postsSaga() {
    yield takeLatest('GET_LIST_POST',getListPostSaga)
}
export default postsSaga;