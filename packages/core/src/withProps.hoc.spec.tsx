import React, { ComponentType } from 'react';
import { mount } from 'enzyme';
import withProps from './withProps.hoc';

type MyComponentProps = {
  foo: string;
};
const MyComponent: ComponentType<MyComponentProps> = (props) => {
  const { foo } = props;
  return <span>{foo}</span>;
};

describe('HOC withProps', () => {
  it('Should have mapped props', () => {
    // Arrange
    type MapperType = {
      bar: string;
    };
    const propsMapper = (props: MyComponentProps) => {
      const { foo } = props;
      return {
        bar: `${foo}-${foo}`,
      };
    };
    const Enhanced = withProps<MyComponentProps, MapperType>(propsMapper)(
      MyComponent
    );

    // Act
    const wrapper = mount(<Enhanced foo="bar" />);

    // Assert
    expect(wrapper.find(MyComponent).prop('bar')).toEqual('bar-bar');
  });

  it('Should override mapped props', () => {
    // Arrange
    type MapperType = {
      foo: string;
    };
    const propsMapper = (props: MyComponentProps) => {
      const { foo } = props;
      return {
        foo: `${foo}-${foo}`,
      };
    };
    const Enhanced = withProps<MyComponentProps, MapperType>(propsMapper)(
      MyComponent
    );

    // Act
    const wrapper = mount(<Enhanced foo="bar" />);

    // Assert
    expect(wrapper.find(MyComponent).prop('foo')).toEqual('bar-bar');
  });
});
