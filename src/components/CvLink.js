import React from 'react';
import {withRouter} from 'react-router';
import CvBlock from './CvBlock';
import {createStyle} from '../modules/utils';
import {loadFirebase} from './withDataLoad';

//отображение документ по ссылке
class CvLink extends React.PureComponent {

    state = {
        blocks: [],
        stylePage: null,
    }

    //загрузим данные по ссылке из базы при монтировании
    componentDidMount() {
        let linkName = this.props.match.params.linkname;
        if (linkName) {
            this.loadLink(linkName);
        }
    }

    //загрузка из firebase
    loadLink = async (linkName) => {
        let loadLinkData = new Promise((resolve) => {
            loadFirebase('Links',linkName,resolve);
        });
        await loadLinkData.then((data) => {
            this.setState({blocks: data.blocks,stylePage: data.style});
        });
    }

    render () {
        if (!this.state.blocks) {
            return null;
        }
        var cvBlocksCode = this.state.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b} editable={false}></CvBlock>;
        });

        return (
            <React.Fragment>
                <main className='main'>
                    <div className='cv-view cv-view-print'>
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
