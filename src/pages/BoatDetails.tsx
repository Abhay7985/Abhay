import leftArrow from '../assets/icons/arrow_back.svg';
import BannerImage from '../assets/images/boat_one.png';
import petIcon from '../assets/images/pet.png';
import smoking from '../assets/images/cigar.png';
import currentLocation from '../assets/icons/exact_location.svg';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import henceforthApi from '../utils/henceforthApi';
import { Link, useMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../context/Provider';
import HenceforthIcons from '../assets/icons/HenceforthIcons';


const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const BoatDetails = () => {

    const match = useMatch(`boat/:id/inquiry`)
    const { authState } = React.useContext(GlobalContext)

    const [state, setState] = useState({
        amenities: [],
        bathrooms: 0,
        bedrooms: 0,
        category_id: 0,
        cover_image: "",
        created_at: "",
        id: "",
        location: "",
        manufacturer_id: "",
        model: "",
        name: "",
        passenger_day: "",
        passenger_night: "",
        pets_allowed: 0,
        photos: [],
        prices: [],
        rules: "",
        size: "",
        smoking_allowed: 0,
        status: "",
        step: "",
        updated_at: ""
    })

    const boatDetails = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {
            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            setState(res.data);

        } catch (error) {
        }
    }

    useEffect(() => {
        boatDetails()
    }, [match?.params.id])


    return (
        <>
            {/* Morning Panormic */}
            <section className="morning-panormic py-4">
                <div className="container">
                    {/* banner-row */}
                    <div className="row">
                        <div className="col-12">
                            <div className="boat-header d-flex justify-content-between">
                                <div className="title">
                                    <div className="left-arrow">
                                        <HenceforthIcons.DetailBack />
                                    </div>
                                    <h3 className='mt-4 mb-2'>{state.name}</h3>
                                    <p>{state.category_id} • {state.location}</p>
                                </div>
                                <div className="share-btn align-self-end d-flex gap-2 align-items-center">
                                    <HenceforthIcons.Share />
                                    <Link to='' className='text-black'>Share</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row gy-4 py-4">
                                <div className="col-md-6 ps-0">
                                    <div className="morning-banner">
                                        <img src={BannerImage} alt="img" className='img-fluid' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row gy-2">
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-row */}
                    <div className="row gy-4">
                        {/* content */}
                        <div className="col-lg-6 col-xl-7">
                            <div className="morning-content">
                                <div className="content-title border-bottom pb-4">
                                    <h4 className='mb-2'>{state.size}-foot speedboat for up to {state.passenger_day} passengers</h4>
                                    <p>{state.passenger_day} passengers day • {state.passenger_night} passengers overnight • {state.bedrooms} rooms • {state.bathrooms} bathrooms</p>
                                </div>
                                {/* aminities */}
                                <div className="aminities border-bottom py-4">
                                    <h4 className='mb-2'>Amenities</h4>
                                    <div className="aminities-list d-flex gap-5">
                                        <ul>
                                            {state?.amenities?.map((e: any, index: number) => <li key={index}>{e}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                {/* Itineraries rules */}
                                <div className="Itineraries-rules border-bottom py-4">
                                    <h4 className='mb-2'>Itineraries rules</h4>
                                    <ul>
                                        <li className='d-flex gap-3 align-items-center'>
                                            <div className="pet-image">
                                                <img src={petIcon} alt="icon" className='img-fluid' />
                                            </div>
                                            <p>Pets are {state?.pets_allowed === 0 ? 'not allowed' : "allowed"}</p>
                                        </li>
                                        <li className='d-flex gap-3 align-items-center'>
                                            <div className="smoking">
                                                <img src={smoking} alt="icon" className='img-fluid' />
                                            </div>
                                            <p>Smoking is {state?.smoking_allowed === 0 ? 'not allowed' : "allowed"}</p>
                                        </li>
                                        <li>
                                            <p>{state?.rules}</p>
                                        </li>
                                    </ul>

                                </div>
                                {/* Location */}
                                <div className="Location py-4">
                                    <h4 className='mb-4'>Location</h4>
                                    <div className="map-box position-relative">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13796.890889034594!2d76.8605537!3d30.173631149999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1675841671352!5m2!1sen!2sin" width="100%" height="400" className='map'></iframe>
                                        <div className="location-icon position-absolute top-50 start-50 text-center translate-middle">
                                            <div className="location-text mb-2">
                                                Angra dos Reis - Rio de Janeiro
                                            </div>
                                            <div className="icon">
                                                <img src={currentLocation} alt="icon" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* price-card */}
                        <div className="col-lg-6 col-xl-5">
                            <div className="price-card px-4 py-4">
                                <h4 className='mb-3'>From $30</h4>
                                <div className="select-date">
                                    <DatePicker onChange={onChange} />
                                </div>
                                {/* price-list-1 */}
                                {state?.prices?.map((e: any, index: number) => {
                                    return (
                                        <>
                                            <div className="price-list py-3 border-bottom">
                                                <div className="price-list-title d-flex justify-content-between mb-2">
                                                    <p>{e?.date}</p>
                                                    <p className='fw-bold'>${e?.price} <span className='fw-normal fs-14 px-1'>or</span> {e?.installments}x in ${e?.installment_price}</p>
                                                </div>
                                                <div className="price-list-title d-flex justify-content-between">
                                                    <p className='fs-14'>{e?.route} - 9 às 13hrs <br /> (4 hours AM)</p>
                                                    <div className="choose-btn align-self-end">
                                                        <button className='btn btn-yellow fs-14 py-0'>Choose</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BoatDetails
