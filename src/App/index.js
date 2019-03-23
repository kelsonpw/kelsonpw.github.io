import * as React from 'react';
import Loadable from 'react-loadable';

const AppComponent = Loadable({
  loader: () => import('./App'),
  loading: () => <h3>Loading...</h3>,
});

export default AppComponent;
