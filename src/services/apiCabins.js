import toast from "react-hot-toast";
import supabase, { SUPABASE_URL } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Error fetching cabins");
  }
  return data;
}

export async function removeCabin(id) {
  const { error, data } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (data) {
    toast.success("Cabin deleted successfully");
  }

  if (error) {
    console.error("Cabin could not be deleted:", error);
    toast.error("Cabin could not be deleted");
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createCabin(cabin) {
  const hasImagePath = cabin.image?.startsWith?.(SUPABASE_URL);
  const imageName = `${Math.random()}-${cabin.image.name}`;
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName.replaceAll(
    "/",
    ""
  )}`;

  if (!hasImagePath) {
    const { error: StorageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

    if (StorageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error("Image could not be uploaded:", StorageError);
      toast.error("Image could not be uploaded");
      throw new Error("Image could not be uploaded");
    }
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: hasImagePath ? cabin.image : imagePath }])
    .select();

  if (error) {
    console.error("Cabin could not be created:", error);
    toast.error("Cabin could not be created");
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function editCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(SUPABASE_URL);
  const imageName = `${Math.random()}-${cabin.image[0].name}`;
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName.replaceAll(
    "/",
    ""
  )}`;

  if (!hasImagePath) {
    const { error: StorageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image[0]);

    if (StorageError) {
      console.error("Image could not be uploaded:", StorageError);
      throw new Error("Image could not be uploaded");
    }
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: hasImagePath ? cabin.image : imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Cabin could not be edited:", error);
    toast.error("Cabin could not be edited");
    throw new Error("Cabin could not be edited");
  }
  return data;
}
