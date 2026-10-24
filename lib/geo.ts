import type { Farm, FarmLocation } from '@/data/types'

const EARTH_RADIUS_METERS = 6_371_008.8
const SQUARE_METERS_PER_FEDDAN = 4_200.83

export function calculatePolygonArea(points: [number, number][]) {
  if (points.length < 3) return 0

  let sum = 0
  for (let index = 0; index < points.length; index += 1) {
    const [latitude, longitude] = points[index]
    const [nextLatitude, nextLongitude] = points[(index + 1) % points.length]
    const latitudeRadians = (latitude * Math.PI) / 180
    const nextLatitudeRadians = (nextLatitude * Math.PI) / 180
    const longitudeDelta = ((nextLongitude - longitude) * Math.PI) / 180
    sum += longitudeDelta * (2 + Math.sin(latitudeRadians) + Math.sin(nextLatitudeRadians))
  }

  return Math.abs((sum * EARTH_RADIUS_METERS * EARTH_RADIUS_METERS) / 2)
}

export function getPolygonCenter(points: [number, number][]): [number, number] {
  if (!points.length) return [31.034, 30.468]
  const [latitudeTotal, longitudeTotal] = points.reduce(
    ([latitude, longitude], point) => [latitude + point[0], longitude + point[1]],
    [0, 0]
  )
  return [latitudeTotal / points.length, longitudeTotal / points.length]
}

export function buildFarm(
  location: FarmLocation,
  polygon: [number, number][],
  name = 'أرضي'
): Farm {
  const area = calculatePolygonArea(polygon)
  const feddans = area / SQUARE_METERS_PER_FEDDAN

  return {
    id: `farm-${Date.now()}`,
    name,
    governorate: location.governorate,
    district: location.district,
    village: location.village,
    area_m2: Math.round(area),
    area_feddan: Math.round(feddans * 100) / 100,
    area_qirat: Math.round(feddans * 24),
    polygon,
    center: getPolygonCenter(polygon),
    createdAt: new Date().toISOString(),
  }
}

export function formatArea(areaSquareMeters: number) {
  const totalFeddans = areaSquareMeters / SQUARE_METERS_PER_FEDDAN
  return {
    squareMeters: Math.round(areaSquareMeters),
    feddans: Math.round(totalFeddans * 100) / 100,
    qirats: Math.round(totalFeddans * 24),
  }
}
