import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUrlSearch } from "../../hooks/useUrlSearch";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { getParam } = useUrlSearch();
  const navigate = useNavigate();
  const status = getParam("status") || "all";
  const sortBy = getParam("sortBy") || "startDate-asc";
  const page = getParam("page") || 1;

  return useMutation({
    mutationFn: (id) => {
      console.log(id);
      deleteBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"], status, sortBy, Number(page));
      queryClient.refetchQueries(["bookings"], status, sortBy, Number(page));
      queryClient.refetchQueries(["bookings"]);
      toast.success("Booking deleted successfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
