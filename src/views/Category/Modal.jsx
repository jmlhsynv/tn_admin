import React, { useState, useEffect, useRef } from "react";
import { setModal } from "../../stores/Categories/viewCategory";
import { connect } from "react-redux";
import { setNewModal } from "../../stores/Categories/newCategory";
import { setEditModal } from "../../stores/Categories/editCategory";

import { postAsyncCategory } from "../../stores/Categories/category";
import { editAsyncCategory } from "../../stores/Categories/category";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/auth";
import { removeErrors } from "../../stores/Categories/category";

import axios from "axios";
import { useForm } from "react-hook-form";

const { REACT_APP_API_URL } = process.env;

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  error: state.categories.error,
  // view Category
  category_view_modal: state.viewCategory.modal,
  category_view_detail: state.viewCategory.detail,

  // new Category
  category_new_modal: state.newCategory.modal,

  // Edit category
  category_edit_detail: state.editCategory.detail,
  category_edit_modal: state.editCategory.modal,
});

function Modal({
  categories,
  error,
  category_view_modal,
  category_view_detail,
  category_new_modal,
  category_edit_modal,
  category_edit_detail,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (error === 401) {
      dispatch(logout());
      dispatch(removeErrors());
      history.push("/");
    }
  }, [error, dispatch, history]);

  // ADD NEW CATEGORY
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [code, setCode] = useState("");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post(
        REACT_APP_API_URL + "NewCode",
        { MODULE: "CATEGORIES" },
        { headers }
      )
      .then((res) => setCode(res.data[0].CODE));
  }, [categories]);

  const postData = (data, e) => {
    data = {
      ...data,
      USER_ID: 1,
      CODE: code,
    };
    dispatch(postAsyncCategory(data));
    e.target.reset();
    dispatch(setNewModal());
  };

  // EDIT CATEGORY
  const {
    register: editRegister,
    formState: { errors: editErrors },
    handleSubmit: handleEditSubmit,
  } = useForm();

  const [inp_edit, setInp_edit] = useState({ NAME_: "", CODE: "" });
  const editForm = useRef();

  useEffect(() => {
    setInp_edit(category_edit_detail);
  }, [category_edit_detail]);

  const editData = (data, e) => {
    data = {
      ...inp_edit,
      ...data,
    };
    dispatch(editAsyncCategory(data));
    e.target.reset();
    dispatch(setEditModal());
  };
  const closeEditModal = () => {
    editForm.current.reset();
    dispatch(setEditModal());
  };
  
  return (
    <>
      {/* View Category */}
      <div
        className={
          category_view_modal
            ? "modal fade bd-example-modal-lg show"
            : "modal fade bd-example-modal-lg"
        }
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {category_view_detail && category_view_detail.NAME_}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => dispatch(setModal())}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{category_view_detail && category_view_detail.CODE}</p>
              <p>{category_view_detail && category_view_detail.NAME_}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => dispatch(setModal())}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Category */}
      <div
        className={
          category_new_modal
            ? "modal fade bd-example-modal-lg show"
            : "modal fade bd-example-modal-lg"
        }
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Yeni Kateqoriya
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => closeEditModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(postData)}>
              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Kateqoriya Adı :</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="NAME_"
                    {...register("NAME_", { required: true })}
                  />
                </div>
                {errors.NAME_ && (
                  <span className="text-danger">
                    Kateqoriya adı boş ola bilməz!
                  </span>
                )}
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Kateqoriya Kodu:</span>
                  </div>
                  <input
                    type="text"
                    value={code}
                    disabled
                    className="form-control"
                    name="CODE"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className=" btn btn-primary" type="submit">
                  Göndər
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => closeEditModal()}
                >
                  Bağla
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Category */}
      <div
        className={
          category_edit_modal
            ? "modal fade bd-example-modal-lg show"
            : "modal fade bd-example-modal-lg"
        }
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {inp_edit ? inp_edit.NAME_ || "" : " "}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => dispatch(setEditModal())}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form ref={editForm} onSubmit={handleEditSubmit(editData)}>
              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Kateqoriya Adı : </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={inp_edit ? inp_edit.NAME_ || "" : " "}
                    name="NAME_"
                    {...editRegister("NAME_", { required: true })}
                  />
                </div>
                {editErrors.NAME_ && (
                  <span className="text-danger">
                    Kateqoriya adı boş ola bilməz!
                  </span>
                )}

                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Kateqoriya Kodu :</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={inp_edit ? inp_edit.CODE || "" : " "}
                    name="CODE"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className=" btn btn-primary" type="submit">
                  Göndər
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => dispatch(setEditModal())}
                >
                  Bağla
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Modal);
