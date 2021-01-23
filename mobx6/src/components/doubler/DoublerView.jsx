import React from 'react';
import { observer } from 'mobx-react';
import DoublerTable from './DoublerTable';
import SourceCode from '../SourceCode';

const DoublerView = observer(
  class DoublerView extends React.Component {
    state = { sourceCodeVisible: false };

    createHeader = (title, source) => {
      return (
        <div className='ui clearing segment'>
          <div className='ui accordion' data-ol-has-click-handler=''>
            <div className='title'>
              <h4 className='ui right floated header'>
                <span className='ui black text'>{title}</span>
              </h4>
              <i
                className='code icon'
                onClick={() => this.setState({ sourceCodeVisible: !this.state.sourceCodeVisible })}
              ></i>
            </div>
            <div className={`${this.state.sourceCodeVisible ? 'active' : ''} content`}>
              <SourceCode sourcecode={source ? source : 'undefined'} />
            </div>
          </div>
        </div>
      );
    };

    render() {
      const { store, title, color } = this.props;

      return (
        <div className='eight wide column'>
          {this.createHeader(title, store.sourceCode, color)}
          <DoublerTable doubler={store} />
        </div>
      );
    }
  }
);

export default DoublerView;
