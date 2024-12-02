import { getApi } from "../../api/api";

export const GetAssistance = async () => {
  const path = `/AssistanceWork`;
  const response = await getApi({ path });
  return response.data;
};
