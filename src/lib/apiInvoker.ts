import axiosInstance from "./axiosInstance";

async function apiInvoker<T> (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: object | FormData
): Promise<T> {
  try {
    // Automatically detect FormData and set appropriate headers
    const isFormData = data instanceof FormData;
    
    const response = await axiosInstance({
      url,
      method,
      data,
      headers: isFormData
        ? {
            "Content-Type": "multipart/form-data",
          }
        : undefined,
    });
    return response.data;
  } catch (error) {
    console.error(`API call to ${url} failed: `, error);
    throw error;
  }
}

export default apiInvoker;