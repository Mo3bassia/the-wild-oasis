import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useSettings } from "../../features/settings/useSettings";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { bookingId: bookingIdParam } = useParams();
  const { data: booking, isLoading } = useBooking(bookingIdParam);
  const { mutate, isLoading: isCheckingin } = useCheckin(bookingIdParam);
  const { data: settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking?.isPaid ?? false);
    }
  }, [booking?.isPaid, booking]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};
  const breakfastPrice = settings?.breakfastPrice * numGuests * numNights || 0;

  function handleCheckin() {
    if (!confirmPaid) {
      toast.error("Please confirm that the booking has been paid.");
      return;
    }
    if (addBreakfast) {
      mutate({
        hasBreakfast: true,
        extrasPrice: breakfastPrice,
        totalPrice: totalPrice + breakfastPrice,
      });
    } else {
      mutate();
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((checked) => !checked);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(breakfastPrice)}?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaid || isCheckingin}
          onChange={() => setConfirmPaid((c) => !c)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of
          {formatCurrency(totalPrice + (addBreakfast ? breakfastPrice : 0))}
          {addBreakfast &&
            `(${formatCurrency(totalPrice)} +
          ${formatCurrency(breakfastPrice)})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingin}
          variation="primary"
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
