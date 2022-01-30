import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setNewModal } from '../../stores/Submarks/newSubmark'
import { setEditModal } from '../../stores/Submarks/editSubmark';
import { setViewModal } from '../../stores/Submarks/viewSubmark';

import axios from "axios";
import { postSubmark, editSubmark } from '../../stores/Submarks/submarks';

const { REACT_APP_API_URL } = process.env

function SubmarkModal() {
    const dispatch = useDispatch()

    const { modal } = useSelector(state => state.newSubmark)
    const { marks } = useSelector(state => state.marks)
    const { submarks } = useSelector(state => state.submarks)


    // New Mark
    const [inp, setInp] = useState({})
    const [select, setSelect] = useState("")
    const [code, setCode] = useState("")
    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        axios.post(REACT_APP_API_URL + "NewCode", { MODULE: "SUBMARKS" }, { headers }).then(res => setCode(res.data[0].CODE))
    }, [submarks])

    useEffect(() => {
        marks.length > 0 ? setSelect(marks[0].ID) : setSelect("")
    }, [marks])


    const handleSelect = (e) => {
        let value = e.target.value
        setSelect(value)
        setInp({...inp, MARK_ID: value})
    }
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setInp({
            ...inp,
            [name]: value,
            CODE: code,
            MARK_ID: select,
            USER_ID: 1
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postSubmark(inp))
        e.target.reset()
        dispatch(setNewModal())
    }

    // Edit Modal
    const editModal = useSelector(state => state.editSubmark.modal)
    const editDetail = useSelector(state => state.editSubmark.detail)
    
    const [editMark, setEditMark] = useState("");
    const [inp_edit, setInp_edit] = useState({NAME_: "", CODE: "", MARK_ID: ""})

    useEffect( () => {
        setInp_edit(editDetail)
        editDetail ? setEditMark(editDetail.MARK_ID) : setEditMark("")
    }, [editDetail])

    const handleEditSelect = (e) => {
        let value = e.target.value
        setEditMark(value)
        setInp_edit({...inp_edit, MARK_ID: value})
    }

    const handleEditChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setInp_edit({ ...inp_edit, [name]: value, MARK_ID: editMark })
    }

    
    const handleEditSubmit = (e) => {
        e.preventDefault()
        dispatch(editSubmark(inp_edit))
        dispatch(setEditModal())
    }

    // View Mark
    const viewModal = useSelector(state => state.viewSubmark.modal)
    const viewDetail = useSelector(state => state.viewSubmark.detail)

    return (
        <>
            {/* New Modal */}
            <div className={modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Yeni Marka
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
                                        <span className="input-group-text">Marka alt kateqoriya adı :</span>
                                    </div>
                                    <input type="text" className="form-control" name='NAME_' onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka alt kateqoriya kodu:</span>
                                    </div>
                                    <input type="text" className="form-control" name='CODE' disabled value={code} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka :</span>
                                    </div>
                                    <select name="MARK_ID" className='form-control' onChange={(e) => handleSelect(e)}>
                                        {
                                            marks && marks.map((index, key) => (
                                                <option key={key} value={index.ID}>{index.NAME_}</option>
                                            ))
                                        }
                                    </select>
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

            {/* Edit Modal */}
            <div className={editModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                {inp_edit ? inp_edit.NAME_ || '' : " "}
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
                                        <span className="input-group-text">Marka alt kateqoriya adı : </span>
                                    </div>
                                    <input type="text" className="form-control" value={inp_edit ? inp_edit.NAME_ || '' : " "} name='NAME_' onChange={(e) => handleEditChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka alt kateqoriya kodu :</span>
                                    </div>
                                    <input type="text" className="form-control" disabled value={inp_edit ? inp_edit.CODE || '' : " "} name='CODE'  />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka : </span>
                                    </div>
                                    <select name="MARK_ID" className='form-control' 
                                        onChange={ (e) => handleEditSelect(e)}
                                        value={editMark ? editMark || "" : ""}>
                                        {
                                            marks && marks.map( (index, key) => (
                                                <option key={key} value={index.ID} > {index.NAME_} </option>
                                            ))
                                        }
                                    </select>
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

            {/* View Modal */}
            <div className={viewModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                {
                                    viewDetail && viewDetail.NAME_
                                }
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setViewModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <p>Kod: {viewDetail && viewDetail.CODE}</p>
                            <p>Ad: {viewDetail && viewDetail.NAME_}</p>
                            <p>Marka : {viewDetail && viewDetail.MARK_NAME}</p>
                            <p>Marka kodu : {viewDetail && viewDetail.MARK_CODE}</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={() => dispatch(setViewModal())}>Bağla</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmarkModal
