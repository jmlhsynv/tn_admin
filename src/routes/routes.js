import Home from "../views/Home"
import About from "../views/About"
import Profile from "../views/Profile"
import Login from "../views/Login"

import Categories from "../views/Category/Categories"

export const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        auth: true
    },
    {
        path: "/categories",
        exact: true,
        component: Categories,
        auth: true
    },
    
    {
        path: "/profile",
        exact: true,
        component: Profile,
        auth: true
    },
    {
        path: "/login",
        exact: true,
        component: Login,
        auth: true
    }
]