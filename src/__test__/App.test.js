import { render, screen } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import App from '../App'
import { Routes, StoreWrapper } from '../Container'
import { createMemoryHistory } from 'history'

describe('Pole App testing', () => {

  test('default route',()=>{
    const history = createMemoryHistory()
    render(<App/>)
    expect(history.location.pathname).toMatch('/')
  })

});
