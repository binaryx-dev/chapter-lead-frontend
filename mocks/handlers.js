// mocks/handlers.js
import { rest } from 'msw'
import { LoginHandler } from './auth'
import ProjectHandler from './project/index.js'

export const handlers = [
  ...LoginHandler,
  ...ProjectHandler,
  rest.get('/api/hello', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Hello World' })
    )
  })
]