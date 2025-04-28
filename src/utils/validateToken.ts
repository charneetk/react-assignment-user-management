export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true; // Not a valid JWT

    const payload = JSON.parse(atob(`${parts?.[1]}`));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (e) {
    return true; // Invalid token
  }
};
