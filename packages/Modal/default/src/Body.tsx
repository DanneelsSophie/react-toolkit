import React from 'react';
import {
  withClassDefault,
  withClassModifier,
  WithClassModifierOptions,
  compose,
} from '@axa-fr/react-toolkit-core';
import Div, { DivProps } from './Div';

const DEFAULT_CLASSNAME = 'af-modal__body';

export type BodyProps = DivProps & WithClassModifierOptions;

const Body = ({ classModifier, ...rest }: BodyProps) => <Div {...rest} />;

const enhance = compose<DivProps, BodyProps>(
  withClassDefault(DEFAULT_CLASSNAME),
  withClassModifier
);

const Enhanced = enhance(Body);
Enhanced.displayName = 'Body';
export default Enhanced;
