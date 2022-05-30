import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './../../redux/store';

import RoutingTree from './../RoutingTree/RoutingTree';

import styles from './App.module.css'

function App() {
    console.log(process.env)
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div>
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
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;