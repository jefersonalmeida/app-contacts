export class StorageService {
  static clear(): void {
    localStorage.clear();
  }

  static setEndpoint(data: string): void {
    StorageService.set('endpoint', data);
  }

  static getEndpoint(): string {
    return StorageService.get('endpoint');
  }

  private static get(name: string): any {
    return localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name) as string)
      : null;
  }

  private static set(name: string, data: any): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  private static del(name: string): void {
    localStorage.removeItem(name);
  }
}
