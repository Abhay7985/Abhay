import { Fragment, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import BoatInfo from './pages/BoatInfo';
import SelectPassenger from './pages/SelectPassenger';
import PlaceLocated from './pages/PlaceLocated';
import { GlobalContext } from './context/Provider';
import BoatListing from './pages/BoatListing';
import AmenitiesOffer from './pages/AmenitiesOffer';
import SafetyQuestions from './pages/SafetyQuestions';
import BoatPrice from './pages/BoatPrice';
import BoatDetails from './pages/BoatDetails';
import EditImage from './pages/EditImage';
import EditAmenities from './pages/EditAmenities';
import InquiryPage from './pages/Inquiry';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ProviderCalender from './pages/ProviderCalender';
import MainLayout from './layout/MainLayout';
import BoatLayout from './layout/BoatLayout';
import AddPhotos from './pages/AddPhotos';
import EditBoatDetails from './pages/EditBoatDetails';
import Contact from './pages/Contact-us';
import Social from './pages/Social'
import FaqPage from './pages/FaqPage';
import Extra from './pages/Extra';

const App = () => {
  const { authState } = useContext(GlobalContext)
  return (
    <Routes>
      {authState?.access_token ?
        <Fragment>
          <Route path="boat/*" element={<BoatLayout />}>
            <Route path="add/info" element={<BoatInfo />} />
            <Route path="passengers" element={<SelectPassenger />} />
            <Route path=":id/place" element={<PlaceLocated />} />
            <Route path=":id/amenities" element={<AmenitiesOffer />} />
            <Route path=":id/extra" element={< Extra/>} />
            <Route path=":id/photos" element={<AddPhotos />} />
            <Route path=":id/safety-question" element={<SafetyQuestions />} />
            <Route path=":id/price" element={<BoatPrice />} />
          </Route>

          <Route path="*" element={<MainLayout />}>
            <Route index element={<BoatListing />} />
            <Route path="inquiry/:type/:page" element={<InquiryPage />} />
            <Route path="boat/:id/inquiry" element={<BoatDetails />} />
            <Route path="boat/:id/inquiry/edit/:type" element={<EditBoatDetails />} />
            <Route path="boat/:id/photos/edit" element={<EditImage />} />
            <Route path="boat/:id/amenities/edit" element={<EditAmenities />} />
            <Route path="calender" element={<ProviderCalender />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FaqPage />} />
            
            <Route path=":type" element={<Social />} />
             
          </Route>
        </Fragment>
        :
        <Route path="*" element={<SignIn />} />
      }
    </Routes>
  );
}

export default App;
