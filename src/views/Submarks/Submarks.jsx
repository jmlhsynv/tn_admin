import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchMarks } from '../../stores/Marks/marks';
import { fetchSubmarks, deleteSubmark } from '../../stores/Submarks/submarks'
import { getStatus } from '../../stores/auth';
import swal from 'sweetalert';

import { setNewModal } from '../../stores/Submarks/newSubmark';
import { setEditModal } from '../../stores/Submarks/editSubmark';
import { setViewModal } from '../../stores/Submarks/viewSubmark'

function Submarks() {
    const dispatch = useDispatch()
    const { submarks } = useSelector(state => state.submarks)
    const { status } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchMarks())
        dispatch(fetchSubmarks())
        dispatch(getStatus())
    }, [dispatch])

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
            dispatch(deleteSubmark(id))

            swal(`${name} silindi!`, {
              icon: "success",
            });
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
            <h5 className="card-title">Marka alt kateqoriyaları </h5>
            <button className="btn btn-primary mr-5" onClick={() => dispatch(setNewModal())}>
              <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
              Yeni Marka
            </button>
          </div>
          <table className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Marka alt kateqoriya kodu</th>
                <th>Marka alt kateqoriya adı</th>
                <th>Marka kodu</th>
                <th>Marka adı</th>
                <th style={{ textAlign: "center" }}><i className="pe-7s-edit"> </i></th>
              </tr>
            </thead>
            <tbody>
              {
                submarks && submarks.map((index, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{index.CODE}</td>
                    <td>{index.NAME_}</td>
                    <td>{index.MARK_CODE}</td>
                    <td>{index.MARK_NAME}</td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div role="group" className="btn-group" data-toggle="buttons">
                        <button type="button" className="btn btn-primary" onClick={ () => dispatch(setViewModal(index))}>
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>
                        </button>
                        <button type="button" className="btn btn-success" onClick={ () => dispatch(setEditModal(index))}>
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={ () => deleteItem(index.NAME_, index.ID)}>
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

export default Submarks
