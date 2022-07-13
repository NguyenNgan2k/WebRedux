import React, { useState, useCallback} from 'react'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import * as todoAction from '../action/addStore';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _, { rest, upperCase, values } from 'lodash';
import { TiArrowBackOutline, TiDeleteOutline } from 'react-icons/ti';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
function required(value) {
    return value ? undefined : 'Required';
}
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


// Uploadfile
const renderUploadFile = (props) => {

    const { input } = props
    const onChange = (e) => {
        input.onChange(e.target.files)
    }
    return (
        <div className="myfileupload-buttonbar ">

            <label className="myui-button">
                <span>Add Files</span>
                <input id="file" type="file" name="files[]" onChange={onChange} multiple/>
                <span></span>
            </label>

        </div>
    );
}



function ModalAddNew(props) {
    const [baseImage, setBaseImage] = useState([])

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

    const onClickDelete = (img) => {     
            setBaseImage(_.remove(baseImage,  o => o === img))      
        // setState("Không có tệp nào")
      // props.change('image', undefined);
    }

    //uploadImage

    // const uploadImage =  async(values) => {
        
    //     for(let i = 0; i < values.length; i++)
    //     {
    //         const _imgBase64 =  await convertBase64(values[i])
    //         console.log(_imgBase64)
    //         return setBaseImage([
    //             ...baseImage,
    //             ...[_imgBase64]
    //         ])
             
    //     }
    // }

    const uploadImage =useCallback(async(values) => {
        for(let i = 0; i < values.length; i++)
        {
            let arr = []
            const _imgBase64 =  await convertBase64(values[i])
            arr.push([_imgBase64])
             console.log("===check arr===", arr)
        }
        setBaseImage([])
    },[baseImage])

    //encode base64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    //decode base 64
  
    const { handleSubmit } = props
    console.log("====check====",baseImage)
    return (
       
        <div className="container add">
           
            <div className="header">
                <h2 className='name_list'>Add new product</h2>
                <Link className="add_new" to="/admin" ><TiArrowBackOutline /></Link>
            </div>
            <form className="row g-3 form_add " onSubmit={handleSubmit(submit)}>
                <div className="col-md-12">
                    <label className="form-label">ID</label>
                    <Field className="form-control" name="id" type="text"
                        component={renderField}
                        validate={required}
                    />
                </div>


                {/* Image */}

                <div className="col-md-12">
                    <label className="form-label">Image</label>
                    <Field className="form-control" name="image" type="text"
                        component={renderUploadFile}
                        onChange={uploadImage}
                    />
                    {/* <div className="show_name">{state} <span><TiDeleteOutline onClick={onClickDelete} /></span></div> */}

                    <div className="grid">
                        {baseImage.map((img, index) => {
                            return (
                                <div className="box" key={index}>                      
                                    <img src={img} />
                                    <span><TiDeleteOutline onClick={() => onClickDelete(img)} /></span>
                                </div>
                            );
                        })} 

                    </div>

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


                <div className="col-1">
                    <button type="submit" className="btn btn-primary" >ADD</button>
                </div>
                <div className="col-1">
                    <button type="submit" className="btn btn-primary" onClick={reset}>Clear</button>
                </div>
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