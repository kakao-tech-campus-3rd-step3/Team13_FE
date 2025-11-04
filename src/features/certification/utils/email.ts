export function parseSchoolEmail(input: string) {
  const trimmed = input.trim();
  const at = trimmed.indexOf('@');
  if (at === -1) {
    return { localPart: trimmed, domain: null, email: null } as const;
  }

  const localPart = trimmed.slice(0, at).trim();
  const domain = trimmed.slice(at + 1).trim();

  return {
    localPart,
    domain,
    email: localPart && domain ? `${localPart}@${domain}` : trimmed,
  } as const;
}

export function isValidEmailFormat(input: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(input.trim());
}

export function isValidCode(code: string) {
  return /^\d{6}$/.test(code.trim());
}

export function formatMMSS(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
