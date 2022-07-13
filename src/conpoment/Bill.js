import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { change, Field, reduxForm } from 'redux-form'
import _, { values } from 'lodash';
function Bill(props) {
    const { payments, bill } = props
    return (

        <div className="container bill ">
            <div className="header">
                <h2 className='name_list'>Bill</h2>
                <Link to='/pay' className="store">Order detail</Link>
            </div>
            <div className="bill_container">
                <div className="bill_info">
                    <div className="collum1">
                        <p>Name: {bill.name}</p> 
                    
                        <p>Address: {bill.address}</p>
                    </div>
                    <div className="collum2">
                       <p> Phone number: {bill.phone}</p>
                        
                        <p>Note: {bill.note}</p>
                    </div>
                </div>
                <div className="bill_product">
                    <table className="bill_product">
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Amount</td>
                                <td>Price</td>
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
                                            <td>${item.price}</td>
                                            <td>${item.amount * item.price}</td>
                                        </tr>
                                    )

                                })
                            }

                            <tr>
                                <td></td>
                                <td></td>
                                <td className="total">Total Order</td>
                                <td className="total total_color">${_.reduce(payments, (sum, o) => sum + o.amount * o.price, 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
const mapStateToProps = state => {
    console.log(state)
    return {
        payments: state.reducer.payments,
        bill: state.reducer.bill
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Bill);