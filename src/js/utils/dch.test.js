// Importing the 'dch' function
import dch from './dch';

// Test Suite for 'dch' function
describe('dch function', () => {
  // Test case to check if it returns a div element when no parameters are passed
  test('should return a div element when no parameters are passed', () => {
    expect(dch().tagName).toBe('DIV');
  });

  // Test case to check if it returns an element with the given tag name
  test('should return an element with the given tag name', () => {
    expect(dch('p').tagName).toBe('P');
  });

  // Test case to check if it adds the given class names to the element
  test('should add the given class names to the element', () => {
    const el = dch('div', ['header', 'container']);
    expect(el.classList.contains('header')).toBe(true);
    expect(el.classList.contains('container')).toBe(true);
  });

  // Test case to check if it sets the innerHTML of the element
  test('should set the innerHTML of the element', () => {
    const el = dch('p', [], '<strong>Hello</strong>');
    expect(el.innerHTML).toBe('<strong>Hello</strong>');
  });

  // Test case to check if it appends the child nodes to the element
  test('should append the child nodes to the element', () => {
    const child1 = document.createElement('span');
    const child2 = document.createElement('a');
    const el = dch('div', [], '', [child1, child2]);
    expect(el.childNodes.length).toBe(2);
    expect(el.childNodes[0]).toBe(child1);
    expect(el.childNodes[1]).toBe(child2);
  });
});
