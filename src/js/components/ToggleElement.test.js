/* eslint-disable import/no-extraneous-dependencies */
// Importing 'ToggleElement' class and required libraries
import { fireEvent } from '@testing-library/dom';
import ToggleElement from './ToggleElement';

// Test Suite for 'ToggleElement' class
describe('ToggleElement class', () => {
  // Test case to check if it renders correctly with default props
  test('should render with default props', () => {
    const component = new ToggleElement({});

    // render the component
    document.body.append(component.rootNode);

    // assertion
    expect(component.rootNode.querySelector('.toggle-group__label')).toBeTruthy();
    expect(component.rootNode.querySelector('.toggle-group__button').checked).toBeFalsy();

    // cleanup
    component.rootNode.remove();
  });

  // Test case to check if it handles click event correctly
  test('should handle click event correctly', () => {
    const mockOnClick = jest.fn();
    const component = new ToggleElement({ currentState: true, onclick: mockOnClick, textContent: 'Test' });

    // render the component
    document.body.append(component.rootNode);

    // perform a click on the toggle button
    const toggleButton = component.rootNode.querySelector('.toggle-group__button');
    fireEvent.click(toggleButton);

    // assertion
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(toggleButton.checked).toBeFalsy();

    // cleanup
    component.rootNode.remove();
  });
});
