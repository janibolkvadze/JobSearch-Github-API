import React from 'react';
import './App.css';
import { Row, Col } from 'reactstrap';

import Header from './components/header/header';
import Search from './components/search/search';

import { BrowserRouter, Route } from 'react-router-dom';

import JobOffer from './components/jobOffer';

import {Provider} from 'react-redux';
import store from './store/store';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <div>
          
        <Header />
          <Row>
        <Col lg={2} md="hidden">
        </Col>
          
          <Col lg={8} md="12">

            
            <Search />
            <Route path="/job-offer/:id" component={JobOffer} />

          </Col>
          </Row>
        </div>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
