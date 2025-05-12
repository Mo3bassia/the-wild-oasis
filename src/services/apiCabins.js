import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Error fetching cabins");
  }
  return data;
}

export async function removeCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Cabin could not be deleted:", error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
