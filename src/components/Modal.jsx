import React, { useState, useEffect } from 'react'
import { setModal } from "../stores/Categories/viewCategory";
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setNewModal } from '../stores/Categories/newCategory';
import { setEditModal } from '../stores/Categories/editCategory';

import { postAsyncCategory } from '../stores/Categories/category';
import { editAsyncCategory } from '../stores/Categories/category';

const mapStateToProps = state => ({

    // view Category
    category_view_modal: state.viewCategory.modal,
    category_view_detail: state.viewCategory.detail,

    // new Category
    category_new_modal: state.newCategory.modal,

    // Edit category
    category_edit_detail: state.editCategory.detail,
    category_edit_modal: state.editCategory.modal,
})

function Modal({
    category_view_modal,
    category_view_detail,
    category_new_modal,
    category_edit_modal,
    category_edit_detail
}) {
    

    const dispatch = useDispatch()

    // ADD NEW CATEGORY
    const [inp_new, setInp_new] = useState();

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setInp_new({...inp_new, [name]: value, USER_ID: 1});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postAsyncCategory(inp_new))
    }

    // EDIT CATEGORY
    const [inp_edit, setInp_edit] = useState()

    useEffect(() => {
        setInp_edit(category_edit_detail)
    }, [category_edit_detail])

    const handleEditChange = (e) => {
        let name = e.target.name 
        let value = e.target.value

        setInp_edit({...inp_edit, [name]: value})
    }
    const handleEditSubmit = (e) => {
        e.preventDefault()
        dispatch(editAsyncCategory(inp_edit))
    }
    return (
        
        <>
            {/* View Category */}
            <div className={category_view_modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                {
                                    category_view_detail && category_view_detail.NAME_
                                }
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <p>{category_view_detail && category_view_detail.ID}</p>
                            <p>{category_view_detail && category_view_detail.CODE}</p>
                            <p>{category_view_detail && category_view_detail.NAME_}</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={() => dispatch(setModal())}>Bağla</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Category */}
            <div className={category_new_modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Yeni Kateqoriya
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setNewModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">NAME</span>
                                    </div>
                                    <input type="text" className="form-control"  name='NAME_' onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">CODE</span>
                                    </div>
                                    <input type="text" className="form-control"  name='CODE' onChange={(e) => handleChange(e)} />
                                </div>
                                <button className="mt-2 btn btn-primary">SEND</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={() => dispatch(setNewModal())}>Bağla</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Category */}
            <div className={category_edit_modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                { category_edit_detail && category_edit_detail.NAME_ }
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setEditModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleEditSubmit(e)}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">NAME</span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={category_edit_detail && category_edit_detail.NAME_} name='NAME_' onChange={(e) => handleEditChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">CODE</span>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={category_edit_detail && category_edit_detail.CODE} name='CODE' onChange={(e) => handleEditChange(e)} />
                                </div>
                                <button className="mt-2 btn btn-primary">SEND</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={() => dispatch(setEditModal())}>Bağla</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect(mapStateToProps)(Modal)
