const set = (key: string, value: string): string | null => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
    return value
  }
  return null
}

const get = (key: string, setter?: () => string): string | null => {
  let value = null
  if (typeof window !== 'undefined') {
    value = localStorage.getItem(key)
    if (!value && setter) {
      return set(key, setter())
    }
  }
  return value
}

export const LocalStorage = { set, get }
