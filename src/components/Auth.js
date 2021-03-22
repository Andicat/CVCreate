import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from '@firebase/app';
import 'firebase/auth';

import {saveLocalStorage} from '../modules/utils';
import {cv_setUser} from '../redux/cvDataAC';

const EMAIL_PATTERN= new RegExp('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})', 'i');

//форма аутентификации
class Auth extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
    };

    state = {
        email: '',
        password: '',
        emailInvalidMessage: '',
        passwordInvalidMessage: '',
    }

    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value},() => {
            if (this.state.emailInvalidMessage || this.state.passwordInvalidMessage) {
                this.validate();
            };
        });
    }

    //валидация
    validate = () => {
        let emailValid = EMAIL_PATTERN.test(String(this.state.email).trim());
        let passwordValid = String(this.state.password).trim().length>=6;
        this.setState({emailInvalidMessage: emailValid?'':'Invalid e-mail', passwordInvalidMessage: passwordValid?'':'Password should be minimum 6 characters'});
        return emailValid && passwordValid;
    }

    setError = (error) => {
        switch (error) {
        case 'auth/user-not-found':
            this.setState({emailInvalidMessage: 'User not found'});
            break;
        case 'auth/wrong-password':
            this.setState({passwordInvalidMessage: 'Wrong password'});
            break;
        case 'auth/too-many-requests':
            this.setState({passwordInvalidMessage: 'Too many request. Please try later'});
            break;
        default:
        }
    }

    createUser = (evt) => {
        evt.preventDefault();
        if (this.validate()) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredential) => {
                    saveLocalStorage('CV-user',{user: userCredential.user});
                    this.props.dispatch(cv_setUser(userCredential.user.email));
                })
                .catch((error) => {
                    this.setError(error.code);
                });
        }
    }

    signIn = (evt) => {
        evt.preventDefault();
        if (this.validate()) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredential) => {
                    saveLocalStorage('CV-user',{user: userCredential.user});
                    this.props.dispatch(cv_setUser(userCredential.user.email));
                })
                .catch((error) => {
                    this.setError(error.code);
                });
        }
    }

    render () {
        return (
            <form className={'auth ' + this.props.transitionClass} name='login' onSubmit={this.signIn}>
                <div className={'auth__field' + (!this.state.emailInvalidMessage?'':' auth__field--error')}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' name='email' type='email' value={this.state.email} onChange={this.onChange}/>
                    {this.state.emailInvalidMessage &&
                        <span>{this.state.emailInvalidMessage}</span>
                    }
                </div>
                <div className={'auth__field' + (!this.state.passwordInvalidMessage?'':' auth__field--error')}>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' type='password' value={this.state.password} onChange={this.onChange}/>
                    {this.state.passwordInvalidMessage &&
                        <span>{this.state.passwordInvalidMessage}</span>
                    }
                </div>
                <div className='auth__row'>
                    <button className='auth__login' onClick={this.signIn}>Sign in</button>
                    <button className='auth__register' onClick={this.createUser}>Registration</button>
                </div>
            </form>
        );
    }
}

export default connect()(Auth);
