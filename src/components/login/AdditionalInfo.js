import React, { useContext } from 'react';
import Form from '../UI/Form';
import styles from './AdditionalInfo.module.css';
import useInput from '../../hooks/use-input';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';

const validateText = (text) => {
    return text !== '';
};

const AdditionalInfo = () => {
    const {isLoading, error, sendRequest: updateUserProfile} = useHttp();
    const authCtx = useContext(AuthContext);
    let formIsValid = false;
    const navigate = useNavigate();
    const {
        value: fNameValue,
        isValid: fNameIsValid,
        hasError: fNameHasError,
        valueChangeHandler: fNameChangeHandler,
        inputBlurHandler: fNameBlurHandler,
        reset: fNameReset
    } = useInput(validateText);
    const {
        value: lNameValue,
        isValid: lNameIsValid,
        hasError: lNameHasError,
        valueChangeHandler: lNameChangeHandler,
        inputBlurHandler: lNameBlurHandler,
        reset: lNameReset
    } = useInput(validateText);

    if (fNameIsValid && lNameIsValid) {
        formIsValid = true;
    };

    const sendUserInformationHandler = (data) => {
        authCtx.toggleSignup();
        fNameReset();
        lNameReset();
        navigate("/homepage");
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            console.log('form not valid');
            return;
        };

        let uID = authCtx.userId;
        if (uID === undefined) {
            uID = localStorage.getItem('userId');
        }

        updateUserProfile({
            url: `https://react-http-fbc53-default-rtdb.firebaseio.com/users/${uID}.json`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                firstName: fNameValue,
                lastName: lNameValue,
                email: authCtx.userEmail,
                isAdmin: false,
            }
        },
            sendUserInformationHandler // UpdateUserProfile not being hit
        );
    };

    let fNameStyle = fNameHasError ? {top: '-5px', color: 'red'} : {};
    let fNameError = fNameHasError ? 'First Name is invalid' : '';
    let lNameStyle = lNameHasError ? {top: '-5px', color: 'red'} : {};
    let lNameError = lNameHasError ? 'Last Name is invalid' : '';

    return (
        <div className={styles.center}>
            <h1>Tell us about yourself.</h1>
            <Form onSubmit={onSubmitHandler} className="additional-info-form">
                <div className={styles.txt_field}>
                    <input type="text" id="first-name" onChange={fNameChangeHandler} onBlur={fNameBlurHandler} value={fNameValue} required/>                    <span />
                    <span style={{color: 'red'}}>{fNameError}</span>
                    <label style={fNameStyle} htmlFor='first-name'>First Name</label>
                </div>
                <div className={styles.txt_field}>
                    <input type="text" id="last-name" onChange={lNameChangeHandler} onBlur={lNameBlurHandler} value={lNameValue} required/>
                    <span style={{color: 'red'}}>{lNameError}</span>
                    <label style={lNameStyle} htmlFor='last-name'>Last Name</label>
                </div>
                {!isLoading && <input id="submit" type="submit" value="submit"/>}
                {isLoading && <input id="submit" disabled type="submit" value="Loading..."/>}
            </Form>
        </div>
    );
};

export default AdditionalInfo;