import React, { Component } from 'react';

class Hola extends Component {
    render() {
        return (
            // DEADVID
            // qué es este this.props?
            // se refiere al string que puede haber dentro de un h1?
            // qué es el this.state?, he leído pero no me entero
            <h1> {this.props.nombre === 'César' ? `Ave ${this.props.nombre}` : 'Tú no eres César'}</h1>
        )
    }
}

export default Hola;