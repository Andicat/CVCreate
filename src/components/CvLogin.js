import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loader from './Loader';
import {Transition} from 'react-transition-group';
import {cv_setUser} from '../redux/cvDataAC';
import {addFirebase, loadFirebase} from './withDataLoad';
import {saveLocalStorage} from '../modules/utils';

//форма ввода логина/наименования документа
class CvLogin extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
    };

    state = {
        userName: '',
        userList: {},
        dataloaded: false,
        userNameValid: true,
        messageError: '',
    }

    //загрузим список уже существующих логинов
    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        let loadData = new Promise((resolve) => {
            loadFirebase('Data','users',resolve);
        });
        await loadData.then((data) => {
            this.setState({dataloaded: true,userList: data});
        });
    }

    //валидация логина/наименования
    checkValidName = () => {
        let nameValue = this.state.userName;
        if (String(nameValue).trim().length===0) {
            this.setState({userNameValid: false,messageError: 'Enter name'});
            return false;
        } else if (nameValue in this.state.userList) {
            this.setState({userNameValid: false,messageError: 'This name is not available'});
            return false;
        }
        return true;
    }

    //сохранение логина в localStorage и в firebase
    onSubmit = async (evt) => {
        evt.preventDefault();
        let isNameValid = this.checkValidName();
        if (isNameValid) {
            addFirebase('Data','users',this.state.userName);
            saveLocalStorage('CV',{user: this.state.userName});
            this.props.dispatch(cv_setUser(this.state.userName));
        }
    }

    onChange = (evt) => {
        this.setState({userName: evt.target.value},() => {
            if (String(this.state.userName).trim().length>0) {
                this.setState({userNameValid: true,messageError: ''});
            }
        });
    }

    render () {
        if (!this.state.dataloaded) {
            <Transition in={this.state.dataReady} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                {stateName => {
                    return <Loader transitionClass={stateName} text={'Loaded'}/>;
                }}
            </Transition>;
        }
        return (
            <form className={'cv-login ' + this.props.transitionClass + (this.state.userNameValid?'':' cv-login--error')} name='login' onSubmit={this.onSubmit}>
                <input type='text' name='name' maxLength='30' placeholder='Enter name of your CV...' value={this.state.userName} onChange={this.onChange}/>
                <button type='submit'/>
                {(!this.state.userNameValid) &&
                    <span>{this.state.messageError}</span>
                }
            </form>);
    }
}

export default connect()(CvLogin);
