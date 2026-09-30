import {createRoot} from 'react-dom/client';
import {IconContext} from '@phosphor-icons/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <IconContext.Provider value={{weight: 'light'}}>
    <App />
  </IconContext.Provider>,
);
