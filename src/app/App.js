import React from 'react';
import AppContext from './AppContext';
import Provider from 'react-redux/es/components/Provider';

import {Auth} from './auth';
import store from './store';

import history from '../@history';
import {Router} from 'react-router-dom';

//import './App.css';

function App() {
  return (
      <AppContext.Provider
      value={{
          //routes
      }}  >
            <Provider store={store}>
                    <Auth>
                        <Router history={history}>


                        </Router>
                    </Auth>
            </Provider>
  </AppContext.Provider>
  );
}

export default App;
