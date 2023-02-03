import React from "react";
import {useState} from 'react';

const useListId = () => {
    const [idList, setIdList] = useState([]);
    const [moreIdList, setMoreIdList] = useState({});

    const updateListId = (films) => {
        const dataList = [];
        const id = {};
        films.forEach((data) => {
            dataList.push(data.movieId);
            id[data.movieId] = data._id;
        });

        setIdList([...dataList])

        setMoreIdList({
            ...id
        });
    }
    function myId(movieId) {
        return moreIdList[movieId];
    }
    return {idList, updateListId, myId};
}

export default useListId