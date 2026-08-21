/* Design reminder — Cobalt Botanical Ledger: keep the public shell minimal so editorial content loads quickly. */
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";


const githubPagesBase =
  import.meta.env.VITE_GITHUB_PAGES === "true" && import.meta.env.BASE_URL !== "./"
    ? import.meta.env.BASE_URL.replace(/\/$/, "")
    : undefined;

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WouterRouter base={githubPagesBase}>
        <AppRoutes />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
