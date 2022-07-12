const RED = 'red';
const YELLOW = '#ffca3a';
const LIGHT_GREEN = '#A2D476';
const PURPLE = '#6a4c93'
const DARK_BLUE = '#1982c4';
const PINK = '#ff595e';
const BLACK = 'black';
const WHITE = 'white';

const CONSTANTS = {
  margin: 2,
  DEFAULT: [YELLOW, PINK, LIGHT_GREEN, PURPLE, BLACK, WHITE],
  SORTED: [LIGHT_GREEN, RED, YELLOW, PURPLE, BLACK, WHITE],
  PROCESSING: [DARK_BLUE, RED, LIGHT_GREEN, PURPLE, BLACK, WHITE],
  CURRENT_MIN: [RED, YELLOW, DARK_BLUE, LIGHT_GREEN, BLACK, WHITE],
  DELAY: 4, // SG 07/09/2022 13:54  4ms
  OFFSET: 280 // SG 07/11/2022 11:18 unit: px, defining the offset of the canvas 
}

export { CONSTANTS }