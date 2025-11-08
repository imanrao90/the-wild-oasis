import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {

  let { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error)
    throw new Error("Cabins could not be loaded")
  }

  return data
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image)

  if (storageError) {
    console.error(storageError)
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
  }

  let query = supabase.from("cabins")

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }

  return data

}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error("Cabins could not be deleted")
  }

  return data
}