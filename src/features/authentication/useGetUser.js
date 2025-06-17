import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
  });
}
