import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import { useUpdateUser } from "./useUpdateUser";
import { useState } from "react";
import FileInput from "../../ui/FileInput";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: signUp, isPending: isSigningUp } = useSignUp();

  function onSubmit(value) {
    console.log(value);
    signUp(
      {
        fullName: value.fullName,
        email: value.email,
        password: value.password,
        avatar: value.avatar[0],
      },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          disabled={isSigningUp}
          placeholder="Enter your full name"
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          disabled={isSigningUp}
          placeholder="Enter your email address"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          placeholder="Enter your password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          placeholder="Repeat your password"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => {
              const password = watch("password");
              return password === value || "Passwords do not match";
            },
          })}
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          {...register("avatar", {
            required: "Avatar image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
