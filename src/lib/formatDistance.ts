export const formatDistance = (distance: number | null): string => {
  if (distance === null) return '-';

  if (distance < 1000) {
    return `${distance}m`;
  }

  const distanceInKm = (distance / 1000).toFixed(1);
  return `${distanceInKm}km`;
};
