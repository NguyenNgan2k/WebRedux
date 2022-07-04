import axios from "axios";
import {call, put, takeLatest} from 'redux-saga/effects'
import { getListPostSuccess,getListPostFail } from "../action/addStore";
function* getListPostSaga(action) {
    try {
        const data = yield call (async () => {
            return await axios.get('https://api.escuelajs.co/api/v1/products');
        });
        let mockData = []
        data.forEach(element => {
            let _dt = Object.assign({}, element)
            _dt.amount = Math.ceil(Math.random() * 10) + 1;
            mockData.push(_dt)
        });
        yield put(getListPostSuccess(mockData));
    } catch (error) {
        // yield put(getListPostFail(error));
    }
}
function* postsSaga() {
    yield takeLatest('GET_LIST_POST',getListPostSaga)
}
export default postsSaga;