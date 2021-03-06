import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getStatus } from '../stores/auth';

function Sidebar() {
    const loc = useLocation();
    const dispatch = useDispatch()

    const [toggle, setToggle] = useState(
        {
            first: true,
            second: true, 
            third: true
        }
    );
    useEffect(() => {
        dispatch(getStatus())
    }, [dispatch, loc.pathname])
    
	const { status } = useSelector(state => state.auth)

    
    return (
        <div className="app-sidebar sidebar-shadow" style={{overflowY: "scroll"}}>
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button"
                        className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        <li className="app-sidebar__heading"></li>
                        <li >
                            <NavLink to="/" className="mm-active">
                                <i className="metismenu-icon pe-7s-rocket"></i>
                                Admin
                            </NavLink>
                        </li>
                        
                        <li className="app-sidebar__heading">Menyu</li>
                        {
                            status === "admin" ? 
                            <li>
                                <NavLink to="/users" >
                                    <i className="metismenu-icon  fa fa-fw" aria-hidden="true" title="Copy to use users">???</i>
                                    ??stifad????il??r
                                </NavLink>
                            </li>
                            : ''
                        }
                        <li className={toggle.first ? " "  : "mm-active"} 
                        onClick={() => setToggle( {...toggle, first: !toggle.first}) }>
                            <NavLink to="#">
                                <i className="metismenu-icon pe-7s-network"></i>
                                Mallar
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </NavLink>
                            <ul className={toggle.first ? "mm-collapse" :  "mm-collapse mm-show "} >
                                <li>
                                    <NavLink to="/categories">
                                        <i className="metismenu-icon"></i>
                                        Kateqoriyalar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/marks">
                                        <i className="metismenu-icon">
                                        </i>Markalar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/submarks">
                                        <i className="metismenu-icon">
                                        </i>Marka alt kateqoriyalar??
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/units">
                                        <i className="metismenu-icon">
                                        </i>Vahidl??r
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/items">
                                        <i className="metismenu-icon">
                                        </i>M??hsullar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/item-fiches">
                                        <i className="metismenu-icon">
                                        </i>M??hsul h??r??k??tl??ri
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Hesabatlar
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={toggle.second ? " "  : "mm-active"} 
                        onClick={() => setToggle( {...toggle, second: !toggle.second}) }>
                            <NavLink to="#">
                                <i className="metismenu-icon pe-7s-wallet"></i>
                                Finans
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </NavLink>
                            <ul className={toggle.second ? "mm-collapse" :  "mm-collapse mm-show "} >
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon"></i>
                                        M????t??ril??r
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>M????t??ri H??r??k??tl??ri
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Kassalar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Kassa H??r??k??tl??ri
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Banklar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Bank H??r??k??tl??ri
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Hesabatlar
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={toggle.third ? " "  : "mm-active"} 
                        onClick={() => setToggle( {...toggle, third: !toggle.third}) }>
                            <NavLink to="#">
                                <i className="metismenu-icon pe-7s-cash"></i>
                                Sat???? v?? Al????
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </NavLink>
                            <ul className={toggle.third ? "mm-collapse" :  "mm-collapse mm-show "} >
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon"></i>
                                        Sifari??l??r
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Fakturalar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i className="metismenu-icon">
                                        </i>Hesabatlar
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
