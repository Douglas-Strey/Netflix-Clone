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
      // aqui eu utilizo o método criado a cima para exibir em tela a lista
      setMovieList(list);
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
