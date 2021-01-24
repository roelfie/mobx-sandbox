import React from 'react';
import { observer } from 'mobx-react';
import DoublerTable from './DoublerTable';
import SourceCode from '../SourceCode';
import Accordion from '../Accordion';

const DoublerView = observer(
  class DoublerView extends React.Component {
    renderMoreInfo(infos) {
      const renderedInfos = infos.map((info) => {
        return <li dangerouslySetInnerHTML={{ __html: info }} />;
      });
      return <ul>{renderedInfos}</ul>;
    }

    render() {
      const { store, title, index } = this.props;

      return (
        <div className='eight wide column'>
          <h3 className='ui primary dividing header' style={{ marginTop: '15px' }}>
            Example {index}
            <div className='sub header' style={{ marginTop: '5px' }}>
              {title}
            </div>
          </h3>

          <Accordion>
            <div title='Example'>
              <DoublerTable doubler={store} />
            </div>
            <div title='Source code'>
              <SourceCode sourcecode={store.sourceCode ? store.sourceCode : 'undefined'} />
            </div>
            <div title='Information'>{this.renderMoreInfo(store.moreInfo ? store.moreInfo : [])}</div>
          </Accordion>
        </div>
      );
    }
  }
);

export default DoublerView;
