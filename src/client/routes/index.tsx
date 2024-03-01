import { Route, Switch } from "wouter";
import { Home } from "@/client/features/pages/components";

export function Routes() {
  return (
    <Switch>
      <Route component={Home} path="/" />
      <Route>404: No such page!</Route>
    </Switch>
  );
}
