import React, { ComponentType } from 'react';
import { mount } from 'enzyme';
import withClassDefault from './withClassDefault.hoc';
import withClassModifier from './withClassModifier.hoc';
import compose from './compose';

type MyComponentProps = {
  foo: string;
  classModifier: string;
};
const MyComponent: ComponentType<MyComponentProps> = (props) => {
  const { foo } = props;
  return <span>{foo}</span>;
};

describe('compose should', () => {
  it('apply all HOC', () => {
    // Arrange
    const defaultClassName = 'some-class-name';
    const classModifier = 'modifier';
    const enhance = compose(
      withClassDefault<MyComponentProps>(defaultClassName),
      withClassModifier()
    );
    const Enhanced = enhance(MyComponent);

    // Act
    const wrapper = mount(<Enhanced foo="bar" classModifier={classModifier} />);

    // Assert
    const expectedClassName = `${defaultClassName} ${defaultClassName}--${classModifier}`;
    expect(wrapper.find(MyComponent).prop('className')).toEqual(
      expectedClassName
    );
  });

  it('loose type of props when more than HOC', () => {
    // Arrange
    const identity = <T extends {}>() => (
      BaseComponent: React.ComponentType<T>
    ): React.ComponentType<T> => {
      return (props: T) => {
        const newProps = {
          ...props,
        };
        return <BaseComponent {...newProps} />;
      };
    };
    const enhance = compose(
      identity<MyComponentProps>(),
      identity(),
      identity(),
      identity(),
      identity(),
      identity(),
      identity(),
      identity()
    );
    const Enhanced = enhance(MyComponent);

    // Act
    const wrapper = mount(<Enhanced />);

    // Assert
    expect(wrapper.find(MyComponent).prop('foo')).toBeFalsy();
  });
});
