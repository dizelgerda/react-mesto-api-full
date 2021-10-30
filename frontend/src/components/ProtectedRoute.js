import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ Component, ...props }) {
  return (
    <Route>
      {() => props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />}
    </Route>
  );
}
