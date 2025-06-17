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
  console.log(data);
  return data;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
