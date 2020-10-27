import React from 'react';
import { render } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import ModalCore from './ModalCore';

describe('<ModalCore>', () => {
  it('should render modalCore', () => {
    const { asFragment } = render(
      <ModalCore isOpen onOutsideTap={jest.fn()}>
        Content
      </ModalCore>,
      { container: document.body }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should invoke onOutsideTap when modal is close', () => {
    const onOutsideTap = jest.fn();
    const { container } = render(
      <div id="root">
        <ModalCore isOpen onOutsideTap={onOutsideTap}>
          Content
        </ModalCore>
      </div>,

      { container: document.body }
    );

    UserEvent.click(container.querySelector('.ReactModal__Overlay'));
    expect(onOutsideTap).toBeCalled();
  });
});
