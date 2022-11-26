import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "components/auth/index";
import { LOGIN_PATH, REGISTER_PATH } from "./constants";
import AccountRegister from "components/auth/AccountRegister";

const Routes = () => {
  return (
    <Switch>
      <Route path={`/${LOGIN_PATH}`} component={Auth} />
      <Route path={`/${REGISTER_PATH}`} component={AccountRegister} />
    </Switch>
  );
};
export default withRouter(Routes);
