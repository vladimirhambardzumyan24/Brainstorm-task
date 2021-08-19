import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import AddUser from "../AddUser/AddUser";
import EditUser from "../EditUser/EditUser";
import Users from "../User/Users";

export default function General() {
  const [userId, setUserId] = useState(0);
  let history = useHistory();

  const editThisUser = (id) => {
    history.push(`/user/${id}`);
    setUserId(id);
  };
  return (
    <Switch>
      <Route exact path="/">
        <Users editThisUser={editThisUser} />
      </Route>
      <Route exact path="/user/:id">
        <EditUser userId={userId} />
      </Route>
      <Route exact path="/add/user">
        <AddUser />
      </Route>
    </Switch>
  );
}
