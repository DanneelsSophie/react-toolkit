import React, { ComponentType } from 'react';
import { mount } from 'enzyme';
import withClassDefault from './withClassDefault.hoc';

type MyComponentProps = {
  foo: string;
};
const MyComponent: ComponentType<MyComponentProps> = (props) => {
  const { foo } = props;
  return <span>{foo}</span>;
};

describe('HOC withClassDefault', () => {
  it('Should have defaultClassName when none provided', () => {
    // Arrange
    const defaultClassName = 'some-class-name';
    const enhance = withClassDefault(defaultClassName);
    const Enhanced = enhance(MyComponent);

    // Act
    const wrapper = mount(<Enhanced foo="bar" />);

    // Assert
    expect(wrapper.find(MyComponent).prop('className')).toEqual(
      defaultClassName
    );
  });

  it('Should have className when provided', () => {
    // Arrange
    const className = 'my-class-name';
    const defaultClassName = 'some-class-name';
    const enhance = withClassDefault(defaultClassName);
    const Enhanced = enhance(MyComponent);

    // Act
    const wrapper = mount(<Enhanced foo="bar" className={className} />);

    // Assert
    expect(wrapper.find(MyComponent).prop('className')).toEqual(className);
  });
});
