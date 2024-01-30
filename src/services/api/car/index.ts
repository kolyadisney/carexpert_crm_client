import { endpoint } from '@/services/api/endpoints';
import { http } from '@/services/http';

export const car: any = {
  fetchAllCars: async (payload?: any) => {
    const response = await http.get(endpoint.car.FETCH_ALL_CARS, {
      params: payload?.params,
    });
    return response?.data;
  },
  fetchCarBrand: async (brandName: string) => {
    const response = await http.get(endpoint.car.FETCH_CAR_BRAND, {
      params: {
        brandName,
      },
    });
    return response?.data;
  },
  addCar: async (payload: any) => {
    const response = await http.post(endpoint.car.CREATE_CAR, payload);
    return response?.data;
  },
};
