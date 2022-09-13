
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Todo from './components/todo/Todo';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

import store from './store'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
