import React, { useEffect, useCallback, useState } from 'react';

// global variable for our automatic logout
let logoutTimer;

const AuthContext = React.createContext({
    authToken: '',
    userId: '',
    userEmail: '',
    isSignUp: false,
    isAuthenticated: false,
    toggleSignup: () => {},
    login: (token) => {},
    logout: () => {}
});

// calculates the remaining session time
const calcSessionTime = (expTime) => {
    const curTime = new Date().getTime();
    const adjTime = new Date(expTime).getTime();

    const remTime = adjTime - curTime;
    return remTime;
};

// method for getting stored session data from localstorage in browser.
const getStoredSessionData = () => {
    const storedAuthToken = localStorage.getItem('authToken');
    const storedSessionDur = localStorage.getItem('sessionDuration');
    const storedUserId = localStorage.getItem('userId');

    const sessionTime = calcSessionTime(storedSessionDur);
    if (sessionTime <= 3600) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('sessionDuration');
        localStorage.removeItem('userId');
        return null;
    };
    return {
        authToken: storedAuthToken,
        sessionDuration: sessionTime,
        userId: storedUserId,
    };
};

export const AuthContextProvider = props => {
    const sessionData = getStoredSessionData();
    let initialToken;
    if (sessionData) {
        initialToken = sessionData.authToken;
    };
    const [authToken, setAuthToken] = useState(initialToken);
    const [userId, setUserId] = useState();
    const [userEmail, setUserEmail] = useState();
    const userIsAuthenticated = !!authToken;
    const [isSignUp, setIsSignUp] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const logoutHandler = useCallback(() => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('sessionDuration');
        localStorage.removeItem('userId');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        };
    }, []);

    const loginHandler = useCallback((authToken, uID, emailValue, sessionExpiration) => {
        setAuthToken(authToken);
        setUserId(uID);
        setUserEmail(emailValue);

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userId', uID);
        localStorage.setItem('sessionDuration', sessionExpiration);

        const sessionTime = calcSessionTime(sessionExpiration);
        logoutTimer = setTimeout(logoutHandler, sessionTime);
    });

    const toggleSignupHandler = () => {
        setIsSignUp((prevState) => !prevState);
    };

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'));
        }
        if (sessionData) {
            logoutTimer = setTimeout(logoutHandler, sessionData.sessionDuration);
        }
    }, [sessionData, logoutHandler]);

    const ctxValue = {
        authToken: authToken,
        userId: userId,
        userEmail: userEmail,
        isAuthenticated: userIsAuthenticated,
        isSignUp: isSignUp,
        toggleSignup: toggleSignupHandler,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={ctxValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;