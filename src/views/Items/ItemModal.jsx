import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setViewModal } from '../../stores/Items/viewItem'


import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Units/units';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";


function ItemModal() {
    const [tab, setTab] = useState({ activeTab: 1 })
    const dispatch = useDispatch()

    const history = useHistory()
    const { error } = useSelector(state => state.viewItem)

    useEffect(() => {
        if (error === 401) {
            dispatch(logout())
            dispatch(removeErrors())
            history.push('/')
        }
    }, [error, dispatch, history])

    // View Item
    const viewModal = useSelector(state => state.viewItem.modal)
    const viewDetail = useSelector(state => state.viewItem.detail)
    console.log(viewDetail);
    return (
        <>
            {/* View Category */}
            <div className={viewModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg custom-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                {viewDetail && viewDetail.NAME}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setViewModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <button className={tab.activeTab === 1 ? "nav-link active" : "nav-link "} onClick={() => setTab({ activeTab: 1 })}>Ümumi məlumatlar</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={tab.activeTab === 2 ? "nav-link active" : "nav-link "} onClick={() => setTab({ activeTab: 2 })}>Rənglər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={tab.activeTab === 3 ? "nav-link active" : "nav-link "} onClick={() => setTab({ activeTab: 3 })}>Ölçülər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={tab.activeTab === 4 ? "nav-link active" : "nav-link "} onClick={() => setTab({ activeTab: 4 })}>Qiymətlər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={tab.activeTab === 5 ? "nav-link active" : "nav-link "} onClick={() => setTab({ activeTab: 5 })}>Qeydlər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={tab.activeTab === 6 ? "nav-link active" : "nav-link "} onClick={() => setTab({ activeTab: 6 })}>Şəkillər</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className={tab.activeTab === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <p>Məhsul adı: <span className='font-weight-bold'>{viewDetail && viewDetail.NAME}</span></p>
                                            <p>Məhsul kodu: <span className='font-weight-bold'>{viewDetail && viewDetail.CODE}</span> </p>
                                            <p>Məhsul barkkodu: <span className='font-weight-bold'>{viewDetail && viewDetail.BARCODE}</span> </p>
                                            <p>Məhsul statusu: <span className='font-weight-bold'>{viewDetail && (viewDetail.STATUS_ ? "Aktiv" : "Passiv")}</span> </p>
                                            <p>ƏDV tipi: <span className='font-weight-bold'>{viewDetail && (viewDetail.EDV_TYPE === 1 ? "ƏDV Daxil" : "ƏDV Xaric")}</span> </p>
                                            <p>ƏDV dərəcəsi: <span className='font-weight-bold'>{viewDetail && viewDetail.EDV_PER}</span> </p>
                                            <p>Veb status: <span className='font-weight-bold'>{viewDetail && (viewDetail.WEB_STATUS ? "Aktiv" : "Passiv")}</span> </p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <p>Məhsul kateqoriya adı:  <span className='font-weight-bold'>{viewDetail && viewDetail.CATEGORY_NAME}</span></p>
                                            <p>Məhsul kateqoriya kodu: <span className='font-weight-bold'>{viewDetail && viewDetail.CATEGORY_CODE}</span></p>
                                            <p>Məhsul marka adı:  <span className='font-weight-bold'>{viewDetail && viewDetail.MARK_NAME}</span></p>
                                            <p>Məhsul marka kodu: <span className='font-weight-bold'>{viewDetail && viewDetail.MARK_CODE}</span></p>
                                            <p>Məhsul alt marka adı:  <span className='font-weight-bold'>{viewDetail && viewDetail.SUBMARK_NAME}</span></p>
                                            <p>Məhsul alt marka kodu: <span className='font-weight-bold'>{viewDetail && viewDetail.SUBMARK_CODE}</span></p>
                                            <p>Məhsul vahidi:  <span className='font-weight-bold'>{viewDetail && viewDetail.UNIT_CODE}</span></p>
                                            <p>Məhsul vahid miqdarı: <span className='font-weight-bold'>{viewDetail && viewDetail.UNIT_AMOUNT}</span></p>
                                        </div>



                                    </div>
                                </div>
                                <div className={tab.activeTab === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <div className="w-100 d-flex justify-content-between mb-3">
                                                <h5 className="card-title">Rənglər </h5>
                                            </div>
                                            <table className="mb-0 table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Rəng Kodu</th>
                                                        <th>Rəng adı</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        viewDetail && viewDetail.colors.map((index, key) => (
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{index.CODE}</td>
                                                                <td>{index.NAME_}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className={tab.activeTab === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <div className="w-100 d-flex justify-content-between mb-3">
                                                <h5 className="card-title">Rənglər </h5>
                                            </div>
                                            <table className="mb-0 table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Ölçü Kodu</th>
                                                        <th>Ölçü adı</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        viewDetail && viewDetail.sizes.map((index, key) => (
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{index.CODE}</td>
                                                                <td>{index.NAME_}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className={tab.activeTab === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    4
                                </div>
                                <div className={tab.activeTab === 5 ? "tab-pane fade show active" : "tab-pane fade"}>

                                    <p>{viewDetail && viewDetail.NOTE}</p>
                                    <p>{viewDetail && viewDetail.NOTE2}</p>
                                    <p>{viewDetail && viewDetail.NOTE3}</p>
                                    <p>{viewDetail && viewDetail.NOTE4}</p>
                                    <p>{viewDetail && viewDetail.NOTE5}</p>

                                </div>
                                <div className={tab.activeTab === 6 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="row">
                                        {viewDetail && viewDetail.PICTURE_URL}
                                        {/* {
                                            viewDetail && viewDetail.PICTURE_URL.length > 0 ? 
                                            <div className="col-md-3">
                                                <a 
                                                    href={require(viewDetail.PICTURE_URL)} 
                                                    data-fancybox="gallery" 
                                                    data-caption="Optional caption"
                                                >
                                                    <img src={require(viewDetail.PICTURE_URL)}  className='w-100' alt="" />
                                                </a>
                                            </div>
                                            : ""
                                        } */}
                                    </div>
                                </div>
                            </div>


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

export default ItemModal
