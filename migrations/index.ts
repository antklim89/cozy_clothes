import * as migration_20250218_210413 from './20250218_210413';


export const migrations = [
  {
    up: migration_20250218_210413.up,
    down: migration_20250218_210413.down,
    name: '20250218_210413',
  },
];
