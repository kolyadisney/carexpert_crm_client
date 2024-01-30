class Storage {
  private static readonly STORAGE_PREFIX = process.env.STORAGE_PREFIX + '__';

  private static _makeKey(key: string): string {
    return this.STORAGE_PREFIX + key;
  }

  public static makeKey(key: string): string {
    return this._makeKey(key);
  }

  private static _log(args: any) {
    console.info('[Storage] => ', args);
  }

  private static _code(string: string, shift: number): string {
    return string
      .split('')
      .map((c) => String.fromCharCode(c.charCodeAt(0) + +shift))
      .join('');
  }

  private static decode(string: string, shift: number = 1): string {
    return this._code(string, shift);
  }

  private static encode(string: string, shift: number = -1): string {
    return this._code(string, shift);
  }

  public static get(key: string): null | any {
    if (!key) return null;
    const LSItem = window.localStorage.getItem(this._makeKey(key));
    if (!LSItem) return null;
    try {
      return JSON.parse(this.decode(LSItem));
    } catch (error) {
      this.remove(this._makeKey(key));
      return null;
    }
  }

  public static set(key: string, data: any): void {
    try {
      window.localStorage.setItem(
        this._makeKey(key),
        this.encode(JSON.stringify(data)),
      );
    } catch (error) {
      this._log(error);
    }
  }

  public static remove(key: string): void {
    window.localStorage.removeItem(this._makeKey(key));
  }
}

export { Storage };
