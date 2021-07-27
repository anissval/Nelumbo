import {Pasteleria} from "../features/pasteleria/Pasteleria";
import {Panaderia} from "../features/panaderia/Panaderia";
import {Vegetariano} from "../features/vegetariano/Vegetariano";
import {Vegano} from "../features/vegano/Vegano";
import {Artesanias} from "../features/artesanias/Artesanias";

export const routes = [
    {
        path: "/Panaderia",
        component: Panaderia,
        text : 'Panaderia'
    },
    {
        path: "/Pasteleria",
        component: Pasteleria,
        text : 'Pasteleria'
    },
    {
        path: "/Vegetariano",
        component: Vegetariano,
        text : 'Vegetariano'
    },
    {
        path: "/Vegano",
        component: Vegano,
        text : 'Vegano'
    },
    {
        path: "/Artesanias",
        component: Artesanias,
        text : 'Artesanias'
    }
];


export const socialMediaRoutes = [
    {
        text : 'Facebook',
        url : ''
    },
    {
        text : 'Instagram',
        url : 'https://www.instagram.com/nelumbojujuy/'
    }
];
