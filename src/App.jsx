import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [busca, setBusca] = useState('');

  const fetchApi = async () => {
    try {
      const response = await fetch('/Api/data.json');
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();

      const itemsData = data.map(item => {
        const powerstats = item.powerstats;
        const totalForca = Object.values(powerstats).reduce((acc, value) => acc + value, 0);
        return {
          name: item.name,
          imageUrl: item.images.xs,
          forca: totalForca
        };
      });

      setItems(itemsData);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  
  const filteredItems = items.filter(hero =>
    hero.name.toLowerCase().includes(busca.toLowerCase())
  );

  
  let [x, setX] = useState(false)

  function mudandoX(){
    setX(x = !x)
  }

  let [hero, setHero] = useState('')
  let [hero2, setHero2] = useState('')
  let [forca, setForca] = useState('')
  let [forca2, setForca2] = useState('')
  let [camp, setCamp] = useState('')


  
  
  
  let escolha = (name, forca) => {
    if(hero === '' && hero2 === ''){
      setHero(name)
      setForca(forca)
    }
    if(hero != '' && hero2 === '') {
      setHero2(name)
      setForca2(forca)
    }
    if(hero != '' && hero2 != ''){
      setHero('')
      setHero2('')
      setForca('')
    }
  
    if(forca > forca2){
      setCamp('Campeao a direita')
    }else{
      setCamp('Campeao a esquerda')
    }
  }
  
  
  

  return (
    <div className="App">
      <button onClick={mudandoX}>Cliquei aqui para ver o modal</button>
      {x && <div className='modal'>
        <div className='heroes'>{hero} - versus - {hero2} </div>
        <div className='champ'>{camp}</div>
      </div>}
      <div className='Pesquisa'>
        <input 
          value={busca} 
          onChange={(event) => setBusca(event.target.value)} 
          type="text" 
          placeholder='Pesquisar' 
        />
      </div>
      <div className="image-container">
        {filteredItems.map((item, index) => (
          <div onClick={() => escolha(item.name, item.forca)}  key={index} className="image-item">
            <div 
              style={{ 
                backgroundImage: `url(${item.imageUrl})`, 
                backgroundSize: 'cover',  
                backgroundPosition: 'center',  
                backgroundRepeat: 'no-repeat'  
              }}  
              className='img-box'>
            </div>
            <p className='HeroName'>{item.name}</p>
            <p className='HeroName'>{item.forca}</p>
            
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;