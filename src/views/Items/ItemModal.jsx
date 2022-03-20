import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAsyncCategory } from '../../stores/Categories/category';
import { fetchMarks } from '../../stores/Marks/marks';
import { fetchSubmarks } from '../../stores/Submarks/submarks';
import { fetchUnits } from '../../stores/Units/units';

import { postItem, editItem } from '../../stores/Items/items';

import { setViewModal } from '../../stores/Items/viewItem'
import { setNewModal } from '../../stores/Items/newItem';
import { setEditModal } from '../../stores/Items/editItem';

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
    }, [dispatch])

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
    const [colorList, setColorList] = useState([{ ID: 0, ITEM_ID: 0, USER_ID: 1, NAME_: "", CODE: "" }]);
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
        setColorList([...colorList, { ID: 0, ITEM_ID: 0, USER_ID: 1, NAME_: "", CODE: "" }]);
    };

    // handle size change
    const [sizeList, setSizeList] = useState([{ ID: 0, ITEM_ID: 0, USER_ID: 1, NAME_: "", CODE: "" }]);
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
        setSizeList([...sizeList, { ID: 0, ITEM_ID: 0, USER_ID: 1, NAME_: "", CODE: "" }]);
    };


    // priceList
    const [priceList, setPriceList] = useState([])
    const handlePriceChange = (e, index) => {
        let name = e.target.name
        let value = e.target.value
        if (name === "EDV_PER" || name === "PRICE") {
            value = parseFloat(value)
        }
        const list = [...priceList]
        list[index][name] = value
        setPriceList(list)
    }
    
    const handlePriceRemove = index => {
        const list = [...priceList];
        list.splice(index, 1);
        setPriceList(list);
    };
    const handleAddPrice = () => {
        setPriceList([...priceList,
        {
            ID: 0,
            ITEM_ID: 0,
            PTYPE_: 1,
            PRICE: 0,
            EDV_TYPE: 1,
            EDV_PER: 0,
            SIZE_ID: 0,
            COLOR_ID: 0,
            SIZE_CODE: sizeList[0].CODE,
            COLOR_CODE: colorList[0].CODE,
            NOTE_: "",
            BEG_DATE: "",
            END_DATE: "",
            USER_ID: 1
        }
        ])
    }

    // new data
    const [product, setProduct] = useState({})
    const handleInput = (e) => {
        let name = e.target.name
        let val = e.target.value

        if (name === "EDV_PER") {
            val = parseFloat(val)
        }
        setProduct({ ...product, [name]: val })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postItem(
            {
                ...product,
                ID: 0,
                STATUS_: status,
                CODE: code,
                CATEGORY_ID: categorySelect,
                MARK_ID: markSelect,
                SUBMARK_ID: submarkSelect,
                UNIT_ID: unitSelect,
                EDV_TYPE: edvType ? 1 : 2,
                WEB_STATUS: webStatus,
                PICTURE_URL: "C:\\Pictures\\Discount.jpg",
                PICTURE_URL2: "C:\\Pictures\\Discount.jpg",
                PICTURE_URL3: "C:\\Pictures\\Discount.jpg",
                PICTURE_URL4: "C:\\Pictures\\Discount.jpg",
                PICTURE_URL5: "C:\\Pictures\\Discount.jpg",
                USER_ID: 0,
                sizes: sizeList,
                colors: colorList,
                prices: priceList
            }
        ))
        e.target.reset()
        dispatch(setNewModal())

    }



    // Edit Item

    const [editTab, setEditTab] = useState({ activeTab: 1 })
    const editModal = useSelector(state => state.editItem.modal)
    const editDetail = useSelector(state => state.editItem.detail)

    const [editData, setEditData] = useState({})
    const [editEdvType, setEditEdvType] = useState(false)
    const [editColorList, setEditColorList] = useState([])
    const [editSizeList, setEditSizeList] = useState([])
    const [editPriceList, setEditPriceList] = useState([])

    useEffect(() => {
        setEditData(editDetail)
        
        editDetail ? 
        (editDetail.EDV_TYPE === 1 ? setEditEdvType(true) : setEditEdvType(false)) : 
        setEditEdvType(false)

        editDetail ? setEditColorList(editDetail.colors): setEditColorList([])
        editDetail ? setEditSizeList(editDetail.sizes): setEditSizeList([])
        editDetail ? setEditPriceList(editDetail.prices): setEditPriceList([])

        
    }, [editDetail])

    const handleEditInput = (e) => {
        const { name, value } = e.target
        setEditData({ ...editData, [name]: value })
    }

    // edit color list
    const handleEditColorChange = (e, index) => {
        const { name, value } = e.target;
        let list = JSON.parse(JSON.stringify(editColorList));
        list[index][name] = value;
        setEditColorList(list);
    };
    
    const handleEditColorRemove = index => {
        const list = [...editColorList];
        list.splice(index, 1);
        setEditColorList(list);
    };
    const handleEditAddColor = () => {
        setEditColorList([...editColorList, { ID: 0, ITEM_ID: 0, USER_ID: 1, NAME_: "", CODE: "" }]);
    };

    // edit Size List
    const handleEditSizeChange = (e, index) => {
        const { name, value } = e.target;
        let list = JSON.parse(JSON.stringify(editSizeList));
        list[index][name] = value;
        setEditSizeList(list);
    };
    const handleEditSizeRemove = index => {
        const list = [...editSizeList];
        list.splice(index, 1);
        setEditSizeList(list);
    };
    const handleEditAddSize = () => {
        setEditSizeList([...editSizeList, { ID: 0, ITEM_ID: 0, USER_ID: 1, NAME_: "", CODE: "" }]);
    };

    // edit Price List
    const handleEditPriceChange = (e, index) => {
        let name = e.target.name
        let value = e.target.value
        if (name === "EDV_PER" || name === "PRICE") {
            value = parseFloat(value)
        }
        // const list = [...priceList]
        let list = JSON.parse(JSON.stringify(editPriceList));
        list[index][name] = value
        setEditPriceList(list)
    }
    const handleEditPriceRemove = index => {
        const list = [...priceList];
        list.splice(index, 1);
        setEditPriceList(list);
    };
    const handleEditAddPrice = () => {
        setEditPriceList([...priceList,
        {
            ID: 0,
            ITEM_ID: 0,
            PTYPE_: 1,
            PRICE: 0,
            EDV_TYPE: 1,
            EDV_PER: 0,
            SIZE_ID: 0,
            COLOR_ID: 0,
            SIZE_CODE: sizeList[0].CODE,
            COLOR_CODE: colorList[0].CODE,
            NOTE_: "",
            BEG_DATE: "",
            END_DATE: "",
            USER_ID: 1
        }
        ])
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        dispatch(editItem(editData))
        dispatch(setEditModal())
        setEditData([])
        e.target.reset()
    }
    return (
        <>
            {/* View Item */}
            <div className={viewModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
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
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <div className="w-100 d-flex justify-content-between mb-3">
                                                <h5 className="card-title">Qiymətlər </h5>
                                            </div>
                                            <table className="mb-0 table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Rəng adı</th>
                                                        <th>Ölçü adı</th>
                                                        <th>Qiymət</th>
                                                        <th>ƏDV Tipi</th>
                                                        <th>Alış/Satış</th>
                                                        <th>Qeyd</th>
                                                        <th>Baş. Tarixi</th>
                                                        <th>Bit. Tarixi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        viewDetail && viewDetail.prices.map((index, key) => (
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{index.COLOR_CODE}</td>
                                                                <td>{index.SIZE_CODE}</td>
                                                                <td>{index.PRICE}</td>
                                                                <td>{index.EDV_TYPE === 1 ? "ƏDV Daxil" : "ƏDV Xaric"}</td>
                                                                <td>{index.PTYPE_ === 1 ? "Alış" : "Satış"}</td>
                                                                <td>{index.NOTE_}</td>
                                                                <td>{index.BEG_DATE}</td>
                                                                <td>{index.END_DATE}</td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
                <div className="modal-dialog modal-lg custom-lg">
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
                        <form onSubmit={(e) => handleSubmit(e)}>

                            <div className="modal-body">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <button className={newTab.activeTab === 1 ? "nav-link active" : "nav-link "} type="button" onClick={() => setNewTab({ activeTab: 1 })}>Ümumi məlumatlar</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={newTab.activeTab === 2 ? "nav-link active" : "nav-link "} type="button" onClick={() => setNewTab({ activeTab: 2 })}>Rənglər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={newTab.activeTab === 3 ? "nav-link active" : "nav-link "} type="button" onClick={() => setNewTab({ activeTab: 3 })}>Ölçülər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={newTab.activeTab === 4 ? "nav-link active" : "nav-link "} type="button" onClick={() => setNewTab({ activeTab: 4 })}>Qeydlər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={newTab.activeTab === 5 ? "nav-link active" : "nav-link "} type="button" onClick={() => setNewTab({ activeTab: 5 })}>Şəkillər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={newTab.activeTab === 6 ? "nav-link active" : "nav-link "} type="button" onClick={() => setNewTab({ activeTab: 6 })}> Qiymətlər</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className={newTab.activeTab === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  adı :</span>
                                                        </div>
                                                        <input type="text" className="form-control" name='NAME' onChange={(e) => handleInput(e)} />
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
                                                        <input type="text" className="form-control" name='BARCODE' onChange={(e) => handleInput(e)} />
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
                                                        <input type="text" className="form-control" name='EDV_PER' onChange={(e) => handleInput(e)} />
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
                                    </div>
                                    <div className={newTab.activeTab === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12 mb-3">
                                            <div className="row justify-content-end">
                                                <div className="col-2">
                                                    <button className="btn btn-primary btn-block" type='button' onClick={handleAddColor}>
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
                                                                        type='button'
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
                                    </div>
                                    <div className={newTab.activeTab === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12 mb-3">
                                            <div className="row justify-content-end">
                                                <div className="col-2">
                                                    <button className="btn btn-primary btn-block" type='button' onClick={handleAddSize}>
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
                                                                        type='button'
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

                                    </div>
                                    <div className={newTab.activeTab === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 1 :</span>
                                            </div>
                                            <textarea className="form-control" name='NOTE' onChange={(e) => handleInput(e)} ></textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 2 :</span>
                                            </div>
                                            <textarea className="form-control" name='NOTE2' onChange={(e) => handleInput(e)} ></textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 3 :</span>
                                            </div>
                                            <textarea className="form-control" name='NOTE3' onChange={(e) => handleInput(e)} ></textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 4 :</span>
                                            </div>
                                            <textarea className="form-control" name='NOTE4' onChange={(e) => handleInput(e)} ></textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 5 :</span>
                                            </div>
                                            <textarea className="form-control" name='NOTE5' onChange={(e) => handleInput(e)} ></textarea>
                                        </div>
                                    </div>
                                    <div className={newTab.activeTab === 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        5
                                    </div>
                                    <div className={newTab.activeTab === 6 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12 mb-3">
                                            <div className="row justify-content-end">
                                                <div className="col-6">
                                                    <div className="row">
                                                        <div className="col-9 d-flex align-items-center justify-content-end">
                                                            <h6 className='mr-1'>Qiymət əlavə et</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <button className="btn btn-primary btn-block" type='button' onClick={handleAddPrice}>
                                                                <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            priceList.map((index, key) => {
                                                return (
                                                    <div className="col-12 mt-3" key={key}>
                                                        <div className="row justify-content-between flex-nowrap item-row">
                                                            {
                                                                priceList.length !== 1 &&
                                                                <div className='input-box d-flex align-items-end'>
                                                                    <button
                                                                        type='button'
                                                                        className="btn btn-danger"
                                                                        onClick={() => handlePriceRemove(key)}>
                                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                                    </button>
                                                                </div>
                                                            }
                                                            <div className="input-box">
                                                                <label>Rəng adi</label>
                                                                <select name="COLOR_CODE" id="" className='form-control' onChange={(e) => handlePriceChange(e, key)}>
                                                                    {
                                                                        colorList.map((index, key) => (
                                                                            <option value={index.CODE} key={key}>{index.NAME_}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Ölçü adi</label>
                                                                <select name="SIZE_CODE" id="" className='form-control' onChange={(e) => handlePriceChange(e, key)}>
                                                                    {
                                                                        sizeList.map((index, key) => (
                                                                            <option value={index.CODE} key={key}>{index.NAME_}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>ƏDV Tipi</label>
                                                                <select name="EDV_TYPE" className='form-control' id="" onChange={(e) => handlePriceChange(e, key)}>
                                                                    <option value="1">ƏDV Daxil</option>
                                                                    <option value="2">ƏDV Xaric</option>
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>A/S</label>
                                                                <select name="PTYPE_" className='form-control' id="" onChange={(e) => handlePriceChange(e, key)}>
                                                                    <option value="1">Alış</option>
                                                                    <option value="2">Satış</option>
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>ƏDV Faizi</label>
                                                                <input type="text" className='form-control w-100px' name="EDV_PER" onChange={(e) => handlePriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Qiymet</label>
                                                                <input type="text" className='form-control w-100px' name="PRICE" onChange={(e) => handlePriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Qeyd</label>
                                                                <input type="text" className="form-control" name="NOTE_" onChange={(e) => handlePriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Baş. tarixi</label>
                                                                <input type="date" className="form-control" name="BEG_DATE" onChange={(e) => handlePriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Bit. tarixi</label>
                                                                <input type="date" className="form-control" name="END_DATE" onChange={(e) => handlePriceChange(e, key)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    newTab.activeTab > 1 ?
                                        <button className='btn btn-danger' type='button'
                                            onClick={() => setNewTab({ activeTab: newTab.activeTab - 1 })}>Əvvəlki</button> : ""
                                }
                                {
                                    newTab.activeTab < 6 ?
                                        <button className='btn btn-primary' type='button'
                                            onClick={() => setNewTab({ activeTab: newTab.activeTab + 1 })}>Növbəti</button> :
                                        ""
                                }
                                {
                                    newTab.activeTab > 5 ?
                                        <button className="btn btn-primary" type='submit'>
                                            Yadda Saxla
                                        </button> : ""
                                }
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={() => dispatch(setNewModal())}>Bağla</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            {/* Edit Item */}
            <div className={editModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"}
                tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg custom-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Düzəliş - {editData ? editData.NAME || '' : " "}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(setEditModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => handleEditSubmit(e)}>

                            <div className="modal-body">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <button className={editTab.activeTab === 1 ? "nav-link active" : "nav-link "} type="button" onClick={() => setEditTab({ activeTab: 1 })}>Ümumi məlumatlar</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={editTab.activeTab === 2 ? "nav-link active" : "nav-link "} type="button" onClick={() => setEditTab({ activeTab: 2 })}>Rənglər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={editTab.activeTab === 3 ? "nav-link active" : "nav-link "} type="button" onClick={() => setEditTab({ activeTab: 3 })}>Ölçülər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={editTab.activeTab === 4 ? "nav-link active" : "nav-link "} type="button" onClick={() => setEditTab({ activeTab: 4 })}>Qeydlər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={editTab.activeTab === 5 ? "nav-link active" : "nav-link "} type="button" onClick={() => setEditTab({ activeTab: 5 })}>Şəkillər</button>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button className={editTab.activeTab === 6 ? "nav-link active" : "nav-link "} type="button" onClick={() => setEditTab({ activeTab: 6 })}> Qiymətlər</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className={editTab.activeTab === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  adı :</span>
                                                        </div>
                                                        <input type="text" className="form-control" value={editData ? editData.NAME || '' : " "} name='NAME' onChange={(e) => handleEditInput(e)} />
                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  kodu :</span>
                                                        </div>
                                                        <input type="text" className="form-control" disabled defaultValue={editData ? editData.CODE || '' : " "} name='CODE' />
                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  barkodu :</span>
                                                        </div>
                                                        <input type="text" className="form-control" name='BARCODE' value={editData ? editData.BARCODE || '' : " "} onChange={(e) => handleEditInput(e)} />
                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  Statusu :</span>
                                                        </div>

                                                        <label className="switch">
                                                            <input type="checkbox" className='switcher'
                                                                checked={editData ? (editData.STATUS_ ? true : false) || false : false}
                                                                onChange={() => setEditData({ ...editData, STATUS_: !editData.STATUS_ })}
                                                                name='STATUS_'
                                                            />
                                                            <span className="slider"></span>
                                                        </label>
                                                        <span className='switch-content ml-3'>{editData ? (editData.STATUS_ ? "Aktiv" : "Passiv") || '' : " "}</span>

                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">ƏDV Tipi:</span>
                                                        </div>
                                                        <label className="switch">
                                                            <input type="checkbox" className='switcher'
                                                                checked={editEdvType}
                                                                onChange={() => setEditEdvType(!editEdvType)} />
                                                            <span className="slider"></span>
                                                        </label>
                                                        <span className='switch-content ml-3'>{editEdvType ? "ƏDV Daxil" : "ƏDV Xaric"}</span>

                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">ƏDV Dərəcəsi :</span>
                                                        </div>
                                                        <input type="text" className="form-control" name='EDV_PER'
                                                            value={editData ? editData.EDV_PER || '' : " "}
                                                            onChange={(e) => handleEditInput(e)} />
                                                    </div>

                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  kateqoriyası :</span>
                                                        </div>
                                                        <select name="CATEGORY_ID" className="form-control"
                                                            value={editData ? editData.CATEGORY_ID || '' : " "}
                                                            onChange={(e) => handleEditInput(e)}>
                                                            {categories && categories.map((index, key) => (
                                                                <option key={key} value={index.ID}>{index.NAME_}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul  markası :</span>
                                                        </div>
                                                        <select name="MARK_ID"
                                                            className="form-control"
                                                            onChange={(e) => handleEditInput(e)}>
                                                            {marks && marks.map((index, key) => (
                                                                <option key={key} value={index.ID}>{index.NAME_}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul alt markası :</span>
                                                        </div>
                                                        <select name="SUBMARK_ID"
                                                            className="form-control"
                                                            onChange={(e) => handleEditInput(e)}>
                                                            {submarks && submarks.map((index, key) => (
                                                                <option key={key} value={index.ID}>{index.NAME_}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="input-group mt-2">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Məhsul vahidi :</span>
                                                        </div>
                                                        <select name="UNIT_ID" className="form-control"
                                                            onChange={(e) => handleEditInput(e)}>
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
                                                            <input type="checkbox"
                                                                className='switcher' name='WEB_STATUS'
                                                                checked={editData ? (editData.WEB_STATUS ? true : false) || false : false}
                                                                onChange={() => setEditData({ ...editData, WEB_STATUS: !editData.WEB_STATUS })} />
                                                            <span className="slider"></span>
                                                        </label>
                                                        <span className='switch-content ml-3'>{editData ? (editData.WEB_STATUS ? "Aktiv" : "Passiv") || '' : " "}</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={editTab.activeTab === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12 mb-3">
                                            <div className="row justify-content-end">
                                                <div className="col-2">
                                                    <button className="btn btn-primary btn-block" type='button' onClick={handleEditAddColor}>
                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {editColorList.map((index, key) => {
                                            return (
                                                <div className="col-12 mt-2" key={key}>
                                                    <div className="row">
                                                        <div className={editColorList.length > 1 ? "col-5" : "col-6"}>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">Rəng Adı :</span>
                                                                </div>
                                                                <input
                                                                    name="NAME_"
                                                                    className='form-control'
                                                                    value={index.NAME_}
                                                                    onChange={e => handleEditColorChange(e, key)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className={editColorList.length > 1 ? "col-5" : "col-6"}>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">Rəng Kodu :</span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    name="CODE"
                                                                    value={index.CODE}
                                                                    onChange={e => handleEditColorChange(e, key)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="col-2">
                                                            <div className="w-100">
                                                                {
                                                                    editColorList.length !== 1 &&
                                                                    <button
                                                                        type='button'
                                                                        className="btn btn-danger btn-block"
                                                                        onClick={() => handleEditColorRemove(key)}>
                                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                                    </button>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={editTab.activeTab === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12 mb-3">
                                            <div className="row justify-content-end">
                                                <div className="col-2">
                                                    <button className="btn btn-primary btn-block" type='button' onClick={handleEditAddSize}>
                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {editSizeList.map((index, key) => {
                                            return (
                                                <div className="col-12 mt-2" key={key}>
                                                    <div className="row">
                                                        <div className={editSizeList.length > 1 ? "col-5" : "col-6"}>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">Ölçü Adı :</span>
                                                                </div>
                                                                <input
                                                                    name="NAME_"
                                                                    className='form-control'
                                                                    value={index.NAME_}
                                                                    onChange={e => handleEditSizeChange(e, key)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className={editSizeList.length > 1 ? "col-5" : "col-6"}>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">Ölçü Kodu :</span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    name="CODE"
                                                                    value={index.CODE}
                                                                    onChange={e => handleEditSizeChange(e, key)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="col-2">
                                                            <div className="w-100">
                                                                {
                                                                    editSizeList.length !== 1 &&
                                                                    <button
                                                                        type='button'
                                                                        className="btn btn-danger btn-block"
                                                                        onClick={() => handleEditSizeRemove(key)}>
                                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                                    </button>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                            );
                                        })}

                                    </div>
                                    <div className={editTab.activeTab === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 1 :</span>
                                            </div>
                                            <textarea 
                                                className="form-control" 
                                                name='NOTE' 
                                                value={editData ? editData.NOTE || '' : " "}
                                                onChange={(e) => handleEditInput(e)} >
                                            </textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 2 :</span>
                                            </div>
                                            <textarea 
                                                className="form-control" 
                                                name='NOTE2' 
                                                value={editData ? editData.NOTE2 || '' : " "}
                                                onChange={(e) => handleEditInput(e)} >
                                            </textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 3 :</span>
                                            </div>
                                            <textarea 
                                                className="form-control" 
                                                name='NOTE3' 
                                                value={editData ? editData.NOTE3 || '' : " "}
                                                onChange={(e) => handleEditInput(e)} >
                                            </textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 4 :</span>
                                            </div>
                                            <textarea 
                                                className="form-control" 
                                                name='NOTE4' 
                                                value={editData ? editData.NOTE4 || '' : " "}
                                                onChange={(e) => handleEditInput(e)} >
                                            </textarea>
                                        </div>
                                        <div className="input-group mt-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Qeyd 5 :</span>
                                            </div>
                                            <textarea 
                                                className="form-control" 
                                                name='NOTE5' 
                                                value={editData ? editData.NOTE5 || '' : " "}
                                                onChange={(e) => handleEditInput(e)} >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className={editTab.activeTab === 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        5
                                    </div>
                                    <div className={editTab.activeTab === 6 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="col-12 mb-3">
                                            <div className="row justify-content-end">
                                                <div className="col-3 d-flex">
                                                    <h6 className='mr-5'>Qiymet elave et</h6>

                                                    <button className="btn btn-primary btn-block" type='button' onClick={handleEditAddPrice}>
                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            editPriceList.map((index, key) => {
                                                return (
                                                    <div className="col-12 mt-3" key={key}>
                                                        <div className="row justify-content-between flex-nowrap item-row">
                                                            {
                                                                editPriceList.length !== 1 &&
                                                                <div className='input-box d-flex align-items-end'>
                                                                    <button
                                                                        type='button'
                                                                        className="btn btn-danger"
                                                                        onClick={() => handleEditPriceRemove(key)}>
                                                                        <i className="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
                                                                    </button>
                                                                </div>
                                                            }
                                                            <div className="input-box">
                                                                <label>Rəng adi</label>
                                                                <select name="COLOR_CODE" id=""
                                                                value={index.COLOR_CODE}
                                                                className='form-control' onChange={(e) => handleEditPriceChange(e, key)}>
                                                                    {
                                                                        editColorList.map((index, key) => (
                                                                            <option value={index.CODE} key={key}>{index.NAME_}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Ölçü adi</label>
                                                                <select name="SIZE_CODE" 
                                                                value={index.SIZE_CODE}
                                                                 className='form-control' onChange={(e) => handleEditPriceChange(e, key)}>
                                                                    {
                                                                        editSizeList.map((index, key) => (
                                                                            <option value={index.CODE} key={key}>{index.NAME_}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>ƏDV Tipi</label>
                                                                <select name="EDV_TYPE" className='form-control' 
                                                                value={index.EDV_TYPE}
                                                                onChange={(e) => handleEditPriceChange(e, key)}>
                                                                    <option value="1">ƏDV Daxil</option>
                                                                    <option value="2">ƏDV Xaric</option>
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>A/S</label>
                                                                <select name="PTYPE_" className='form-control' 
                                                                    value={index.PTYPE_}
                                                                 onChange={(e) => handleEditPriceChange(e, key)}>
                                                                    <option value="1">Alış</option>
                                                                    <option value="2">Satış</option>
                                                                </select>
                                                            </div>
                                                            <div className="input-box">
                                                                <label>ƏDV Faizi</label>
                                                                <input type="text" className='form-control w-100px' 
                                                                value={index.EDV_PER}
                                                                name="EDV_PER" onChange={(e) => handleEditPriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Qiymet</label>
                                                                <input type="text" className='form-control w-100px'
                                                                    value={index.PRICE} 
                                                                    name="PRICE" onChange={(e) => handleEditPriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Qeyd</label>
                                                                <input type="text" className="form-control" 
                                                                value={index.NOTE_} 
                                                                name="NOTE_" onChange={(e) => handleEditPriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Baş. tarixi</label>
                                                                <input type="date" className="form-control" 
                                                                    value={index.BEG_DATE} 
                                                                    name="BEG_DATE" onChange={(e) => handleEditPriceChange(e, key)} />
                                                            </div>
                                                            <div className="input-box">
                                                                <label>Bit. tarixi</label>
                                                                <input type="date" className="form-control" 
                                                                    value={index.END_DATE}
                                                                    name="END_DATE" onChange={(e) => handleEditPriceChange(e, key)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer">
                                {
                                    editTab.activeTab > 1 ?
                                        <button className='btn btn-danger' type='button'
                                            onClick={() => setEditTab({ activeTab: editTab.activeTab - 1 })}>Əvvəlki</button> : ""
                                }
                                {
                                    editTab.activeTab < 6 ?
                                        <button className='btn btn-primary' type='button'
                                            onClick={() => setEditTab({ activeTab: editTab.activeTab + 1 })}>Növbəti</button> :
                                        ""
                                }
                                {
                                    editTab.activeTab > 5 ?
                                        <button className="btn btn-primary" type='submit'>
                                            Yadda Saxla
                                        </button> : ""
                                }
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={() => dispatch(setEditModal())}>Bağla</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemModal