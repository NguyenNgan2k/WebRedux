import axios from "axios";
import {call, put, takeLatest} from 'redux-saga/effects'
import { getListPostSuccess,getListPostFail } from "../action/addStore";

function callApi() {
    return axios.get('https://api.escuelajs.co/api/v1/products')
}

function* getListPostSaga(action) {
    try {
        const resData = yield call (callApi);        
        resData.data.map(item => {
            item.allAmount = Math.ceil(Math.random() * 100) + 1;
            return item
        })

        yield put(getListPostSuccess(resData));
    } catch (error) {
        // yield put(getListPostFail(error));
    }
}
function* postsSaga() {
    yield takeLatest('GET_LIST_POST',getListPostSaga)
}
export default postsSaga;