const SERVER_URL="https://localhost:7299"
export function createError(error) {
  return { status: "error", error };
}
export function createUrl(path) {
    return `${SERVER_URL}/${path}`
}
