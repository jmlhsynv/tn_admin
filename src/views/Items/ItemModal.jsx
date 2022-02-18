import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';
import { fetchMarks } from '../../stores/Marks/marks';
import { fetchSubmarks } from '../../stores/Submarks/submarks';
import { fetchUnits } from '../../stores/Units/units';

import { setViewModal } from '../../stores/Items/viewItem'
import { setNewModal } from '../../stores/Items/newItem';

import { useHistory } from "react-router-dom"
import { logout } from '../../stores/auth';
import { removeErrors } from '../../stores/Units/units';

import axios from "axios";

// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox.css";


const { REACT_APP_API_URL } = process.env

function ItemModal() {
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
    const [tab, setTab] = useState({ activeTab: 1 })

    const viewModal = useSelector(state => state.viewItem.modal)
    const viewDetail = useSelector(state => state.viewItem.detail)

    // New Item
    const { categories } = useSelector(state => state.categories)
    const { marks } = useSelector(state => state.marks)
    const { submarks } = useSelector(state => state.submarks)
    const { units } = useSelector(state => state.units)

    useEffect(() => {
        dispatch(fetchAsyncCategory())
        dispatch(fetchMarks())
        dispatch(fetchSubmarks())
        dispatch(fetchUnits())
    }, [])

    const [markSelect, setMarkSelect] = useState("");
    useEffect(() => {
        marks.length > 0 ? setMarkSelect(marks[0].ID) : setMarkSelect("")
    }, [marks])

    const [categorySelect, setCategorySelect] = useState("");
    useEffect(() => {
        categories.length > 0 ? setCategorySelect(categories[0].ID) : setCategorySelect("")
    }, [categories])

    const [submarkSelect, setSubmarkSelect] = useState("");
    useEffect(() => {
        submarks.length > 0 ? setSubmarkSelect(submarks[0].ID) : setSubmarkSelect("")
    }, [submarks])

    const [unitSelect, setUnitSelect] = useState("");
    useEffect(() => {
        units.length > 0 ? setUnitSelect(units[0].ID) : setUnitSelect("")
    }, [units])

    // ===============

    const [newTab, setNewTab] = useState({ activeTab: 1 })
    const newModal = useSelector(state => state.newItem.modal)
    const { items } = useSelector(state => state.items)
    const [code, setCode] = useState("")

    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        axios.post(REACT_APP_API_URL + "NewCode", { MODULE: "ITEMS" }, { headers }).then(res => setCode(res.data[0].CODE))
    }, [items])

    const [status, setStatus] = useState(false)
    const [edvType, setEdvType] = useState(false)
    const [webStatus, setWebStatus] = useState(false)
    // ===========

    // handle color change
    const [colorList, setColorList] = useState([{ NAME_: "", CODE: "" }]);
    const handleColorChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...colorList];
        list[index][name] = value;
        setColorList(list);
    };
    const handleColorRemove = index => {
        const list = [...colorList];
        list.splice(index, 1);
        setColorList(list);
    };
    const handleAddColor = () => {
        setColorList([...colorList, { NAME_: "", CODE: "" }]);
    };

    // handle size change
    const [sizeList, setSizeList] = useState([{ NAME_: "", CODE: "" }]);
    const handleSizeChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...sizeList];
        list[index][name] = value;
        setSizeList(list);
    };
    const handleSizeRemove = index => {
        const list = [...sizeList];
        list.splice(index, 1);
        setSizeList(list);
    };
    const handleAddSize = () => {
        setSizeList([...sizeList, { NAME_: "", CODE: "" }]);
    };

    return (
        <>
            {/* View Item */}
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
                                                <h5 className="card-title">Ölçülər </h5>
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

            {/* New Item */}
            <div className={newModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Yeni Məhsul
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setNewModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <button className={newTab.activeTab === 1 ? "nav-link active" : "nav-link "} onClick={() => setNewTab({ activeTab: 1 })}>Ümumi məlumatlar</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={newTab.activeTab === 2 ? "nav-link active" : "nav-link "} onClick={() => setNewTab({ activeTab: 2 })}>Rənglər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={newTab.activeTab === 3 ? "nav-link active" : "nav-link "} onClick={() => setNewTab({ activeTab: 3 })}>Ölçülər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={newTab.activeTab === 4 ? "nav-link active" : "nav-link "} onClick={() => setNewTab({ activeTab: 4 })}>Qiymətlər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={newTab.activeTab === 5 ? "nav-link active" : "nav-link "} onClick={() => setNewTab({ activeTab: 5 })}>Qeydlər</button>
                                </li>
                                <li className="nav-item ml-3">
                                    <button className={newTab.activeTab === 6 ? "nav-link active" : "nav-link "} onClick={() => setNewTab({ activeTab: 6 })}>Şəkillər</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className={newTab.activeTab === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul  adı :</span>
                                                </div>
                                                <input type="text" className="form-control" name='NAME_' />
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul  kodu :</span>
                                                </div>
                                                <input type="text" className="form-control" disabled value={code} name='CODE' />
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul  barkodu :</span>
                                                </div>
                                                <input type="text" className="form-control" name='BARCODE' />
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul  Statusu :</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" className='switcher' name='STATUS' onChange={() => setStatus(!status)} />
                                                    <span className="slider"></span>
                                                </label>
                                                <span className='switch-content ml-3'>{status ? "Aktiv" : "Passiv"}</span>

                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">ƏDV Tipi:</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" className='switcher' name='STATUS' onChange={() => setEdvType(!edvType)} />
                                                    <span className="slider"></span>
                                                </label>
                                                <span className='switch-content ml-3'>{edvType ? "ƏDV Daxil" : "ƏDV Xaric"}</span>

                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">ƏDV Dərəcəsi :</span>
                                                </div>
                                                <input type="text" className="form-control" name='EDV_PER' />
                                            </div>

                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul  kateqoriyası :</span>
                                                </div>
                                                <select name="Category" className="form-control" onChange={(e) => setCategorySelect(e.target.value)}>
                                                    {categories && categories.map((index, key) => (
                                                        <option key={key} value={index.ID}>{index.NAME_}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul  markası :</span>
                                                </div>
                                                <select name="Category" className="form-control" onChange={(e) => setMarkSelect(e.target.value)}>
                                                    {marks && marks.map((index, key) => (
                                                        <option key={key} value={index.ID}>{index.NAME_}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul alt markası :</span>
                                                </div>
                                                <select name="Category" className="form-control" onChange={(e) => setSubmarkSelect(e.target.value)}>
                                                    {submarks && submarks.map((index, key) => (
                                                        <option key={key} value={index.ID}>{index.NAME_}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Məhsul vahidi :</span>
                                                </div>
                                                <select name="Category" className="form-control" onChange={(e) => setUnitSelect(e.target.value)}>
                                                    {units && units.map((index, key) => (
                                                        <option key={key} value={index.ID}>{index.CODE}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="input-group mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Veb Status:</span>
                                                </div>
                                                <label className="switch">
                                                    <input type="checkbox" className='switcher' name='WEB_STATUS' onChange={() => setWebStatus(!webStatus)} />
                                                    <span className="slider"></span>
                                                </label>
                                                <span className='switch-content ml-3'>{webStatus ? "Aktiv" : "Passiv"}</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={newTab.activeTab === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="col-12 mb-3">
                                        <div className="row justify-content-end">
                                            <div className="col-2">
                                                <button className="btn btn-primary btn-block" onClick={handleAddColor}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {colorList.map((index, key) => {
                                        return (
                                            <div className="col-12 mt-2" key={key}>
                                                <div className="row">
                                                    <div className={colorList.length > 1 ? "col-5" : "col-6"}>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Rəng Adı :</span>
                                                            </div>
                                                            <input
                                                                name="NAME_"
                                                                className='form-control'
                                                                value={index.NAME_}
                                                                onChange={e => handleColorChange(e, key)}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className={colorList.length > 1 ? "col-5" : "col-6"}>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Rəng Kodu :</span>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                name="CODE"
                                                                value={index.CODE}
                                                                onChange={e => handleColorChange(e, key)}
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="w-100">
                                                            {
                                                                colorList.length !== 1 &&
                                                                <button
                                                                    className="btn btn-danger btn-block"
                                                                    onClick={() => handleColorRemove(key)}>
                                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                                </button>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        );
                                    })}
                                    <div style={{ marginTop: 20 }}>{JSON.stringify(colorList)}</div>
                                </div>
                                <div className={newTab.activeTab === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    <div className="col-12 mb-3">
                                        <div className="row justify-content-end">
                                            <div className="col-2">
                                                <button className="btn btn-primary btn-block" onClick={handleAddSize}>
                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {sizeList.map((index, key) => {
                                        return (
                                            <div className="col-12 mt-2" key={key}>
                                                <div className="row">
                                                    <div className={sizeList.length > 1 ? "col-5" : "col-6"}>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Ölçü Adı :</span>
                                                            </div>
                                                            <input
                                                                name="NAME_"
                                                                className='form-control'
                                                                value={index.NAME_}
                                                                onChange={e => handleSizeChange(e, key)}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className={sizeList.length > 1 ? "col-5" : "col-6"}>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Ölçü Kodu :</span>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                name="CODE"
                                                                value={index.CODE}
                                                                onChange={e => handleSizeChange(e, key)}
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="w-100">
                                                            {
                                                                sizeList.length !== 1 &&
                                                                <button
                                                                    className="btn btn-danger btn-block"
                                                                    onClick={() => handleSizeRemove(key)}>
                                                                    <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                                </button>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        );
                                    })}
                                    <div style={{ marginTop: 20 }}>{JSON.stringify(sizeList)}</div>
                                </div>
                                <div className={newTab.activeTab === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    4
                                </div>
                                <div className={newTab.activeTab === 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    5
                                </div>
                                <div className={newTab.activeTab === 6 ? "tab-pane fade show active" : "tab-pane fade"}>
                                    6
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={() => dispatch(setNewModal())}>Bağla</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemModal
/* 
{
        "ID": 0,
        "STATUS_": true,
        "CODE": "100002",
        "NAME": "TEST1",
        "CATEGORY_ID": 1209,
        "MARK_ID": 1037,
        "SUBMARK_ID": 1008,
        "BARCODE": "1234567891234",
        "UNIT_ID": 1,
        "UNIT_AMOUNT": 1.0,
        "EDV_TYPE": 0,
        "EDV_PER": 0.0,
        "NOTE": "Qeyd1",
        "NOTE2": "Qeyd2",
        "NOTE3": "Qeyd3",
        "NOTE4": "Qeyd4",
        "NOTE5": "Qeyd5",
        "WEB_STATUS": true,
        "PICTURE_URL": "C:\\Pictures\\Discount.jpg",
        "PICTURE_URL2": "C:\\Pictures\\Discount.jpg",
        "PICTURE_URL3": "C:\\Pictures\\Discount.jpg",
        "PICTURE_URL4": "C:\\Pictures\\Discount.jpg",
        "PICTURE_URL5": "C:\\Pictures\\Discount.jpg",
        "USER_ID": 0,
        "CATEGORY_CODE": "100002",
        "CATEGORY_NAME": "Televizor",
        "MARK_CODE": "100008",
        "MARK_NAME": "Hoffman",
        "SUBMARK_CODE": "100003",
        "SUBMARK_NAME": "İdeapad i330",
        "UNIT_CODE": "EDED",
        "sizes": [
            {
                "ID": 0,
                "CODE": "L",
                "NAME_": "Kicik olcu",
                "ITEM_ID": 0,
                "USER_ID": 1
            },
            {
                "ID": 0,
                "CODE": "XL",
                "NAME_": "Kicik olcu",
                "ITEM_ID": 0,
                "USER_ID": 1
            }
        ],
        "colors": [
            {
                "ID": 0,
                "CODE": "QARA",
                "NAME_": "QARA",
                "ITEM_ID": 0,
                "USER_ID": 1
            },
            {
                "ID": 0,
                "CODE": "QIRMIZI",
                "NAME_": "Qirmizi",
                "ITEM_ID": 0,
                "USER_ID": 1
            },
            {
                "ID": 0,
                "CODE": "SARI",
                "NAME_": "Sari",
                "ITEM_ID": 0,
                "USER_ID": 1
            }
        ],
        "prices": [
            {
                "ID": 0,
                "ITEM_ID": 0,
                "PTYPE_": 1,
                "PRICE": 1.5,
                "EDV_TYPE": 1,
                "EDV_PER": 0.0,
                "SIZE_ID": 1,
                "COLOR_ID": 2,
                "NOTE_": "sdds",
                "BEG_DATE": "2022-02-01",
                "END_DATE": "2022-02-28",
                "USER_ID": 1
            }
        ]
    }
*/