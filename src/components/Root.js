import React from 'react';

import CV from './CV';
import { withDataLoad } from './withDataLoad';

class Root extends React.PureComponent {

  fetchConfig={
    URL: "http://fe.it-academy.by/TestFetch.php",
    method: 'post',
    headers: {
        "Accept": "application/json",
    },
  };

  // HOC возвращает каждый раз НОВЫЙ, обёрнутый компонент
  // поэтому оборачивать в HOC лучше не внутри render, чтобы не рендерить каждый раз НОВЫЙ компонент
    CVWithData=withDataLoad('blocks')(CV);

  render() {

    let CVWithData = this.CVWithData;
    return <CVWithData/> ;

  }

}

export default Root;
