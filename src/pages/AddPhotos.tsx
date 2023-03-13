import bannerImage from '../assets/images/image_four.png';
import uploadIcon from '../assets/icons/upload_photo.svg';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';
import BoatPhotoPreview from '../Components/row/BoatPhotoPreview';
import { Spin } from 'antd';

const AddPhotos = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/photos`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)
    const [spinning, setSpinning] = React.useState(false)
    const [selectedFiles, setSelectedFiles] = React.useState<Array<any>>([])

    const addFiles = (rowData: Array<any>) => {
        setSelectedFiles([...selectedFiles, ...rowData])
        console.log(rowData, "rowData");
    }

    const removeFiles = (index: number) => {
        const data = selectedFiles
        data.splice(index, 1)
        setSelectedFiles([...data])
    }

    const onSelectFiles = (files: any) => {
        let rowData = [] as any
        for (let i = 0; i < files.length; i++) {
            rowData.push({ file: files[i], loading: false })
        }
        addFiles(rowData)
        console.log("files", files.target.name);
    }

    const uploadImages = async () => {
        debugger
        const rowData = [] as any
        await Promise.all(
            selectedFiles.map(async (imageRes: any) => {
                try {
                    const apiRes = await henceforthApi.Boat.imageUpload('image', imageRes.file)
                    rowData.push(apiRes.image)
                } catch (error) {

                }
            })
        )
        return rowData
    }
    const deleteQuery=()=>{
        uRLSearchParams.delete("action")
        navigate({
            search: uRLSearchParams.toString()
        })    
    }
    const saveAndExit = async (b: boolean) => {
        try {
            if (selectedFiles.length >= 5) {
                setSpinning(true)
                const photos = await uploadImages()
                console.log(photos);

                let items = {
                    photos: {
                        boat_id: match?.params.id as string,
                        cover_photo: photos[0],
                        photos: photos.map((res: any, index: number) => { return { photo: res, order: index + 1 } })
                    }
                }

                const apiRes = await henceforthApi.Boat.create(items)
                Toast.success(apiRes.message)
                if (b) navigate(`/`, { replace: true })
                else navigate({
                    pathname: `/boat/${match?.params.id}/safety-question`,
                    search: uRLSearchParams.toString()
                })
            } else {
                Toast.error("Please Upload Atleast 5 Images")
                deleteQuery()
            }

        } catch (error) {
            Toast.error(error)
            deleteQuery()
        } finally {
            setSpinning(false)
        }
    }
    const onSubmit = async (e: any) => {
        e.preventDefault()
        saveAndExit(false)
    }
 
    useEffect(() => {
        if (uRLSearchParams.get("action") === "save_and_exit"||uRLSearchParams.get("action") === "save_and_exit_") {
            saveAndExit(true)
        }
    }, [uRLSearchParams.get("action")])
    return (
        <section className="Confirm-address-section h-100">
            <div className="container-fluid h-100">
                <form className="row h-100 place-layout" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <Spin spinning={spinning}>
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-4 pb-5">
                                    <div className="col-11 col-lg-11 mb-2 mb-sm-4">
                                        <h3 className='banner-title pb-3 d-flex gap-2 flex-wrap'>Add photos to your listing <span className='fw-normal'>(Choose at least 5 photos)</span></h3>
                                        <p>Upload at least one photo to publish your listing. We strongly suggest adding multiple photos to attract attention to your listing. Do not include images of your boat name or contact information.</p>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="upload-image">
                                            <input type="file" className='form-control' id='upload-icon' name='file' onChange={(e: any) => onSelectFiles(e.target.files)} multiple />
                                            <label >
                                                <div className="upload-icon text-center mb-2">
                                                    <img src={uploadIcon} alt="upload" className='img-fluid' />
                                                </div>
                                                <button className='btn btn-yellow'>Uploads Photos</button>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="row gy-4">
                                            {selectedFiles.map((res: any, index: number) =>
                                                <BoatPhotoPreview {...res} index={index} onRemove={() => removeFiles(index)} />
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <BackNextLayout />
                            </div>
                        </Spin>

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
