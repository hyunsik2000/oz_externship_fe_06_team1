import { http, HttpResponse } from 'msw'
import { adminAccountHandlers } from './handlers/adminAccountHandlers'
import { examGraphHandlers } from './handlers/examGraphHandlers'
import { memberGraphHandlers } from './handlers/memberGraphHandlers'
import { withdrawalHandlers } from './handlers/withdrawalHandlers'
import { examDeploymentHandlers } from './handlers/examDeploymentHandlers'

const testHandler = http.get('/api/hello', () => {
  return HttpResponse.json({ message: 'Hello, world!', code: 200 })
})

export const handlers = [
  testHandler,
  ...adminAccountHandlers,
  ...examDeploymentHandlers,
  ...examGraphHandlers,
  ...memberGraphHandlers,
  ...withdrawalHandlers,
]
