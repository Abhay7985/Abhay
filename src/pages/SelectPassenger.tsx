import bannerImage from '../assets/images/image_two.png';
import increase from '../assets/icons/add_circle_outline.svg';
import decrease from '../assets/icons/remove_circle_outline.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from '../context/Provider';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { Spin } from 'antd';

const SelectPassenger = () => {
    const { Toast } = React.useContext(GlobalContext)

    const navigate = useNavigate()
    const location = useLocation()
    const uRLSearchParams = new URLSearchParams(location.search)

    const [passengerDay, setPassengerDay] = React.useState(1)
    const [passengerNight, setPassengerNight] = React.useState(1)
    const [bedrooms, setBedrooms] = React.useState(1)
    const [bathrooms, setBathrooms] = React.useState(1)
    const [loading, setLoading] = React.useState(false)

    const actionComparison=uRLSearchParams.get("action") as string === "save_and_exit"
    const saveAndExit = async (b: boolean) => {
        const items = {
            boat: {
                name: uRLSearchParams.get("name"),
                category_id: uRLSearchParams.get("category_id"),
                manufacturer_id: uRLSearchParams.get("manufacturer_id"),
                model: uRLSearchParams.get("model"),
                size: uRLSearchParams.get("size"),
                passenger_day: passengerDay,
                passenger_night: passengerNight,
                bedrooms: bedrooms,
                bathrooms: bathrooms
            }
        }
        try {
            setLoading(true)
            const apiRes = await henceforthApi.Boat.create(items)
            Toast.success(apiRes.message)
            if (b) {
                navigate(`/`, { replace: true })
            } else {
                navigate({
                    pathname: `/boat/${apiRes.boat_id}/place`
                })
            }
        } catch (error) {
            console.log('error', error);
            Toast.error(error)
            uRLSearchParams.delete("action")
            navigate({
                search: uRLSearchParams.toString()
            })
        } finally {
            setLoading(false)
        }
    }
    const onSubmit = async (e: any) => {
        e.preventDefault()
        saveAndExit(false)
    }
    useEffect(() => {
        if (actionComparison) {
            saveAndExit(true)
        }
    }, [uRLSearchParams.get("action")])

    return (
        <section className="select-passenger-section h-100">
            <div className="container-fluid h-100">
                <form className="row h-100" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <Spin spinning={loading}  >
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row gy-2 justify-content-center justify-content-lg-end pb-5 pb-lg-0">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title'>Please select passengers & bedrooms</h3>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Passengers (Day)</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setPassengerDay(passengerDay - 1)} disabled={passengerDay === 1}>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={passengerDay} />
                                                    </li>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setPassengerDay(passengerDay + 1)} >
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Passengers (Night)</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setPassengerNight(passengerNight - 1)} disabled={passengerNight === 1}>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={passengerNight} />
                                                    </li>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setPassengerNight(passengerNight + 1)} >
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Bedrooms</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setBedrooms(bedrooms - 1)} disabled={bedrooms === 1}>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={bedrooms} />
                                                    </li>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setBedrooms(bedrooms + 1)}>
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Bathrooms</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setBathrooms(bathrooms - 1)} disabled={bathrooms === 1}>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={bathrooms} />
                                                    </li>
                                                    <li>
                                                        <button type='button' className='btn border-0' onClick={() => setBathrooms(bathrooms + 1)}>
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Spin>
                        <BackNextLayout />

                    </div>
                    <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                        <div className="banner-image border">
                            <img src={bannerImage} alt="" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default SelectPassenger;