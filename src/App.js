import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeacturedMovie from './components/FeaturedMovie';
import Header from './components/index';
function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false);
  
  useEffect (()=>{
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomList();
      setMovieList(list);

      //Filme em destaque
      let originais = list.filter(i=>i.slug === 'originais');
      let randomChosen = Math.floor(Math.random() * (originais[0].items.results.length -1 ));
      let chosen = originais[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
     
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() =>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }
      else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return()=>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    
   <div className="page">
     <Header black = {blackHeader} />
     {featuredData && 
      <FeacturedMovie item={featuredData}/>
     }
     
      <section className="lists">
        {
          movieList.map((item, key)=>(
            
              <MovieRow key={`mov-'${key}`} 
              title={item.title} 
              items={item.items}
              />
            
          ))
        }
       
      </section>
      <footer style={{
          width: '100%', 
          textAlign: 'center'}}
          >
          Feito com <span role="img" aria-label="coracao">❤️</span><br />
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </footer>

        {movieList.length <= 0 &&
            <div className="loading">

            <img src="./Netflix_LoadTime.gif"/>
  
          </div>
        }
      
   </div>
  );
}

export default App;
