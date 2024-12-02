import { getApi } from "../../api/api";

export const GetClassRoom = async () => {
  const path = `/ClassRoom`;
  const response = await getApi({ path });
  return response.data;
};
