import {screen, waitFor} from '@testing-library/react';
import {renderWithRouterAndRedux} from '../../utils/TestUtils';
import {OrderConfirmation} from "./OrderConfirmation";

const url = '/OrderConfirmation';

jest.mock('react-router-dom', () => ({
    // use actual for all non-hook parts
    ...jest.requireActual('react-router-dom'),
}));

describe('Tests del componente OrderConfirmation.', () => {
    it('El componente OrderConfirmation se renderiza correctamente.', async () => {
        const tree = renderWithRouterAndRedux(<OrderConfirmation/>, url);
        await waitFor(() => {
            let orderConfirmationText = screen.getAllByText("Gracias por tu compra!")[0];
            expect(orderConfirmationText).toBeInTheDocument();
        });
        expect(tree).toMatchSnapshot();
    });
});

