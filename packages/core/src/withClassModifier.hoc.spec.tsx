import React, { ComponentType } from 'react';
import { mount } from 'enzyme';
import withClassModifier, {
  WithClassModifierOptions,
} from './withClassModifier.hoc';

type MyComponentProps = {
  foo: string;
} & WithClassModifierOptions;
const MyComponent: ComponentType<MyComponentProps> = (props) => {
  const { foo } = props;
  return <span>{foo}</span>;
};

describe('HOC withClassDefault', () => {
  it('Should have className without modifier', () => {
    // Arrange
    const className = 'some-class-name';
    const Enhanced = withClassModifier<MyComponentProps>()(MyComponent);

    // Act
    const wrapper = mount(<Enhanced foo="bar" className={className} />);

    // Assert
    expect(wrapper.prop('className')).toEqual(className);
  });

  it('Should have className with modifier', () => {
    // Arrange
    const className = 'some-class-name';
    const classModifier = 'modifier';
    const Enhanced = withClassModifier<MyComponentProps>()(MyComponent);

    // Act
    const wrapper = mount(
      <Enhanced foo="bar" className={className} classModifier={classModifier} />
    );

    // Assert
    const expectedClassName = `${className} ${className}--${classModifier}`;
    expect(wrapper.find(MyComponent).prop('className')).toEqual(
      expectedClassName
    );
  });
});
