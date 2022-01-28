import React from "react";

import { routes } from "./routes/routes";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './assets/css/style.css'
import './assets/css/main.css'

import { useSelector } from 'react-redux';

import Login from './views/Login'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Modal from "./views/Category/Modal";
import MarkModal from "./views/Marks/MarkModal";



function App() {

  const { toggle } = useSelector(state => state.site)
  const { user } = useSelector(state => state.auth)
  const { status } = useSelector(state => state.auth)

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
                          if(route.admin && status !== "admin"){
                            return (<Redirect to="/" />)
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

            <Modal />
            <MarkModal />



          </div>
        </>
      )}
    </Router>
  );
}

export default App;
