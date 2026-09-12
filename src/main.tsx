import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'sonner'
import './index.css'
import App from './App.tsx'

const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    toast.success('Ready to work offline', {
      description: 'The app shell is cached on this device.',
    })
  },
  onNeedRefresh() {
    toast.info('Update ready', {
      id: 'alvor-update-ready',
      description: 'Reload when safe. Current form data stays in this tab until then.',
      duration: Infinity,
      closeButton: true,
      action: {
        label: 'Reload',
        onClick: () => {
          void updateSW()
        },
      },
    })
  },
  onRegisterError(error: unknown) {
    console.error('Service worker registration failed:', error)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
