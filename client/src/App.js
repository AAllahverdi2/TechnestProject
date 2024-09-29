import './App.scss';
import 'animate.css';
import WOW from 'wow.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdi/css/materialdesignicons.min.css';
import { ROUTER } from './routes/index.routes';
import toast, { Toaster } from 'react-hot-toast';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import icon from './assets/favicon.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { DataContextProvider } from './context/context';
import zIndex from '@mui/material/styles/zIndex';
const routes = createBrowserRouter(ROUTER)


function App() {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="App">
      <DataContextProvider>
        <Helmet>
          <link rel="shortcut icon" href={icon} type="image/x-icon" />
        </Helmet>
        <RouterProvider router={routes} />

        <Toaster toastOptions={{
          style: {
            zIndex: '10000000000000000000'
          }
        }} position='bottom-left' reverseOrder={false} />

      </DataContextProvider>
    </div>
  );
}
library.add(fab, fas, far)
export default App;
