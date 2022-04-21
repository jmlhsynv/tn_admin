import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItem as deleteProduct,
  fetchByRow,
} from "../../stores/Items/items";
import { getDetailedItem } from "../../stores/Items/viewItem";
import { getStatus } from "../../stores/auth";

import swal from "sweetalert";
import Pagination from "react-js-pagination";

import { setViewModal } from "../../stores/Items/viewItem";
import { setNewModal } from "../../stores/Items/newItem";
import { getEditItem, setEditModal } from "../../stores/Items/editItem";

import { useHistory } from "react-router-dom";
import { logout } from "../../stores/auth";
import { removeErrors } from "../../stores/Items/items";

import { fetchAsyncCategory } from "../../stores/Categories/category";
import { fetchMarks } from "../../stores/Marks/marks";
import { fetchSubmarks } from "../../stores/Submarks/submarks";

function Items() {
  const dispatch = useDispatch();
  const { items, page, page_count } = useSelector((state) => state.items);
  const { status } = useSelector((state) => state.auth);

  const { categories } = useSelector((state) => state.categories);
  const { marks } = useSelector((state) => state.marks);
  const { submarks } = useSelector((state) => state.submarks);

  useEffect(() => {
    dispatch(fetchByRow(1));
    dispatch(fetchAsyncCategory());
    dispatch(fetchMarks());
    dispatch(fetchSubmarks());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStatus());
  }, [dispatch, items]);

  const history = useHistory();
  const { error } = useSelector((state) => state.items);
  useEffect(() => {
    if (error === 401) {
      dispatch(logout());
      dispatch(removeErrors());
      history.push("/");
    } else if (error === false) {
      swal("Səhv", "Yanlış əməliyyat", "error");
    } else if (error === "hasChild") {
      swal(
        "Səhv",
        "Bu məhsula aid element olduğu üçün silinə bilməz!",
        "error"
      );
    } else if (error === "success") {
      swal("Silindi", "", "success");
    }

    dispatch(removeErrors());
  }, [error, dispatch, history]);

  // Delete item
  const deleteItem = (name, id) => {
    if (status === "admin") {
      swal({
        title: `${name} silinəcək!`,
        text: "Silməyə əminsinizmi?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteProduct(id));
        }
      });
    } else {
      swal("Yetki yoxdur!", "Silmək üçün adminə müraciət edin!", "error");
    }
  };

  // View Item
  const viewItem = (id) => {
    dispatch(getDetailedItem(id));
    dispatch(setViewModal());
  };

  const handleEditModal = (id) => {
    dispatch(getEditItem(id));
    dispatch(setEditModal());
  };

  // Pagination
  const changePagination = (e) => {
    dispatch(fetchByRow(e));
  };
  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    page ? setPageNum(page) : setPageNum(0);
    page_count ? setPageCount(page_count) : setPageCount(0);
  }, [page, page_count]);

  // Search
  const [search, setSearch] = useState({});
  const searchChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };
  const searchItem = (e) => {
    e.preventDefault()
    console.log(search);
  };
  return (
    <div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <div className="w-100 d-flex justify-content-between mb-3">
            <h5 className="card-title">Məhsullar </h5>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(setNewModal())}
            >
              <i
                className="fa fa-fw"
                aria-hidden="true"
                title="Copy to use plus"
              >
                
              </i>
              Yeni Məhsul
            </button>
          </div>
          <div className="col-12 my-3">
            <form onSubmit={(e) => searchItem(e)}>
              <div
                className="row flex-nowrap justify-content-between"
                style={{ gap: 10 }}
              >
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Ad : </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Məhsul adı"
                    className="form-control"
                    name="name"
                    onChange={(e) => searchChange(e)}
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Kategoriya : </span>
                  </div>
                  <select
                    defaultValue=""
                    name="category"
                    className="form-control"
                    onChange={(e) => searchChange(e)}
                  >
                    <option value="" disabled>
                      --Kategoriya--
                    </option>

                    {categories && categories.length > 0
                      ? categories.map((e, i) => (
                          <option value={e.ID} key={i}>
                            {e.NAME_}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> Marka : </span>
                  </div>
                  <select
                    name="mark"
                    defaultValue=""
                    className="form-control"
                    onChange={(e) => searchChange(e)}
                  >
                    <option value="" disabled>
                      --Marka--
                    </option>
                    {marks && marks.length > 0
                      ? marks.map((e, i) => (
                          <option value={e.ID} key={i}>
                            {e.NAME_}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Alt Marka : </span>
                  </div>
                  <select
                    name="submark"
                    defaultValue=""
                    className="form-control"
                    onChange={(e) => searchChange(e)}
                  >
                    <option value="" disabled>
                      --Alt Marka--
                    </option>
                    {submarks && submarks.length > 0
                      ? submarks.map((e, i) => (
                          <option value={e.ID} key={i}>
                            {e.NAME_}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>
                <div className="btn-group">
                  <button className="btn btn-primary btn-block">Axtar</button>
                </div>
              </div>
            </form>
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
                <th style={{ textAlign: "center" }}>
                  <i className="pe-7s-edit"> </i>
                </th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((index, key) => (
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
                      <div
                        role="group"
                        className="btn-group"
                        data-toggle="buttons"
                      >
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => viewItem(index.ID)}
                        >
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use eye"
                          >
                            
                          </i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleEditModal(index.ID)}
                        >
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use edit"
                          >
                            
                          </i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteItem(index.CODE, index.ID)}
                        >
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use trash"
                          >
                            
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="w-100 d-flex justify-content-center mt-3">
            <Pagination
              activePage={pageNum}
              itemsCountPerPage={1}
              totalItemsCount={pageCount}
              pageRangeDisplayed={9}
              onChange={(e) => changePagination(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
