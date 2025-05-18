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
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Cabin could not be deleted:", error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createCabin(cabin) {
  const imageName = `${Math.random()}-${cabin.image.name}`;
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName.replaceAll(
    "/",
    ""
  )}`;

  console.log(imagePath);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();

  if (error) {
    console.error("Cabin could not be created:", error);
    throw new Error("Cabin could not be created");
  }

  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error("Image could not be uploaded:", StorageError);
    throw new Error("Image could not be uploaded");
  }

  return data;
}

export async function editCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(SUPABASE_URL);
  console.log(cabin, id);
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
    throw new Error("Cabin could not be edited");
  }
  return data;
}
