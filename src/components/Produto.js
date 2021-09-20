import React from 'react'

function Produto({propriedade}){

    return (
        <div>
            <h1>{propriedade.nome}</h1>
            <h2>R${propriedade.preco}</h2>
        </div>
    )
}

export default Produto