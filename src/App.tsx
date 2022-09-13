
import store from './store'
import { Provider } from 'react-redux';

import './App.css';
import Todo from './components/todo/Todo';

function App() {
  return (
    <Provider store={store}>
      <Todo></Todo>
    </Provider>
  );
}

export default App;
