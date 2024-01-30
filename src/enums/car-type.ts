export enum CarType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  MINIVAN = 'MINIVAN',
}

export const CarTypeName: Record<string, string> = {
  [CarType.SEDAN]: 'Легковой',
  [CarType.SUV]: 'Внедорожник',
  [CarType.MINIVAN]: 'Микроавтобус',
} as const;
