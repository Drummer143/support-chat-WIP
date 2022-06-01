import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './../../redux/store';
import RoutingTree from './../RoutingTree/RoutingTree';

import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                    <RoutingTree />
                    
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                    />
            </Provider>
        </BrowserRouter>
    );
}

export default App;