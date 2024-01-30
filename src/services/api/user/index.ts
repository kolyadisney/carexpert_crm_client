import { endpoint } from '@/services/api/endpoints';
import { http } from '@/services/http';

export const user: any = {
  fetchCurrentUser: async () => {
    const response = await http.get(endpoint.user.FETCH_CURRENT_USER);
    return response.data;
  },
};
