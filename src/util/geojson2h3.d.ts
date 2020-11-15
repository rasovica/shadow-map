declare module "geojson2h3" {
  export function featureToH3Set(feature: any, resolution: number): string[];
}
