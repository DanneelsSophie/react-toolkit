import React, { ComponentType } from 'react';
import { shallow } from 'enzyme';
import withClickId from './withClickId.hoc';

interface MyComponentProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  foo: string;
}
const MyComponent: ComponentType<MyComponentProps> = (props) => (
  <a {...props} />
);

describe('withClickId', () => {
  it('onClick should return id', () => {
    // Arrange
    const Enhanced = withClickId<MyComponentProps>({
      event: ['onClick'],
    })(MyComponent);
    const onClick = jest.fn();
    const preventDefault = jest.fn();
    const id = 'id';
    const wrapper = shallow(<Enhanced foo="bar" id={id} onClick={onClick} />);

    // Act
    wrapper.find('MyComponent').simulate('click', {
      preventDefault,
      currentTarget: { id },
    });

    // Assert
    expect(onClick).toBeCalledWith({ id });
  });

  it('onClick should call preventDefault', () => {
    // Arrange
    const Enhanced = withClickId<MyComponentProps>({
      event: ['onClick'],
    })(MyComponent);
    const onClick = jest.fn();
    const preventDefault = jest.fn();
    const id = 'id';
    const wrapper = shallow(<Enhanced foo="bar" id={id} onClick={onClick} />);

    // Act
    wrapper.find('MyComponent').simulate('click', {
      preventDefault,
      currentTarget: { id },
    });

    // Assert
    expect(preventDefault).toBeCalled();
  });

  it('onClick should NOT call preventDefault', () => {
    // Arrange
    const Enhanced = withClickId<MyComponentProps>({
      event: ['onClick'],
    })(MyComponent);
    const preventDefault = jest.fn();
    const id = 'id';
    const wrapper = shallow(<Enhanced foo="bar" id={id} />);

    // Act
    wrapper.find('MyComponent').simulate('click', {
      preventDefault,
      currentTarget: { id },
    });

    // Assert
    expect(preventDefault).not.toBeCalled();
  });
});
