import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from '@env';

export const axiosConfig = {
    baseURL: BASE_URL,
    headers: { "x-app-id": "APP" },
};

const axiosClientInstance = axios.create(axiosConfig);
const axiosServerInstance = axios.create(axiosConfig);

export { axiosClientInstance, axiosServerInstance };

const asyncFetchApi = async (path, opts, callBack) => {
    const url = path;

    return await axiosClientInstance({
        url,
        ...opts,
    })
        .then((res) => {
            // console.log("url ", url);
            if (callBack) {
                callBack(res.data);
            }
            return { error: null, data: res.data };
        })
        .catch((error) => {
            return { error: error, data: null };
        });
};

export { asyncFetchApi };

const fetchApiEffect = (path, opts, depts = []) => {
    const [response, setResponse] = useState({
        error: null,
        data: null,
        loading: true,
    });

    const url = path;
    // console.log("url ", url);
    useEffect(() => {
        setResponse((prevResponse) => ({ ...prevResponse, loading: true }));
        axiosClientInstance({
            url,
            ...opts,
        })
            .then(({ data }) => {
                setResponse({ ...response, loading: false, data: data });
            })
            .catch((error) => {
                setResponse({ ...response, loading: false, error: error });
            });
    }, depts);

    return response;
};

export { fetchApiEffect };
