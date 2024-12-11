import { URLS_HOST } from "@/enums/enum";
import {  PlacesProps } from "../@types/@types";
import { DirectionsApiProps } from "../@types/@types.directions";

export async function searchDirections(sources: string, destination: string) {
  const [sourceResponse, destinationResponse] = await Promise.all([
    fetch(`${URLS_HOST.API_HOST}/places?text=${sources}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 2,
      },
    }),
    fetch(`${URLS_HOST.API_HOST}/places?text=${destination}`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 2,
      },
    }),
  ]);

  if (!sourceResponse.ok) {
    throw new Error("Erro ao buscar dados de source");
  }

  if (!destinationResponse.ok) {
    throw new Error("Erro ao buscar dados de destination");
  }

  const [sourceData, destinationData] = await Promise.all<PlacesProps>([
    sourceResponse.json(),
    destinationResponse.json(),
  ]);

  const placeSourceId = sourceData.candidates[0].place_id;
  const placeDestinationId = destinationData.candidates[0].place_id;

  const directionsResponse = await fetch(
    `${URLS_HOST.API_HOST}/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 2,
      },
    }
  );

  if (!directionsResponse.ok) {
    throw new Error("Erro ao buscar dados de rota");
  }

  const directionsData: DirectionsApiProps = await directionsResponse.json();

  return {
    directionsData,
    placeSourceId,
    placeDestinationId,
  };
}

