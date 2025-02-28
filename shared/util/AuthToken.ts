import { v4 as uuid } from 'uuid';

export class AuthToken {
  private _token: string;
  private _timestamp: number;

  public static Generate(): AuthToken {
    const token: string = AuthToken.generateToken();
    const timestamp: number = Date.now();
    return new AuthToken(token, timestamp);
  }

  private static generateToken(): string {
    try {
      return uuid().toString();
    } catch (error: unknown) {
      console.error('Generating random string due to error generating UUID:', (error as Error).message);
      // if UUID not available. Generating a random string. Making it 64 characters to reduce the liklihood of a duplicate
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^*()-+';
      const charactersLength = characters.length;
      for (let i = 0; i < 64; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }
  }

  public constructor(token: string, timestamp: number) {
    this._token = token;
    this._timestamp = timestamp;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  public get timestamp(): number {
    return this._timestamp;
  }

  public set timestamp(value: number) {
    this._timestamp = value;
  }
}
