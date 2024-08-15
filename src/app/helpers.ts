export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Because Math.random is not seedable, we need to create our own seeded random number generator
let seed = 2;
export function setSeed(newSeed: number) {
  seed = newSeed;
}

export function random() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
