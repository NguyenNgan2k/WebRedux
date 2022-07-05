import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

function ModalAddNew(props) {

    const submit = (values) => {
        console.log(values)
    }

    const { handleSubmit } = props
    return (
        <div className="container add">
            <div className="header">
                <h2 className='name_list'>Add new data</h2>
            </div>
            <form className="row g-3 form_add " onSubmit={handleSubmit(submit)} >
                <div className="col-md-12">
                    <label className="form-label">ID</label>
                    <Field className="form-control" name="tesst1" component="input" type="text" />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Image</label>
                    <Field className="form-control" name="tesst2" component="input" type="text" />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Title</label>
                    <Field className="form-control" name="tesst3" component="input" type="text" />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Price</label>
                    <Field className="form-control" name="tesst4" component="input" type="text" />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Amount</label>
                    <Field className="form-control" name="tesst5" component="input" type="text" />
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>

    );
}
const formed = reduxForm({
    form: 'AddNewData'
})(ModalAddNew);

const mapDispatchToProps = () => {

    
}

export default connect()(formed);