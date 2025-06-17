import toast from "react-hot-toast";
import supabase from "./supabase";
import { useNavigate } from "react-router-dom";

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
