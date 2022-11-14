function sanitizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f-\u0027]/g, '')
    .replace(/\s/g, '_');
}

export default sanitizeString;
