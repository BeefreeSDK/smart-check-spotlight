/**
 * Return the JWT toke without the 'Bearer' prefix
 * Needed by BE to send only the token chars to bee-auth
 */
export const getJwtToken = (headers: Headers): string | null => {
  const authHeader = String(headers.get('Authorization') ?? '')
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7, authHeader.length)
  }
  return null
}
