import React from 'react'
import { setModal } from "../stores/Categories/viewCategory";
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setNewModal } from '../stores/Categories/newCategory';

const mapStateToProps = state => ({
    
    // view Category
    category_view_modal: state.viewCategory.modal,
    category_view_detail: state.viewCategory.detail,

    // new Category
    category_new_modal: state.newCategory.modal,
    category_new_detail: state.newCategory.detail
})

function Modal({
    category_view_modal,
    category_view_detail,
    category_new_modal,
    category_new_detail
}) {

    const dispatch = useDispatch()

    return (
        <>
        {/* View Category */}
        <div className={category_view_modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
            tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
            tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            onClick={() => dispatch(setNewModal())}>Bağla</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default connect(mapStateToProps)(Modal)
