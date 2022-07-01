import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { Link } from "react-router-dom";
const products = [
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
    const { product } = props
    const handleClick = (item) => {
        props.actions.addstore(item)
    }
    return (
        <div className="container product">
            <div className="header">
                <h2>DANH SÁCH SẢN PHẨM</h2>
                <Link  to = '/store' className="store">Store <span>({product.length})</span></Link>
            </div>
            <div className="product_list">
                {products.map((item) => {
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
        product: state.addstore_reducer
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
