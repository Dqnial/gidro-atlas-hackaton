import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FtdWVsY29sdCIsImEiOiJjbWJpMnhhczgwMWJuMmtzZDZhdml5dXozIn0.JfvBcjIHEEk_Ab5rd0dG7Q";

const waterObjects = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "1",
      properties: {
        name: "Капшагайское водохранилище",
        type: "водохранилище",
        risk: "средний",
        level: "высокий",
        last_inspection: "2025-12-01",
      },
      geometry: { type: "Point", coordinates: [77.0, 45.5] },
    },
    {
      type: "Feature",
      id: "2",
      properties: {
        name: "Иртышский канал",
        type: "канал",
        risk: "низкий",
        level: "средний",
        last_inspection: "2025-11-20",
      },
      geometry: { type: "Point", coordinates: [80.5, 50.0] },
    },
  ],
};

const MapboxMapComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current as HTMLDivElement,
      style: "mapbox://styles/samuelcolt/cmitf7mst002k01s6ffrggzvw",
      center: [66.5, 48.0],
      zoom: 4,
      maxBounds: [
        [46.0, 40.0],
        [87.0, 56.0],
      ],
      projection: { name: "mercator" },
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("water-points", { type: "geojson", data: waterObjects });

      map.addLayer({
        id: "water-circles",
        type: "circle",
        source: "water-points",
        paint: {
          "circle-radius": 8,
          "circle-color": "#3b82f6",
          "circle-stroke-color": "#1e40af",
          "circle-stroke-width": 2,
        },
      });

      map.on("mouseenter", "water-circles", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "water-circles", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "water-circles", (e) => {
        if (!e.features || !e.features.length) return;
        const f = e.features[0];
        const props = f.properties as any;

        // Сохраняем данные в state
        setSelectedFeature(props);
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="flex gap-4">
      {/* Карта */}
      <div
        ref={containerRef}
        className="w-[900px] h-[600px] rounded-xl shadow-lg border border-gray-300"
      />

      {/* Боковая панель с информацией */}
      <div className="w-[300px] p-4 rounded-xl shadow-lg border border-gray-300 bg-white">
        <h2 className="text-lg font-bold mb-2">Информация об объекте</h2>
        {selectedFeature ? (
          <div>
            <div>
              <strong>Название:</strong> {selectedFeature.name}
            </div>
            <div>
              <strong>Тип:</strong> {selectedFeature.type}
            </div>
            <div>
              <strong>Риск:</strong> {selectedFeature.risk}
            </div>
            <div>
              <strong>Уровень:</strong> {selectedFeature.level}
            </div>
            <div>
              <strong>Последняя инспекция:</strong>{" "}
              {selectedFeature.last_inspection}
            </div>
          </div>
        ) : (
          <div>Выберите объект на карте</div>
        )}
      </div>
    </div>
  );
};

export default MapboxMapComponent;
