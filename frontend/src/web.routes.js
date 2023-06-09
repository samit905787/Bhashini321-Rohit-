import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import history from "./web.history";
import Layout from "./ui/Layout";
import authenticateUser from "./configs/authenticate";
import Login from "./ui/container/UserManagement";
import UploadData from "./ui/container/UploadData";
import MyContribution from "./ui/container/MyContribution";
import Header from "./ui/components/Header";

const PrivateRoute = ({
  path,
  component: Component,
  authenticate,
  title,
  token,
  type,
  index,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(rest, "rest");
        console.log(props, "props");
        return authenticate() ? (
          <Layout component={Component} type={type} index={index} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: `${process.env.PUBLIC_URL}/datadaan/user-login`,
              from: props.location.pathname,
            }}
          />
        );
      }}
    />
  );
};

export default function App() {
  return (
    <HashRouter history={history} basename="/">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/datadaan/user-login`}
          component={Login}
        />
        <PrivateRoute
          path={`/datadaan/`}
          title={"Upload Data"}
          authenticate={authenticateUser}
          component={Header}
          // component={}
          currentMenu="upload-data"
          dontShowHeader={false}
          type={"dataset"}
          index={0}
        />

        {/* <PrivateRoute
          path={`/datadaan/my-contribution`}
          title={"My Contribution"}
          authenticate={authenticateUser}
          // component={MyContribution}
          // component={M}
          currentMenu="upload-data"
          dontShowHeader={false}
          type={"dataset"}
          index={0}
        /> */}
      </Switch>
    </HashRouter>
  );
}
