import { endpoint } from '@/services/api/endpoints';
import { http } from '@/services/http';

export const auth: any = {
  refreshToken: async (token: string) => {
    try {
      const response = await http.post(
        endpoint.auth.REFRESH_TOKEN,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      return [];
    }
  },
};
