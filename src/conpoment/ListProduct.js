import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { FaHouseDamage} from 'react-icons/fa';
import * as _ from 'lodash';
import { useEffect } from "react";

function ListProduct(props) {
    useEffect(() => {
        props.actions.getListPost();
    }, [])
    const { posts, load } = props;
    const { stores } = props
    function handleClick(item) {
        const _filter = _.find(stores, o => o.id === item.id)

        if (_filter) {
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
                <h2 className="name_list">LIST PRODUCT </h2>
                <Link to='/admin' className="admin"> Admin<FaHouseDamage/></Link>
                <Link to='/store' className="store">Cart<FaShoppingCart /><span className="amount">{stores?.length}</span></Link>
            </div>
            {
                load ? <h2 className="name_list">Data is loading from API...</h2> :
                    <div className="product_list">
                        {posts && posts.map((item) => {
                            if (item.allAmount < 1) return null;
                            return (
                                <div className="product_item" key={item.id}>
                                    <img className="img" src={item.images[0]} />
                                    <div className="title">{item.title}</div>
                                    <div className="price">${item.price}</div>
                                    <div className="price">amount: {item.allAmount}</div>
                                    <button className="app-store" onClick={() => handleClick(item)}>Add to card</button>
                                </div>
                            )
                        })}
                    </div>
            }

        </div>
    );
}
const mapStateToProps = state => {
    console.log(state)
    return {
        posts: state.reducer.posts,
        stores: state.reducer.stores
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
