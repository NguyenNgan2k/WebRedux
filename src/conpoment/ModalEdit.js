
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { TiArrowBackOutline, TiDeleteOutline } from 'react-icons/ti'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const required = value => value ? undefined : 'Required'
const upper = value => value.toUpperCase()

const number = value => value && !/^\d+$/i.test(value) ? 'Only numeric characters' : undefined

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

  const { input } = props
  const onChange = (e) => {
    input.onChange(e.target.files[0])
  }
  return (
    <div className="myfileupload-buttonbar ">

      <label className="myui-button">
        <span>Add Files</span>
        <input id="file" type="file" name="files[]" onChange={onChange} />
        <span></span>
      </label>

    </div>
  );
}


function ModalAddNew(props) {
  console.log(props)
  const dispatch = useDispatch()
  const { push } = useHistory()
  const { info, posts} = props

  // const [state, setState] = useState("Không có tệp nào")
  const [state, setState] = useState(info?.images[1])
  useEffect(() => {
    if (info) {
      console.log(info)
      dispatch(change('EditData', 'id', info?.id))
      // dispatch(change('EditData', 'image', info?.images[1]))
      dispatch(change('EditData', 'title', info?.title))
      dispatch(change('EditData', 'price', info?.price))
      dispatch(change('EditData', 'amount', info?.allAmount))
    }
  }, [info])

  const submit = (values) => {
    console.log("check image", values.image)
    if(values.image) {
      props.actions.edit_info(values);
    }
    else {
      let arrow = Object.assign({}, values)
      arrow.image = info?.images[1];
      props.actions.edit_info(arrow);
    }
     
    // //success => router to admin
    // push('/admin')
  }
  const onChange = (values) => {
    if (values) {
        setState(values.name)
    } else {
        setState("Không có tệp nào")
    }
}
const onClickDelete= (values) =>{
    setState(info?.images[1])
    props.change('image', info?.images[1]);
}

  const { handleSubmit, submitting } = props
  return (
    <div className="container add">
      <div className="header">
        <h2 className='name_list'>Edit product</h2>
        <Link className="add_new" to="/admin" ><TiArrowBackOutline /></Link>
      </div>
      <form className="row g-3 form_add " onSubmit={handleSubmit(submit)} >
        <div className="col-md-12">
          <label className="form-label">ID</label>
          <Field className="form-control" name="id" type="text"
            component={renderField}
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
            validate={required}
            normalize={upper}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Price</label>
          <Field className="form-control" name="price" type="number"
            component={renderField}
            validate={[required, number]}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Amount</label>
          <Field className="form-control" name="amount" type="number"
            component={renderField}
            validate={[required, number]}
          />
        </div>


        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={submitting}>SAVE</button>
        </div>
      </form>
    </div>

  );
}

const mapStateToProps = state => {
  console.log(state)
  return {
    posts: state.reducer.posts,
    info: state.reducer.info
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todoAction, dispatch)
  };
}
const formed = reduxForm({
  form: 'EditData',

})(ModalAddNew);

export default connect(mapStateToProps, mapDispatchToProps)(formed);