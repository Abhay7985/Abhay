import React, { Fragment, useEffect, useState } from 'react'
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import henceforthApi from '../utils/henceforthApi';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Weeklisting from './WeekListing';
import { GlobalContext } from '../context/Provider';
import Spinner from './common/AntSpinner';
import { Spin } from 'antd';

interface RouteDataInterface {
    id: number,
    route_name: string,
    selected?: boolean,
    price?: number,
    installments?: number,
    installment_price?: number
}

const CalendarSideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { Toast } = React.useContext(GlobalContext)

    const uRLSearchParams = new URLSearchParams(location.search);

    const [loading, setLoading] = useState(false)
    const [spinningCheckbox, setSpinningCheckbox] = useState(false)
    const [routeDatas, setRouteData] = React.useState<Array<RouteDataInterface>>([])

    const [state, setState] = React.useState({
        prices: [],
        date_available: false,
        day_available: false,

    })

    const queryDate = moment(Number(uRLSearchParams.get('available_date')))

    const handleQuery = (key: string, value: string) => {
        if (value) {
            uRLSearchParams.set(key, value)
        } else {
            if (uRLSearchParams.has("edit")) {
                uRLSearchParams.delete("edit")
            } else {
                uRLSearchParams.delete(key)
            }
        }
        navigate({ search: uRLSearchParams.toString() })
    }

    const handleChange = async (name: string, value: any, index: number) => {
        if (name === "price" && isNaN(value)) return
        if (name === "installments" && isNaN(value)) return
        if (name === "installment_price" && isNaN(value)) return
        const data = routeDatas[index] as any
        if (typeof value == "boolean") {
            data.selected = value
        }
        data[name] = value
        setRouteData([...routeDatas])

    }
    const getBoatPrice = async () => {
        const date = queryDate.format("YYYY/MM/DD")

        let apiRes = await henceforthApi.Calender.viewPrice(uRLSearchParams.get("boat_id") as string, date)
        setState({
            ...state,
            prices: apiRes.data,
            date_available: apiRes?.date_available,
            day_available: apiRes?.day_available,
        })
        return apiRes
    }

    const onSubmit = async (b: boolean, isOpen: boolean, isSpinning: boolean) => {

        const queryDate = moment(Number(uRLSearchParams.get('available_date')))
        console.log(String(queryDate.weekday()))
        const items = {
            available: b,
            route_prices: routeDatas.filter(((res: any) => res.selected == true)).map((res: any) => {
                return {
                    route_id: res.id,
                    price: Number(res.price),
                    installments: Number(res.installments),
                    installment_price: Number(res.installment_price)
                }
            })
        } as any
        if (uRLSearchParams.get("edit") == "date") {
            items.available_date = queryDate.format('YYYY/MM/DD')
        } else {
            items.available_day = queryDate.weekday()
        }
        const data = items.route_prices
        if (data.length) {
            let _is_true = true
            data.forEach((element: any) => {
                if (!element.price) {
                    _is_true = false
                    Toast.error(`Please enter price`)
                    // Toast.error(`Please enter price of ${element.route_name}`)
                    return
                }
                if (!element.installments) {
                    _is_true = false
                    Toast.error(`Please enter installments`)
                    // Toast.error(`Please enter installments of ${element.route_name}`)
                    return
                }
                if (!element.installment_price) {
                    _is_true = false
                    Toast.error(`Please enter installment price`)
                    // Toast.error(`Please enter installment price of ${element.route_name}`)
                    return
                }
            });
            if (_is_true) {
                try {
                    setLoading(true)
                    setSpinningCheckbox(isSpinning)
                    let apiRes: any
                    if (uRLSearchParams.get("edit") == "date") {
                        apiRes = await henceforthApi.Calender.editDatePrice(uRLSearchParams.get("boat_id") as string, items)
                    } else {
                        apiRes = await henceforthApi.Calender.editWeekPrice(uRLSearchParams.get("boat_id") as string, items)
                    }
                    getBoatPrice()
                    Toast.success(apiRes.message)
                    if (isOpen) {
                        handleQuery("edit", "")
                    } else {
                        // await getBoatPrice()
                    }

                } catch (error) {
                    Toast.error(error)
                } finally {
                    setLoading(false)
                    setSpinningCheckbox(false)
                }
            }
        } else {
        }
    }

    const initialiseRoutes = async () => {
        try {
            const apiRes = await henceforthApi.Admin.routes()
            await getSidebarValue(apiRes.data)
        } catch (error) {

        }
    }
   

    const getSidebarValue = async (routes: Array<any>) => {
        try {
            let rowData: Array<RouteDataInterface> = []
            let apiRes = await getBoatPrice()
            routes?.forEach((element: RouteDataInterface) => {
                const findData: any = apiRes?.data?.find((res: any) => res.route_id === element.id)
                if (findData) {
                    rowData.push({
                        id: element.id,
                        route_name: element.route_name,
                        selected: true,
                        installment_price: findData.installment_price,
                        installments: findData.installments,
                        price: findData.price
                    })
                } else {
                    rowData.push(element)
                }
            });
            setRouteData(rowData)

        } catch (error) {

        }
    }
    // React.useEffect(() => {
    //     if (uRLSearchParams.has("edit")) {
    //         const type = uRLSearchParams.get("edit")
    //         if (type == "week") {
    //             getweekPrice()
    //         } else {
    //             getDatePrice()
    //         }
    //     }

    // }, [uRLSearchParams.get("edit")])
    React.useEffect(() => {
    
    }, [])
    React.useEffect(() => {
        initialiseRoutes()
         
    }, [uRLSearchParams.get("edit"),uRLSearchParams.get("available_date")])

    return (
        <div className="col-lg-3 px-0">
            <div className="sidebar-calender py-4">
                <div className="cross px-4" role="button" onClick={() => handleQuery('show_sidebar', "")}>
                    <HenceforthIcons.Cross />
                </div>
                {!uRLSearchParams.has("edit") &&
                    <Fragment>

                        <div className="edit-date border-bottom px-4 py-4">
                            <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={() => handleQuery('edit', "date")}>
                                <span>Edit Date</span>
                                <HenceforthIcons.ChevronRight />
                            </button>
                        </div>

                        <div className="edit-date border-bottom px-4 py-4">
                            <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={() => handleQuery('edit', "week")}>
                                <span>Edit {queryDate.format('dddd')}</span>
                                <HenceforthIcons.ChevronRight />
                            </button>
                        </div>
                    </Fragment>}

                {uRLSearchParams.has("edit") &&
                    <div className="edit-tuesday py-4 border-bottom">
                        <Spin spinning={spinningCheckbox}>

                            <div className="edit-tuesday-header py-4 border-bottom px-4">
                                {uRLSearchParams.get("edit") == "date" ?
                                    <h5 className='mb-3'>{queryDate.format('ddd, DD MMM YYYY')}</h5> :
                                    <h5 className='mb-3'>Edit {queryDate.format('dddd')}</h5>}
                                <div className="available d-flex justify-content-between align-items-center">
                                    <p> Available</p>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input form-check-toggle px-1" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={uRLSearchParams.get("edit") == "date" ? state?.date_available : state?.day_available} onChange={(e) => onSubmit(e.target.checked, false, true)} />
                                    </div>
                                </div>
                            </div>
                        </Spin>

                        <div className="px-4">
                            <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
                                <h6 className='fs-16'>Pricing</h6>
                                {routeDatas.map((res: any, index: number) => {
                                    return <Weeklisting {...res} handleChange={(name: string, checked: any) => handleChange(name, checked, index)} />

                                })}
                                <div className="col-12">
                                    <button className='btn btn-yellow px-4 rounded-2' disabled={loading} onClick={() => onSubmit(uRLSearchParams.get("edit") == "date" ? state?.date_available : state?.day_available, true, false)}>{loading ? <Spinner /> : "Done"}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                {!uRLSearchParams.has("edit") &&
                    <div className="Available px-4 py-4 border-bottom">
                        <p className='fs-16 mb-3'>Available</p>
                        <ul>
                            {state?.prices?.map((res: any) => {
                                return (
                                    <div className='mb-3'>
                                        <li>{res.route_name}</li>
                                        <li>{res.price} or {res.installments}x in {res.installment_price} </li>
                                    </div>
                                )
                            })}

                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}
export default CalendarSideBar;