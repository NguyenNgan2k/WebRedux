import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { change, Field, reduxForm } from 'redux-form'
import _, { values } from 'lodash';
function Bill(props) {
   
    return (

        <div className="container order ">
            <div className="header">
                <h2 className='name_list'>Bill</h2>
                <Link to='/payment' className="store">Order detail</Link>
            </div>
        </div>
    );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Bill);