import { getApi } from "../../api/api";

export const GetBuilding = async () => {
  const path = `/Building`;
  const response = await getApi({ path });
  return response.data;
};
