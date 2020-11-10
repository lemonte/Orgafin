
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import M from "materialize-css";
import { useHistory } from "react-router-dom";


function Movimentacao() {
    const [input, setInput] = useState(false)
    const [output, setOutput] = useState(false)
    const [nome, setNome] = useState("")
    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    })
    useEffect(() => {    
        var select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
    }, []);


    function handleInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value)
        setOutput(false)
        setInput(true)
    }
    function handleOutput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value)
        setInput(false)
        setOutput(true)
    }


    function create_categorie(){
        if(nome == "") return M.toast({html: 'Preencha o nome'});
        if(input == false && output == false) return M.toast({html: 'Selecione o tipo'});
    }


    function forms() {
        return (
            <div class="card hoverable" >
                <div class="card-content">
                    <div class="row">
                        <div class="col s12 l12">

                            <div class="input-field password col s12 m6">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="Ex: livro"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                                <label class="active" for="last_name">Nome</label>

                            </div>
                            <div class="col s12 m6">
                                <label>Selecione o tipo</label>
                                <div class="row">
                                    <label class="col s6">
                                        <input
                                              checked={input}
                                            type="radio"
                                            onChange={handleInput}
                                        />
                                        <span>Entrada</span>
                                    </label>
                                    <label class="col s6">
                                        <input 
                                             checked={output}
                                            type="radio"
                                            onChange={handleOutput}
                                        />
                                        <span>Saída</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" card-action center">
                    <a onClick={()=> create_categorie()}>Cadastrar</a>
                </div>
            </div>
        )
    }

    return (
        <>
            <NavBar />
            <Sidenav />
            <div class="login forms">
                <div class="row">
                    <div class="col s12 m3 l3" />
                    <div class="col s12 m6">
                        {forms()}

                        <div class="card white darken-1 hoverable">
                            <div class="card-content black-text ">
                                <span class="card-title">Livros</span>
                                <div class="divider" />
                                <div class="row">
                                    <div class="col s6">Categoria</div>
                                    <div class="col s6">Tipo</div>
                                </div>
                                <div class="row">
                                    <div class="col s6">Escola</div>
                                    <div class="col s6">Saida</div>
                                </div>
                            </div>
                            <div class="card-action">
                                <a href="#" class="red-text" >Deletar</a>
                                <a href="#" class="blue-text">Editar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Movimentacao;