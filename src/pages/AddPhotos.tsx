import bannerImage from '../assets/images/image_one.png';
import uploadIcon from '../assets/icons/upload_photo.svg';
import BoatPhotoView from '../Components/row/BoatPhotoView';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

const AddPhotos = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/photos`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)
    const [coverImage, setCoverImage] = useState()
    const [image, setImage] = useState([])


    const getImage = async() => {
        try {
            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            console.log(res?.data.cover_image);
            
            setCoverImage(res.data)
        } catch (error) {
            
        }

    }

    useEffect(() => {
        getImage()
    },[])


    const handleImage = async (e: any) => {
        const image = e.target.files[0]
        let res = await henceforthApi.Boat.imageUpload('image', image)
        // setImage(res.image);
        await uploadImage([...image,res.image])

    }


    const uploadImage = async(arr:any) => {
        let length = arr?.length - 1
        let lastItem = arr[length]
        console.log(lastItem);
        
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let items = {
            photos: {
                boat_id: match?.params.id,
                cover_image: coverImage,
                photos: [...image]
            }
        }

        try {
            let apiRes = await henceforthApi.Boat.create(items)
            console.log(apiRes);
            // navigate({
            //     pathname: `/boat/${match?.params.id}/safety-question`,
            //     search: uRLSearchParams.toString()
            // })
        } catch (error) {

        }



    }

    return (<section className="Confirm-address-section">
        <div className="container-fluid">
            <form className="row" onSubmit={onSubmit}>
                <div className="col-lg-6">
                    <div className="banner-content h-100 d-flex flex-column ">
                        <div className="row justify-content-center justify-content-lg-end gy-4 pb-5">
                            <div className="col-11 col-lg-11 mb-4">
                                <h3 className='banner-title pb-3'>Add photos to your listing <span className='fw-normal'>(Choose at least 5 photos)</span></h3>
                                <p>Upload at least one photo to publish your listing. We strongly suggest adding multiple photos to attract attention to your listing. Do not include images of your boat name or contact information.</p>
                            </div>
                            <div className="col-11 col-lg-11">
                                <div className="upload-image">
                                    <input type="file" className='form-control' id='upload-icon' name='file' onChange={handleImage} />
                                    <label htmlFor="upload-icon">
                                        <div className="upload-icon text-center mb-2">
                                            <img src={uploadIcon} alt="upload" className='img-fluid' />
                                        </div>
                                        <button className='btn btn-yellow'>Uploads Photos</button>
                                    </label>

                                </div>
                            </div>
                            <div className="col-11 col-lg-11">
                                <div className="row gy-4">
                                    <BoatPhotoView />
                                    {/* <BoatPhotoView />
                                    <BoatPhotoView />
                                    <BoatPhotoView />
                                    <BoatPhotoView /> */}
                                </div>
                            </div>
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

export default AddPhotos;
