export interface PomoTimer {
  minutes: number;
  seconds: number;
  isBreak: boolean;
  isPaused?: boolean;
}

export interface Time {
  hour: number;
  minute: number;
  seconds: number;
  month: number;
  day: number;
  year: number;
}
