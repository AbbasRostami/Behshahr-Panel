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


// Post Request

export const postRequest = async (url, data) => {
  try {
    const res = await instance.post(url, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const usePostSth = (url) => {
  return useMutation({
    mutationFn: async (data) => await postRequest(url, data),
  });
};


// Get Reqeuest
export const getRequest = async (url, params = {}) => {
    try {
      const res = await instance.get(url, { params });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const useGetSth = (url, options = {}) => {
    return useQuery({
      queryKey: [url, options.params],
      queryFn: async () => await getRequest(url, options.params),
      ...options,
    });
  };



  // Put Request

  export const putRequest = async (url, data) => {
    try {
      const res = await instance.put(url, data);  
      return res.data;
    } catch (error) {
      throw error; 
    }
  };

  export const usePutSth = (url) => {
    return useMutation({
      mutationFn: async (data) => await putRequest(url, data),  
    });
  };