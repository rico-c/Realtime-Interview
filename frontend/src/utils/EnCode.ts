export const encode = (str: string) => {
  return btoa(unescape(encodeURIComponent(str || "")));
};

export const decode = (bytes:string) => {
  var escaped = escape(atob(bytes || ""));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
}