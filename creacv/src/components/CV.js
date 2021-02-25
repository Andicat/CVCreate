import React from 'react';
import PropTypes from 'prop-types';

import OptionPanel from './OptionPanel';
import Action from './Action';

import TemplatePanel from './TemplatePanel';
import CVDocument from './CVDocument';

import {connect} from 'react-redux';
import {createTemplates} from './utils';
import {db} from '../App';
import {cv_load} from '../redux/cvDataAC';

class CV extends React.PureComponent {

    static propTypes = {
        stylePage: PropTypes.object,  
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.array,
        activeElementId: PropTypes.string,
    };

    state = {
        showPanel: true,
    }

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

    showPanel = () => {
        this.setState({showPanel:!this.state.showPanel});
        //this.props.dispatch(panel_show(!this.props.show));
    }
    
    render () {
        let activeOneId = (this.props.activeBlocksId.length===1) && this.props.activeBlocksId[0];
        let activeBlock = null;
        let activeElementId = null;
        if (activeOneId) {
            activeBlock = this.props.blocks.find(b => b.id === activeOneId);
            activeElementId = this.props.activeElementId;
        }

        /**
         * <Action actionName={'save'} cbOnChange={this.saveCV}></Action>
                        <Action actionName={'load'} cbOnChange={this.loadCV}></Action>
                        <Action actionName={'html'} cbOnChange={this.showHTML}></Action>
         */
        return (
            <React.Fragment>
                <header className='header'>
                    <span className='header__logo'>Create your CV</span>
                    <ul className='header__menu'>
                        <li className='header__menu-item'>
                            <button className='header__button header__button--save' onClick={this.saveCV}/>
                        </li>
                        <li className='header__menu-item'>
                            <button className='header__button header__button--load' onClick={this.loadCV}/>
                        </li>
                        <li className='header__menu-item'>
                            <button className='header__button header__button--html' onClick={this.showHTML}/>
                        </li>
                    </ul>
                </header>
                <main>
                    <aside className='template-panel'>
                        {this.state.showPanel && <TemplatePanel groups={createTemplates()}/>}
                        <button className='template-panel__button-hide' onClick={this.showPanel}/>
                    </aside>
                    <div className='desk'>
                        <OptionPanel activeBlock={activeBlock}/>
                        <CVDocument activeBlock={activeBlock} stylePage={this.props.stylePage} showPanel={this.state.showPanel}/>
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
        activeElementId: state.cvData.activeElementId,
    };
};
  
export default connect(mapStateToProps)(CV);
