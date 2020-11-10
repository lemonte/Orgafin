import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categorias from "./pages/Categorias";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movimentacao from "./pages/Movimentacao";



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/home" component={Home} exact />
                <Route path="/categorias" component={Categorias} exact />
                <Route path="/movimentacao" component={Movimentacao} exact />
            </Switch>
        </BrowserRouter>
    );
}
