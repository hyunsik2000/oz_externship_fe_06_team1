import { http, HttpResponse } from 'msw'
import { examGraphHandlers } from './handlers/examGraphHandlers'
import { memberGraphHandlers } from './handlers/memberGraphHandlers'

const testHandler = http.get('/api/hello', () => {
  return HttpResponse.json({ message: 'Hello, world!', code: 200 })
})

export const handlers = [
  testHandler,
  ...examGraphHandlers,
  ...memberGraphHandlers,
]
