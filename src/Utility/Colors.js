export const TEST_COLOR     = '#FF66CC';
export const BURN_COLOR     = '#fad6ee';
export const PATH_COLOR     = '#63caef';
export const WALL_COLOR     = '#624646';
export const GOAL_COLOR     = '#30fa04';
export const START_COLOR    = '#ff0000';
export const SELECTED_COLOR = '#ffd300';
export const FLOOR_COLOR    = '#ffffff';
export const DEFAULT_COLOR  = '#8f8d8d';
export const FLOOR_TYPE     = '_floor_';
export const DEFAULT_TYPE   = '_default_';
export const WALL_TYPE      = '_wall_';
export const PATH_TYPE      = '_path_';
export const GOAL_TYPE      = '_goal_';
export const START_TYPE     = '_start_';
export const TEST_TYPE      = '_test_';


export function getColor(type) {
  switch (type) {
    case FLOOR_TYPE:
      return FLOOR_COLOR;
    case WALL_TYPE:
      return WALL_COLOR;
    case PATH_TYPE:
      return PATH_COLOR;
    case GOAL_TYPE:
      return GOAL_COLOR;
    case START_TYPE:
      return START_COLOR;
    case TEST_TYPE:
      return TEST_COLOR;
    case DEFAULT_TYPE:
      return DEFAULT_COLOR;
    default:
      return '#ffffff';
  }
}