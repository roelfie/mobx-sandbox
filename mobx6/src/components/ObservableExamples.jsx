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
const _d_5 = new Doubler_Class(2);
const doubler_5 = observable(_d_5, {}, { proxy: false });
const doubler_6 = observable(createDoubler(2));

/*
TODO: 
Per store een accordion introduceren met daarin:
1. tabel (bestaat al)
2. source code (verplaatsen vanuit de header)
3. Toelichting (beperkingen; pros; cons; API referentie)
*/
function ObservableExamples() {
  console.log('_d_5: ', _d_5);
  console.log('doubler_5: ', doubler_5);
  return (
    <div className='ui container' style={{ marginTop: '10px' }}>
      <div className='ui grid'>
        <DoublerView title='makeObservable (class)' store={doubler_1} />
        <DoublerView title='makeObservable (factory function)' store={doubler_2} />
        <DoublerView title='makeAutoObservable (class)' store={doubler_3} />
        <DoublerView title='makeAutoObservable (factory function)' store={doubler_4} />
        <DoublerView title='observable (class)' store={doubler_5} />
        <DoublerView title='observable (factory function)' store={doubler_6} />
      </div>
    </div>
  );
}

export default ObservableExamples;
