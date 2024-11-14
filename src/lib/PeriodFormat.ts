export const validatePeriod = (value: string): number => {
  const numValue = Number(value);
  if (isNaN(numValue)) return 0;
  return Math.min(Math.max(0, numValue), 100); // 0~100 사이 값으로 제한
};
