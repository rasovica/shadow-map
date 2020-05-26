import {useEffect, useState} from "react";

import {API_BASE} from "../util/config";
import {ApiRequest} from "../interfaces/api";


export const useApi: ApiRequest = ({location, method, query}) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(API_BASE + location + (query !== undefined ? '?' + new URLSearchParams(query) : ''), {
            method,
        })
            .then(r => r.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch(setError)

    }, []);

    return {error, data, isLoading};
};
