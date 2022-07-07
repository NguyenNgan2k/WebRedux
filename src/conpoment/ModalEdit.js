
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { TiArrowBackOutline,TiDeleteOutline } from 'react-icons/ti'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const required = value => value ? undefined : 'Required'
const upper = value => value.toUpperCase()

const number = value => value && !/[0-9]/i.test(parseInt(value)) ? 'Only numeric characters' : undefined

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
  console.log(props)
  const onChange= (e) => {
      const { input: { onChange } } = props
      
      onChange(e.target.files[0])
      console.log(e)
    }

  return(
  <div>
     <div>
     <input
      type='file'
      accept='.jpg, .png, .jpeg'
      onChange={onChange}
      className="input_file"
     />
   </div>
  </div>
  );
}

function ModalAddNew(props) {
  console.log(props)
  const dispatch = useDispatch()
  const { push } = useHistory()
  const { info, posts, pristine  } = props
  

  useEffect(() => {
    if (info) {
      console.log(info)
      dispatch(change('EditData', 'id', info?.id))
      dispatch(change('EditData', 'image', info?.images[1]))
      dispatch(change('EditData', 'title', info?.title))
      dispatch(change('EditData', 'price', info?.price))
      dispatch(change('EditData', 'amount', info?.allAmount))
    }
  }, [info])

  const submit = (values) => {
    
      props.actions.edit_info(values);
      // //success => router to admin
      // push('/admin')
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
          <Field className="form-control" name="image" type="text"
            component={renderUploadFile}
          />
          
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
          <Field className="form-control" name="price" type="text"
            component={renderField}
            validate={[required, number]}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Amount</label>
          <Field className="form-control" name="amount" type="text"
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