// src/MainContent.jsx
// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Pos from '../Pages/POS/Pos';
import AllProduct from '../Pages/Product/AllProduct';
import Business from '../Pages/Config/Business/Business';
import User from '../Pages/Config/User/User';
import Order from '../Pages/Order/Order';
import Access from '../Pages/Access/Access';
import Notice from '../Pages/Notice/Notice';
import FollowUp from '../Pages/FollowUp/FollowUp';
import AllVariation from '../Pages/Product/AllVariation';
import CreateVariation from '../Pages/Product/CreateVariation';
import Invoice from '../Pages/Config/Invoice/Invoice';
import Sms from '../Pages/Config/Sms/Sms';
import LowStock from '../Pages/Config/LowStock/Stock';
import Api from '../Pages/Config/Api/Api';
import Category from '../Pages/Category/Category';
import AddCategory from '../Pages/Category/AddCategory';
import CreateProduct from '../Pages/Product/CreateProduct';
import AllStock from '../Pages/Stock/AllStock';
import EditProduct from '../Pages/Product/EditProduct';
import AddStock from '../Pages/Stock/AddStock';
import Report from '../Pages/Analytics/Report';
import SalesTarget from '../Pages/Analytics/SalesTarget';
import Customer from '../Pages/Customer/Customer';
import Profile from '../Pages/Profile/Profile';
import StockLocation from '../Pages/Product/StockLocation';
import Refferel from '../Pages/Refferel/Refferel';
import SingleProduct from '../Pages/Product/SingleProduct';
import SMS from '../Pages/Marketing/SMS';
import Subscription from '../Pages/Subscription/Subscription';
import Log from '../Pages/Stock/Log';
import SmsHistory from '../Pages/Marketing/SmsHistory';
import CheckOut from '../Pages/CheckOut/CheckOut';
// import EditSingleProduct from '../Pages/Product/EditSingleProduct';

const MainContent = ({ userInfo ,error}) => {
  return (
 <div>
     <main className="mt-4 flex-1">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/all-product" element={<AllProduct />} />
        <Route path="/product/create-product" element={<CreateProduct />} />
        <Route path="/product/edit-product" element={<EditProduct />} />
        <Route path="/product/single-product" element={<SingleProduct />} />
        <Route path="/config/business" element={<Business />} />
        <Route path="/config/user" element={<User />} />
        <Route path="/order" element={<Order />} />
        <Route path="/access" element={<Access />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/follow-up" element={<FollowUp />} />
        <Route path="/product/variation" element={<AllVariation />} />
        <Route path="/product/variation/create" element={<CreateVariation />} />
        <Route path="/product/stock-location" element={<StockLocation />} />
        <Route path="/config/invoice" element={<Invoice />} />
        <Route path="/config/sms" element={<Sms />} />
        <Route path="/config/low-stock" element={<LowStock />} />
  
        <Route path="/config/api" element={<Api />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/addcategory" element={<AddCategory />} />
        <Route path="/product/createproduct" element={<CreateProduct />} />
        <Route path="/stock/all" element={<AllStock />} />
        <Route path="/stock/add" element={<AddStock />} />
        <Route path="/stock/log" element={<Log />} />

        <Route path="/analytics/report" element={<Report />} />
        <Route path="/analytics/sales-target" element={<SalesTarget />} />
        <Route path="/marketing/sms-history" element={<SmsHistory />} />
        <Route path="/marketing/sms" element={<SMS />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/refer" element={<Refferel />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/checkout" element={<CheckOut  userInfo={userInfo}
                    error={error} />} />
       
  
      </Routes>
    </main>
 </div>

  );
};

export default MainContent;
