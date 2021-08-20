import { Route, Switch } from "react-router-dom";
import Users from "../User/Users";
import EditUser from "../EditUser/EditUser";
import AddUser from "../AddUser/AddUser";

export default function General() {

  return (
    <Switch>
      <Route exact path="/">
        <Users  />
      </Route>
      <Route exact path="/user/:id/edit">
        <EditUser />
      </Route>
      <Route exact path="/add/user">
        <AddUser />
      </Route>
    </Switch>
  );
}
