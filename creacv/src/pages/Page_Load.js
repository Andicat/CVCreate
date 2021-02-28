import React from 'react';
import {withRouter} from 'react-router';

class Page_Load extends React.PureComponent {

    componentWillMount() {
        setTimeout(this.open,2000);
    }

    open = () => {
        this.props.history.push('/cv');
    }
          
    render() {
        return (
            <div>
                <h1>загрузка данных</h1>
            </div>
        );
    }

}
    
export default withRouter(Page_Load);
    