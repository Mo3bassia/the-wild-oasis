import toast from "react-hot-toast";
import supabase from "./supabase";
import { useNavigate } from "react-router-dom";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp", // Default avatar
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
