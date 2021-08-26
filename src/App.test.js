import { render, screen, fireEvent, waitFor, waitForElement, act} from '@testing-library/react';

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';

import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import App from './App';

import handlers from './mocks/handlers';

const server = setupServer(handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('document should contain storybook', () => {
  render(<App />);
  const element = screen.getByText(/Storybook/i);
  expect(element).toBeInTheDocument();
});

test('should display story 1', async () => {

  render(<App />);

  await waitFor(() =>
    expect(screen.getByTestId('title-1')).toHaveTextContent("Mohandas Karamchand Gandhi")
  )

});

test('should update story', async () => {

  render(<App />);

  fireEvent.click(screen.getByTestId('next'))
  const story_2 = screen.getByTestId('story-2')
  expect(story_2.style._values.display).toBe("flex")

});
