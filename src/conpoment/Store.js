import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import _ from 'lodash';

function Store(props) {
    const { store, actions } = props;
    const handleOnclickDelete = (id) => {
        actions.delete_store(id)
    }
    const handleClickAdd = (item) => {
        let arrow = Object.assign({}, item)
        arrow.amount = item.amount + 1
        props.actions.update_amount(arrow)
    }
    const handleClickSub = (item) => {
        let arrow = Object.assign({}, item)
        if( arrow.amount - 1 >0) {
            arrow.amount = item.amount - 1
            props.actions.update_amount(arrow)
        } else {
            if(window.confirm("Bạn muốn xóa sản phẩm này")){
                props.actions.delete_store(arrow.id)
            }        
        }
        
    }
    return (
        <div className="container ">
            <div className="header">
                <h2 className='title_store'>DANH SÁCH SẢN PHẨM ĐÃ THÊM </h2>
                <Link to = '/' className="store">Thêm Sách</Link>
            </div>
            <div className="pro_table">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Tên sách</td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>Action</td>
                            <td>Tổng</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {item.amount}
                                            <button className="bnt_slg" onClick={() => handleClickAdd(item)}> + </button>
                                            <button className="bnt_slg" onClick={() => handleClickSub(item)}> - </button></td>
                                        <td><button onClick={() => handleOnclickDelete(item.id)}>Xóa</button></td>
                                        <td>{item.price * item.amount}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <br/>
            <div className="payment">
                <h5>Tổng thanh toán: {_.reduce(store, (sum, o) => sum +  o.amount * o.price, 0) }</h5>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    console.log(state)
    return {
        store: state.addstore_reducer
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Store);