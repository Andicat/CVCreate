import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Loader from './Loader';
import {Transition} from "react-transition-group";

import {cv_setUser} from '../redux/cvDataAC';
import {addFirebase, loadFirebase} from './withDataLoad';
import {saveLocalStorage} from './utils';

class CvLogin extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
    };

    state = {
        userName: null,
        userList: {},
        dataloaded: false,
        userNameValid: true,
        messageError: '',
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        let loadData = new Promise((resolve) => {
            loadFirebase('Data','users',resolve);
        });
        await loadData.then((data) => {
            this.setState({dataloaded:true,userList:data})
        });
    }

    saveData = async (data) => {
        let addData = new Promise((resolve) => {
            addFirebase('Data','users',data,resolve);
        });
        await addData.then(() => {
            this.setState({userNameValid:true,messageError:''});
            saveLocalStorage('CV',{user:data});
            this.props.dispatch(cv_setUser(data));
        });    
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        let nameValue = this.name.value;
        if (String(nameValue).trim().length===0) {
            this.setState({userNameValid:false,messageError:'Enter name'});
            this.name.focus();
            return;
        } else if (nameValue in this.state.userList) {
            this.setState({userNameValid:false,messageError:'This name is not available'});
            this.name.focus();
        } else {
            this.saveData(this.name.value);
        }
    }

    onChange = (evt) => {
        let nameValue = this.name.value;
        if (String(nameValue).trim().length>0) {
            this.setState({userNameValid:true,messageError:''});
            evt.preventDefault();
            return;
        }
    }
    
    render () {
        if (!this.state.dataloaded) {
            <Transition in={this.state.dataReady} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                {stateName => {
                    return <Loader transitionClass={stateName} text={'Loaded'}/>
                }}
            </Transition>;
        }
        return  <form className={"cv__login "  + this.props.transitionClass + (this.state.userNameValid?'':' cv__login--error')} name="login" onSubmit={this.onSubmit}>
                    <input type="text" name="name" maxLength="30" placeholder="Enter name of your CV..." ref={(f) => this.name = f} onChange={this.onChange}/>
                    <button type='submit'/>
                    {(!this.state.userNameValid) &&    
                        <span>{this.state.messageError}</span>
                    }
                </form>    
    }
}
  
export default connect()(CvLogin);
