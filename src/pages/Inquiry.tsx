import React from 'react';
import { Pagination, Spin, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Select, } from 'antd';
import search from '../assets/icons/search.svg'
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import Tablelayout from '../Components/inquiry/TableLayout';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from '../context/Provider';
import henceofrthEnums from '../utils/henceofrthEnums';

const InquiryPage = () => {
    const match = useMatch('/inquiry/:type/:page')
    const navigate = useNavigate()
    const location = useLocation()
    const uRLSearchParams = new URLSearchParams(location.search)
    const { authState, Toast } = React.useContext(GlobalContext)
    const [inqieryData, setInquiryData] = React.useState({
        name: "",
        boat_name: "",
        email: "",
        phone: Number(),
        id:Number(),
        status:""
    })
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState({
        current_page: 0,
        data: [],
        per_page: 10,
        total: 0
    })
    const filternavigate = (type: string, page: number) => {
        navigate({ pathname: `/inquiry/${type ? type : match?.params.type}/${page ? page : 1}`, search: uRLSearchParams.toString() })
    }

    const handleSearch = (name: string, value: any) => {
        if (value) {
            console.log(name, value);
            uRLSearchParams.set(name, value)
        } else {
            uRLSearchParams.delete(name)
        }
        filternavigate('', 0)
    }
    const handleStatus = async (id: number, status: string) => {
        const items = {
            status
        }
        setLoading(true)
        try {
            const apiRes = await henceforthApi.Inquiry.inquiryStatus(id, items)
            Toast.success(apiRes.message)
            await initialise()
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }
    const handleSocialFilter = (value: string) => {
        if (value) {
            uRLSearchParams.set('inquiry_mode', value)

        } else {
            uRLSearchParams.delete('inquiry_mode')
        }
        filternavigate('', 0)
    };

    const onChangeQuery = (path: string) => {
        navigate(`/inquiry/${path}/1`)
    };

    const initialise = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.Inquiry.pagination(
                String(match?.params.type !== 'all' ? match?.params.type : ''),
                String(match?.params.page),
                uRLSearchParams.toString()
            )

            setState(apiRes.data)

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: `All`,
            children: <Tablelayout {...state} setInquiryData={setInquiryData} initialise={initialise} />
        },
        {
            key: 'resolved',
            label: `Resolved`,
            children: <Tablelayout  {...state} setInquiryData={setInquiryData} initialise={initialise} />

        },
        {
            key: 'open',
            label: `Open`,
            children: <Tablelayout  {...state} setInquiryData={setInquiryData} initialise={initialise} />
        },
    ];



    React.useEffect(() => {
        initialise()
    }, [match?.params.type, match?.params.page, uRLSearchParams.get('inquiry_mode'), uRLSearchParams.get('search')])

    console.log(inqieryData)

    return (
        <Spin spinning={loading} className='h-100' >
            {/* inquiry section */}
            <section className='inquiry-section py-5'>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12">
                            <div className="title d-flex justify-content-between align-items-center">
                                <h2>Inquiry</h2>
                                <Select
                                    defaultValue=""
                                    style={{ width: 150 }}
                                    onChange={handleSocialFilter}
                                    options={[
                                        { value: '', label: 'All' },
                                        { value: 'whatsapp', label: 'Whatsapp' },
                                        { value: 'email', label: 'Email' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 form-control p-0 rounded-pill w-auto">
                                <span className="input-group-text bg-transparent border-0" id="basic-addon1">
                                    <img src={search} alt="icon" />
                                </span>
                                <form onSubmit={(e: any) => {
                                    e.preventDefault();
                                    handleSearch('search', e.target.search.value);
                                }}>
                                    <input type="text" className="form-control border-0 ps-0 rounded-pill" name='search' placeholder="Search..." onChange={(e: any) => {
                                        if (!e.target.value) {
                                            handleSearch(e.target.name, e.target.value);
                                        }
                                    }} />
                                </form>
                                {/* <input type="text" className="form-control border-0 ps-0 rounded-pill" placeholder="Search..." /> */}
                            </div>
                        </div>
                        <div className="col-12">
                            <Tabs defaultActiveKey={match?.params.type} items={items} onChange={(e) => filternavigate(e, 0)} />
                        </div>
                        <div className="pagination justify-content-center">
                            <Pagination
                                pageSize={state.per_page}
                                total={state.total}
                                showSizeChanger={false}
                                current={Number(match?.params.page) ? Number(match?.params.page) : 1}
                                onChange={(page: any) => filternavigate('', page)}
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="emailInquiryModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title w-100 text-center" id="exampleModalLabel">Enquire via Email</h6>
                            <button type="button" className="btn-close fs-12 shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-sm-4 py-4">
                            <div className="row gy-4">
                                <div className="col-lg-6">
                                    <div className="inquiry-name">
                                        <h6 className='mb-2'>Name</h6>
                                        <p>{inqieryData?.name}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="inquiry-name">
                                        <h6 className='mb-2'>Phone No.</h6>
                                        <p>{inqieryData.phone ? '+91' : ""}{inqieryData.phone ? inqieryData.phone : "Not Avaiable"}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="inquiry-name">
                                        <h6 className='mb-2'>Email</h6>
                                        <p>{inqieryData?.email}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer px-sm-4">
                        
                            <button type="button" className="btn btn-yellow w-100 py-2" data-bs-dismiss="modal"  onClick={()=>handleStatus(inqieryData.id,"resolved")} disabled={henceofrthEnums.InquiryStatus.resolved===inqieryData.status as any}>Resolve this Enquiry</button>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default InquiryPage
