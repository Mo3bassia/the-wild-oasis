import toast from "react-hot-toast";
import { removeCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      removeCabin(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      queryClient.refetchQueries(["cabins"]);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
