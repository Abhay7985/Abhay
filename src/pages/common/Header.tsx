import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/icons/logo_header.svg'
import { GlobalContext } from '../../context/Provider'
import React, { Fragment } from "react";
import placeholder from '../../assets/images/placeholder.png'
import { Button, Divider, Dropdown, MenuProps, Space, Switch, theme, Tooltip, Avatar, Image, Row, Col } from "antd";
import henceforthApi from '../../utils/henceforthApi';

const Header = () => {
    const { authState, logOutNow } = useContext(GlobalContext)
    const location = useLocation()
    const menuStyle = {
        boxShadow: 'none',
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to="/profile" className='nav-link'>
                    Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="change-password" className='nav-link'>
                    Change password
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to="" onClick={logOutNow} className='nav-link'>
                    Log Out
                </Link>
            ),
        },

    ];

    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-lg py-0">
                    <Link className="navbar-brand" to={`/`}>
                        <img src={logo} alt="img" className='img-fluid' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        {location.pathname !== "/boat/add/info" &&
                            <form className="d-flex" role="search">
                                {authState.access_token ?
                                    <ul className='d-flex flex-wrap align-items-center gap-5'>
                                        <li>
                                            <Link to='/' className='nav-link'>Boats</Link>
                                        </li>
                                        <li>
                                            <Link to={`inquiry/1`} className='nav-link'>Inquiry</Link>
                                        </li>
                                        <li>
                                            <Link to='/calender' className='nav-link'>Calender</Link>
                                        </li>
                                        <li>
                                            <Dropdown menu={{ items }}
                                                dropdownRender={(menu) => (
                                                    <div >
                                                        {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                                        <Divider style={{ margin: 0 }} />
                                                    </div>
                                                )}
                                                arrow className="btnn h-100">
                                                <Button><Avatar style={{ backgroundColor: '#FF9100' }} icon={<img src={henceforthApi.FILES.imageOriginal(authState.image, placeholder)} />} />&nbsp;{authState?.name}</Button>
                                            </Dropdown>
                                        </li>
                                    </ul> :
                                    <ul className='d-flex gap-2 flex-wrap'>
                                        <li>
                                            <button className="btn btn-outline-dark" type="submit">Help</button>
                                        </li>
                                        <li>
                                            <Button htmlType="submit" className="btn btn-yellow" onClick={logOutNow}>Save & Exit</Button>
                                        </li>
                                    </ul>}
                            </form>}
                    </div>

                </nav>
            </div>
        </>
    )
}

export default Header
