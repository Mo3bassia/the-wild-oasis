import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useUrlSearch } from "../../hooks/useUrlSearch";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { data, isLoading } = useBookings();
  const { getParam, SetParam, deleteParam } = useUrlSearch();

  const bookings = data?.data || [];
  const count = data?.count || 0;

  if (isLoading) {
    return <Spinner />;
  }

  // const status = getParam("status");
  // let filteredBookings = bookings;

  // switch (status) {
  //   case "checked-out":
  //     filteredBookings = bookings.filter(
  //       (booking) => booking.status === "checked-out"
  //     );
  //     break;
  //   case "checked-in":
  //     filteredBookings = bookings.filter(
  //       (booking) => booking.status === "checked-in"
  //     );
  //     break;
  //   case "unconfirmed":
  //     filteredBookings = bookings.filter(
  //       (booking) => booking.status === "unconfirmed"
  //     );
  //     break;
  //   default:
  //     break;
  // }

  // const sortBy = getParam("sortBy");

  // switch (sortBy) {
  //   case "totalPrice-asc":
  //     filteredBookings = filteredBookings.sort(
  //       (a, b) => a.totalPrice - b.totalPrice
  //     );
  //     break;
  //   case "totalPrice-desc":
  //     filteredBookings = filteredBookings.sort(
  //       (a, b) => b.totalPrice - a.totalPrice
  //     );
  //     break;
  //   case "startDate-asc":
  //     filteredBookings = filteredBookings.sort(
  //       (a, b) => new Date(a.startDate) - new Date(b.startDate)
  //     );
  //     break;
  //   case "startDate-desc":
  //     filteredBookings = filteredBookings.sort(
  //       (a, b) => new Date(b.startDate) - new Date(a.startDate)
  //     );
  //     break;
  //   default:
  //     break;
  // }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
