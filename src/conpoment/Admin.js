import { bindActionCreators } from 'redux';
import * as todoAction from '../action/addStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import _, { set } from 'lodash';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from "react";

function Admin(props) {
    
    useEffect(() => {
        props.actions.getListPost();
    }, [])
    const handleClickEdit = (id) => {
        props.actions.get_info(id)
    }
    const handleClickDelete = (id) => {
        props.actions.delete_product(id)
    }
    const { posts } = props
    return (
        <div className="container">
            <div className="header">
                <h2 className='name_list'>Admin</h2>
                <Link className="add_new" to="/addnew" >Add New</Link>
            </div>
            <div className="pro_table">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Image</td>
                            <td>Title</td>
                            <td>Amount</td>
                            <td>Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts && posts.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td ><img className="admin_img" src={item.images[1]} /></td>
                                        <td>{item.title}</td>
                                        <td>{item.allAmount}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <Link  to="/editdata" style={{color: '#000'}} onClick = {() => handleClickEdit(item.id)} > <FaEdit /> </Link>
                                        <FaTrash onClick={() => handleClickDelete(item.id)}/>
                                        </td>
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
        posts: state.reducer.posts,
       
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(todoAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);