import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setNewModal } from '../../stores/Marks/newMarks'
import { setEditModal } from '../../stores/Marks/editMark';
import { setViewModal } from '../../stores/Marks/viewMark';

import axios from "axios";
import { postMark } from '../../stores/Marks/marks';
import { editMark } from '../../stores/Marks/marks';

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Marks/marks';

const { REACT_APP_API_URL } = process.env

function MarkModal() {
    const dispatch = useDispatch()

	const history = useHistory()
    const { error } = useSelector(state => state.marks)

    useEffect(() => {
        if (error === 401) {
            dispatch(logout())
            dispatch(removeErrors())
            history.push('/')
        }
    }, [error, dispatch, history])

    const { modal } = useSelector(state => state.newMark)
    const { categories } = useSelector(state => state.categories)
    const { marks } = useSelector(state => state.marks)

    // New Mark
    const [inp, setInp] = useState({})
    const [select, setSelect] = useState("")
    const [code, setCode] = useState("")
    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        axios.post(REACT_APP_API_URL + "NewCode", { MODULE: "MARKS" }, { headers }).then(res => setCode(res.data[0].CODE))
    }, [marks])

    useEffect(() => {
        categories.length > 0 ? setSelect(categories[0].ID) : setSelect("")
    }, [categories])


    const handleSelect = (e) => {
        let value = e.target.value
        setSelect(value)
        setInp({...inp, CATEGORY_ID: value})
    }
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setInp({
            ...inp,
            [name]: value,
            CODE: code,
            CATEGORY_ID: select,
            USER_ID: 1
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postMark(inp))
        e.target.reset()
        dispatch(setNewModal())
    }

    // Edit Modal
    const editModal = useSelector(state => state.editMark.modal)
    const editDetail = useSelector(state => state.editMark.detail)
    
    const [editCategory, setEditCategory] = useState("");
    const [inp_edit, setInp_edit] = useState({NAME_: "", CODE: "", CATEGORY_ID: ""})

    useEffect( () => {
        setInp_edit(editDetail)
        editDetail ? setEditCategory(editDetail.CATEGORY_ID) : setEditCategory("")
    }, [editDetail])

    const handleEditSelect = (e) => {
        let value = e.target.value
        setEditCategory(value)
        setInp_edit({...inp_edit, CATEGORY_ID: value})
    }

    const handleEditChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setInp_edit({ ...inp_edit, [name]: value, CATEGORY_ID: editCategory })
    }

    
    const handleEditSubmit = (e) => {
        e.preventDefault()
        dispatch(editMark(inp_edit))
        dispatch(setEditModal())
    }

    // View Mark
    const viewModal = useSelector(state => state.viewMark.modal)
    const viewDetail = useSelector(state => state.viewMark.detail)

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
                                        <span className="input-group-text">Marka Adı :</span>
                                    </div>
                                    <input type="text" className="form-control" name='NAME_' onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka Kodu:</span>
                                    </div>
                                    <input type="text" className="form-control" name='CODE' disabled value={code} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka kateqoriyası:</span>
                                    </div>
                                    <select name="CATEGORY_ID" className='form-control' onChange={(e) => handleSelect(e)}>
                                        {
                                            categories && categories.map((index, key) => (
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
                                        <span className="input-group-text">Marka Adı : </span>
                                    </div>
                                    <input type="text" className="form-control" value={inp_edit ? inp_edit.NAME_ || '' : " "} name='NAME_' onChange={(e) => handleEditChange(e)} />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka Kodu :</span>
                                    </div>
                                    <input type="text" className="form-control" disabled value={inp_edit ? inp_edit.CODE || '' : " "} name='CODE'  />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Marka Kateqoriyası : </span>
                                    </div>
                                    <select name="CATEGORY_ID" className='form-control' 
                                        onChange={ (e) => handleEditSelect(e)}
                                        value={editCategory ? editCategory || "" : ""}>
                                        {
                                            categories && categories.map( (index, key) => (
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
                            <p>Kateqoriya: {viewDetail && viewDetail.CATEGORY_NAME}</p>
                            <p>Kateqoriya kodu: {viewDetail && viewDetail.CATEGORY_CODE}</p>

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

export default MarkModal
