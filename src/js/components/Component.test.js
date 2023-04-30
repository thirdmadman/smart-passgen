// Importing the 'Component' class
import Component from './Component';

// Test Suite for 'Component' class
describe('Component class', () => {
  // Test case to check if it returns a div element as root node
  test('should return a div element as root node', () => {
    const component = new Component();
    expect(component.getElement().tagName).toBe('DIV');
  });

  // Test case to check if it sets the classNames to the root node
  test('should set the classNames to the root node', () => {
    const component = new Component();
    component.rootNode.classList.add('header', 'container');
    expect(component.getElement().classList.contains('header')).toBe(true);
    expect(component.getElement().classList.contains('container')).toBe(true);
  });

  // Test case to check if it updates the innerHTML of the root node
  test('should update the innerHTML of the root node', () => {
    const component = new Component();
    component.rootNode.innerHTML = '<strong>Hello</strong>';
    expect(component.getElement().innerHTML).toBe('<strong>Hello</strong>');
  });
});
