import React from 'react';
import PropTypes from 'prop-types';

import OptionPanel from './OptionPanel';
import Action from './Action';

import Panel from './Panel';
import CVDocument from './CVDocument';

import {connect} from 'react-redux';
import {createStyle, createTemplates} from './utils';
import {db} from '../App';
import {cv_load} from '../redux/cvDataAC';

class CV extends React.PureComponent {

    static propTypes = {
        stylePage: PropTypes.object,  
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.array,
        activeElementId: PropTypes.string,
    };

    saveCV = () => {
        let stateToSave = {style:this.props.stylePage,blocks:this.props.blocks};
        db.collection("CV").doc('Katya').set(stateToSave)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    loadCV = () => {
        let loadDoc = new Promise((resolve) => {
            db.collection("CV").doc('Katya').get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                    resolve(doc.data());
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        });
        loadDoc.then((data) => { 
            this.props.dispatch(cv_load(data.blocks,data.style));
        });
    }

    showHTML = () => {

    }
    
    render () {
        let activeOneId = (this.props.activeBlocksId.length===1) && this.props.activeBlocksId[0];
        let activeBlock = null;
        let activeElementId = null;
        if (activeOneId) {
            activeBlock = this.props.blocks.find(b => b.id === activeOneId);
            activeElementId = this.props.activeElementId;
        }
        return (
            <React.Fragment>
                <header className='header'>
                    <span className='header__logo'>Create your CV</span>
                    <div className='header__menu'>
                        <Action actionName={'save'} cbOnChange={this.saveCV}></Action>
                        <Action actionName={'load'} cbOnChange={this.loadCV}></Action>
                        <Action actionName={'html'} cbOnChange={this.showHTML}></Action>
                    </div>
                </header>
                <main>
                    <Panel groups={createTemplates()}/>
                    <div className='desk'>
                        <OptionPanel activeBlock={activeBlock}/>
                        <CVDocument activeBlock={activeBlock} stylePage={this.props.stylePage}/>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        stylePage: state.cvData.stylePage,
        blocks: state.cvData.blocks,
        activeBlocksId: state.cvData.activeBlocksId,
        activeElementId: state.cvData.activeElementId
        //cvData: state.cvData,
    };
};
  
export default connect(mapStateToProps)(CV);
