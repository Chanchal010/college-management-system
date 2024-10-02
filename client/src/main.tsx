import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Auth0ProviderWithNavigate from './auth/Auth0Provider.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
    </Provider>
  </StrictMode>,
)
