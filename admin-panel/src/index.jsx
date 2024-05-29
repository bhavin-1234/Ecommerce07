import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Provider } from 'react-redux';
import { store } from './app/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)








// <React.StrictMode>
// </React.StrictMode>