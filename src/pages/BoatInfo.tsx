import bannerImage from '../assets/images/image_one.webp';
import React, { useEffect, useState } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Select, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from '../context/Provider';
import { NumberValidation } from '../utils/henceforthValidations';
import { Spin } from 'antd';
import BackNextLayout from '../Components/boat/BackNextLayout';

const BoatInfo = () => {
    const { authState } = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [size, setSize] = useState<SizeType>('middle')
    const [state, setState] = React.useState({
        category: [],
        manufacturer: []
    })
    const [boatName, setBoatName] = useState('')
    const [boatModel, setBoatModel] = useState('')
    const [boatSize, setBoatSize] = useState('')
    const [boatExtension, setBoatExtension] = useState('')
    const [category_id, setCategoryId] = useState("")
    const [manufacturer_id, setManufacturerId] = useState("")
    const { Toast } = React.useContext(GlobalContext)

    const [loading, setLoading] = React.useState(false)

    const [boatState, setboatState] = useState({

    })


    const onSubmit = async (e: any) => {
        henceforthApi.setToken(authState?.access_token)
        e.preventDefault()
        const uRLSearchParams = new URLSearchParams()
        uRLSearchParams.set("name", boatName)
        uRLSearchParams.set("model", boatModel)
        uRLSearchParams.set("size", boatSize+boatExtension)
        uRLSearchParams.set("category_id", category_id)
        uRLSearchParams.set("manufacturer_id", manufacturer_id)

        try {
            if (!boatName.trim()) {
                Toast.error('Enter Boat Name')
            } else if (!category_id) {
                Toast.error("Enter Category")

            }
            else if (!manufacturer_id) {
                Toast.error("Enter manufacturer")

            }
            else if (!boatModel.trim()) {
                Toast.error("Enter Boat Model")
            }
            else if (!boatSize) {
                Toast.error("Enter Boat Size")

            }
            else if (!boatExtension) {
                Toast.error("Please select feet/inches")

            }
            else {
                navigate({
                    pathname: '/boat/passengers',
                    search: uRLSearchParams.toString()
                })
            }
        } catch (error) {

        }
    }

    const initialise = async () => {
        try {
            const category = await henceforthApi.Boat.category()
            const manufacturer = await henceforthApi.Boat.manufacturer()
            setState({
                category: category.data,
                manufacturer: manufacturer.data
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        initialise()
    }, [])

    return (
        // boat-details
        <section className="boat-details-section h-100">
            <div className="container-fluid h-100">
                <form className="row h-100" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column justify-content-between">
                            <div className="row justify-content-center justify-content-lg-end">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title'>Please enter the details of the boat</h3>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-2 mb-sm-3">
                                        <label htmlFor="input1" className="form-label">Boat Name</label>
                                        <input type="text" className="form-control" id='input1' placeholder='Enter boat name' value={boatName} onChange={(e) => setBoatName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-2 mb-sm-3">
                                        <label htmlFor="input2" className="form-label">Category</label>
                                        <div className="category">
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Select
                                                    size={size}
                                                    defaultValue={category_id}
                                                    onChange={setCategoryId}
                                                    style={{ width: '100%' }}
                                                    options={[{ value: "", label: "Select category" }, ...state?.category?.map((res: any) => { return { value: res?.id, label: res.category } })]}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-2 mb-sm-3">
                                        <label htmlFor="input3" className="form-label">Manufacturer</label>
                                        <div className="category">
                                            <Space direction="vertical" style={{ width: '100%' }}  >
                                                <Select
                                                    size={size}
                                                    defaultValue={manufacturer_id}
                                                    onChange={setManufacturerId}
                                                    style={{ width: '100%' }}
                                                    options={[{ value: "", label: "Select manufacturer" }, ...state?.manufacturer?.map((res: any) => { return { value: res?.id, label: res.manufacturer } })]}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-2 mb-sm-3">
                                        <label htmlFor="input4" className="form-label">Model</label>
                                        <input type="text" className="form-control" id='input4' placeholder='Enter model' value={boatModel} onChange={(e) => setBoatModel(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-2 mb-sm-3">
                                        <label htmlFor="input5" className="form-label">Size</label>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control" id='input5' placeholder={`Enter size ${boatExtension?`(in${boatExtension})`:''}`} value={boatSize} onChange={(e) => { setBoatSize(e.target.value.replace(/[^.0-9]/g, "")) }} />
                                            <Select
                                                size="large"
                                                onChange={setBoatExtension}
                                                style={{ width: '12%' }}
                                                options={[ { value: " feet", label: "feet" }, { value: " inches", label: "inches" }, ]}
                                            />
                                            {/* <select className='col-1'>
                                            <option value=" feet">feet</option>
                                            <option value=" inches">inches</option>
                                        </select> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default BoatInfo
