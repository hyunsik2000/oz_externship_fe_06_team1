import { http, HttpResponse } from 'msw'
import { examHandlers } from './handlers/examHandlers'
import { examGraphHandlers } from './handlers/examGraphHandlers'

const testHandler = http.get('/api/hello', () => {
  return HttpResponse.json({ message: 'Hello, world!', code: 200 })
})

export const handlers = [testHandler, ...examHandlers, ...examGraphHandlers]
