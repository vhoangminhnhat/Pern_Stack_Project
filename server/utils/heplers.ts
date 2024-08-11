export const generateId = (length: number): string =>
  Array.from({ length }, () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }).join("");
