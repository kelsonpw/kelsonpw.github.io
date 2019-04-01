import * as React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import Loadable from 'react-loadable';
import './App.scss';

const Loader = () => (
  <div className="Loader">
    <ClimbingBoxLoader size={50} color={'#007fff'} />
  </div>
);

const AppComponent = Loadable({
  loader: () => import('./index.js'),
  loading: () => <Loader />,
});

export default AppComponent;
