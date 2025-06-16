import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      queryClient.refetchQueries(["cabins"]);
    },
    onError: (error) => {
      toast.error("Error creating cabin");
      console.error(error);
    },
  });
}
