import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import StyledConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, name, maxCapacity, discount, description, image, regularPrice } =
    cabin;
  const { mutate: deleteCabin, isLoading: isDeleting } = useDeleteCabin(id);
  const { mutate: duplicateCabin, isLoading: isDuplicating } = useCreateCabin();

  const uniqueCabin = { ...cabin, name: `Copy of ${cabin.name}` };
  delete uniqueCabin.id;
  return (
    <Table.Row role="row">
      <Img src={image} alt="" />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>

      {discount > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              onClick={() =>
                duplicateCabin(uniqueCabin, {
                  onSuccess: () => {
                    toast.success("Cabin has been duplicated successfully");
                  },
                })
              }
              icon={<HiSquare2Stack />}
            >
              Duplicate
            </Menus.Button>
            <Modal.Open opens="delete-cabin">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="cabin-form">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="cabin-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete-cabin">
            <StyledConfirmDelete
              disable={isDeleting}
              resourceName="cabin"
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}
