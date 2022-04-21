import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNewModal } from "../../stores/Marks/newMarks";
import { setEditModal } from "../../stores/Marks/editMark";
import { setViewModal } from "../../stores/Marks/viewMark";

import axios from "axios";
import { postMark } from "../../stores/Marks/marks";
import { editMark } from "../../stores/Marks/marks";

import { useHistory } from "react-router-dom";
import { logout } from "../../stores/auth";
import { removeErrors } from "../../stores/Marks/marks";

import { useForm } from "react-hook-form";

const { REACT_APP_API_URL } = process.env;

function MarkModal() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { error } = useSelector((state) => state.marks);

  useEffect(() => {
    if (error === 401) {
      dispatch(logout());
      dispatch(removeErrors());
      history.push("/");
    }
  }, [error, dispatch, history]);

  const { modal } = useSelector((state) => state.newMark);
  const { categories } = useSelector((state) => state.categories);
  const { marks } = useSelector((state) => state.marks);

  // New Mark
  const [select, setSelect] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post(REACT_APP_API_URL + "NewCode", { MODULE: "MARKS" }, { headers })
      .then((res) => setCode(res.data[0].CODE));
  }, [marks]);

  useEffect(() => {
    categories.length > 0 ? setSelect(categories[0].ID) : setSelect("");
  }, [categories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postData = (data, e) => {
    data = {
      ...data,
      USER_ID: 1,
      CODE: code,
    };
    dispatch(postMark(data));
    e.target.reset();
    dispatch(setNewModal());
  };

  // Edit Modal
  const editModal = useSelector((state) => state.editMark.modal);
  const editDetail = useSelector((state) => state.editMark.detail);

  const [editCategory, setEditCategory] = useState("");
  const [inp_edit, setInp_edit] = useState({
    NAME_: "",
    CODE: "",
    CATEGORY_ID: "",
  });

  useEffect(() => {
    setInp_edit(editDetail);
    editDetail ? setEditCategory(editDetail.CATEGORY_ID) : setEditCategory("");
  }, [editDetail]);

  const editForm = useRef();

  const {
    register: editRegister,
    formState: { errors: editErrors },
    handleSubmit: handleEditSubmit,
  } = useForm();
  const editData = (data, e) => {
    data = {
      ...inp_edit,
      ...data,
    };
    dispatch(editMark(data));
    e.target.reset();
    dispatch(setEditModal());
  };

  const closeEditModal = () => {
    editForm.current.reset();
    dispatch(setEditModal());
  };

  // View Mark
  const viewModal = useSelector((state) => state.viewMark.modal);
  const viewDetail = useSelector((state) => state.viewMark.detail);

  return (
    <>
      {/* New Modal */}
      <div
        className={
          modal
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
                Yeni Marka
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => dispatch(setNewModal())}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(postData)}>
              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Marka Adı :</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="NAME_"
                    {...register("NAME_", { required: true })}
                  />
                </div>
                {errors.NAME_ && (
                  <span className="text-danger">Marka adı boş ola bilməz!</span>
                )}
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Marka Kodu:</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="CODE"
                    disabled
                    value={code}
                  />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      Marka kateqoriyası:
                    </span>
                  </div>
                  <select
                    name="CATEGORY_ID"
                    className="form-control"
                    defaultValue={select ? select || "" : " "}
                    {...register("CATEGORY_ID", { required: true })}
                  >
                    {categories &&
                      categories.map((index, key) => (
                        <option key={key} value={index.ID}>
                          {index.NAME_}
                        </option>
                      ))}
                  </select>
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
                  onClick={() => dispatch(setNewModal())}
                >
                  Bağla
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className={
          editModal
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
                onClick={() => closeEditModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form ref={editForm} onSubmit={handleEditSubmit(editData)}>
              <div className="modal-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Marka Adı : </span>
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
                    Marka adı boş ola bilməz!
                  </span>
                )}
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Marka Kodu :</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={inp_edit ? inp_edit.CODE || "" : " "}
                    name="CODE"
                  />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      Marka Kateqoriyası :
                    </span>
                  </div>
                  <select
                    className="form-control"
                    defaultValue={editCategory ? editCategory || "" : " "}
                    name="CATEGORY_ID"
                    {...editRegister("CATEGORY_ID", { required: true })}
                  >
                    {categories &&
                      categories.map((index, key) => (
                        <option key={key} value={index.ID}>
                          {index.NAME_}
                        </option>
                      ))}
                  </select>
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

      {/* View Modal */}
      <div
        className={
          viewModal
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
                {viewDetail && viewDetail.NAME_}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => dispatch(setViewModal())}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Kod: {viewDetail && viewDetail.CODE}</p>
              <p>Ad: {viewDetail && viewDetail.NAME_}</p>
              <p>Kateqoriya: {viewDetail && viewDetail.CATEGORY_NAME}</p>
              <p>Kateqoriya kodu: {viewDetail && viewDetail.CATEGORY_CODE}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => dispatch(setViewModal())}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarkModal;
