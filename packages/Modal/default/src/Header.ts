import { compose, withClickId, withProps } from '@axa-fr/react-toolkit-core';
import HeaderCore, { HeaderCoreProps } from './HeaderCore';

export type HeaderProps = HeaderCoreProps;

const setWithProps = (props: HeaderProps) => ({
  ...props,
  children: props.title,
});

const enchance = compose(
  withClickId<HeaderCoreProps>({ event: ['onCancel'] }),
  withProps(setWithProps)
)(HeaderCore);

enchance.displayName = 'Header';

export default enchance;
