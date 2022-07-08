import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { change, Field, reduxForm } from 'redux-form'
import _ from 'lodash';
function Payment(props) {
    const { payments } = props
    const hanldeClickClear = () => {
        props.actions.clear_payment()
    }
    return (

        <div className="container order ">
            <div className="header">
                <h2 className='name_list'>Order Detail</h2>
                <Link to='/store' className="store" onClick={() => hanldeClickClear()}>Cart</Link>
            </div>
            <div className="info">
                <div className="info_container">
                    <div className="info_user">
                        <div>THÔNG TIN THANH TOÁN</div>
                        <div className="form_user">
                            <div className="col-md-12">
                                <Field className="form-control user" name="name" type="text" placeholder="Name"
                                    component="input"
                                />
                            </div>
                            <div className="col-md-12">
                                <Field className="form-control user" name="phone" type="text" placeholder="Phone Number"
                                    component="input"
                                />
                            </div>
                            <div className="col-md-12">
                                <Field className="form-control user" name="address" type="text" placeholder="Address"
                                    component="input"
                                />
                            </div>

                            <div className="col-md-12">
                                <Field className="form-control user" name="note" type="" placeholder="Note"
                                    component="input"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info_container">
                    <div className="info_order">
                        <div>ĐƠN HÀNG CỦA BẠN</div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Product</td>
                                        <td>Amount</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((item) => {
                                            return (
                                                <tr key={item.id} className="table_order">
                                                    <td>{item.title}</td>
                                                    <td>{item.amount}</td>
                                                    <td>${item.amount * item.price}</td>
                                                </tr>
                                            )

                                        })
                                    }

                                    <tr>
                                        <td>Total Order</td>
                                        <td></td>
                                        <td>${_.reduce(payments, (sum, o) => sum + o.amount * o.price, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
const form_payment = reduxForm({
    form: 'InfoOrder'
})(Payment);
const mapStateToProps = state => {
    console.log(state)
    return {
        payments: state.reducer.payments
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(form_payment);