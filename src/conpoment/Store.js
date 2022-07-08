import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import _ from 'lodash';
import { FaTrash } from 'react-icons/fa';
import { BsCheck2Square } from 'react-icons/bs';
import { useState } from 'react';

function Store(props) {
     
    const [state, setState] = useState(false)
    const { stores, payments } = props;
    const handleOnclickDelete = (item) => {

        props.actions.delete_store(item)
    }
    const handleClickAdd = (item) => {
        let arrow = Object.assign({}, item)
        if (arrow.allAmount === 0) {
            alert("Product = 0")
        } else {
            arrow.amount = item.amount + 1
            props.actions.update_amount(arrow)

        }

    }
    const handleClickSub = (item) => {
        let arrow = Object.assign({}, item)
        if (arrow.amount - 1 > 0) {
            arrow.amount = item.amount - 1
            props.actions.sub_amount(arrow)
        } else {
            if (window.confirm("Bạn muốn xóa sản phẩm này")) {
                props.actions.delete_store(item)
            }
        }

    }
    const handleClickCheckBox = (item) => {
        const _find = _.find(payments, o => o.id === item.id)
        if (_find) {
            props.actions.delete_payment(item)
        } else {
            props.actions.add_payment(item)
        }

    }
    const handleClear = () =>{
        props.actions.clear_payment()
    }
    return (
        <div className="container ">
            <div className="header">
                <h2 className='name_list'>Cart</h2>
                <Link to='/' className="store" onClick={handleClear}>Shopping</Link>
            </div>
            <div className="pro_table">
                <table>
                    <thead>
                        <tr>
                            <td><BsCheck2Square /></td>
                            <td>Product</td>
                            <td></td>
                            <td>Amount</td>
                            <td>Price</td>
                            <td>Number</td>
                            <td>Action</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stores.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {/* {state === false ? <td onClick={handleOnclickCheck}><GrCheckbox/></td> :  <td  onClick={handleOnclickCheck}><BsCheck2Square/></td> } */}
                                        <td>
                                            <input type="checkbox" 
                                                name={item.id} 
                                                onChange={() => handleClickCheckBox(item)} 
                                                checked={_.some(payments, o => o.id === item.id)}
                                                />
                                        </td>
                                        <td className="cart_img"><img className="img" src={item.image} /></td>
                                        <td>{item.title}</td>
                                        <td>{item.allAmount}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            {item.amount}
                                            <button className="bnt_slg" onClick={() => handleClickAdd(item)}> + </button>
                                            <button className="bnt_slg" onClick={() => handleClickSub(item)}> - </button></td>
                                        <td><button className="bnt_slg" onClick={() => handleOnclickDelete(item)}><FaTrash /></button></td>
                                        <td>${item.price * item.amount}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <br />
            <div className="payment">
                Cart Total ({payments.length} product):
                <span className="total_cart">${_.reduce(payments, (sum, o) => sum + o.amount * o.price, 0)}</span>
                <button className="text" >Payment</button>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    console.log(state)
    return {
        stores: state.reducer.stores,
        payments: state.reducer.payments
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Store);