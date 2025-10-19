import api from "./api";
import type { User } from "./auth";

export const settingsApi = {
    editSettings: async (field: string, value: string): Promise<User> => {
        const response = await api.patch(`/settings/${field}`, {value});
        return response.data;
    }
}