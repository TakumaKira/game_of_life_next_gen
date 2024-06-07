const ALIVE_CELL_BASE_OPTIONS_DEFAULT = 10
const PROCESS_ENV = typeof process !== "undefined" && process ? process.env : {}
const ALIVE_CELL_BASE_OPTIONS_ENV = PROCESS_ENV.ALIVE_CELL_BASE_OPTIONS
export const ALIVE_CELL_BASE_OPTIONS = sanitizeAliveCellBaseOptionsEnv(ALIVE_CELL_BASE_OPTIONS_ENV) ?? ALIVE_CELL_BASE_OPTIONS_DEFAULT

/** Exported for TESTING PURPOSE ONLY and this function should not be moved to another file to prevent circular reference */
export function sanitizeAliveCellBaseOptionsEnv(fromEnv: string | undefined): number | null {
  if (!fromEnv) {
    return null
  }
  const _ALIVE_CELL_BASE_OPTIONS_ENV = parseInt(fromEnv)
  if (isNaN(_ALIVE_CELL_BASE_OPTIONS_ENV)) {
    console.warn(`Configured ALIVE_CELL_BASE_OPTIONS is not a number: ${PROCESS_ENV.ALIVE_CELL_BASE_OPTIONS}`)
    return null
  }
  if (_ALIVE_CELL_BASE_OPTIONS_ENV < 0) {
    console.warn(`Configured ALIVE_CELL_BASE_OPTIONS is a negative number: ${PROCESS_ENV.ALIVE_CELL_BASE_OPTIONS}`)
    return null
  }
  return _ALIVE_CELL_BASE_OPTIONS_ENV
}
