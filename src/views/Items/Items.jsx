import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, deleteItem as deleteProduct } from '../../stores/Items/items'
import { getDetailedItem } from '../../stores/Items/viewItem';
import { getStatus } from '../../stores/auth';

import swal from 'sweetalert';

import { setViewModal } from '../../stores/Items/viewItem'
import { setNewModal } from '../../stores/Items/newItem';
import { getEditItem, setEditModal } from '../../stores/Items/editItem'

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Items/items';

function Items() {

  const dispatch = useDispatch()
  const { items } = useSelector(state => state.items)
  const { status } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(getStatus())
  }, [dispatch, items])

  const history = useHistory()
  const { error } = useSelector(state => state.units)
  useEffect(() => {
    if (error === 401) {
      dispatch(logout())
      dispatch(removeErrors())
      history.push('/')
    } else if (error === false) {
      swal("Səhv", "Yanlış əməliyyat", "error");
    } else if (error === "hasChild") {
      swal("Səhv", "Bu vahidə aid məhsul olduğu üçün silinə bilməz!", "error");
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
            dispatch(deleteProduct(id))
          }
        });
    } else {
      swal("Yetki yoxdur!", "Silmək üçün adminə müraciət edin!", "error");
    }
  }

  // View Item
  const viewItem = (id) => {
    dispatch(getDetailedItem(id))
    dispatch(setViewModal())
  }

  const handleEditModal = (id) => {
    dispatch(getEditItem(id))
    dispatch(setEditModal())
  }

  return (
    <div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <div className="w-100 d-flex justify-content-between mb-3">
            <h5 className="card-title">Məhsullar </h5>
            <button className="btn btn-primary mr-5" onClick={() => dispatch(setNewModal())}>
              <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
              Yeni Məhsul
            </button>
          </div>
          <table className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Məhsul kodu</th>
                <th>Məhsul adı</th>
                <th>Məhsul barkodu</th>
                <th>Məhsul kateqoriyası</th>
                <th>Məhsul markası</th>
                <th>Məhsul alt markası</th>
                <th>Məhsul vahidi</th>
                <th style={{ textAlign: "center" }}><i className="pe-7s-edit"> </i></th>
              </tr>
            </thead>
            <tbody>
              {
                items && items.map((index, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{index.CODE}</td>
                    <td>{index.NAME}</td>
                    <td>{index.BARCODE}</td>
                    <td>{index.CATEGORY_NAME}</td>
                    <td>{index.MARK_NAME}</td>
                    <td>{index.SUBMARK_NAME}</td>
                    <td>{index.UNIT_CODE}</td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div role="group" className="btn-group" data-toggle="buttons">
                        <button type="button" className="btn btn-primary" onClick={() => viewItem(index.ID)}>
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>
                        </button>
                        <button type="button" className="btn btn-success" onClick={() => handleEditModal(index.ID)}>
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteItem(index.CODE, index.ID)}>
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

export default Items
