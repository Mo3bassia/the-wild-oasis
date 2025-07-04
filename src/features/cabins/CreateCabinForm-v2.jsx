import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditMode = !!editId;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? { ...editValues } : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isPending: isAdding } = useMutation({
    mutationFn: (data) => {
      return isEditMode ? createEditCabin(data, editId) : createEditCabin(data);
    },
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      queryClient.refetchQueries(["cabins"]);
      reset();
    },
    onError: (error) => {
      toast.error("Error creating cabin");
      console.error(error);
    },
  });function onSubmit(data) {
    const imageValue = isEditMode
      ? typeof data.image === "string"
        ? data.image // Keep existing URL
        : data.image && data.image.length > 0
        ? data.image[0] // New file uploaded
        : editValues.image // Keep original if no new upload
      : data.image[0]; // New cabin with image

    mutate({
      ...data,
      image: imageValue,
    });
  }
  function onError(error) {
    Object.values(error).forEach((err) => {
      toast.error(err.message);
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isAdding}
          {...register("name", {
            required: "Name is required",
          })}
        />
      </FormRow>
      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isAdding}
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
          disabled={isAdding}
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>
      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isAdding}
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
          disabled={isAdding}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isAdding}
          {...register("image", {
            required: isEditMode ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isAdding} type="reset">
          Cancel
        </Button>
        <Button variation="primary" disabled={isAdding}>
          {isEditMode ? "Edit a cabin" : "Create a cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
