export enum OrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  HOLD = 'HOLD',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export const OrderStatusName: Record<string, string> = {
  [OrderStatus.NEW]: 'Новый',
  [OrderStatus.IN_PROGRESS]: 'В работе',
  [OrderStatus.HOLD]: 'На паузе',
  [OrderStatus.COMPLETED]: 'Завершен',
  [OrderStatus.REJECTED]: 'Отменен',
} as const;

export const OrderStatusColor: Record<string, string> = {
  [OrderStatus.NEW]: 'new',
  [OrderStatus.IN_PROGRESS]: 'in-progress',
  [OrderStatus.HOLD]: 'hold',
  [OrderStatus.COMPLETED]: 'completed',
  [OrderStatus.REJECTED]: 'rejected',
} as const;
