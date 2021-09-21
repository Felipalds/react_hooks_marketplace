import React from 'react'
import Produto from './components/Produto'

function App() {

  const [ data, setData ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(false)
  const [ carrinho, setCarrinho ] = React.useState(0) 
  const [ notificacao, setNotificacao ] = React.useState(null)

  const [ comentarios, setComentarios ] = React.useState(['Produto muito interessante!'])
  const [ input, setInput ] = React.useState('');
  const inputElement = React.useRef();
  const timeoutRef = React.useRef();


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

  function handleComents(){

    if(input.length > 0) {
      let newInput = input.replace(/\s+/g, "")
      if(newInput.length > 0) {
        setComentarios([...comentarios, input])
        setInput([])
        inputElement.current.focus();
      } else{
        alert("Digite algo!")
      }
      
    } else{
      alert("Erro")
    }
  }

  function handleCarrinho() {
    setCarrinho(carrinho + 1)
    setNotificacao("Item adicionado ao carrinho!")
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setNotificacao(null)

    }, 1000)
  }

  function limparCarrinho() {
    setCarrinho(0)
    setNotificacao("Carrinho limpo!")

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setNotificacao(null)
    }, 1000)
  }

  return (
    <div style={{textAlign:"center"}}>
      {localStorage['produto'] && <h1>Preferência: {localStorage['produto']}</h1>}
      <button onClick={handleClick}>Smartphone</button>
      <button onClick={handleClick}>Notebook</button>
      {loading && <p>Carregando...</p>}
      {!loading && data && <Produto propriedade={data}/>}
      <p id="not">{notificacao}</p>
      <button onClick={handleCarrinho}>Adicionar ao carrinho {carrinho}</button>
      <a id="hover" onClick={limparCarrinho}>Limpar carrinho</a>


      <hr />
      <ul>
        {comentarios.map((comentario, index) => <li key={index}>{comentario}</li>)}
      </ul>
      <input type="text"  
             value={input} 
             ref={inputElement}
             onKeyPress={(e) => {
              if(e.key == 'Enter') handleComents();
             }}
             onChange={({target}) => setInput(target.value)}></input>
      <button onClick={handleComents}>Enviar</button>
    </div>
  );
}

export default App;
