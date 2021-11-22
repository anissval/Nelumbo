import { renderWithRouterAndRedux } from '../../utils/TestUtils';
import {ItemDetailContainer} from "./ItemDetailContainer";

const url = `/ItemDetailContainer`;

jest.mock('react-router-dom', () => ({
    // use actual for all non-hook parts
    ...jest.requireActual('react-router-dom'),
}));

describe('Tests del componente ItemDetailContainer.', () => {
    it('El componente ItemDetailContainer se renderiza correctamente.', async () => {
        const tree = renderWithRouterAndRedux(<ItemDetailContainer/>, url);
        expect(tree).toMatchSnapshot();
    });
});

