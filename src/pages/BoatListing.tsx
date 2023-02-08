import addIcon from '../assets/icons/plus_white.svg'
import search from '../assets/icons/search.svg'
import boatImage from '../assets/images/boat_four.png'
import { Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import HenceforthIcons from '../assets/icons/HenceforthIcons';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const BoatListing = () => {
    return (
        <>
            {/* Boat-listing */}
            <section className="boat-listing py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12 mb-3">
                            <div className="boat-listing-header d-flex justify-content-between">
                                <h2>3 boats</h2>
                                <div className="add-boat-btn">
                                    <Link to={`/boat/add/info`}>
                                        <button className='btn btn-yellow d-flex align-items-center gap-2'>
                                            <img src={addIcon} alt="icon" className='img-fluid' height='15px' width="15px" />
                                            <span>Add New Boat</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="boat-listing-header d-flex justify-content-between align-items-center">
                                <div className="input-group mb-3 form-control p-0 rounded-pill w-auto">
                                    <span className="input-group-text bg-transparent border-0" id="basic-addon1">
                                        <img src={search} alt="icon" />
                                    </span>
                                    <input type="text" className="form-control border-0 ps-0 rounded-pill" placeholder="Search..." />
                                </div>
                                <div className="add-boat-btn">
                                    <Select
                                        defaultValue="Listing status"
                                        style={{ width: 150 }}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                            { value: 'disabled', label: 'Disabled', disabled: true },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* table */}
                        <div className="col-12 table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='thead'>
                                        <th scope="col">SR. NO.</th>
                                        <th scope="col">BOATS</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">LAST MODIFIED</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">01</th>
                                        <td>
                                            <div className="boats d-flex gap-2 align-items-center">
                                                <div className="boat-image">
                                                    <img src={boatImage} alt="img" className='img-fluid' />
                                                </div>
                                                <p>Morning Panoramic</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status d-flex gap-2 align-items-center">
                                                <div className="status-dot"></div>
                                                <p>Listed</p>
                                            </div>
                                        </td>
                                        <td>$30</td>
                                        <td>Today</td>
                                        <td>
                                            <div className="action d-flex gap-2">
                                                <button className='btn p-0 border-0'> <HenceforthIcons.ViewIcon /></button>
                                                <button className='btn p-0 border-0'> <HenceforthIcons.EditIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">02</th>
                                        <td>
                                            <div className="boats d-flex gap-2 align-items-center">
                                                <div className="boat-image">
                                                    <img src={boatImage} alt="img" className='img-fluid' />
                                                </div>
                                                <p>Morning Panoramic</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status d-flex gap-2 align-items-center">
                                                <div className="status-dot bg-red"></div>
                                                <p>Unlisted</p>
                                            </div>
                                        </td>
                                        <td>$30</td>
                                        <td>Today</td>
                                        <td>
                                            <div className="action d-flex gap-2">
                                                <button className='btn p-0 border-0'> <HenceforthIcons.ViewIcon /></button>
                                                <button className='btn p-0 border-0'> <HenceforthIcons.EditIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">03</th>
                                        <td>
                                            <div className="boats d-flex gap-2 align-items-center">
                                                <div className="boat-image">
                                                    <img src={boatImage} alt="img" className='img-fluid' />
                                                </div>
                                                <p>Morning Panoramic</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status d-flex gap-2 align-items-center">
                                                <div className="status-dot"></div>
                                                <p>Listed</p>
                                            </div>
                                        </td>
                                        <td>$30</td>
                                        <td>Today</td>
                                        <td>
                                            <div className="action d-flex gap-2">
                                                <button className='btn p-0 border-0'> <HenceforthIcons.ViewIcon /></button>
                                                <button className='btn p-0 border-0'> <HenceforthIcons.EditIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BoatListing
