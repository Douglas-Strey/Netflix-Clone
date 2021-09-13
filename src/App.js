import React, { useEffect, useState } from 'react';
import './App.css';

import Tmdb from './api/Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState([null]);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // Pegando o Featured
            let originals = list.filter(i => i.slug === 'originals');
            // Gerar um filme aleatório dentro do Featured
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            // Agora vou pegar o filme gerado
            let chosen = originals[0].items.results[randomChosen];
            // Vou pegar os dados coletados pela função getMovieInfo
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            // Agora eu jogo a informação obtida para o featuredData
            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);

    // Fazer sumir e aparecer o background do header
    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <div className="page">
            <Header black={blackHeader} />

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className="list">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito por <a id="douglas" href="https://www.douglastrey.com.br/">Douglas Strey</a> <br />
                Direitos de imagem para <a id="Netflix" href="https://www.netflix.com">Netflix</a> <br />
                Dados coletados pela API do <a id="tmdb" href="https://www.themoviedb.org/documentation/api">TheMovieDB</a>
            </footer>

            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
                </div>
            }
        </div>
    );
}
