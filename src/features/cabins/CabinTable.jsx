import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useUrlSearch } from "../../hooks/useUrlSearch";

export default function CabinTable() {
  const { data: cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const { getParam, setParam, deleteParam } = useUrlSearch();

  if (isLoading) {
    return <Spinner />;
  }

  let filteredCabins = cabins || [];
  const filter = getParam("filter");
  switch (filter) {
    case "all":
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      filteredCabins = cabins;
      break;
  }

  const sortBy = getParam("sortBy");
  switch (sortBy) {
    case "name-asc":
      filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredCabins.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "regularPrice-asc":
      filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
      break;
    case "regularPrice-desc":
      filteredCabins.sort((a, b) => b.regularPrice - a.regularPrice);
      break;
    case "maxCapacity-asc":
      filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
      break;
    case "maxCapacity-desc":
      filteredCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
      break;
    default:
      break;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
