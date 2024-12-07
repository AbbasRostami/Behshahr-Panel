import { getApi } from "../../api/api";

export const GetCoursesSocial = async () => {
  const path = `/CourseSocialGroup`;
  const response = await getApi({ path });
  return response.data;
};
