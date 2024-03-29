import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import App from './App/layout/App'
import { StoreContext, store } from './App/stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/router/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider
    value={store}>
   <RouterProvider router={router}/>
    </StoreContext.Provider>

  </React.StrictMode>,
)