import Home from "../views/Home"
import Profile from "../views/Profile"
import Login from "../views/Login"

import Categories from "../views/Category/Categories"
import Marks from "../views/Marks/Marks"
import Users from "../views/Users/Users"

export const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        auth: true,
        admin: false
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