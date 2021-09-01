import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders teriser title', () => {
    render(<App/>);
    const titleElement = screen.getByText(/teriser/i);
    expect(titleElement).toBeInTheDocument();
});
