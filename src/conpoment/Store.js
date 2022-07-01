import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
function Store(props) {
    const { product, actions } = props;
    const handleOnclickDelete = (id) => {
        actions.deletestore(id)
        console.log(product)
    }
     
    return (
        <div className="container ">
            <h2 className='title_store'>DANH SÁCH SẢN PHẨM ĐÃ THÊM </h2>
            <div className="pro_table">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Tên sách</td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                         {
                            product.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td></td>
                                        <td><button onClick={() => handleOnclickDelete(item.id)}>Xóa</button></td>
                                    </tr>
                                )
                            })
                         }
                         
                    </tbody>
                </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(Store);