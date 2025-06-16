import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useUrlSearch } from "../../hooks/useUrlSearch";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const { getParam } = useUrlSearch();
  const queryClient = useQueryClient();
  const status = getParam("status") || "all";
  const sortBy = getParam("sortBy") || "startDate-asc";
  const page = getParam("page") || 1;

  const filter = {
    status: status === "all" ? undefined : status,
    sortBy: sortBy || undefined,
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["bookings", status, sortBy, Number(page)],
    queryFn: () => getBookings(filter, sortBy, Number(page)),
  });
  const { count } = data || { count: 0 };

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (count &&page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sortBy, Number(page) + 1],
      queryFn: () => getBookings(filter, sortBy, Number(page) + 1),
    });
  }

  if (count &&page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sortBy, Number(page) - 1],
      queryFn: () => getBookings(filter, sortBy, Number(page) - 1),
    });
  }

  return { isLoading, data, error, refetch };
}
