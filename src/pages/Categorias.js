
import React, { Component } from 'react'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import M from "materialize-css";
import { get_data, close_modal, Moeda,isEmpty, open_modal,  convert_data } from '../tools/functions'



class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_update : {},
            item_create : {}
        }
    }


   async componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {});
          });

          document.addEventListener('DOMContentLoaded', function() {
            var select = document.querySelectorAll('select');
            M.FormSelect.init(select, {});
          });
          document.addEventListener('DOMContentLoaded', function() {
            var elems_modal = document.querySelectorAll('.modal');
            M.Modal.init(elems_modal, {});
          });
    }

    async mostrarMovimentacao() {
        const data = await get_data('movimentacoes/mostrar')
        return this.setState({ lista_ordens: data.data.dados })
    }


    salve_update(){
        const { item_update } = this.state;
        if(isEmpty(item_update)) return M.toast({ html: "Preencha os campos"})
        if(isEmpty(item_update.tipo)) return M.toast({ html: "Selecione o tipo"})

        M.toast({ html: 'Item Atualizado' })
        close_modal('modal1', this)
        this.mostrarMovimentacao();
    }

    modal() {
        const { item_update } = this.state
        var item = item_update
        return (
            <div id="modal1" class="modal white">
                <div class="modal-content card">
                <div class="card-content">
                <span class="card-title center">{item_update.nome ? item_update.nome.toUpperCase() : ""}</span>
                    <div class="row">
                        <div class="col s12 l12">

                            <div class="input-field password col s12 m6">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="Ex: livro"
                                    value={item_update.nome? item_update.nome : ""}
                                    onChange={e => {
                                        item.nome = e.target.value;
                                        this.setState({ item_update: item })
                                    }}
                                />
                                <label class="active" for="last_name">Nome</label>

                            </div>
                            <div class="col s12 m6">
                                <label>Selecione o tipo</label>
                                <div class="row">
                                    <label class="col s6">
                                        <input
                                            checked={item.tipo == "entrada" ? true : false}
                                            type="radio"
                                            onChange={e => {
                                                item.tipo = 'entrada';
                                                this.setState({ item_update: item })
                                            }}
                                        />
                                        <span>Entrada</span>
                                    </label>
                                    <label class="col s6">
                                        <input 
                                          checked={item.tipo == "saida" ? true : false}
                                          type="radio"
                                          onChange={e => {
                                              item.tipo = 'saida';
                                              this.setState({ item_update: item })
                                          }}
                                        />
                                        <span>Saída</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer white">
                    <a style={{cursor:"pointer"}} onClick={()=> this.salve_update()} class="waves-effect waves-green btn-flat white-text green">Salvar</a>
                    <a style={{cursor:"pointer"}} onClick={()=> close_modal('modal1', this)} class="left waves-effect btn-flat white-text red">Descartar</a>
                </div>
            </div>
        )
    }


     create_categorie(){
        const { item_create } = this.state;
        if(isEmpty(item_create)) return M.toast({ html: "Preencha os campos"})
        if(isEmpty(item_create.tipo)) return M.toast({ html: "Selecione o tipo"})
        M.toast({ html: "Cadastro realizado"})
    }



     forms() {
        const { item_create } = this.state
        var item = item_create
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
                                    value={item_create.nome? item_create.nome : ""}
                                    onChange={e => {
                                        item.nome = e.target.value;
                                        this.setState({ item_create: item })
                                    }}
                                />
                                <label class="active" for="last_name">Nome</label>

                            </div>
                            <div class="col s12 m6">
                                <label>Selecione o tipo</label>
                                <div class="row">
                                    <label class="col s6">
                                        <input
                                            checked={item.tipo == "entrada" ? true : false}
                                            type="radio"
                                            onChange={e => {
                                                item.tipo = 'entrada';
                                                this.setState({ item_create: item })
                                            }}
                                        />
                                        <span>Entrada</span>
                                    </label>
                                    <label class="col s6">
                                        <input 
                                          checked={item.tipo == "saida" ? true : false}
                                          type="radio"
                                          onChange={e => {
                                              item.tipo = 'saida';
                                              this.setState({ item_create: item })
                                          }}
                                        />
                                        <span>Saída</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" card-action center">
                    <a onClick={()=> this.create_categorie()}>Cadastrar</a>
                </div>
            </div>
        )
    }

card(item){
    return(
        <div key={item.id} onClick={() => {
            this.setState({ item_update: item })
            open_modal('modal1')}} class="card white darken-1 hoverable">
        <div class="card-content black-text ">
            <span class="card-title">{item.nome ? item.nome : "Sem nome"}</span>
            <div class="divider" />
            <div class="row">
                <div class="col s6">Tipo</div>
                <div class="col s6">Categoria</div>
            </div>
            <div class="row">
            <div class="col s6">{item.nome ? item.nome : "TIpo não definido"}</div>
                <div class="col s6">{item.tipo ? item.tipo : "TIpo não definido"}</div>
            </div>
        </div>
        <div class="card-action">
            <a href="#" class="red-text" >Deletar</a>
            <a href="#" class="blue-text">Editar</a>
        </div>
    </div>
    )
}


    render(){


    return (
        <>
            <NavBar />
            <Sidenav />
            <div class="login forms">
                <div class="row">
                    <div class="col s12 m3 l3" />
                    <div class="col s12 m6">
                        {this.forms()}
                        {this.card({id : 3,nome : 'joao', tipo: "saida"})}
                        {this.modal()}
                    </div>
                </div>
            </div>
        </>
    )
    }

}


export default Categoria;