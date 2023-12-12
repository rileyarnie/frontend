"use server";

import { revalidatePath } from "next/cache";

export async function getSpectrumData() {
  const res = await fetch(
    "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  revalidatePath("/");
  return res.json();
}
