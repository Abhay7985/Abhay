import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import bannerImage from '../assets/images/image_two.png';
import locationIcon from '../assets/icons/current_location.svg';
import React, { Fragment } from "react";
import { GlobalContext } from "../context/Provider";
import { Checkbox, Select, Space, Switch } from "antd";
import BackNextLayout from "../Components/boat/BackNextLayout";
import { CheckboxChangeEvent } from "antd/es/checkbox";

function PlaceLocated() {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/place`)
    const uRLSearchParams = new URLSearchParams(location.search)

    const { Toast } = React.useContext(GlobalContext)
    const [inputFocued, setInputFocused] = React.useState(false)
    const [form, setForm] = React.useState({
        location_address: "",
        latitude: 0,
        longitude: 0,
    })

    const onSubmit = async (e: any) => {
        e.preventDefault()
        // uRLSearchParams.set("manufacturer_id", manufacturer_id)
        navigate({
            pathname: `/boat/${match?.params.id}/amenities`,
            search: uRLSearchParams.toString()
        })

    }
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const handleInput = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const requestCurrenctLocation = () => {
        console.log('requestCurrenctLocation called');
        try {
            navigator.geolocation.getCurrentPosition((successCallback) => {
                console.log("Latitude is :", successCallback.coords.latitude);
                console.log("Longitude is :", successCallback.coords.longitude);
                // router.replace({ query: { ...router.query, ...successCallback.coords } })

                setForm({
                    ...form,
                    latitude: successCallback.coords.latitude,
                    longitude: successCallback.coords.longitude
                })

            }, (errorCallback) => {
                console.log('errorCallback', errorCallback.message);

            });

        } catch (error) {
            console.log('requestCurrenctLocation error', error);

        }
    }

    return (
        //  Select-passenger 
        <section className="select-passenger-section">
            <div className="container-fluid">
                <form className="row" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column ">
                            <div className="row gy-2 justify-content-center justify-content-lg-end pb-5 pb-lg-0">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title'>Where is your place located?</h3>
                                </div>
                                {form.latitude == 0 ? <Fragment>
                                    <div className="col-11 col-lg-11">
                                        <input type="text" className="form-control" placeholder="Enter your address" onFocus={() => setInputFocused(true)} onBlur={() => setTimeout(() => setInputFocused(false), 100)} />

                                        {inputFocued && <div className="location border mt-1 d-flex gap-3 align-items-center nav-link" onClick={requestCurrenctLocation}>
                                            <div className="location-icon">
                                                <img src={locationIcon} alt="icon" className="img-fluid" />
                                            </div>
                                            <p>Use my current location</p>
                                        </div>}
                                    </div></Fragment> : <Fragment>
                                    <div className="col-11 col-lg-11">
                                        <div className="mb-3">
                                            <label htmlFor="input1" className="form-label">Street</label>
                                            <input type="text" className="form-control" id='input1' placeholder='Enter state' />
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="mb-3">
                                            <label htmlFor="input4" className="form-label">Flat, Suite, etc. (optional)</label>
                                            <input type="text" className="form-control" id='input4' placeholder='Enter flat, suite, etc.' />
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="mb-3">
                                            <label htmlFor="input5" className="form-label">City</label>
                                            <input type="text" className="form-control" id='input5' placeholder='Enter City' />
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="mb-3">
                                            <label htmlFor="input5" className="form-label">Postcode (optional)</label>
                                            <input type="text" className="form-control" id='input5' placeholder='Enter postcode' />
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="mb-5">
                                            <label htmlFor="input2" className="form-label">Country / Region</label>
                                            <div className="category">
                                                <Space direction="vertical" style={{ width: '100%' }}>
                                                    <Select
                                                        size={'middle'}
                                                        defaultValue="Enter country / region"
                                                        onChange={handleChange}
                                                        style={{ width: '100%' }}
                                                    // options={options}
                                                    />
                                                </Space>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="mb-3 d-flex justify-content-between align-items-start">
                                            <div className="specific-location">
                                                <h4 className='mb-2'>Show your specific location</h4>
                                                <p>Make it clear to guests where your place is located. <a href="#">We'll only share your address after they've made a reservation.</a></p>
                                            </div>
                                            <div className="form-check form-switch ps-sm-5">
                                                <Switch size="small" defaultChecked />
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>}
                            </div>
                            <BackNextLayout />
                        </div>

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

export default PlaceLocated
