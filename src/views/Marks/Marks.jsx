import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';

import { deleteMark, fetchMarks } from '../../stores/Marks/marks';
import { getStatus } from '../../stores/auth';

import { setNewModal } from '../../stores/Marks/newMarks';
import { setEditModal } from '../../stores/Marks/editMark';
import { setViewModal } from '../../stores/Marks/viewMark'

import swal from 'sweetalert';

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Marks/marks';

function Marks() {
  const dispatch = useDispatch()
  const { marks } = useSelector(state => state.marks)
  const { status } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchAsyncCategory())
    dispatch(fetchMarks())
    dispatch(getStatus())
  }, [dispatch])

  const history = useHistory()
  const { error } = useSelector(state => state.marks)
  useEffect(() => {

    if (error === 401) {
      dispatch(logout())
      dispatch(removeErrors())
      history.push('/')
    } else if (error === false) {
      swal("Səhv", "Yanlış əməliyyat", "error");
    } else if (error === "hasChild") {
      swal("Səhv", "Bu markaya aid alt marka olduğu üçün silinə bilməz!", "error");
    } else if (error === "success") {
      swal("Silindi", "", "success");
    }

    dispatch(removeErrors())

  }, [error, dispatch, history])

  // Delete item
  const deleteItem = (name, id) => {
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
            dispatch(deleteMark(id))
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
            <h5 className="card-title">Markalar</h5>
            <button className="btn btn-primary mr-5" onClick={() => dispatch(setNewModal())}>
              <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
              Yeni Marka
            </button>
          </div>
          <table className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Marka kodu</th>
                <th>Marka adı</th>
                <th>Kateqoriya kodu</th>
                <th>Kateqoriya adı</th>
                <th style={{ textAlign: "center" }}><i className="pe-7s-edit"> </i></th>
              </tr>
            </thead>
            <tbody>
              {
                marks && marks.map((index, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{index.CODE}</td>
                    <td>{index.NAME_}</td>
                    <td>{index.CATEGORY_CODE}</td>
                    <td>{index.CATEGORY_NAME}</td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div role="group" className="btn-group" data-toggle="buttons">
                        <button type="button" className="btn btn-primary" onClick={() => dispatch(setViewModal(index))}>
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>
                        </button>
                        <button type="button" className="btn btn-success" onClick={() => dispatch(setEditModal(index))}>
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteItem(index.NAME_, index.ID)}>
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

export default Marks
