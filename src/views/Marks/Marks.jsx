import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';

import { fetchMarks } from '../../stores/Marks/marks';
import { getStatus } from '../../stores/auth';

import { setNewModal } from '../../stores/Marks/newMarks';

import swal from 'sweetalert';

function Marks() {
  const dispatch = useDispatch()
  const { marks } = useSelector(state => state.marks)

  useEffect(() => {
    dispatch(fetchAsyncCategory())
    dispatch(fetchMarks())
    dispatch(getStatus())
  }, [dispatch])

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
                        <button type="button" className="btn btn-primary">
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>
                        </button>
                        <button type="button" className="btn btn-success" >
                          <i className="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                        </button>
                        <button type="button" className="btn btn-danger">
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
