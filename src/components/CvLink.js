import React from 'react';
import {withRouter} from 'react-router';
import CvBlock from './CvBlock';
import {createStyle} from './utils';
import {loadFirebase} from './withDataLoad';

class CvLink extends React.PureComponent {

    state = {
        blocks: [],
        stylePage: null,
    }

    componentDidMount() {
        let linkName = this.props.match.params.linkname;
        if (linkName) {
            this.loadLink(linkName);
        }
    }

    loadLink = async (linkName) => {
        let loadTemplates = new Promise((resolve) => {
            loadFirebase('Links',linkName,resolve);
        });
        await loadTemplates.then((data) => {
            this.setState({blocks:data.blocks,stylePage:data.style});
        });
    }
    
    render () {
        if (!this.state.blocks) {
            return null;
        }
        var cvBlocksCode = this.state.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b} editable={false}></CvBlock>
        });

        return (
            <React.Fragment>
                <main className='main'>
                    <div className='cv-view'>
                        <div className='cv cv--link' style={createStyle(this.state.stylePage)}>
                            {cvBlocksCode}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
  
export default withRouter(CvLink);
