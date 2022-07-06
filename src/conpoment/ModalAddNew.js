import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {TiArrowBackOutline} from 'react-icons/ti'
const required = value => value ? undefined : 'Required'
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
function ModalAddNew(props) {
    const {push} = useHistory()
    const {posts} = props
 
    const submit = (values) => {
        const _find = _.find(posts,o => o.id === values.id )
        if(!_find)
        {
            props.actions.add_post(values);
            //success => router to admin
            push('/admin')
        } else {
            alert("Violation of PRIMARY KEY")
        }
        
    }

    const { handleSubmit, submitting } = props
    return (
        <div className="container add">
            <div className="header">
                <h2 className='name_list'>Add new product</h2>
                <Link className="add_new" to="/admin" ><TiArrowBackOutline/></Link>
            </div>
            <form className="row g-3 form_add " onSubmit={handleSubmit(submit)} >
                <div className="col-md-12">
                    <label className="form-label">ID</label>
                    <Field className="form-control" name="id" type="text" 
                        component={renderField}
                        validate={[required, number]}
                       
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Image</label>
                    <Field className="form-control" name="image" type="text" 
                        component={renderField}
                        validate={required}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Title</label>
                    <Field className="form-control" name="title" type="text" 
                        component={renderField}
                        validate={required}
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
                    <button type="submit" className="btn btn-primary"  disabled={submitting}>ADD</button>
                </div>
            </form>
        </div>

    );
}
const formed = reduxForm({
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

export default connect(mapStateToProps, mapDispatchToProps)(formed);