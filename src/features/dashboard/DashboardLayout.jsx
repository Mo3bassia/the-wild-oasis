import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { data: bookings, isLoading1 } = useRecentBookings();
  const { data: stays, isLoading2 } = useRecentStays();

  const confirmedStays =
    stays?.filter(
      (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    ) || [];

  if (isLoading1 || isLoading2) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart of sales</div>
    </StyledDashboardLayout>
  );
}
