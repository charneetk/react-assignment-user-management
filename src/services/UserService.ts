import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { User, UserResponse } from "../interfaces/IUser";
import { client } from "./client";

const fetchUsers = async (): Promise<AxiosResponse<UserResponse, any>> => {
  return await client.get<UserResponse>(`/users`);
};

export const useFetchUsers = (): QueryObserverResult<User[], any> => {
  return useQuery<User[], any>({
    queryFn: async () => {
      const { data } = await fetchUsers();
      return data?.users ?? [];
    },
    queryKey: ["getUsers"],
  });
};
