import { useCallback, useState } from "react";

const useHttp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (reqConfig, useData) => {
        setError(null);
        setIsLoading(true);
        try {
            let res = await fetch(
                reqConfig.url, {
                    method: reqConfig.method ? reqConfig.method : 'GET',
                    headers: reqConfig.headers ? reqConfig.headers : {},
                    body: reqConfig.body ? JSON.stringify(reqConfig.body) : null
                }
            );

            if (!res.ok) {
                throw new Error('Oops... Your request has failed.');
            };

            let data = await res.json();
            useData(data);
        } catch (err) {
            setError(err.message || 'Oops... Something went wrong.');
        };
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttp;