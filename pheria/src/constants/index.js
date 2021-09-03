import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
export const STATUS_BAR_HEIGHT = getStatusBarHeight()

export const COLOR = '#1b6563cc'