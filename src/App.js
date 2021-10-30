import { routes } from "./routes/routes";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import './assets/css/style.css'
import './assets/css/main.css'

import Login from './views/Login'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const mapStateToProps = state => ({
  toggle: state.site.toggle,
  user: state.auth.user
})

function App({ toggle, user }) {
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


          </div>
        </>
      )}
    </Router>
  );
}

export default connect(mapStateToProps)(App);
