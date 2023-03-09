import { useState } from 'react';
import './App.css';
//import Navbar from './components/Navbar';
import React from "react";
import ReactDOM, {browserHistory} from "react-dom";
import { Provider } from "react-redux";

import { Route, Link, BrowserRouter, Router, Navigate } from "react-router-dom";

import { store } from "./store";
import { AuthenticatedRoute } from "./customRoutes/ProtectedRoutes";

import Navigation from "./containers/NavigationContainer";
import HomePage from "./containers/HomePageContainer";
import Login from "./containers/auth/LoginContainer";
import Register from "./containers/auth/RegisterContainer";
import ChangePassword from "./containers/auth/ChangePasswordContainer";

// export const history = {browserHistory};

// function App() {
//   const [isLoaded, setIsLoaded] = useState(true)
//   return (
//     <Provider store={store}>
//       <Router history={history}>
//           <Navigation />
//             <BrowserRouter>
//               <Route exact path="/" component={HomePage} />
//               <AuthenticatedRoute exact path="/login" component={Login} />
//               <AuthenticatedRoute exact path="/register" component={Register} />
//               <Route exact path="/signout" render={() => <Navigate to="/" />} />
//               <Route exact path="/changepassword" component={ChangePassword} />
//             </BrowserRouter>
//       </Router>
//     </Provider>
//     // <div>
//     //   <div className='home'>
//     //     <div className='home-text'>
//     //       <h1>Prifitez des mielleures fonctionnalités !</h1>
//     //         <div className='li'>
//     //           <li>Gérer vos hôtels avec un grande fiabilité</li> 
//     //           <li>Une interface simple et adaptée</li>
//     //           <li>Souple administration</li>
//     //         </div>
//     //     </div>
//     //     <div className="login">
//     //     </div>
//     //   </div>
//     // </div>
//   )
// }
// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <div>
//         <Navigation />
//         <Switch>
//           <Route exact path="/" component={HomePage} />
//           <AuthenticatedRoute exact path="/login" component={Login} />
//           <AuthenticatedRoute exact path="/register" component={Register} />
//           <Route exact path="/signout" render={() => <Redirect to="/" />} />
//           <Route exact path="/changepassword" component={ChangePassword} />
//         </Switch>
//       </div>
//     </Router>
//   </Provider>,
//   document.getElementById("root")
// );
//export default App
