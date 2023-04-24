import React, {useContext, useState} from 'react';
import styles from './AuthForm.module.css';
import Form from '../UI/Form';
import useInput from '../../hooks/use-input';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

const validateEmail = (email) => {
    return !!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// pw validation logic needs to be updated and hidden from the front end.
const validatePW = (pw) => {
    return pw !== '';
};

const AuthForm = () => {
    const {isLoading, error, sendRequest: sendLoginRequest} = useHttp();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const authCtx = useContext(AuthContext);
    let formIsValid = false;
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput(validateEmail);
    const {
        value: pwValue,
        isValid: pwIsValid,
        hasError: pwHasError,
        valueChangeHandler: pwChangeHandler,
        inputBlurHandler: pwBlurHandler,
        reset: pwReset,
    } = useInput(validatePW);

    if (emailIsValid && pwIsValid) {
        formIsValid = true;
    };

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const loginHandler = (data) => {
        authHandler(data);
        navigate("/homepage");
    };

    const signUpHandler = (data) => {
        authHandler(data);
        authCtx.toggleSignup();
        navigate("/additional-info");
    };

    const authHandler = (data) => {
        const expTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
        authCtx.login(data.idToken, data.localId, emailValue, expTime.toISOString());
        emailReset();
        pwReset();
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        };

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAs89KjyZveFkDaG1X6GDT6P-bLJ9tsDMA';
        } else {
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAs89KjyZveFkDaG1X6GDT6P-bLJ9tsDMA';
        }

        sendLoginRequest({
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: emailValue,
                password: pwValue,
                returnSecureToken: true
            }
        },
            isLogin ? loginHandler : signUpHandler
        );
    };

    let emailStyle = emailHasError ? {top: '-5px', color: 'red'} : {};
    let emailError = emailHasError ? 'Email is invalid' : '';
    let pwStyle = pwHasError ? {top: '-5px', color: 'red'} : {};
    let pwError = pwHasError ? 'Password is invalid' : '';

    return (
        <div className={styles.center}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <Form onSubmit={onSubmitHandler} className="login-form">
                <div className={styles.txt_field}>
                    <input type="email" id="email" onChange={emailChangeHandler} onBlur={emailBlurHandler} value={emailValue} required />
                    <span style={{color: 'red'}}>{emailError}</span>
                    <label style={emailStyle} htmlFor="email">Email</label>
                </div>
                <div className={styles.txt_field}>
                    <input type="password" id="password" onChange={pwChangeHandler} onBlur={pwBlurHandler} value={pwValue} required/>
                    <span style={{color: 'red'}}>{pwError}</span>
                    <label style={pwStyle} htmlFor='password'>Password</label>
                </div>
                {!isLoading && <input id={isLogin ? 'login' : 'signup'} type="submit" value={isLogin ? 'Login' : 'Sign Up'}/>}
                {isLoading && <input id={isLogin ? 'login' : 'signup'} disabled type="submit" value="Loading..."/>}
                {isLogin && <div className={styles.pass}>Forgot Password?</div>}
                <div className={styles.signup_link}>
                    {isLogin ? 'Not a member?' : 'Already a member?'} <a onClick={switchAuthModeHandler} >{isLogin ? 'Sign Up' : 'Login'}</a>
                </div>
            </Form>
        </div>
    );
};

export default AuthForm;