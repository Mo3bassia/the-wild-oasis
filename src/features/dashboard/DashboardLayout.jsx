import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useUrlSearch } from "../../hooks/useUrlSearch";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { data: bookings, isLoading: isLoading1 } = useRecentBookings();
  const { data: stays, isLoading: isLoading2 } = useRecentStays();
  const { data: cabins, isLoading: isLoading3 } = useCabins();
  const { getParam } = useUrlSearch();
  const numDays = +getParam("last") || 7;

  const confirmedStays =
    stays?.filter(
      (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    ) || [];

  if (isLoading1 || isLoading2 || isLoading3) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins?.length || 0}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
