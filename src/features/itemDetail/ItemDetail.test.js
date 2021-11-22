import { prettyDOM, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/TestUtils';
import {storeProducts} from "../../mocks/mockData";
import {ItemDetail} from "./ItemDetail";

const product = storeProducts[3];
const url = `/Item/${product.id}`;

jest.mock('react-router-dom', () => ({
    // use actual for all non-hook parts
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: 'Ll7FEo7mE7SC6bB4LeyF' }),
}));

describe('Tests del componente ItemDetail.', () => {
    it('El componente ItemDetail se renderiza correctamente.', async () => {
        const tree = renderWithRouterAndRedux(<ItemDetail product={product}/>, url);
        await waitFor(() => {
            expect(screen.getAllByText(product.title)[0]).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
            const addToCartButtonText = screen.queryByText('AGREGAR AL CARRITO');
            expect(addToCartButtonText).toBeInTheDocument();
        });
        expect(tree).toMatchSnapshot();
    });
});

