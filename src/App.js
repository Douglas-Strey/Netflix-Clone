import React, { useEffect, useState } from 'react';
import './App.css';

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([null]);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      // Gerar um filme aleatório dentro do Featured
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      // Agora vou pegar o filme gerado
      let chosen = originals[0].items.results[randomChosen];
      console.log(chosen);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

        {featuredData &&
            <FeaturedMovie item={featuredData} />
        }

      <section className="list">
        { movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        )) }
      </section>
    </div>
  );
}
