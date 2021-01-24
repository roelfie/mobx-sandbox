import React from 'react';
import { observer } from 'mobx-react';

const DoublerTable = observer(({ doubler }) => {
  const { value, double } = doubler;
  return (
    <table className='ui basic compact definition table'>
      <thead>
        <tr>
          <th></th>
          <th>Value</th>
          <th>MobX</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>value</td>
          <td>{value}</td>
          <td>observable</td>
        </tr>
        <tr>
          <td>double()</td>
          <td>{double}</td>
          <td>computed</td>
        </tr>
        <tr>
          <td>
            <button className='tiny ui button' onClick={() => doubler.increment()}>
              increment()
            </button>
          </td>
          <td></td>
          <td>action</td>
        </tr>
      </tbody>
    </table>
  );
});

export default DoublerTable;
