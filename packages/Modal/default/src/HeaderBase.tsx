import React from 'react';

import {
  withClassDefault,
  withClassModifier,
  WithClassModifierOptions,
  compose,
} from '@axa-fr/react-toolkit-core';
import Div, { DivProps } from './Div';

const DEFAULT_CLASSNAME = 'af-modal__header';

export type HeaderBaseProps = DivProps & WithClassModifierOptions;

const HeaderBase = ({ classModifier, ...rest }: HeaderBaseProps) => (
  <Div {...rest} />
);

const enhance = compose<DivProps, HeaderBaseProps>(
  withClassDefault(DEFAULT_CLASSNAME),
  withClassModifier
);

const Enhanced = enhance(HeaderBase);
Enhanced.displayName = 'HeaderBase';
export default Enhanced;
