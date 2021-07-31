import {Pasteleria} from "../features/pasteleria/Pasteleria";
import {Panaderia} from "../features/panaderia/Panaderia";
import {Vegetariano} from "../features/vegetariano/Vegetariano";
import {Vegano} from "../features/vegano/Vegano";
import {Artesanias} from "../features/artesanias/Artesanias";
import {SignIn} from "../features/signIn/SignIn.js";

export const routes = [
    {
        path: "/Panaderia",
        component: Panaderia,
        text: 'PANADERIA'
    },
    {
        path: "/Pasteleria",
        component: Pasteleria,
        text: 'PASTELERIA'
    },
    {
        path: "/Vegetariano",
        component: Vegetariano,
        text: 'VEGETARIANO'
    },
    {
        path: "/Vegano",
        component: Vegano,
        text: 'VEGANO'
    },
    {
        path: "/Artesanias",
        component: Artesanias,
        text: 'ARTESANIAS'
    }
];

export const sessionLoginRoutes = [
    {
        path: "/signIn",
        component: SignIn,
        text: 'INICIAR SESSION'
    }
];

export const socialMediaRoutes = [
    {
        text: 'Facebook',
        url: ''
    },
    {
        text: 'Instagram',
        url: 'https://www.instagram.com/nelumbojujuy/'
    }
];
