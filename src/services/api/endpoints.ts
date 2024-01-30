export const endpoint = {
  auth: {
    REFRESH_TOKEN: '/auth/refresh',
  },
  user: {
    FETCH_ALL_USERS: '/user',
    FETCH_CURRENT_USER: '/user/me',
  },
  client: {
    FETCH_ALL_CLIENTS: '/client',
    FETCH_CLIENT_BY_ID: (id: string) => `/client/${id}`,
    CREATE_CLIENT: '/client',
    UPDATE_CLIENT_BY_ID: (id: string) => `/client/${id}`,
    DELETE_CLIENT_BY_ID: (id: string) => `/client/${id}`,
  },
  car: {
    FETCH_ALL_CARS: '/car',
    FETCH_CAR_BY_ID: (id: string) => `car/${id}`,
    FETCH_CAR_BRAND: `/car/brand`,
    CREATE_CAR: `/car`,
    UPDATE_CAR_BY_ID: (id: string) => `/car/${id}`,
    DELETE_CAR_BY_ID: (id: string) => `/car/${id}`,
  },
  service: {
    FETCH_ALL_SERVICES_WITH_CATEGORY: `/service/category`,
    CREATE_SERVICE_CATEGORY: `/service/category`,
    UPDATE_SERVICE_CATEGORY: (id: string) => `/service/category/${id}`,
    DELETE_SERVICE_CATEGORY: (id: string) => `/service/category/${id}`,
    FETCH_ALL_SERVICES: `service`,
    CREATE_SERVICE: `/service`,
    UPDATE_SERVICE: (id: string) => `/service/${id}`,
    DELETE_SERVICE: (id: string) => `/service/${id}`,
  },
  appointment: {
    FETCH_ALL_APPOINTMENTS: `/appointment`,
    CREATE_APPOINTMENT: `/appointment`,
    UPDATE_APPOINTMENT: (id: string) => `/appointment/${id}`,
    DELETE_APPOINTMENT: (id: string) => `/appointment/${id}`,
  },
  order: {
    FETCH_ALL_ORDERS: `/order`,
    FETCH_ORDER_BY_ID: (id: number) => `/order/${id}`,
    ADD_SERVICES_TO_ORDER: `/order/service`,
    CREATE_ORDER: `/order`,
    UPDATE_ORDER: (id: number) => `order/${id}`,
    ADD_PARTS_TO_ORDER: `order/part`,
  },
  parts: {
    FETCH_ALL_PARTS: '/car-part',
    CREATE_PART: '/car-part',
    UPDATE_PART: (id: string) => `/car-part/${id}`,
    DELETE_PART: (id: string) => `/car-part/${id}`,
  },
};
