/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';

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
      
    </div>
  );
}
