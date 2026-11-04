export class StorageAccessException extends Error {
  public readonly storageKey: string;

  constructor(storageKey: string, message: string) {
    super(message);
    this.name = 'StorageAccessException';
    this.storageKey = storageKey;
  }
}

export function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao ler armazenamento local';
    const exception = new StorageAccessException(key, message);
    window.dispatchEvent(new CustomEvent('flacar:storage-error', { detail: exception }));
    return fallback;
  }
}

export function writeLocalStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao gravar armazenamento local';
    const exception = new StorageAccessException(key, message);
    window.dispatchEvent(new CustomEvent('flacar:storage-error', { detail: exception }));
    return false;
  }
}
