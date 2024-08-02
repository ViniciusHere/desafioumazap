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
          imageUrl: item.images.md,
          forca: totalForca,
          intelligence: item.powerstats.intelligence,
          strength: item.powerstats.strength,
          speed: item.powerstats.speed,
          durability: item.powerstats.durability,
          power: item.powerstats.power,
          combat: item.powerstats.combat
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

  const [x, setX] = useState(false);
  const [hero, setHero] = useState('');
  const [hero2, setHero2] = useState('');
  const [forca, setForca] = useState(0);
  const [forca2, setForca2] = useState(0);
  const [camp, setCamp] = useState('');
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const escolha = (name, forca, img) => {
    if (!hero && !hero2) {
      setHero(name);
      setForca(forca);
      setImg1(img)
      setX(false);
    } else if (hero && !hero2) {
      setHero2(name);
      setForca2(forca);
      setImg2(img)
      setX(true);
    } else {
      setHero('');
      setForca(0);
      setHero2('');
      setForca2(0);
      setX(false);
    }
  };

  useEffect(() => {
    if (hero && hero2) {
      if (forca > forca2) {
        setCamp(`O campeão é ${hero}`);
      } else {
        setCamp(`O campeão é ${hero2}`);
      }
    }
  }, [hero, hero2, forca, forca2]);

  return (
    <div className="App">
      {x && (
        <div className='modal'>
          <div className='heroes'>
            <div className='HeroProfile'>
              <img src={img1}/>
              <p>{hero}</p>
              <div className='atributos'>

              </div>
            </div>
            <div className='champ'>{camp}</div>
            <div className='HeroProfile2'>
              <img src={img2}/> 
              <p>{hero2}</p>
            </div>
               
          </div>
          
        </div>
      )}
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
          <div onClick={() => escolha(item.name, item.forca, item.imageUrl)} key={index} className="image-item">
            <div
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '200px',
                width: '200px' 
              }}
              className='img-box'
            >
            </div>
            <p className='HeroName'>{item.name}</p>
            <div className='atributes'>
              <p>{item.intelligence}</p>
              <p>{item.strength}</p>
              <p>{item.speed}</p>
              <p>{item.durability}</p>
              <p>{item.power}</p>
              <p>{item.combat}</p>;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;