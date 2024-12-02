import { getApi } from "../../api/api";

export const GetCourseAssistance = async () => {
  const path = `/CourseAssistance`;
  const response = await getApi({ path });
  return response.data;
};
