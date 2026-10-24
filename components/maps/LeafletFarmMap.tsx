'use client'

import { useMemo } from 'react'
import { MapContainer, Marker, Polygon, TileLayer, useMapEvents } from 'react-leaflet'
import { divIcon } from 'leaflet'
import type { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  center: [number, number]
  polygon: [number, number][]
  drawing: boolean
  onAddPoint: (point: [number, number]) => void
  onMovePoint: (index: number, point: [number, number]) => void
}

function DrawingEvents({ drawing, onAddPoint }: Pick<Props, 'drawing' | 'onAddPoint'>) {
  useMapEvents({
    click(event) {
      if (drawing) onAddPoint([event.latlng.lat, event.latlng.lng])
    },
  })
  return null
}

function pointFromEvent(event: { target: { getLatLng: () => LatLng } }): [number, number] {
  const point = event.target.getLatLng()
  return [point.lat, point.lng]
}

export default function LeafletFarmMap({ center, polygon, drawing, onAddPoint, onMovePoint }: Props) {
  const vertexIcon = useMemo(() => divIcon({
    className: 'farm-vertex-marker',
    html: '<span></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  }), [])

  return (
    <MapContainer center={center} zoom={15} scrollWheelZoom className="map-canvas">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DrawingEvents drawing={drawing} onAddPoint={onAddPoint} />
      {polygon.length >= 3 && <Polygon positions={polygon} pathOptions={{ color: '#174b35', weight: 3, fillColor: '#3d8852', fillOpacity: 0.27 }} />}
      {polygon.map((point, index) => (
        <Marker
          key={`${index}-${point[0]}-${point[1]}`}
          position={point}
          icon={vertexIcon}
          draggable
          eventHandlers={{ dragend: (event) => onMovePoint(index, pointFromEvent(event)) }}
        />
      ))}
    </MapContainer>
  )
}
