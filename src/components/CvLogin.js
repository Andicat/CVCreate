import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loader from './Loader';
import {Transition} from "react-transition-group";


import CvBlock from './CvBlock';
import {createStyle} from './utils';
import {addFirebase, loadFirebase} from './withDataLoad';

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
            addFirebase('Data','users',data);
        });
        await addData.then((data) => {
            this.setState({userNameValid:true,messageError:''});
            
        });
    
        
    }
    

    onSubmit = (evt) => {
        evt.preventDefault();
        let nameValue = this.name.value;
        if (String(nameValue).trim().length===0) {
            this.setState({userNameValid:false,messageError:'Enter your name'});
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
        return  <form class={"cv__login "  + this.props.transitionClass + (this.state.userNameValid?'':' cv__login--error')} name="login" onSubmit={this.onSubmit}>
                    <input type="text" name="name" maxlength="30" placeholder="Your name..." ref={(f) => this.name = f} onChange={this.onChange}/>
                    <button type='submit'/>
                    {(!this.state.userNameValid) &&    
                        <span>{this.state.messageError}</span>
                    }
                </form>    
    }
}
  
export default withRouter(CvLogin);
