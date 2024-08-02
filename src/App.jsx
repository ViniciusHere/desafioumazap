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
      
      const itemsData = data.map(item => ({
        name: item.name,
        imageUrl: item.images.xs
      }));
      setItems(itemsData);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Aplica o filtro
  const filteredItems = items.filter(hero =>
    hero.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="App">
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
          <div key={index} className="image-item">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;