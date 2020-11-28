

import React, { Component } from 'react';
import M from "materialize-css";
import { Chart } from 'chart.js';
import { get_data, close_modal, Moeda, isEmpty, open_modal, convert_data } from '../tools/functions'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
class Painel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [
                 {
                    id: 3,
                    nome: 'joao',
                    tipo: "saida"
                },
                  {
                    id: 10,
                    nome: 'Teste',
                    tipo: "entrada"
                }
            ],
            movimentacoes: []

        };

    }
    async categorias() {
        /*Local para buscar as categorias */

    }


    async movimentacoes() {
        const data = await get_data('movimentacoes/mostrar') 
        this.setState({ movimentacoes: data.data ? data.data.dados : [] })
        return this.rotina_grafico(data.data ? data.data.dados : [])
    }

    componentDidMount() {
        this.categorias()
        this.movimentacoes()


    }



    rotina_grafico(itens) {
        let labels = []
        let labels_value = []
        itens.map(i => {
            labels.push(convert_data(i.data))
            labels_value.push(i.valor ? Number(i.valor) : 0.00)
        })
        console.log(labels_value)
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Movimentações',
                    data: labels_value,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

    cardInformationNumber(item) {
        return (
            <>

                <div class="col s12 m3">
                    <div class="painel card horizontal hoverable">

                        <div class="icon">
                            <i class="medium material-icons">assignment</i>
                        </div>
                        <div>

                            <span> {item.nome ? item.nome : "Sem nome"}</span>
                            <p>{item.tipo ? item.tipo : "Tipo não informado"}</p>

                        </div>

                    </div>
                </div>
            </>
        )
    }
    cardChart() {


        return (
            <>
                <div class="col s12 m12">
                    <div class="card darken-1">
                        <div class="card-content ">


                            <canvas id="myChart"></canvas>

                        </div>

                    </div>
                </div>
            </>
        )

    }

    cardTable() {
        return (
            <>
                <span class="card-title">Plantios</span>

                <table>
                    <thead>
                        <tr>
                            <th>Cultura</th>
                            <th>Data semeadura</th>
                            <th>Data colheita</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>COENTRO</td>
                            <td>01/10/2020</td>
                            <td>30/11/2020</td>
                        </tr>
                        <tr>
                            <td>ALFACE</td>
                            <td>01/10/2020</td>
                            <td>15/11/2020</td>
                        </tr>
                        <tr>
                            <td>BETERRABA</td>
                            <td>01/10/2020</td>
                            <td>30/01/2021</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    paineis() {
        return (
            <>

                <div class="row"> {this.state.categorias.map(item => this.cardInformationNumber(item))} </div>
                <div class="row"> {this.cardChart()}</div>

            </>
        )
    }

    render() {

        return (
            <>
                <NavBar />
                <Sidenav />
                <div class="login forms">
                    <div class="row">
                        <div class="col s12 m3 l3" />
                        <div class="col s12 m6">
                            {this.paineis()}
                        </div>
                    </div>
                </div>

            </>)

    }


}
export default Painel;