import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import Moeda from '../Components/Moeda';




function Home() {

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    })


    return (
        <>
            <NavBar />
            <Sidenav />

            <div class="login forms">
                <div class="row">
                    <div class="col s12 m3 l3" />
                    <div class="col s12 m6">
                        <div class="card white darken-1">
                            <div class="card-content black-text">
                                <span class="card-title">Livros</span>
                                <div class="divider"/>
                                <div class="row">
                                    <div class="col s3">Categoria</div>
                                    <div class="col s3">Tipo</div>
                                    <div class="col s3">Valor</div>
                                    <div class="col s3">Data</div>
                                </div>
                                <div class="row">
                                    <div class="col s3">Escola</div>
                                    <div class="col s3">Saida</div>
                                    <div class="col s3">{Moeda.convert("30.00")}</div>
                                    <div class="col s3">19/05/2020</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;