import React, { useState, useEffect,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setNewModal } from '../../stores/Units/newUnit';
import { setEditModal } from '../../stores/Units/editUnit';
import { setViewModal } from '../../stores/Units/viewUnit'

import { postUnit, editUnit } from '../../stores/Units/units';

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Units/units';
import { useForm } from "react-hook-form";



function UnitModal() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch()

  const history = useHistory()
  const { error } = useSelector(state => state.units)

  useEffect(() => {
    if (error === 401) {
      dispatch(logout())
      dispatch(removeErrors())
      history.push('/')
    }
  }, [error, dispatch, history])


  // ADD NEW CATEGORY
  const { modal } = useSelector(state => state.newUnit)
  const postData = (data, e) => {
    data = {
      ...data,
      USER_ID: 1
    };
    dispatch(postUnit(data))
    e.target.reset()
    dispatch(setNewModal())
  }

  // EDIT CATEGORY
  const { register: editRegister, formState: { errors: editErrors }, handleSubmit: handleEditSubmit } = useForm();
  const editModal = useSelector(state => state.editUnit.modal)
  const editDetail = useSelector(state => state.editUnit.detail)
  const [inp_edit, setInp_edit] = useState({ AMOUNT: "", CODE: "" })

  const editForm = useRef()
  useEffect(() => {
    setInp_edit(editDetail)
  }, [editDetail])
  
  const editData = (data, e) => {
    data = {
      ...inp_edit,
      ...data
    };
    dispatch(editUnit(data))
    e.target.reset()
    dispatch(setEditModal())
  }

  const closeEditModal = () => {
    editForm.current.reset()
    dispatch(setEditModal())
  }

  // View Unit
  const viewModal = useSelector(state => state.viewUnit.modal)
  const viewDetail = useSelector(state => state.viewUnit.detail)

  return (
    <>
      {/* View Category */}
      <div className={viewModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
        tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {
                  viewDetail && viewDetail.CODE
                }
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                onClick={() => dispatch(setViewModal())}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <p>{viewDetail && viewDetail.CODE}</p>
              <p>{viewDetail && viewDetail.AMOUNT}</p>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal"
                onClick={() => dispatch(setViewModal())}>Bağla</button>
            </div>
          </div>
        </div>
      </div>

      {/* New Category */}
      <div className={modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
        tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Yeni Vahid
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                onClick={() => dispatch(setNewModal())}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(postData)}>

              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Kodu :</span>
                  </div>
                  <input type="text" className="form-control" {...register("CODE", { required: true })} name='CODE'  />
                </div>
                {errors.CODE && <span className='text-danger'>Vahid kodu boş ola bilməz!</span>}
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Miqdarı:</span>
                  </div>
                  <input type="text" className="form-control" {...register("AMOUNT", { required: true, pattern: /\d+/g })} name='AMOUNT'  />
                </div>
                {errors.AMOUNT && (
                  errors.AMOUNT.type === "required" ? <span className='text-danger'>Vahid Miqdarı boş ola bilməz!</span> :
                  <span className='text-danger'>Vahid Miqdarı rəqəm olmalıdır!</span>
                )}


              </div>
              <div className="modal-footer">
                <button className=" btn btn-primary" type='submit'>Göndər</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                  onClick={() => dispatch(setNewModal())}>Bağla</button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Edit Category */}
      <div className={editModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
        tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {inp_edit ? inp_edit.CODE || '' : " "}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                onClick={() => closeEditModal()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form ref={editForm} onSubmit={handleEditSubmit(editData)}>

              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Kodu : </span>
                  </div>
                  <input type="text" className="form-control" name='CODE' 
                  defaultValue={inp_edit ? inp_edit.CODE || '' : " "}
                  {...editRegister("CODE", { required: true })} />
                </div>
                {editErrors.CODE && <span className='text-danger'>Vahid kodu boş ola bilməz!</span>}

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Miqdarı :</span>
                  </div>
                  <input type="text" className="form-control"  name='AMOUNT' 
                  defaultValue={inp_edit ? inp_edit.AMOUNT || '' : " "}
                  {...editRegister("AMOUNT", { required: true, pattern: /\d+/g })} />
                </div>
                {editErrors.AMOUNT && (
                  editErrors.AMOUNT.type === "required" ? <span className='text-danger'>Vahid Miqdarı boş ola bilməz!</span> :
                  <span className='text-danger'>Vahid Miqdarı rəqəm olmalıdır!</span>
                )}

              </div>
              <div className="modal-footer">
                <button className=" btn btn-primary" type='submit'>Göndər</button>

                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                  onClick={() => closeEditModal()}>Bağla</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default UnitModal
