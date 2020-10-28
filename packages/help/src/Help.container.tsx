import {
  withClassDefault,
  withClassModifier,
  compose,
} from '@axa-fr/react-toolkit-core';
import Help, { Props } from './Help';

export const enhance = compose(
  withClassDefault<Props>('af-popover__container'),
  withClassModifier()
);

const Enhanced = enhance(Help);
Enhanced.displayName = 'Help';

export default Enhanced;
