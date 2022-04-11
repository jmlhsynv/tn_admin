import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchItemFiches } from "../../stores/ItemFiches/itemFiches";
import { getStatus } from "../../stores/auth";

import swal from "sweetalert";

import { useHistory } from "react-router-dom";
import { logout } from "../../stores/auth";
import { removeErrors } from "../../stores/Units/units";

function ItemFiches() {
  const dispatch = useDispatch();
  const { itemFiches } = useSelector((state) => state.itemFiches);
  // const { status } = useSelector(state => state.auth)
  console.log(itemFiches);
  useEffect(() => {
    dispatch(fetchItemFiches());
    dispatch(getStatus());
  }, [dispatch]);

  const history = useHistory();
  const { error } = useSelector((state) => state.itemFiches);

  useEffect(() => {
    if (error === 401) {
      dispatch(logout());
      dispatch(removeErrors());
      history.push("/");
    } else if (error === false) {
      swal("Səhv", "Yanlış əməliyyat", "error");
    } else if (error === "hasChild") {
      swal("Səhv", "Bu silinə bilməz!", "error");
    } else if (error === "success") {
      swal("Silindi", "", "success");
    }

    dispatch(removeErrors());
  }, [error, dispatch, history]);

  return (
    <div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <div className="w-100 d-flex justify-content-between mb-3">
            <h5 className="card-title">Məhsul Hərəkətləri </h5>
            <button className="btn btn-primary mr-5">
              <i
                className="fa fa-fw"
                aria-hidden="true"
                title="Copy to use plus"
              >
                
              </i>
              Yeni
            </button>
          </div>
          <table className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sənəd No</th>
                <th>Tarix</th>
                <th>İş yeri</th>
                <th>Sənəd Tipi</th>
                <th>Tutar</th>
                <th>Qeyd</th>
                <th style={{ textAlign: "center" }}>
                  <i className="pe-7s-edit"> </i>
                </th>
              </tr>
            </thead>
            <tbody>
              {itemFiches &&
                itemFiches.map((index, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{index.FICHENO}</td>
                    <td>{index.DATE_}</td>
                    <td>{index.BRANCH}</td>
                    <td>{index.TYPE}</td>
                    <td>{index.TOTAL}</td>
                    <td>{index.NOTE}</td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div
                        role="group"
                        className="btn-group"
                        data-toggle="buttons"
                      >
                        <button type="button" className="btn btn-primary">
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use eye"
                          >
                            
                          </i>
                        </button>
                        <button type="button" className="btn btn-success">
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use edit"
                          >
                            
                          </i>
                        </button>
                        <button type="button" className="btn btn-danger">
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
        </div>
      </div>
    </div>
  );
}

export default ItemFiches;
