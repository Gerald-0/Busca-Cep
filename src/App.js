import {useState} from 'react';
import { BiMap } from "react-icons/bi";
import './style.css';
import api from './services/api'


function App() {

  const [input,setInput] = useState('')

  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input ===  ''){
      alert('preencha algum cep !')
      return;
    }
    try {
      const response = await api.get(`${input}/json`); 
      setCep(response.data);
      setInput("")

    } catch {
      alert("Erro")
      setInput("")
    }
  }
//BiMap
  return (
    <div className="container">
      <h1 className="title">Busca de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..."
        values={input}
        onChange={(e)  => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <BiMap size={25} color='#000'/>
        </button>
      
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento : {cep.complemento}</span>
          <span>Bairro : {cep.bairro}</span>
          <span>Localidade : {cep.localidade}</span>
        </main>
      )}

    </div>
  );
}

export default App;
