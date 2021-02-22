import React from 'react';
import PropTypes from 'prop-types';

import CvBlock from './CvBlock';
import Transform from './Transform';
import OptionPanel from './OptionPanel';
import Option from './Option';
import Action from './Action';
import {CV_ID} from './utils';
import {cvBlock_activate} from '../redux/cvDataAC';

import {connect} from 'react-redux';
import {createStyle} from './utils';
import {db} from '../index';
import {cv_load} from '../redux/cvDataAC';

class CV extends React.PureComponent {

    static propTypes = {
        stylePage: PropTypes.object,  
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.array,
        activeElementId: PropTypes.string,
        //cvData: PropTypes.object,
    };

    onClick = (evt) => {
        if (evt.target.className==='cv') {
            this.props.dispatch(cvBlock_activate(null,null));
        };
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
    
    render () {
        console.log('render cv', this.props.blocks);
        let style = createStyle(this.props.stylePage);
        let activeOneId = (this.props.activeBlocksId.length===1) && this.props.activeBlocksId[0];
        let activeBlock = null;
        let activeElementId = null;
        let codeOptions = null;
        if (activeOneId) {
            activeBlock = this.props.blocks.find(b => b.id === activeOneId);
            activeElementId = this.props.activeElementId;
        }
        var cvBlocksCode = this.props.blocks.map( b => {
            let activeIndex = this.props.activeBlocksId.findIndex(ab => ab===b.id);
            return <CvBlock key={b.id} id={b.id} data={b} activeIndex={activeIndex} activeElementId={activeIndex>=0?activeElementId:null}></CvBlock>
        });
        if (this.props.stylePage) {
            codeOptions = Object.keys(this.props.stylePage).map( (s,i) => (
                <Option key={i} optionName={s} optionValue={this.props.stylePage[s]} blockId={CV_ID}/>));
        }
        
        return (
            <div className='desk'>
                <form className='options options__cv'>
                {codeOptions}
                <Action actionName={'save'} cbOnChange={this.saveCV}></Action>
                <Action actionName={'load'} cbOnChange={this.loadCV}></Action>
                <Action actionName={'html'} cbOnChange={this.showHTML}></Action>
            </form>
                <OptionPanel block={activeBlock}></OptionPanel>
                {activeBlock && <Transform block={activeBlock}></Transform>}
                <div className='cv' style={style} onClick={this.onClick}>
                    {cvBlocksCode}
                </div>
            </div>
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
