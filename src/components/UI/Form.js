import React from 'react';
const Form = (props) => {
    return (
        <form onSubmit={props.onSubmit} className="login-form">
            {props.children}
        </form>
    );
};

export default Form;