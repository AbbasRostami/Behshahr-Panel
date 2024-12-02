import { getApi } from "../../api/api";

export const GetDepartment = async () => {
  const path = `/Department`;
  const response = await getApi({ path });
  return response.data;
};
