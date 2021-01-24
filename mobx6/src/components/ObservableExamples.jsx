import React from 'react';
import { observable } from 'mobx';

import DoublerView from './doubler/DoublerView';

// makeObservable
import Doubler_Class_MakeObservable from '../stores/doublers/Doubler_Class_MakeObservable';
import Doubler_Class_MakeAutoObservable from '../stores/doublers/Doubler_Class_MakeAutoObservable';
// makeAutoObservable
import doubler_FactoryFunction_MakeObservable from '../stores/doublers/Doubler_FactoryFunction_MakeObservable';
import doubler_FactoryFunction_MakeAutoObservable from '../stores/doublers/Doubler_FactoryFunction_MakeAutoObservable';
// observable
import Doubler_Class from '../stores/doublers/Doubler_Class';
import createDoubler from '../stores/doublers/Doubler_FactoryFunction';

const doubler_1 = new Doubler_Class_MakeObservable(2);
const doubler_2 = doubler_FactoryFunction_MakeObservable(2);
const doubler_3 = new Doubler_Class_MakeAutoObservable(2);
const doubler_4 = doubler_FactoryFunction_MakeAutoObservable(2);
const doubler_5 = observable(new Doubler_Class(2), {}, { proxy: false });
const doubler_6 = observable(createDoubler(2));

const examples = [
  { title: 'makeObservable (class)', store: doubler_1 },
  { title: 'makeObservable (factory function)', store: doubler_2 },
  { title: 'makeAutoObservable (class)', store: doubler_3 },
  { title: 'makeAutoObservable (factory function)', store: doubler_4 },
  { title: "observable (class) -- DOESN'T WORK", store: doubler_5 },
  { title: 'observable (factory function)', store: doubler_6 }
];

function renderIntro() {
  return (
    <div className='ui segment'>
      There are many ways to make a JavaScript object <i>observable</i>. <br />
      The examples below are based on the <i>Doubler</i> from the &nbsp;
      <a href='https://mobx.js.org/observable-state.html' target='_new'>
        MobX 6 documentation
      </a>
      . <br />
      The Doubler is a store with the following properties and functions:
      <table className='ui very basic compact collapsing table' style={{ paddingLeft: '20px' }}>
        <tbody>
          <tr>
            <td>
              <code>value</code>
            </td>
            <td className='right aligned'>observable</td>
          </tr>
          <tr>
            <td>
              <code>get double()</code>
            </td>
            <td className='right aligned'>computed</td>
          </tr>
          <tr>
            <td>
              <code>increment()</code>
            </td>
            <td className='right aligned'>action</td>
          </tr>
        </tbody>
      </table>
      Each example illustrates a different way to define the Doubler and make it observable with MobX.
    </div>
  );
}

function renderExamples() {
  const renderedExamples = examples.map((example, ix) => {
    return <DoublerView title={example.title} store={example.store} key={ix} index={ix + 1} />;
  });
  return renderedExamples;
}

function ObservableExamples() {
  return (
    <div className='ui container' style={{ marginTop: '10px' }}>
      <h2 className='ui header'>Observables</h2>
      {renderIntro()}
      <div className='ui grid'>{renderExamples()}</div>
    </div>
  );
}

export default ObservableExamples;
