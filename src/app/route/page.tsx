import { URLS_HOST } from "@/enums/enum";
import { CreateRoutesProps, RouteProps } from "./@types/@types";
import { DirectionsApiProps } from "./@types/@types.directions";
import {  searchDirections } from "./storage/storage";
import { NewRouteForm } from "@/components/newRouteForm/NewRouteForm";
import { MapNewRoute } from "@/components/mapNewRoute/MapNewRoute";





export default async function Router({ searchParams }: RouteProps) {
  const { destination, source } = await searchParams;

  const result =
    source && destination ? await searchDirections(source, destination) : null;

  let directionData: DirectionsApiProps | null = null;
  let placeSourceId: string | null = null;
  let placeDestinationId: string | null = null;

  if (result) {
    directionData = result.directionsData;
    placeSourceId = result.placeSourceId;
    placeDestinationId = result.placeDestinationId;
  }

  return (
    <div>
      <div className="flex flex-1 w-full h-full">
        <div className="w-1/3 p-4 h-full">
          <h4 className="text-3xl text-contrast mb-2">Nova rota</h4>
          <form className="flex flex-col space-y-4" method="get">
            <div className="relative">
              <input
                id="source"
                name="source"
                type="search"
                placeholder=""
                defaultValue={source}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-contrast bg-default border-0 border-b-2 border-contrast appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              />
              <label
                htmlFor="source"
                className="absolute text-contrast duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Origem
              </label>
            </div>
            <div className="relative">
              <input
                id="destination"
                name="destination"
                type="search"
                placeholder=""
                defaultValue={destination}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-contrast bg-default border-0 border-b-2 border-contrast appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              />
              <label
                htmlFor="destination"
                className="absolute text-contrast duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Destino
              </label>
            </div>
            <button
              type="submit"
              className="bg-main text-primary p-2 rounded text-xl font-bold"
            >
              Pesquisar
            </button>
          </form>
          {directionData && (
            <div className="mt-4 p-4 border rounded text-contrast">
              <ul>
                <li className="mb-2">
                  <strong>Origem: </strong>
                  <span>{directionData.routes[0].legs[0].start_address}</span>
                </li>
                <li className="mb-2">
                  <strong>Destino: </strong>
                  <span>{directionData.routes[0].legs[0].end_address}</span>
                </li>
                <li className="mb-2">
                  <strong>Distância: </strong>
                  <span>{directionData.routes[0].legs[0].distance.text}</span>
                </li>
                <li className="mb-2">
                  <strong>Duração: </strong>
                  <span>{directionData.routes[0].legs[0].duration.text}</span>
                </li>
              </ul>

              <NewRouteForm>
                {placeSourceId && (
                  <input type="hidden" name="sourceId" value={placeSourceId} />
                )}

                {placeDestinationId && (
                  <input
                    type="hidden"
                    name="destinationId"
                    value={placeDestinationId}
                  />
                )}

                <button
                  type="submit"
                  className="bg-main text-primary p-2 mt-20 mb-3 rounded text-xl font-bold w-full hover:bg-hover_button transition-all duration-300"
                >
                  Adicionar ao mapa
                </button>
              </NewRouteForm>
            </div>
          )}
        </div>
        <MapNewRoute directionsData={directionData}/>
      </div>
    </div>
  );
}
