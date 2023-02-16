import { Spin } from 'antd';
import React from 'react';
import { useMatch } from 'react-router-dom';
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

interface AmenitiesInterface {
    id: number,
    amenity: string,
    checked?: boolean
}

const EditAmenities = () => {
    const match = useMatch("boat/:id/amenities/edit")
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState<Array<AmenitiesInterface>>([])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let items = {
            amenities: state.filter((res) => res.checked === true).map((res) => res.id)
        }
        setLoading(true)
        try {
            if(state[0]?.checked){
                let apiRes = await henceforthApi.Boat.edit(match?.params.id as string, items)
                Toast.success(apiRes.message)
                window?.history?.back()
            } else{
                Toast.error("Please Select Amenities")
            }
        } catch (error) {
            Toast.error(error)
            
        }finally{
            setLoading(false)
        }
    }

    const handleChecked = (b: boolean, index: number) => {
        const item = state
        item[index]['checked'] = b
        setState([...item])
    };


    const initialiseDetails = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {
            
            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            return res
        } catch (error) {
        }
    }


    const initialiseAmenities = async () => {
        try {
            setLoading(true)
            let rowData: Array<AmenitiesInterface> = []
            let amenitiesRes = await henceforthApi.Boat.boatAmenities()
            let amenitiesData = amenitiesRes.data
            let boatRes = await initialiseDetails()
            let boatData = boatRes.data

            amenitiesData.forEach((element: AmenitiesInterface) => {
                const item = boatData.amenities.find((res: AmenitiesInterface) => res.id == element.id)
                rowData.push({
                    id: element.id,
                    amenity: element.amenity,
                    checked: item?.id === element?.id
                })

            });
            setState(rowData)
        } catch (error) {
        }
        finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        initialiseAmenities()
    }, [])

    return (
        <Spin spinning={loading} >
            <section className="edit-amenities py-5">
                <div className="container">
                    <form className="row" onSubmit={onSubmit}>
                        <div className="col-md-6">
                            <div className="row gy-4">
                                <div className="col-12" onClick={() => window?.history.back()}>
                                    <HenceforthIcons.LeftArrow />
                                </div>
                                <div className="col-lg-12">
                                    <div className="title d-flex justify-content-between align-items-center py-3 flex-wrap gap-2">
                                        <h2>Edit Amenities</h2>
                                        <div className="save-btn">
                                            <button className="btn btn-yellow" type='submit'>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row gy-4">
                                        {state.map((res: AmenitiesInterface, index: number) =>
                                            <div className="col-12 col-lg-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={res.checked} onChange={(e) => handleChecked(e.target.checked, index)} id="check1" />
                                                    <label className="form-check-label" htmlFor="check1">
                                                        {res?.amenity}
                                                    </label>
                                                </div>
                                            </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Spin>
    )
}

export default EditAmenities
