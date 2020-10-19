import React, { Component } from 'react';

class Contador extends Component {
    constructor() {
        super();
        
        this.state = {
            contador: 0
        }
    }

    aumentarContador = () => {
        this.setState({contador : this.state.contador+1});
    }
    
    render() {
        return (
            <div>
               
            
                <span>{this.state.contador} </span>
                <button onClick={this.aumentarContador}>+</button>
            </div>
        );
    }
}

export default Contador;