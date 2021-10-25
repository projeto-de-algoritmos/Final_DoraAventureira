import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { IHeaderProps, IHeaderState } from "../../interface/interfaces";

import "./ferramentas.css";

export default class Header extends Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            speedValue: "Fast",
            algoValue: "Dijkstra",
            mazeValue: "No Maze",
            showHelpModal: false,
        };
    }
    onSpeedChangeHandler = (e: any) => {
        if (e.target && e.target.value) {
            this.props.changeSpeed(e.target.value);
            this.setState({ speedValue: e.target.value });
        }
    };
    onAlgoChangeHandler = (e: any) => {
        if (e.target && e.target.value) {
            this.props.changeAlgo(e.target.value);
            this.setState({ algoValue: e.target.value });
        }
    };

    toggleShowModal = () => {
        this.setState({ showHelpModal: !this.state.showHelpModal });
    };
    render() {
        return (
            <div className="nav">
                <Navbar
                    expand="lg"
                    bg="light"
                    variant="light"
                    className="flex-column border nav__navContainer"
                >
                    
                    <div className="selectorMenu">
                        <select
                            disabled={this.props.visualized}
                            onChange={this.onSpeedChangeHandler}
                            value={this.state.speedValue}
                        >
                            <option value="Slow">De vagar</option>
                            <option value="Average">Mediano</option>
                            <option value="Fast">Rápido</option>
                        </select>
                        <select
                            disabled={this.props.visualized}
                            onChange={this.onAlgoChangeHandler}
                            value={this.state.algoValue}
                        >
                            <option value="Dijkstra">Dijkstra</option>
                            <option value="DFS">DFS</option>
                        </select>

                        <Button
                            className="visualize-it-button"
                            onClick={this.props.visualize}
                            disabled={this.props.visualized}
                        >
                            Visualizar
                        </Button>
                        <Button
                            className="non-visualize-button"
                            onClick={this.props.changeWeights}
                            disabled={this.props.visualized}
                        >
                            Novos Pesos
                        </Button>
                        <Button
                            className="non-visualize-button"
                            onClick={this.props.clearBoard}
                            disabled={this.props.visualized}
                        >
                            Nova Tabela
                        </Button>
                    </div>
                    <div className="nav__footer">
                    </div>
                </Navbar>
            </div>
        );
    }
}
