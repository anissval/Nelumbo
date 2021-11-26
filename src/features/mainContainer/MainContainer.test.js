import {fireEvent, screen, waitFor} from '@testing-library/react';
import {renderWithRouterAndRedux} from '../../utils/TestUtils';
import {MainContainer} from "./MainContainer";

const url = '/';

jest.mock('react-router-dom', () => ({
    // use actual for all non-hook parts
    ...jest.requireActual('react-router-dom'),
}));

describe('Tests MainContainer.', () => {
    it('MainContainer se renderiza correctamente.', async () => {
        const tree = renderWithRouterAndRedux(<MainContainer/>, url);
        expect(tree).toMatchSnapshot();
    });

    it('Las categorias del MainContainer se renderizan correctamente.', async () => {
        renderWithRouterAndRedux(<MainContainer/>, url);
        await waitFor(() => {
            let panaderiaText = screen.getAllByText("PANADERIA")[0];
            expect(panaderiaText).toBeInTheDocument();
            let vegetarianoText = screen.getByText("VEGETARIANO");
            expect(vegetarianoText).toBeInTheDocument();
            let veganoText = screen.getByText("VEGANO");
            expect(veganoText).toBeInTheDocument();
            let pasteleriaText = screen.getByText("PASTELERIA");
            expect(pasteleriaText).toBeInTheDocument();
            let usuarioText = screen.getByText("USUARIO");
            expect(usuarioText).toBeInTheDocument();
            let facebookText = screen.getByText("Facebook");
            expect(facebookText).toBeInTheDocument();
            let whatsAppText = screen.getByText("WhatsApp");
            expect(whatsAppText).toBeInTheDocument();
        });
    });

    it('Cart widget esta presente en el MainContainer', async () => {
        renderWithRouterAndRedux(<MainContainer/>, url);
        await waitFor(() => {
            let shoppingCartIcon = screen.getByTestId("ShoppingCartIcon");
            expect(shoppingCartIcon).toBeInTheDocument();
        });
    });
    it('Es posible navegar al carrito de compras', async () => {
        renderWithRouterAndRedux(<MainContainer/>, url);
        await waitFor(() => {
            let shoppingCartIcon = screen.getByTestId("ShoppingCartIcon");
            fireEvent.click(shoppingCartIcon);
            let emptyCartImage = screen.getByAltText("empty cart");
            expect(emptyCartImage).toBeInTheDocument();
        });
    });
    it('Es posible hacer click en las categorias del MainContainer', async () => {
        renderWithRouterAndRedux(<MainContainer/>, url);
        await waitFor(() => {
            let panaderiaText = screen.getAllByText("PANADERIA")[0];
            fireEvent.click(panaderiaText);
            let vegetarianoText = screen.getByText("VEGETARIANO");
            fireEvent.click(vegetarianoText);
            let veganoText = screen.getByText("VEGANO");
            fireEvent.click(veganoText);
            let pasteleriaText = screen.getByText("PASTELERIA");
            fireEvent.click(pasteleriaText);
        });
    });
});

