import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';
import { deleteAsyncCategory } from '../../stores/Categories/category';

import { setModal } from '../../stores/Categories/viewCategory';
import { setNewModal } from '../../stores/Categories/newCategory';
import { setEditModal } from '../../stores/Categories/editCategory';

import swal from 'sweetalert';


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

    const editCategory = (index) => {
        dispatch(setEditModal(index))
    }
    const deleteCategory = (name, id) => {
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

              swal(`${name} silindi!`, {
                icon: "success",
              });
            } 
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
                                        <td>{index.NAME_} </td>
                                        <td style={{ width: "20%", textAlign: "center" }}>
                                            <div role="group" className="btn-group" data-toggle="buttons">
                                                <button type="button" className="btn btn-primary" onClick={() => viewCategory(index)}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>
                                                </button>
                                                <button type="button" className="btn btn-success" onClick={ () => editCategory(index)}>
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
