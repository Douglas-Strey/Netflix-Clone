import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';

export default () => {

  const [movieList, setMovieList] = useState([]);

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
      <section className="list">
        { movieList.map((item, key) => (
          <MovieRow key={key} />
        )) }
      </section>
    </div>
  );
}
