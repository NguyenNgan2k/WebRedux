import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { change,Field, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _, { rest, upperCase } from 'lodash';
import { TiArrowBackOutline, TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
function required(value) {
    return value ? undefined : 'Required';
}
// const number = value => value.toUppherCase()
const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div className="col-md-12">
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const renderUploadFile = (props) => {
    
    const { input} = props   
    const onChange= (e) => {
        input.onChange(e.target.files[0])
      }
    return(
        <div className="myfileupload-buttonbar ">
             
        <label className="myui-button">
            <span>Add Files</span>
            <input id="file" type="file" name="files[]" onChange={onChange}  />
            <span></span>
        </label>
         
    </div>
    );
}


function ModalAddNew(props) {
    const [state, setState] = useState("Không có tệp nào")
    const { posts, reset } = props
    const submit = (values) => {
      
        const _find = _.find(posts, o => o.id === values.id)
        if (!_find) {
            props.actions.add_post(values);
            //success => router to admin
            // push('/admin')
        } else {
            alert("Violation of PRIMARY KEY")
        }

    }
    const onChange = (values) => {
        if (values) {
            setState(values.name)
        } else {
            setState("Không có tệp nào")
        }
    }
    const onClickDelete= (values) =>{
        setState("Không có tệp nào")
        props.change('image', undefined);
    }
  
    const { handleSubmit } = props
    return (
        <div className="container add">
            <div className="header">
                <h2 className='name_list'>Add new product</h2>
                <Link className="add_new" to="/admin" ><TiArrowBackOutline /></Link>
            </div>
            <form className="row g-3 form_add " onSubmit={handleSubmit(submit)} >
                <div className="col-md-12">
                    <label className="form-label">ID</label>
                    <Field className="form-control" name="id" type="text"
                        component={renderField}
                    // validate={required}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Image</label>
                    <Field className="form-control" name="image" type="file"
                        component={renderUploadFile}
                        onChange={onChange}
                    />
                    <div className="show_name">{state} <span><TiDeleteOutline onClick={onClickDelete}/></span></div>
                     
                </div>
                <div className="col-md-12">
                    <label className="form-label">Title</label>
                    <Field className="form-control" name="title" type="text"
                        component={renderField}
                    // validate={required}

                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Price</label>
                    <Field className="form-control" name="price" type="text"
                        component={renderField}
                    // validate={required}

                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Amount</label>
                    <Field className="form-control" name="amount" type="text"
                        component={renderField}
                    // validate={required}

                    />
                </div>


                <div className="col-1">
                    <button type="submit" className="btn btn-primary" >ADD</button>
                </div>
                {/* <div className="col-1">
                    <button type="submit" className="btn btn-primary" onClick={reset}>Clear</button>
                </div> */}
            </form>
        </div>

    );
}
const addNew = reduxForm({
    form: 'AddNewData'
})(ModalAddNew);

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

export default connect(mapStateToProps, mapDispatchToProps)(addNew);