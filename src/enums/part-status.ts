export enum PartStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export const PartStatusName: Record<string, string> = {
  [PartStatus.IN_STOCK]: 'В наличии',
  [PartStatus.OUT_OF_STOCK]: 'Нет на складе',
};

export const PartStatusColor: Record<string, string> = {
  [PartStatus.IN_STOCK]: 'in-stock',
  [PartStatus.OUT_OF_STOCK]: 'out-of-stock',
};
