import leftArrow from '../assets/icons/arrow_back.svg';
import BannerImage from '../assets/images/boat_one.png';
import petIcon from '../assets/images/pet.png';
import smoking from '../assets/images/cigar.png';
import currentLocation from '../assets/icons/exact_location.svg';
import { DatePickerProps, Spin } from 'antd';
import { DatePicker, Space } from 'antd';
import henceforthApi from '../utils/henceforthApi';
import { Link, useMatch } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/Provider';
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import HenceforthGoogleMap from '../utils/henceforthGoogleMap';
import { Image } from 'antd';

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627
    },
    zoom: 11
};
const onChange1: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const BoatDetails = () => {
    const [visible, setVisible] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);


    const match = useMatch(`boat/:id/inquiry`)
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const googleMapRef = useRef() as any
    const [state, setState] = useState({
        amenities: [],
        bathrooms: 0,
        bedrooms: 0,
        category: "",
        category_id: 0,
        cover_image: "",
        created_at: "",
        id: "",
        location: {} as any,
        manufacturer: "",
        manufacturer_id: "",
        minimum_price: "",
        model: "",
        name: "",
        passenger_day: "",
        passenger_night: "",
        pets_allowed: 0,
        photos: [] as any,
        prices: [],
        rules: "",
        size: "",
        smoking_allowed: 0,
        status: "",
        step: "",
        updated_at: "",
        address: {
            address1: ""
        }
    })
    const copyText = (id: string, name: string) => {
        if (id) {
            navigator?.clipboard?.writeText(id)
            Toast.success(`${name} copy successfull`)
        }
    }

    const initialise = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {
            setLoading(true)
            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            setState(res.data);

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialise()
    }, [match?.params.id])

    const createMerker = (position: google.maps.LatLng | google.maps.LatLngLiteral, map: google.maps.Map, icon?: any) => {
        return new google.maps.Marker({
            position,
            map,
            draggable: false,
            // label: { text: state.name, color: "#FFFFFF" },
            icon: icon,
        });
    }
    const onGoogleApiLoaded = ({ map, maps, ref }: any) => {
        let latlng = new (window as any).google.maps.LatLng(
            state?.location?.latitude,
            state?.location?.longitude
        )
        createMerker(latlng, map)
    }

    const handleImagePreview = (image: string) => {
        setVisible(true)
        const index = state.photos.findIndex((res: any) => res.image === image)
        setCurrentImg(index)
    }

    return (
        <Spin spinning={loading} className='h-100' >
            <section className="morning-panormic py-4">
                <div className="container">
                    {/* banner-row */}
                    <div className="row">
                        <div className="col-12">
                            <div className="boat-header d-flex justify-content-between">
                                <div className="title">
                                    <Link to={`/`}>
                                        <div className="left-arrow" role="button" >
                                            <HenceforthIcons.DetailBack />
                                        </div>
                                    </Link>
                                    <h3 className='mt-4 mb-2'>{state.name}</h3>
                                    <p>{state.category} • {state?.address?.address1}</p>
                                </div>
                                <button className="btn border-0 p-0  text-decoration-underline" onClick={() => copyText(`${window.location.origin}/${state.id}`, "Link")} >
                                    <HenceforthIcons.Share />
                                    <span role="button"> Share</span>
                                </button>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row gy-4 py-4 ms-0"  >
                                <div className="col-md-6 ps-0">
                                    <div className="morning-banner">
                                        <img src={state.cover_image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.cover_image}` : ""} alt="img" className='img-fluid' onClick={() => handleImagePreview(state.cover_image)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row gy-2 position-relative">
                                        {(state?.photos?.filter((res: any) => res.image !== state.cover_image))?.slice(0, 4)?.map((res: any, index: number) =>
                                            <div className="col-6 ps-0">
                                                <div className={`${index == 1 ? 'boat-group-image ' : index == 3 ? 'boat-group-image-last show-more-image ' : ''} boat-image-list`}>
                                                    <img src={state.photos ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.image}` : BannerImage} alt="img" className='img-fluid' onClick={() => handleImagePreview(res.image)} />
                                                    {state.photos.length > 5 && <button className='btn border-0' onClick={() => handleImagePreview(state?.photos[5].image)}>+{state.photos.length - 5}</button>}
                                                </div>
                                            </div>
                                        )}
                                        {/* show more-image */}
                                        {/* <div className="show-more-image border ms-auto">
                                            <button className='btn border-0'>+2</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-row */}
                    <div className="row gy-4">
                        {/* content */}
                        <div className="col-lg-6 col-xl-7 order-2 order-md-1">
                            <div className="morning-content">
                                <div className="content-title border-bottom pb-4">
                                    <h4 className='mb-2'>{state.size}-foot Manufacturer for up to  passengers</h4>
                                    <p>{state.passenger_day} passengers day • {state.passenger_night} passengers overnight • {state.bedrooms} rooms • {state.bathrooms} bathrooms</p>
                                </div>
                                {/* aminities */}
                                <div className="aminities border-bottom py-3 py-sm-4">
                                    <h4 className='mb-2'>Amenities</h4>
                                    <div className="aminities-list d-flex gap-5">
                                        <ul>
                                            {state?.amenities?.map((e: any, index: number) => <li key={index} className='fw-600 text-dark-black'>{e?.amenity}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                {/* Itineraries rules */}
                                <div className="Itineraries-rules border-bottom py-3 py-sm-4">
                                    <h4 className='mb-2'>Itineraries rules</h4>
                                    <ul>
                                        <li className='d-flex gap-3 align-items-center'>
                                            <div className="pet-image">
                                                <img src={petIcon} alt="icon" className='img-fluid' />
                                            </div>
                                            <p className='text-dark-black'>Pets are {state?.pets_allowed === 0 ? 'not allowed' : "allowed"}</p>
                                        </li>
                                        <li className='d-flex gap-3 align-items-center'>
                                            <div className="smoking">
                                                <img src={smoking} alt="icon" className='img-fluid' />
                                            </div>
                                            <p className='text-dark-black'>Smoking is {state?.smoking_allowed === 0 ? 'not allowed' : "allowed"}</p>
                                        </li>
                                        <li>
                                            <p>{state?.rules}</p>
                                        </li>
                                    </ul>

                                </div>
                                {/* Location */}
                                <div className="Location py-4">
                                    <h4 className='mb-4'>Location</h4>

                                    <div style={{ height: '400px', width: '100%', borderRadius: '6px', overflow: 'hidden' }}>
                                        <HenceforthGoogleMap
                                            ref={googleMapRef}
                                            defaultCenter={defaultProps.center}
                                            center={{ lat: state?.location?.latitude, lng: state?.location?.longitude }}
                                            zoom={defaultProps.zoom}
                                            defaultZoom={defaultProps.zoom}
                                            onGoogleApiLoaded={onGoogleApiLoaded}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* price-card */}
                        <div className="col-lg-6 col-xl-5 order-1 order-md-2">
                            <div className="price-card px-4 py-4">
                                <h4 className='mb-4 mt-1'>From ${state.minimum_price}</h4>
                                <div className="select-date mb-2">
                                    <DatePicker onChange={onChange1} placeholder='Add Date' />
                                </div>
                                {/* price-list-1 */}
                                {state?.prices?.map((e: any, index: number) => {
                                    return (
                                        <>
                                            <div className="price-list py-3 border-bottom" key={e?.id}>
                                                <div className="price-list-title d-flex justify-content-between mb-2">
                                                    <h6>{e?.date}</h6>
                                                    <p className='fw-bold'>${e?.price}<span className='fw-600 fs-14 px-1'>or</span> {e?.installments}x in ${e?.installment_price}</p>
                                                </div>
                                                <div className="price-list-title d-flex justify-content-between">
                                                    <p className='fs-14 fw-600'>{e?.route}</p>
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

            <>
                <div style={{ display: 'none' }}>
                    <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis), current: currentImg }}>
                        {state?.photos?.map((res: any, index: number) => <Image src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.image}`} />)}
                    </Image.PreviewGroup>
                </div>
            </>
        </Spin >
    )
}

export default BoatDetails
