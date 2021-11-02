import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncCategory } from '../../stores/category';
import { setModal } from '../../stores/viewCategory';

function Categories() {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(fetchAsyncCategory())
    }, [dispatch])

    console.log(categories);

    const viewModal = (index) => {
        dispatch(setModal(index))
    }

    return (
        <div>
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <h5 class="card-title">Categories</h5>

                    <table className="mb-0 table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CODE</th>
                                <th>NAME</th>
                                <th style={{textAlign: "center"}}><i class="pe-7s-edit"> </i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map((index, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{index.CODE}</td>
                                        <td>{index.NAME_}</td>
                                        <td style={{ width: "20%", textAlign: "center" }}>
                                            <div role="group" class="btn-group" data-toggle="buttons">
                                                <button type="button" class="btn btn-primary" onClick={() => viewModal(index)}>
                                                    <i class="fa fa-fw" aria-hidden="true" title="Copy to use eye"></i>

                                                </button>
                                                <button type="button" class="btn btn-success">
                                                    <i class="fa fa-fw" aria-hidden="true" title="Copy to use edit"></i>
                                                </button>
                                                <button type="button" class="btn btn-danger">
                                                    <i class="fa fa-fw" aria-hidden="true" title="Copy to use trash"></i>
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

export default Categories
