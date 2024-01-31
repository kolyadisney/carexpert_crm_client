export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const UserRoleNames: Record<string, string> = {
  [UserRole.OWNER]: 'Владелец',
  [UserRole.ADMIN]: 'Администратор',
  [UserRole.USER]: 'Пользователь',
} as const;

export const UserRoleColors: Record<string, string> = {
  [UserRole.OWNER]: 'owner',
  [UserRole.ADMIN]: 'admin',
  [UserRole.USER]: 'user',
} as const;
