import { prettyDOM, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/TestUtils';
import {Cart} from "./Cart";
const url = '/Cart';

jest.mock('react-router-dom', () => ({
    // use actual for all non-hook parts
    ...jest.requireActual('react-router-dom'),
}));

describe('Tests del componente Cart.', () => {
    it('El componente Cart se renderiza correctamente cuando el carrito esta vacio.', async () => {
        const tree = renderWithRouterAndRedux(<Cart/>, url);
        await waitFor(() => {
            expect(screen.getByText('TU CARRITO ESTA VACIO')).toBeInTheDocument();
        });
        expect(tree).toMatchSnapshot();
    });
});

