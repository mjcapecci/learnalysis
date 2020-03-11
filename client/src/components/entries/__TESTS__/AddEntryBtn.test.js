import React from 'react';
import { mount } from 'enzyme';
import { AddEntryBtn } from '../AddEntryBtn';

// State Management
import { Provider } from 'react-redux';
import store from '../../../store';

function setup() {
  const props = {
    AddEntry: jest.fn()
  };

  const mainWrapper = mount(
    <Provider store={store}>
      <AddEntryBtn {...props} />
    </Provider>
  );

  return {
    props,
    mainWrapper
  };
}

describe('Add Btn', () => {
  it('should render self and subcomponents', () => {
    const { mainWrapper } = setup();
    expect(mainWrapper.find('.btn-floating').length).toBe(1);
    const btnProps = mainWrapper.find('.btn-floating').props();
    expect(btnProps.href).toBe('#add-entry-modal');
  });
});
