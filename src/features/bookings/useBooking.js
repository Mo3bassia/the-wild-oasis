import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking(id) {
  if (!id) {
    throw new Error("Booking ID is required");
  }
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });
}
