"use server";

import { URLS_HOST } from "@/enums/enum";
import { CreateRoutesProps } from "../@types/@types";
import { DirectionsApiProps } from "../@types/@types.directions";

export async function createRouteAction(state: any, formData: FormData) {
  const { destinationId, sourceId } = Object.fromEntries(formData);

  const directionsResponse = await fetch(
    `${URLS_HOST.API_HOST}/directions?originId=${sourceId}&destinationId=${destinationId}`
  );

  if (!directionsResponse.ok) {
    return { error: "Erro ao buscar dados de rota" };
  }

  const directionsData: DirectionsApiProps = await directionsResponse.json();

  const startAddress = directionsData.routes[0].legs[0].start_address;
  const endAddress = directionsData.routes[0].legs[0].end_address;

  const bodyFech: CreateRoutesProps = {
    source_id: String(sourceId),
    destination_id: String(destinationId),
    name: `${startAddress} -> ${endAddress}`,
  };

  const response = await fetch(`${URLS_HOST.API_HOST}/routes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...bodyFech }),
  });

  if (!response.ok) {
    return { error: "falied create routes" };
  }
  return { success: true };
}



