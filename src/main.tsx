import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClientBoundary } from '@/lib/query-client/QueryClientBoundary.tsx'
import { GlobalErrorBoundary } from '@/components/common'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser.ts')

  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <QueryClientBoundary>
        <GlobalErrorBoundary>
          <App />
        </GlobalErrorBoundary>
      </QueryClientBoundary>
    </BrowserRouter>
  )
})
