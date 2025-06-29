import toast from "react-hot-toast";
import supabase, { SUPABASE_URL } from "./supabase";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export async function signUp({ fullName, email, password, avatar }) {
  const imageName = `${Math.random()}-${fullName}`;
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/avatars/${imageName.replaceAll(
    "/",
    ""
  )}`;

  const { error: StorageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (StorageError) {
    toast.error("Image could not be uploaded");
    console.error(StorageError);
    throw new Error("Image could not be uploaded");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar:
          imagePath ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp", // Default avatar
      },
    },
  });
  if (error) {
    console.error("Signup failed:", error);
    toast.error(`Signup failed: ${error.message}`);
    return null;
  }
  toast.success(
    "Signup successful! Please check your email to confirm your account."
  );
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login failed:", error);
    toast.error(`Login failed: ${error}`);
    return null;
  }
  toast.success("Login successful!");
  return data;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error);
    toast.error(`Logout failed: ${error.message}`);

    return false;
  }
  toast.success("Logout successful!");
  return true;
}

export async function updateUserData({ full_name, avatar, password }) {
  let query = supabase.auth;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (password) {
    query = query.updateUser({
      password: password,
    });
  }
  const imageName = `${Math.random()}-${full_name}`;
  if (avatar) {
    const { error: StorageError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);

    if (StorageError) {
      toast.error("Image could not be uploaded");
      console.error(StorageError);
      throw new Error("Image could not be uploaded");
    }
  }
  if (full_name || avatar) {
    const imagePath = `${SUPABASE_URL}/storage/v1/object/public/avatars/${imageName.replaceAll(
      "/",
      ""
    )}`;
    query = query.updateUser({
      data: {
        full_name: full_name,
        avatar: avatar ? imagePath : user.avatar,
      },
    });
  }

  const { data, error } = await query;
  if (error) {
    console.error("Update user data failed:", error);
    toast.error(`Update user data failed: ${error.message}`);
    return null;
  }
  return data;
}
