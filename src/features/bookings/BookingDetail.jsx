import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail({ id }) {
  const { data: booking, isLoading } = useBooking(id);
  const { mutate: checkout } = useCheckout(id);
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking(id);
  const { status } = booking || {};
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resource="booking"></Empty>;
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${booking?.id}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variation="primary"
            icon={<HiArrowDownOnSquare />}
            onClick={() => checkout()}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger" icon={<HiTrash />}>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              disable={isDeleting}
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(id, {
                  onSuccess: () => {
                    navigate(-1);
                  },
                })
              }
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
