import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';
import { deleteAsyncCategory } from '../../stores/Categories/category';

import { setNewModal } from '../../stores/Categories/newCategory';
import { setModal } from '../../stores/Categories/viewCategory';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Categories() {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.categories)
    
    useEffect(() => {
        dispatch(fetchAsyncCategory())
    }, [dispatch])


    const viewCategory = (index) => {
        dispatch(setModal(index))
    }

    const newCategory = () => {
        dispatch(setNewModal())
    }

    const deleteCategory = (name, id) => {

        confirmAlert({
            title: `${name} silinəcək!`,
            message: 'Silməyə əminsinizmi?',
            buttons: [
                {
                    label: 'Bəli',
                    onClick: () => dispatch(deleteAsyncCategory(id))
                },
                {
                    label: 'Xeyr',
                    // onClick: () => alert('Click No')
                }
            ]
        });
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
                                <th>CODE</th>
                                <th>NAME</th>
                                <th style={{ textAlign: "center" }}><i className="pe-7s-edit"> </i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map((index, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{index.CODE}</td>
                                        <td>{index.NAME_}</td>
                                        <td style={{ width: "20%", textAlign: "center" }}>
                                            <div role="group" className="btn-group" data-toggle="buttons">
                                                <button type="button" className="btn btn-primary" onClick={() => viewCategory(index)}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>

                                                </button>
                                                <button type="button" className="btn btn-success">
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteCategory(index.NAME_, index.id)}>
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
