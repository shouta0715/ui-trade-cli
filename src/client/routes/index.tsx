import { Route, Switch } from "wouter";

export function Routes() {
  return (
    <Switch>
      <Route path="/">
        <div>Home</div>
      </Route>
      <Route path="/ui/:slug">
        <div>UI</div>
      </Route>
      <Route>404: No such page!</Route>
    </Switch>
  );
}
