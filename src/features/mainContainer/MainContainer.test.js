import {screen, waitFor} from '@testing-library/react';
import {renderWithRouterAndRedux} from '../../utils/TestUtils';
import {MainContainer} from "./MainContainer";

const url = '/';

jest.mock('react-router-dom', () => ({
    // use actual for all non-hook parts
    ...jest.requireActual('react-router-dom'),
}));

describe('Tests del componente MainContainer.', () => {
    it('El componente ItemDetail se renderiza correctamente.', async () => {
        const tree = renderWithRouterAndRedux(<MainContainer/>, url);
        await waitFor(() => {
            let panaderiaText = screen.getAllByText("PANADERIA")[0];
            expect(panaderiaText).toBeInTheDocument();
            let vegetarianoText = screen.getAllByText("VEGETARIANO")[0];
            expect(vegetarianoText).toBeInTheDocument();
            let veganoText = screen.getAllByText("VEGANO")[0];
            expect(veganoText).toBeInTheDocument();
            let pasteleriaText = screen.getAllByText("PASTELERIA")[0];
            expect(pasteleriaText).toBeInTheDocument();
            let usuarioText = screen.getAllByText("USUARIO")[0];
            expect(usuarioText).toBeInTheDocument();
            let facebookText = screen.getAllByText("Facebook")[0];
            expect(facebookText).toBeInTheDocument();
            let whatsAppText = screen.getAllByText("WhatsApp")[0];
            expect(facebookText).toBeInTheDocument();
        });
        expect(tree).toMatchSnapshot();
    });
});

