"use client";

import { useEffect, useRef } from "react";
import { DirectionsData } from "../../utils/models";
import { useMap } from "@/hook/useMap";
import { DirectionsApiProps } from "@/app/route/@types/@types.directions";

export type MapNewRouteProps = {
  directionsData: DirectionsApiProps | null;
};

export function MapNewRoute(props: MapNewRouteProps) {
  const { directionsData } = props;
  const mapContainerRef = useRef<HTMLDivElement>(null) as any;
  const map = useMap(mapContainerRef);

  useEffect(() => {
    // Verifica se o mapa e directionsData estão disponíveis
    if (!map || !directionsData) {
      return;
    }

    map.removeAllRoutes();

    // Só tenta adicionar a rota se directionsData for válido
    if (directionsData.routes && directionsData.routes[0]?.legs[0]) {
      map.addRouteWithIcons({
        routeId: "1",
        startMarkerOptions: {
          position: directionsData.routes[0].legs[0].start_location,
        },
        endMarkerOptions: {
          position: directionsData.routes[0].legs[0].end_location,
        },
        carMarkerOptions: {
          position: directionsData.routes[0].legs[0].start_location,
        },
      });
    }
  }, [map, directionsData]);

  return <div className="w-2/3 h-full" ref={mapContainerRef} />;
}
