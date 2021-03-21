import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from '@firebase/app';
import 'firebase/auth';
import {cv_setUser} from '../redux/cvDataAC';

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

    //валидация
    checkerrorEmail = () => {
        let emailValue = this.state.email;
        if (String(emailValue).trim().length===0) {
            this.setState({emailValid: false,messageError: 'Enter e-mail'});
            return false;
        } else if (emailValue in this.state.userList) {
            this.setState({emailValid: false,messageError: 'This email-login is not available'});
            return false;
        }
        return true;
    }

    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value},this.validate);
    }

    validate = () => {
        //this.setState({emailValid: String(this.state.email).trim().length});
        //this.setState({passwordValid: String(this.state.password).trim().length});
    }

    createUser = (evt) => {
        evt.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                this.props.dispatch(cv_setUser(userCredential.user.email));
            })
            .catch((error) => {
                let errorEmail = (error.code.indexOf('email')===-1?'':error.message);
                let errorPassword = (error.code.indexOf('password')===-1?'':error.message);
                this.setState({emailInvalidMessage: errorEmail, passwordInvalidMessage: errorPassword});
            });
    }

    signIn = (evt) => {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                this.props.dispatch(cv_setUser(userCredential.user.email));
            })
            .catch((error) => {
                let errorEmail = (error.code.indexOf('email')===-1?'':error.message);
                let errorPassword = (error.code.indexOf('password')===-1?'':error.message);
                this.setState({emailInvalidMessage: errorEmail, passwordInvalidMessage: errorPassword});
            });
    }

    render () {
        console.log(!!this.state.emailInvalidMessage);
        return (
            <form className={'auth ' + this.props.transitionClass} name='login' onSubmit={this.onSubmit}>
                <div className={'auth__field' + (!this.state.emailInvalidMessage?'':' auth__field--error')}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' name='email' type='email' value={this.state.email} ref={(f) => this.email = f} onChange={this.onChange}/>
                    {this.state.emailInvalidMessage &&
                        <span>{this.state.emailInvalidMessage}</span>
                    }
                </div>
                <div className={'auth__field' + (!this.state.passwordInvalidMessage?'':' auth__field--error')}>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' type='password' value={this.state.password} ref={(f) => this.password = f} onChange={this.onChange}/>
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
