import { routes } from "./routes/routes";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';

import './assets/css/style.css'
import './assets/css/main.css'

import Login from './views/Login'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { setModal } from "./stores/viewCategory";

const mapStateToProps = state => ({
  toggle: state.site.toggle,
  user: state.auth.user,
  view_modal: state.viewCategory.modal,
  data_modal: state.viewCategory.detail
})

function App({ toggle, user, view_modal, data_modal }) {
  const dispatch = useDispatch()

  return (
    <Router>

      {!user ? <Login /> : (
        <>

          <div className={toggle ?
            "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header" :
            "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar"
          }>
            <Header />

            <div className="app-main">
              <Sidebar />

              <div className="app-main__outer">
                <div className="app-main__inner">

                  <Switch>
                    {
                      routes.map((route, key) => (
                        <Route key={key} exact={route.exact} path={route.path} render={() => {
                          if (route.auth && !user) {
                            return (<Redirect to="/login" />)
                          }
                          return (<route.component />)
                        }} />
                      ))
                    }
                  </Switch>
                </div>
                <Footer />
              </div>
            </div>

            <div className={view_modal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"} 
            tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                              {
                                data_modal && data_modal.NAME_
                              }  
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => dispatch(setModal())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          
                            <p>{data_modal && data_modal.ID}</p>
                            <p>{data_modal && data_modal.CODE}</p>
                            <p>{data_modal && data_modal.NAME_}</p>
                          
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            onClick={() => dispatch(setModal())}>Bağla</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
      )}
    </Router>
  );
}

export default connect(mapStateToProps)(App);
