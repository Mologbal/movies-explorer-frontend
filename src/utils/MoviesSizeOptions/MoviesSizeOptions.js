import React from 'react';
import {useEffect, useState} from 'react';

const useMoviesSizeOptions = () => {
    const [allFilms, setAllFilms] = useState([]);
    const [films, setFilms] = useState([]);
    const [isMore, setIsMore] = useState(false);
    const [figure, setFigure] = useState(0);
    const [rowFilms, setRowFilms] = useState(3);

    const usePageSizeOptions = () => {
        const [pageSize, setPageSize] = useState(
            {large: false, medium: false, small: false}
        );

        useEffect(() => {
            function handleMedia() {
                setPageSize({
                    large: window
                        .matchMedia('(min-width: 1280px)')
                        .matches,
                    medium: window
                        .matchMedia('(min-width: 768px) and (max-width: 1279px)')
                        .matches,
                    small: window
                        .matchMedia('(max-width: 767px)')
                        .matches
                })
            }
            window.addEventListener('resize', handleMedia);
            handleMedia();
            return() => {
                window.removeEventListener('resize', handleMedia);
            }
        }, [])
        return {pageSize};
    }

    useEffect(() => {
        setIsMore(figure < allFilms.length);
    }, [setIsMore, figure, allFilms]);

    const startSearch = (item) => {
        setFigure(rowFilms);
        setAllFilms([...item]);
        setFilms([...item.slice(0, rowFilms)]);
    };

    const wantMore = () => {
        setFilms([
            ...films,
            ...allFilms.slice(figure, (figure + rowFilms))
        ]);
        setFigure(figure + rowFilms);
    }

    useEffect(() => {
        if (usePageSizeOptions.large) 
            setRowFilms(3);
        else if (usePageSizeOptions.medium) 
            setRowFilms(2);
        else if (usePageSizeOptions.small) 
            setRowFilms(1);
        }
    , [usePageSizeOptions])

    return {films, isMore, startSearch, wantMore};
};

export default useMoviesSizeOptions