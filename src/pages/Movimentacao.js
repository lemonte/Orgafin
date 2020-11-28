
import React, {Component} from 'react'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import M from "materialize-css";
import { get_data, close_modal, Moeda,isEmpty, open_modal,  convert_data } from '../tools/functions'


class Movimentacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista_ordens : [],
            item_create : {},
            item_update : {},
            items:{},
            categorias:{}
        }
    }

   async componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {});
          });
          document.addEventListener('DOMContentLoaded', function() {
            var elems_modal = document.querySelectorAll('.modal');
            M.Modal.init(elems_modal, {});
          });
          document.addEventListener('DOMContentLoaded', function() {
            var select = document.querySelectorAll('select');
            M.FormSelect.init(select, {});
          });
         await this.mostrarMovimentacao()
         await this.mostrarCategorias();
    }



    componentDidUpdate() {
        var select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }



    async mostrarMovimentacao() {
        const requestOptions = {
            method: 'GET',
        }
        fetch('http://orgafin.orgfree.com/DAO/api/v1/movimentacoes/mostrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                console.log(data);
                this.items =  data.dados;
                return this.setState({ lista_ordens: data.dados })
            }).catch(
            err=> {
              M.toast({html: "um erro ocorreu: "+err});
              console.log(err);
            }
            )
    }




     create_movimentacao() {
         const { item_create } = this.state
        if (isEmpty(item_create)) return M.toast({ html: 'Preencha os campos' });
        if (isEmpty(item_create.nome) ) return M.toast({ html: 'Preencha o nome' });
        if (isEmpty(item_create.valor)) return M.toast({ html: 'Preencha o valor' });
        if (isEmpty(item_create.data)) return M.toast({ html: 'Selecione a data' })
        if (isEmpty(item_create.categoria)) return M.toast({ html: 'Selecione a categoria' });
        
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ "nomeMov": item_create.nome, "tipoMov":item_create.categoria, "valorMov":item_create.valor ,"dataMov":item_create.data})
        }
        fetch('http://orgafin.orgfree.com/DAO/api/v1/movimentacoes/cadastrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                console.log(data);
                M.toast({ html: data.dados})
                this.mostrarMovimentacao()

            }).catch(
            err=> {
              M.toast({html: err});
              console.log(err);
            }
            )
        this.setState({ item_create: {} })
        this.mostrarMovimentacao();
    }

    async mostrarCategorias() {
        const requestOptions = {
            method: 'GET',
        }
        fetch('http://orgafin.orgfree.com/DAO/api/v1/categorias/mostrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                console.log(data);
                this.categorias =  data.dados;
                return this.setState({ lista_ordens: data.dados })


            }).catch(
            err=> {
              M.toast({html: err});
              console.log(err);
            }
            )

    }
    categoria_dropDown(){

        if(this.categorias){
            return(
                <div>                 
                         <select >
                         <option value={0} disabled selected>selecione uma categoria</option>
                             {this.categorias.map((item, id) =>{
                               return(<option value={id} disabled selected>{item.nome}</option>)
                            })}
                           </select>
                       
                    
                </div>
            );
        }else{
            this.mostrarMovimentacao();
        }
        
        }

    salve_update(){
        const { item_update } = this.state
        if (isEmpty(item_update)) return M.toast({ html: 'Preencha os campos' });
        if (isEmpty(item_update.nome) ) return M.toast({ html: 'Preencha o nome' });
        if (isEmpty(item_update.valor)) return M.toast({ html: 'Preencha o valor' });
        if (isEmpty(item_update.data)) return M.toast({ html: 'Selecione a data' })
        if (isEmpty(item_update.categoria)) return M.toast({ html: 'Selecione a categoria' });

        M.toast({ html: 'Item Atualizado' })
        close_modal('modal1', this)
        this.mostrarMovimentacao();
        this.mostrarCategorias();
    }
    
     card() {
        if(this.items){
            return(
                <div>
                    {
                       
                       this.items.map((item, id) =>{
                        return (
                            <div key={id} onClick={() => {
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
                       })
                    }
                </div>
            );
        }else{
            this.mostrarMovimentacao();
            this.mostrarCategorias();
        }
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
                            <div class="input-field password col s12 m3 l3">
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
                            <div class="input-field password col s12 m3 l3">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="R$ 30,00"
                                    value={item_update.valor? item_update.valor : ""}
                                    onChange={e => {
                                        item.valor = e.target.value;
                                        this.setState({ item_update: item })
                                    }}

                                />
                                <label class="active" for="last_name">Valor</label>
                            </div>
                            <div class="input-field col s12 m3 l3">
                                <input id="date" type="date" 
                                 value={item_update.data? item_update.data : ""}
                                onChange={e => {
                                    item.data = e.target.value;
                                    this.setState({ item_update: item })
                                }} />
                                <label class="active" for="last_name" >Data</label>
                            </div>
                            <div class="input-field col s12 col s12 m3 l3">
                                <select 
                                 value={item_update.categoria? item_update.categoria : ""}
                                onChange={e => {
                                    item.categoria = e.target.value;
                                    this.setState({ item_update: item })
                                }}>
                                    <option value="" disabled selected>Selecione a categoria</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                                <label>Movimentação</label>
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


     forms() {
         const { item_create } = this.state
        var item = item_create
        return (
            <div class="card hoverable" >
                <div class="card-content">
                    <div class="row">
                        <div class="col s12 l12">

                            <div class="input-field password col s12 m3 l3">
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
                            <div class="input-field password col s12 m3 l3">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="R$ 30,00"
                                    value={item_create.valor? item_create.valor : ""}
                                    onChange={e => {
                                        item.valor = e.target.value;
                                        this.setState({ item_create: item })
                                    }}

                                />
                                <label class="active" for="last_name">Valor</label>
                            </div>
                            <div class="input-field col s12 m3 l3">
                                <input id="date" type="date" 
                                 value={item_create.data? item_create.data : ""}
                                onChange={e => {
                                    item.data = e.target.value;
                                    this.setState({ item_create: item })
                                }} />
                                <label class="active" for="last_name" >Data</label>
                            </div>
                            <div class="input-field col s12 col s12 m3 l3">
                                {this.categoria_dropDown()}
                                <label>Movimentação</label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class=" card-action center">
                    <a onClick={() => this.create_movimentacao()}>Cadastrar</a>
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
                        { 
                         this.card()
                        }
                        {this.modal()}
                    </div>
                </div>
            </div>

        </>
    )
    }



}

export default Movimentacao;