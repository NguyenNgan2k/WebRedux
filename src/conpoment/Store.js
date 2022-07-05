import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import _ from 'lodash';
import { FaTrash } from 'react-icons/fa';
function Store(props) {
    const { stores } = props;
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
        if( arrow.amount - 1 >0) {
            arrow.amount = item.amount - 1
            props.actions.sub_amount(arrow)
        } else {
            if(window.confirm("Bạn muốn xóa sản phẩm này")){
                props.actions.delete_store(item)
            }        
        }
        
    }
    return (
        <div className="container ">
            <div className="header">
                <h2 className='name_list'>Cart</h2>
                <Link to = '/' className="store">SHOPPING</Link>
            </div>
            <div className="pro_table">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Product</td>
                            <td></td>
                            <td>All Amount</td>
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
                                        <td>{item.id}</td>
                                        <td className="cart_img"><img className="img" src={item.image} /></td>
                                        <td>{item.allAmount}</td>
                                        <td>{item.title}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            {item.amount}
                                            <button className="bnt_slg" onClick={() => handleClickAdd(item)}> + </button>
                                            <button className="bnt_slg" onClick={() => handleClickSub(item)}> - </button></td>
                                        <td><button className="bnt_slg"  onClick={() => handleOnclickDelete(item)}><FaTrash/></button></td>
                                        <td>${item.price * item.amount}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <br/>
            <div className="payment">
                <h5 className="total_cart">Cart Total: ${_.reduce(stores, (sum, o) => sum +  o.amount * o.price, 0) }</h5>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    console.log(state)
    return {
        stores: state.reducer.stores
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Store);