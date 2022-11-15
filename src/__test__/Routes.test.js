import { MemoryRouter} from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { Routes, StoreWrapper } from '../Container'
import { createMemoryHistory } from 'history'



describe('Pole App testing', () => {
  test('register link',() =>{
    const registerRoute = '/register'
    const history = createMemoryHistory();
    render(
      <MemoryRouter initialEntries={[registerRoute]} initialIndex={0} history={history}>
        <StoreWrapper>
          <Routes/>
        </StoreWrapper>
      </MemoryRouter> ,
    )
    console.log(window.location.pathname)
    expect(history.location.pathname).toMatch('/')
  })
})