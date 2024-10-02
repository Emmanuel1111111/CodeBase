declare module 'long' {
    export class Long {
      constructor(low: number, high: number, unsigned?: boolean);
      static fromValue(value: number | string): Long;
      toString(): string;
      // Add other methods as needed from the Long.js library
    }
  }
  