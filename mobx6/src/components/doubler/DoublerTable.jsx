import React from 'react';
import { observer } from 'mobx-react';

const DoublerTable = observer(({ doubler }) => {
  const { value, double } = doubler;
  return (
    <table className='ui celled table'>
      <thead>
        <tr>
          <th>Property</th>
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
          <td>increment()</td>
          <td>
            <button className='tiny ui button' onClick={() => doubler.increment()}>
              Increment
            </button>
          </td>
          <td>action</td>
        </tr>
      </tbody>
    </table>
  );
});

export default DoublerTable;
