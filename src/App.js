import React from 'react'
import Produto from './components/Produto'

function App() {

  const [ data, setData ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(false)

  React.useEffect(() => {
    if(data !== null) localStorage.produto = data.nome
  }, [data])

  React.useEffect(async() => {
    if(localStorage['produto']){
      checkData(localStorage['produto'])
    }    
  }, []) 

  async function checkData(product){
    setLoading(true)
    const baseURL = 'https://ranekapi.origamid.dev/json/api/produto/'
    const finalURL = baseURL +  product
    const response = await (fetch(finalURL))
    const json = await(response.json())
    setData(json)
    console.log(json)
    setLoading(false)
  }

  async function handleClick(event){
    const data = event.target.innerText
    checkData(data)
  }

  return (
    <div style={{textAlign:"center"}}>
      {localStorage['produto'] && <h1>Preferência: {localStorage['produto']}</h1>}
      <button onClick={handleClick}>Smartphone</button>
      <button onClick={handleClick}>Notebook</button>
      {loading && <p>Carregando...</p>}
      {!loading && data && <Produto propriedade={data}/>}
    </div>
  );
}

export default App;
