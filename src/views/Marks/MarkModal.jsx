import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setNewModal } from '../../stores/Marks/newMarks'

import axios from "axios";
import { postMark } from '../../stores/Marks/marks';
const {REACT_APP_API_URL} = process.env

function MarkModal() {
    const dispatch = useDispatch()

    const { modal } = useSelector(state => state.newMark)
    const { categories } = useSelector(state => state.categories)
    const { marks } = useSelector(state => state.marks)

    // New Mark
    const [inp, setInp] = useState({})
    const [select, setSelect] = useState()
    const [code, setCode] = useState("")

    useEffect( () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token')
        }
        axios.post(REACT_APP_API_URL+"NewCode", {MODULE: "MARKS"}, {headers}).then(res => setCode(res.data[0].CODE))
    }, [marks])

    useEffect( () => {
        categories.length > 0 ? setSelect({CATEGORY_ID: categories[0].ID}) : setSelect({CATEGORY_ID: ''})
    }, [categories])

    
    const handleSelect = (e) => {
        let value = e.target.value 
        setSelect({CATEGORY_ID: value})
    }
    const handleChange = (e) => {
        let name = e.target.name 
        let value = e.target.value 

        setInp({
            ...inp,
            [name]: value,
            CODE: code,
            ...select,
            USER_ID: 1
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postMark(inp))
        e.target.reset()

    }
    
  return (
    <>
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
                                    <select name="CATEGORY_ID" className='form-control' onChange={ (e) => handleSelect(e)}>
                                        {
                                            categories && categories.map( (index, key) => (
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
    </>
  )
}

export default MarkModal
