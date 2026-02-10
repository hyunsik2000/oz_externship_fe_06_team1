import { http, HttpResponse } from 'msw'
import { examListHandlers } from './handlers/examListHandlers'
import { examGraphHandlers } from './handlers/examGraphHandlers'
import { memberGraphHandlers } from './handlers/memberGraphHandlers'
import { withdrawalHandlers } from './handlers/withdrawalHandlers'

const testHandler = http.get('/api/hello', () => {
  return HttpResponse.json({ message: 'Hello, world!', code: 200 })
})

export const handlers = [
  testHandler,
  ...examListHandlers,
  ...examGraphHandlers,
  ...memberGraphHandlers,
  ...withdrawalHandlers,
]
