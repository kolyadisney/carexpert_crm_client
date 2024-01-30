import React from 'react';

import { UpdateCreateClient } from './components/client';
import { IModalOwnProps as IClientModalOwnProps } from '@/components/modals/components/client/types';

import { UpdateCreateCar } from './components/car';
import { IModalOwnProps as ICarModalOwnProps } from '@/components/modals/components/car/types';

import {
  UpdateCreateServiceCategory,
  UpdateCreateService,
} from './components/service';
import { IModalOwnProps as IServiceModalOwnProps } from '@/components/modals/components/service/types';

import { CreateUpdateAppointmentModal } from './components/appointment';
import { IModalOwnProps as IAppointmentModalOwnProps } from './components/appointment/types';

import {
  CreateUpdateOrderServices,
  CreateUpdateOrderModal,
} from './components/order';
import { ICreateUpdateOrderServiceProps } from './components/order/types';

import {
  CreateUpdatePartModal,
  CreateUpdateOrderPartsModal,
} from './components/part';
import {
  IOrderPartsModalProps,
  IPartModalProps,
} from './components/part/types';

export enum EModalsMap {
  UPDATE_CREATE_CLIENT = 'UPDATE_CREATE_CLIENT',
  UPDATE_CREATE_CAR = 'UPDATE_CREATE_CAR',
  UPDATE_CREATE_SERVICE_CATEGORY = 'UPDATE_CREATE_SERVICE_CATEGORY',
  UPDATE_CREATE_SERVICE = 'UPDATE_CREATE_SERVICE',
  CREATE_UPDATE_APPOINTMENT = 'CREATE_UPDATE_APPOINTMENT',
  CREATE_UPDATE_ORDER_SERVICES = 'CREATE_UPDATE_ORDER_SERVICES',
  CREATE_UPDATE_ORDER = 'CREATE_UPDATE_ORDER',
  CREATE_UPDATE_PART = 'CREATE_UPDATE_PART',
  CREATE_UPDATE_ORDER_PARTS = 'CREATE_UPDATE_ORDER_PARTS',
}

export interface IModalsMapTree {
  UPDATE_CREATE_CLIENT: React.FC<IClientModalOwnProps>;
  UPDATE_CREATE_CAR: React.FC<ICarModalOwnProps>;
  UPDATE_CREATE_SERVICE_CATEGORY: React.FC<IServiceModalOwnProps>;
  UPDATE_CREATE_SERVICE: React.FC<IServiceModalOwnProps>;
  CREATE_UPDATE_APPOINTMENT: React.FC<IAppointmentModalOwnProps>;
  CREATE_UPDATE_ORDER_SERVICES: React.FC<ICreateUpdateOrderServiceProps>;
  CREATE_UPDATE_ORDER: React.FC<any>;
  CREATE_UPDATE_PART: React.FC<IPartModalProps>;
  CREATE_UPDATE_ORDER_PARTS: React.FC<IOrderPartsModalProps>;
}

export const getModalsMap = (): IModalsMapTree => ({
  [EModalsMap.UPDATE_CREATE_CLIENT]: UpdateCreateClient,
  [EModalsMap.UPDATE_CREATE_CAR]: UpdateCreateCar,
  [EModalsMap.UPDATE_CREATE_SERVICE_CATEGORY]: UpdateCreateServiceCategory,
  [EModalsMap.UPDATE_CREATE_SERVICE]: UpdateCreateService,
  [EModalsMap.CREATE_UPDATE_APPOINTMENT]: CreateUpdateAppointmentModal,
  [EModalsMap.CREATE_UPDATE_ORDER_SERVICES]: CreateUpdateOrderServices,
  [EModalsMap.CREATE_UPDATE_ORDER]: CreateUpdateOrderModal,
  [EModalsMap.CREATE_UPDATE_PART]: CreateUpdatePartModal,
  [EModalsMap.CREATE_UPDATE_ORDER_PARTS]: CreateUpdateOrderPartsModal,
});
