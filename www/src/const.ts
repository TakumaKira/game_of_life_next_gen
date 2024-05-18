const ALIVE_CELL_BASE_OPTIONS_DEFAULT = 10
const ALIVE_CELL_BASE_OPTIONS_ENV = (() => {
  if (!process.env.ALIVE_CELL_BASE_OPTIONS) {
    return null
  }
  const _ALIVE_CELL_BASE_OPTIONS_ENV = parseInt(process.env.ALIVE_CELL_BASE_OPTIONS)
  if (isNaN(_ALIVE_CELL_BASE_OPTIONS_ENV)) {
    console.warn(`Configured ALIVE_CELL_BASE_OPTIONS is not a number: ${process.env.ALIVE_CELL_BASE_OPTIONS}`)
    return null
  }
  if (_ALIVE_CELL_BASE_OPTIONS_ENV < 0) {
    console.warn(`Configured ALIVE_CELL_BASE_OPTIONS is a negative number: ${process.env.ALIVE_CELL_BASE_OPTIONS}`)
    return null
  }
  return _ALIVE_CELL_BASE_OPTIONS_ENV
})()
export const ALIVE_CELL_BASE_OPTIONS = ALIVE_CELL_BASE_OPTIONS_ENV || ALIVE_CELL_BASE_OPTIONS_DEFAULT
