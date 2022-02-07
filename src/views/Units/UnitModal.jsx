import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setNewModal } from '../../stores/Units/newUnit';
import { setEditModal } from '../../stores/Units/editUnit';
import { setViewModal } from '../../stores/Units/viewUnit'

import { postUnit, editUnit } from '../../stores/Units/units';

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Units/units';


function UnitModal() {
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
  const [inp_new, setInp_new] = useState({});

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setInp_new({ ...inp_new, [name]: value, USER_ID: 1 });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUnit(inp_new))
    e.target.reset()
    dispatch(setNewModal())
  }

  // EDIT CATEGORY
  const editModal = useSelector(state => state.editUnit.modal)
  const editDetail = useSelector(state => state.editUnit.detail)
  const [inp_edit, setInp_edit] = useState({ AMOUNT: "", CODE: "" })

  useEffect(() => {
    setInp_edit(editDetail)
  }, [editDetail])

  const handleEditChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setInp_edit({ ...inp_edit, [name]: value })
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()
    dispatch(editUnit(inp_edit))
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
            <form onSubmit={(e) => handleSubmit(e)}>

              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Kodu :</span>
                  </div>
                  <input type="text" className="form-control" name='CODE' onChange={(e) => handleChange(e)} />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Miqdarı:</span>
                  </div>
                  <input type="text" className="form-control" name='AMOUNT' onChange={(e) => handleChange(e)} />
                </div>

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
                onClick={() => dispatch(setEditModal())}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={(e) => handleEditSubmit(e)}>

              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Kodu : </span>
                  </div>
                  <input type="text" className="form-control" value={inp_edit ? inp_edit.CODE || '' : " "} name='CODE' onChange={(e) => handleEditChange(e)} />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Vahid Miqdarı :</span>
                  </div>
                  <input type="text" className="form-control" value={inp_edit ? inp_edit.AMOUNT || '' : " "} name='AMOUNT' onChange={(e) => handleEditChange(e)} />
                </div>

              </div>
              <div className="modal-footer">
                <button className=" btn btn-primary" type='submit'>Göndər</button>

                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                  onClick={() => dispatch(setEditModal())}>Bağla</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default UnitModal
