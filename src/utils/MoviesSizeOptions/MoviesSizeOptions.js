import React from 'react';
import {useEffect, useState} from 'react';
import {
    BASICAL_NUMBER,
    LARGE_WIDTH_NUMBER,
    LARGE_WIDTH_ARGUMENT,
    MEDIUM_WIDTH_NUMBER,
    MEDIUM_WIDTH_ARGUMENT,
    SMALL_WIDTH_NUMBER,
    SMALL_WIDTH_ARGUMENT,
    MEDIUM_WIDTH_NUMBER_PX,
    LARGE_WIDTH_PX,
    SMALL_WIDTH_NUMBER_PX,
    MEGA_SMALL_WIDTH_NUMBER_PX
} from '../../constants/constants'

const useMoviesSizeOptions = () => {
    const [allFilms, setAllFilms] = useState([]);
    const [films, setFilms] = useState([]);
    const [isMore, setIsMore] = useState(false);
    const [figure, setFigure] = useState(BASICAL_NUMBER);
    const [rowFilms, setRowFilms] = useState(BASICAL_NUMBER);
    const [argument, setArgument] = useState(BASICAL_NUMBER);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    function handleResize()  {
        const width = document.documentElement.clientWidth;
        if (width > 768) {
            setRowFilms(12)
            setArgument(9)
        } else if (width > 420 && width <= 768) {
            setRowFilms(8)
            setArgument(6)
        } else if (width <= 420) {
            setRowFilms(5)
            setArgument(3)
        }
    }

    function checkWindowWidth() {
        setWindowWidth(window.innerWidth)
    }

      useEffect(() => {
        window.addEventListener('resize', checkWindowWidth)
        handleResize()
      }, [windowWidth])


    useEffect(() => {
        setIsMore(figure < allFilms.length);
    }, [setIsMore, figure, allFilms]);

    const startSearch = (item) => {
        setFigure(rowFilms);
        setAllFilms([...item]);
        setFilms([...item.slice(BASICAL_NUMBER, rowFilms)]);
    };

    const wantMore = () => {
        setFilms([
            ...films,
            ...allFilms.slice(figure, (figure + (rowFilms - argument)))
        ]);
        setFigure(figure + rowFilms);
    }

    return {films, isMore, startSearch, wantMore};
};

export default useMoviesSizeOptions