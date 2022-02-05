import Home from "../views/Home"
import Profile from "../views/Profile"
import Login from "../views/Login"

import Users from "../views/Users/Users"
import Categories from "../views/Category/Categories"
import Marks from "../views/Marks/Marks"
import Submarks from "../views/Submarks/Submarks"
import Units from "../views/Units/Units"

export const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        auth: true,
        admin: false
    },
    {
        path: "/users",
        exact: true,
        component: Users,
        auth: true,
        admin: true
    },
    {
        path: "/categories",
        exact: true,
        component: Categories,
        auth: true,
        admin: false
    },
    {
        path: "/marks",
        exact: true,
        component: Marks,
        auth: true,
        admin: false
    },
    {
        path: "/submarks",
        exact: true,
        component: Submarks,
        auth: true,
        admin: false
    },
    {
        path: "/units",
        exact: true,
        component: Units,
        auth: true,
        admin: false
    },
    {
        path: "/profile",
        exact: true,
        component: Profile,
        auth: true,
        admin: false
    },
    {
        path: "/login",
        exact: true,
        component: Login,
        auth: true,
        admin: false
    },
    {
        path: "/users",
        exact: true,
        component: Users,
        auth: true,
        admin: true
    }
]