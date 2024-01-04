const initMocks = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('../mocks/server')
    await server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    const { worker } = await import('../mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}

export default initMocks;