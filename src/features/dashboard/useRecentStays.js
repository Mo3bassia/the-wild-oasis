import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useUrlSearch } from "../../hooks/useUrlSearch";
import { subDays } from "date-fns";

export function useRecentStays() {
  const { getParam } = useUrlSearch();
  const numDays = +getParam("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  return useQuery({
    queryKey: ["recentStays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
}
