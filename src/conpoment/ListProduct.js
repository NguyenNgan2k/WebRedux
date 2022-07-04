import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { Link } from "react-router-dom";

import * as _ from 'lodash';

const productList = [
    {
        id: 1,
        title: 'Chasm City',
        price: 20000
    },
    {
        id: 2,
        title: 'Hoang tu be',
        price: 53000
    },
    {
        id: 3,
        title: 'Harry Potter',
        price: 92000
    },
    {
        id: 4,
        title: 'Xep hang lam gi',
        price: 38500
    },
    {
        id: 5,
        title: 'Phieu luu ky',
        price: 45000
    }
]
function ListProduct(props) {
    const { store } = props
    const handleClick = (item) => {

        const _filter = _.find(store, o => o.id === item.id)
        
        if(_filter){
            let arrow = Object.assign({}, _filter)
            arrow.amount = !_filter.amount ? 1 : (_filter.amount + 1);
            props.actions.update_amount(arrow)
        } else {
            let arrow = Object.assign({}, item)
            props.actions.add_store(arrow)
        }
    }
    return (
        <div className="container product">
            <div className="header">
                <h2>DANH SÁCH SẢN PHẨM</h2>
                <Link  to = '/store' className="store">Store <span>({store.length})</span></Link>
            </div>
            <div className="product_list">
                {productList.map((item) => {
                    return (
                        <div className="product_item" key={item.id}>
                            <div className="title">Tên: {item.title}</div>
                            <div className="price">Giá: {item.price}</div>
                            <button className="app-store" onClick={() => handleClick(item)}>Add store</button>
                        </div>
                    )
                })}
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
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
