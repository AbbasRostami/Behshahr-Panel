import { getApi } from "../../api/api";

export const GetTerm = async () => {
  const path = `/Term`;
  const response = await getApi({ path });
  return response.data;
};
