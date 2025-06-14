import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useUrlSearch } from "../../hooks/useUrlSearch";

export function useBookings() {
  const { getParam } = useUrlSearch();
  const status = getParam("status");
  const sortBy = getParam("sortBy");

  const filter = {
    status: status === "all" ? undefined : status,
    sortBy: sortBy || undefined,
  };

  return useQuery({
    queryKey: ["bookings", status],
    queryFn: () => getBookings(filter),
  });
}
