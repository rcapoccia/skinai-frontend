import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Questionario from "./pages/Questionario";
import Upload from "./pages/Upload";
import Analisi from "./pages/Analisi";
import Report from "./pages/Report";
import Diario from "./pages/Diario";
import Profilo from "./pages/Profilo";
import FAQ from "./pages/FAQ";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/auth"} component={Auth} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/questionario"} component={Questionario} />
      <Route path={"/upload"} component={Upload} />
      <Route path={"/analisi"} component={Analisi} />
      <Route path={"/analisi/:id"} component={Analisi} />
      <Route path={"/report"} component={Report} />
      <Route path={"/report/:id"} component={Report} />
      <Route path={"/diario"} component={Diario} />
      <Route path={"/profilo"} component={Profilo} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
