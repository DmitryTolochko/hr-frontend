import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import LoginPan from '../components/LoginPan';

class Login extends React.Component {
    render () {
        return (
            <div>
                <LoginPan/>
            </div>
        )
    }
}

export default Login;