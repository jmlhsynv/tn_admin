import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';
import { deleteAsyncCategory } from '../../stores/Categories/category';
import { getStatus } from '../../stores/auth';

import { setModal } from '../../stores/Categories/viewCategory';
import { setNewModal } from '../../stores/Categories/newCategory';
import { setEditModal } from '../../stores/Categories/editCategory';

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Categories/category';

import swal from 'sweetalert';


function Categories() {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.categories)
    const { status } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchAsyncCategory())
        dispatch(getStatus())
    }, [dispatch])


    const viewCategory = (index) => {
        dispatch(setModal(index))
    }

    const newCategory = () => {
        dispatch(setNewModal())
    }

    const editCategory = (index) => {
        dispatch(setEditModal(index))
    }
    const history = useHistory()
    const { error } = useSelector(state => state.categories)
    useEffect(() => {

        if (error === 401) {
            dispatch(logout())
            dispatch(removeErrors())
            history.push('/')
        } else if (error === false) {
            swal("Səhv", "Yanlış əməliyyat", "error");
        } else if (error === "hasChild") {
            swal("Səhv", "Bu kateqoriyaya aid marka olduğu üçün silinə bilməz!", "error");
        } else if(error === "success"){
            swal("Silindi",  "","success");
        }
        
        dispatch(removeErrors())

    }, [error, dispatch, history])

    const deleteCategory = (name, id) => {
        if (status === 'admin') {
            swal({
                title: `${name} silinəcək!`,
                text: "Silməyə əminsinizmi?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        dispatch(deleteAsyncCategory(id))
                    }
                });
        } else {
            swal("Yetki yoxdur!", "Silmək üçün adminə müraciət edin!", "error");
        }
    }

    return (
        <div>

            <div className="main-card mb-3 card">
                <div className="card-body">
                    <div className="w-100 d-flex justify-content-between mb-3">
                        <h5 className="card-title">Kateqoriyalar</h5>
                        <button className="btn btn-primary mr-5" onClick={() => newCategory()}>
                            <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                            Yeni Kateqoriya
                        </button>
                    </div>
                    <table className="mb-0 table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kateqoriya kodu</th>
                                <th>Kateqoriya adı</th>
                                <th style={{ textAlign: "center" }}><i className="pe-7s-edit"> </i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map((index, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{index.CODE}</td>
                                        <td>{index.NAME_} </td>
                                        <td style={{ width: "20%", textAlign: "center" }}>
                                            <div role="group" className="btn-group" data-toggle="buttons">
                                                <button type="button" className="btn btn-primary" onClick={() => viewCategory(index)}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>
                                                </button>
                                                <button type="button" className="btn btn-success" onClick={() => editCategory(index)}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteCategory(index.NAME_, index.ID)}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}

export default Categories
