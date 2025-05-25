import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditMode = !!editId;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? { ...editValues } : {},
  });
  const { errors } = formState;

  const { mutate: AddNewCabin, isPending: isCreating } = useCreateCabin();

  const { mutate: editCabinFun, isPending: isEditing } = useEditCabin(editId);

  function onSubmit(data) {
    if (isEditMode) {
      editCabinFun(
        { ...data },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      AddNewCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            toast.success("Cabin has been created successfully");
            onCloseModal?.();
          },
        }
      );
    }
  }
  function onError(error) {
    Object.values(error).forEach((err) => {
      toast.error(err.message);
    });
  }
  const isWorking = isCreating || isEditing;

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Name is required",
          })}
        />
      </FormRow>
      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
            max: {
              value: 20,
              message: "Maximum capacity is 20",
            },
          })}
        />
      </FormRow>
      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>
      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) => {
              if (+value > +getValues("regularPrice"))
                return "Discount cannot be greater than regular price";
            },
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditMode ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          disabled={isWorking}
          type="reset"
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {isEditMode ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
