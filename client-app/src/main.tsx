import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import './app/layout/styles.css'
import { StoreContext, store } from './App/stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/router/Routes'
//Today I finally done with this app! 2024-09-10 KD
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider
    value={store}>
   <RouterProvider router={router}/>
    </StoreContext.Provider>

  </React.StrictMode>,
)