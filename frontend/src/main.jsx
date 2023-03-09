import React from "react";
import ReactDOM, {browserHistory} from "react-dom";
import { Provider } from "react-redux";

import { Router, Route, BrowserRouter, Navigate } from "react-router-dom";

import { store } from "./store";
import { AuthenticatedRoute } from "./customRoutes/ProtectedRoutes";

import Navigation from "./containers/NavigationContainer";
import HomePage from "./containers/HomePageContainer";
import Login from "./containers/auth/LoginContainer";
import Register from "./containers/auth/RegisterContainer";
import ChangePassword from "./containers/auth/ChangePasswordContainer";

export const history = {browserHistory};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} location={location}>
      <div>
        <Navigation />
        <BrowserRouter>
          <Route path="/" component={HomePage} />
          <AuthenticatedRoute exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/register" component={Register} />
          <Route exact path="/signout" render={() => <Navigate to="/" />} />
          <Route exact path="/changepassword" component={ChangePassword} />
        </BrowserRouter>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);




// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

