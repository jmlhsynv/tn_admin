import { routes } from "./routes/routes";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import './assets/css/style.css'

import Login from './views/Login'
import Header from "./components/Header";

const mapStateToProps = state => ({
  user: state.auth.user
})

function App({user}) {
  return (
    <Router>

      {!user ? <Login /> : (
        <>
          <Header />
          <div className="wrapper">
            <Switch>
              {
                routes.map( (route, key) => (
                  <Route key={key} exact={route.exact} path={route.path} render={() => {
                    if(route.auth && !user){
                      return( <Redirect to="/login" />)
                    }
                    return (<route.component /> )
                  }} />
                ))
              }
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
}

export default connect(mapStateToProps)(App);
