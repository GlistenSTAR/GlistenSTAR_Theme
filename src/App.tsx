import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home'
import Users from './components/Auth/User'

import store from './store'

import './App.css'

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/:id" element={<Users />} />
      </Routes>
    </BrowserRouter>
  </Provider>

);

export default App
