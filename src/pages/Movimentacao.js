
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import M from "materialize-css";
import Moeda from '../Components/Moeda';


function Movimentacao() {
    const [nome, setNome] = useState("")
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [valor, setValor] = useState("")
    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    })
    useEffect(() => {
        let options = {
            defaultDate: new Date(),
            i18n: {
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
                weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                today: 'Hoje',
                clear: 'Limpar',
                cancel: 'Sair',
                done: 'Confirmar',
                labelMonthNext: 'Próximo mês',
                labelMonthPrev: 'Mês anterior',
                labelMonthSelect: 'Selecione um mês',
                labelYearSelect: 'Selecione um ano',
                selectMonths: true,
                selectYears: 15,
            },
            format: 'dd mmmm, yyyy',
            container: 'body',
            minDate: new Date(),
            onSelect: function (date) {
                setData(date)
                return console.log(date)
            }
        };
        var select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
        var datepicker = document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker, options);
    }, []);


    function create_categorie() {
        if (nome == "") return M.toast({ html: 'Preencha o nome' });
        if (valor == "") return M.toast({ html: 'Preencha o valor' });
        if (data == "") return M.toast({ html: 'Selecione a data' })
        if (categoria == "") return M.toast({ html: 'Selecione a categoria' });
    }

    function forms() {
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
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}

                                />
                                <label class="active" for="last_name">Nome</label>

                            </div>
                            <div class="input-field password col s12 m3 l3">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="R$ 30,00"
                                    value={valor}
                                    onChange={e => setValor(e.target.value)}

                                />
                                <label class="active" for="last_name">Valor</label>
                            </div>
                            <div class="input-field col s12 m3 l3">
                                <input
                                    type="text"
                                    class="datepicker"
                                    placeholder="Selecione a data"

                                />
                                <label class="active" for="last_name">Data</label>
                            </div>
                            <div class="input-field col s12 col s12 m3 l3">
                                <select onChange={e => setCategoria(e.target.value)}>
                                    <option value="" disabled selected>Selecione a categoria</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                                <label>Materialize Select</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" card-action center">
                    <a onClick={() => create_categorie()}>Cadastrar</a>
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