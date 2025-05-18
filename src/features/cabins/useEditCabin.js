import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(editId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return editCabin(data, editId);
    },
    onSuccess: () => {
      toast.success("Cabin has been edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      queryClient.refetchQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error creating cabin");
      console.error(error);
    },
  });
}
