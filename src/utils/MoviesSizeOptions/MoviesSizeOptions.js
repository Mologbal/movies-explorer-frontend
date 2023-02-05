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
    LARGE_WIDTH_PX
} from '../../constants/constants'

const useMoviesSizeOptions = () => {
    const [allFilms, setAllFilms] = useState([]);
    const [films, setFilms] = useState([]);
    const [isMore, setIsMore] = useState(false);
    const [figure, setFigure] = useState(BASICAL_NUMBER);
    const [rowFilms, setRowFilms] = useState(BASICAL_NUMBER);
    const [argument, setArgument] = useState(BASICAL_NUMBER);

    useEffect(() => {
        const width = document.documentElement.clientWidth;
        if (width > LARGE_WIDTH_PX) {
            setRowFilms(LARGE_WIDTH_NUMBER)
            setArgument(LARGE_WIDTH_ARGUMENT)
        } else if (width >= MEDIUM_WIDTH_NUMBER_PX && width <= LARGE_WIDTH_PX) {
            setRowFilms(MEDIUM_WIDTH_NUMBER)
            setArgument(MEDIUM_WIDTH_ARGUMENT)
        } else if (width < MEDIUM_WIDTH_NUMBER_PX) {
            setRowFilms(SMALL_WIDTH_NUMBER)
            setArgument(SMALL_WIDTH_ARGUMENT)
        }
    }, [allFilms])

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