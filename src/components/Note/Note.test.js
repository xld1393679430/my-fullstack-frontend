import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import Note from './index';
test('render content', () => {
    const content = 'Component testing is done with react-testing-library'
    const note = {
        content,
        important: true
    }

    const component = render(
        <Note note={note} />
    )

     // method 1
    expect(component.container).toHaveTextContent(content)

    // method 2
    const element = component.getByAltText(content)
    expect(element).toBeDefined(content)

    // method 3
    const div = component.container.querySelector('.note')
    expect(div).toHaveTextContent(content)
})
