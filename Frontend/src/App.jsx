
import { Route,  Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Registration } from "./Components/Auth/Registration";
import { ForgetPassword } from "./Components/Auth/ForgetPassword";
import { Login } from "./Components/Auth/Login";
import { Dashboard } from "./Components/Admin/Deshboard";

import ProfilePage from './Pages/ProfilePage';
import ParcelOrderManagement from "./Components/Admin/PercelOrderMangement";
import OnsiteOrderManagement from "./Components/Admin/OnsiteOrderManagement";
import AddItem from "./Components/Admin/AddItem";

import MenuPage from "./Pages/MenuPage";

import EditItem from "./Model/EditItemModel";
import ParcelPaymenthistory from './Components/Admin/PercelPaymentHistory';
import OnsitePaymentHistory from './Components/Admin/OnsitePaymentHistory';

import CustomerOnSiteOrder from './Components/Customer/CustomerOnSiteOrder';
import Barcode from "./Pages/Barcode";
import CreateQR from "./Pages/CreateQRCode";
import ItemDetails from "./Components/Customer/ItemDetails";
import Cart from "./Components/Customer/Cart";
import CashPayment from "./Components/Customer/CashPayment";
import OnlinePayment from "./Components/Customer/OnlinePayment";
import PaymentSelection from "./Components/Customer/PaymentSelection";
// import PaymentCard from './Components/Customer/PaymentCard';
import StripePayment from './Components/Customer/StripePayment';






const App = () => {
  return (
    <>
    
  

 
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />       
        <Route path="/deshbord" element={<Dashboard/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/parcel-order" element={<ParcelOrderManagement/>}/>
        <Route path="/onsite-order" element={<OnsiteOrderManagement/>}/>
        <Route path="/menupage" element={<MenuPage/>}/>
        <Route path="/add-item" element={<AddItem/>} />
        <Route path='/edit-item/:itemId' element={<EditItem/>}/>
        <Route path="/percalPayment" element={<ParcelPaymenthistory/>}/>
        <Route path ='/onsitepayment' element={<OnsitePaymentHistory/>}/>
        <Route path='/item-details' element={<ItemDetails/>} />
        <Route path="/customer-onsite" element={<CustomerOnSiteOrder/>}/>
        <Route path="/barcode" element={<Barcode/>}/>
         <Route path="/createbarcode" element={<CreateQR/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path='/cash-payment' element={<CashPayment/>}/>
         <Route path='/online-payment' element={<OnlinePayment/>}/>
         <Route path='/select-payment' element={<PaymentSelection/>}/>
         {/* <Route path="/payment-card" element={<PaymentCard />} /> */}
         <Route path="/payment-card" element={<StripePayment />} />
      </Routes>
      
    </>
  );
};

export default App;
