import { endpoint } from '@/services/api/endpoints';
import { http } from '@/services/http';

export const client: any = {
  fetchAllClients: async (payload?: any) => {
    try {
      const response = await http.get(endpoint.client.FETCH_ALL_CLIENTS, {
        params: payload?.params,
      });
      return response?.data;
    } catch (error) {
      return [];
    }
  },
  fetchOneClient: async (id: string) => {
    try {
      const response = await http.get(endpoint.client.FETCH_CLIENT_BY_ID(id));
      return response?.data;
    } catch (error) {
      return [];
    }
  },
  addClient: async (payload: any) => {
    try {
      const response = await http.post(endpoint.client.CREATE_CLIENT, payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteClient: async (id: string) => {
    try {
      const response = await http.delete(
        endpoint.client.DELETE_CLIENT_BY_ID(id),
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
