import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import UserPage from "../UserPage/UserPage";
import AllPractices from "../AllPractices/AllPractices";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

//garret's additions
import Timer from "../Timer/Timer";
import PracticeDetails from "../PracticeDetails/PracticeDetails";
import CreatePractice from "../CreatePractice/CreatePractice";
import EditPractice from "../EditPractice/EditPractice";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows Timer at all times (logged in or not)
              exact
              path="/about"
              component={Timer}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage --> GARRET: CHANGE USER PAGE TO ALL PRACTICES.js page
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows a list of all of the user's practices
              exact
              path="/all-practices"
              component={AllPractices}
            />

            <ProtectedRoute
              // logged in shows a list of all of the user's practices
              exact
              path="/timer"
              component={Timer}
            />

            <ProtectedRoute
              // logged in shows a list of all of the user's practices
              exact
              path="/create"
              component={CreatePractice}
            />

            <ProtectedRoute
              // once a user clicks on a given practice, should take them to this page
              exact
              path="/details"
              component={PracticeDetails}
            />

            <ProtectedRoute
              // once a user clicks on a given practice, should take them to this page
              exact
              path="/edit"
              component={EditPractice}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/all-practices"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/all-practices"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/all-practices"
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
