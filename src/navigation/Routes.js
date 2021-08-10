import {SignIn} from "../features/signIn/SignIn.js";
import {
    CATEGORY_ARTESANIAS, CATEGORY_INICIAR_SESSION,
    CATEGORY_PANADERIA,
    CATEGORY_PASTELERIA,
    CATEGORY_VEGANO,
    CATEGORY_VEGETARIANO
} from "../utils/constants/constants";

export const routes = [
    {
        path: `/category/${CATEGORY_PANADERIA}`,
        text: CATEGORY_PANADERIA
    },
    {
        path: `/category/${CATEGORY_PASTELERIA}`,
        text: CATEGORY_PASTELERIA
    },
    {
        path: `/category/${CATEGORY_VEGETARIANO}`,
        text: CATEGORY_VEGETARIANO
    },
    {
        path: `/category/${CATEGORY_VEGANO}`,
        text: CATEGORY_VEGANO
    },
    {
        path: `/category/${CATEGORY_ARTESANIAS}`,
        text: CATEGORY_ARTESANIAS
    }
];

export const sessionLoginRoutes = [
    {
        path: "/signIn",
        component: SignIn,
        text: CATEGORY_INICIAR_SESSION
    }
];

export const socialMediaRoutes = [
    {
        text: 'Facebook',
        url: 'https://www.facebook.com/Nelumbo-Jujuy-117281097208798'
    },
    {
        text: 'Instagram',
        url: 'https://www.instagram.com/nelumbojujuy/'
    }
];
