const express = require('express');
const authRoute = require('./authRoute');
const todoRoute = require('./todoRoute');
const userRoute = require('./userRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/todo',
        route: todoRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
