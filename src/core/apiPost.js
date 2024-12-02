import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "./interceptor";

export const allApi = {
  GetAssistance: "/AssistanceWork",
  GetBuilding: "/Building",
};

// PostRequest
export const usePostRequest = ({ url, key, headers, method }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async () => {
      const response = await instance({
        url: url,
        method: method ? method : "POST",
        headers: headers,
        data: data,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: () => {
      // ErrorNotification("در ارتباط با سرور مشکلی پیش آمد.");
      console.log("در ارتباط با سرور مشکلی پیش آمد.");
    },
  });
};
//   END PostRequest

//   GetRequest
export const useGetRequest = ({ url, key, headers, enabled, staleTime }) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await instance({
        url: url,
        method: "GET",
        headers: headers,
      });

      if (response.status !== 200) {
        console.log("در ارتباط با سرور مشکلی پیش آمد.");
      }

      return response.data;
    },
    staleTime: staleTime,
    enabled: enabled,
  });
};
{
  /* END GetRequest */
}

export const AssistanceWork = async (data) => {
  try {
    const res = await instance.post("/AssistanceWork", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const usePostSth = () => {
  return useMutation({
    mutationFn: async (data) => await AssistanceWork(data),
  });
};
