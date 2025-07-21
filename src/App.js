import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import SudokuGame from "./pages/sudoku-game";
function Router() {
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: SudokuGame }), _jsx(Route, { component: NotFound })] }));
}
function App() {
    return (_jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Router, {})] }));
}
export default App;
