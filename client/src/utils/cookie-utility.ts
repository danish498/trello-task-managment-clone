export class LocalStorageUtility {
  static get<T>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value) as T;
    } else {
      return null;
    }
  }

  static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static clear(key: string): void {
    localStorage.removeItem(key);
  }
}
