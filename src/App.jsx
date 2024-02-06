
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList.jsx"
import {useState,useEffect} from "react";
import CountriesList from "./components/CountryList.jsx";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import City from "./components/City.jsx";
import {Form ,convertToEmoji}from "./components/Form.jsx";
import {useCities,CitiesProvider} from "./components/contexts/CitiesContext.jsx"



export default function App() {
 
  return <div>
    <CitiesProvider>
  <BrowserRouter>

  <Routes>

<Route index element ={<Homepage/>}/>
<Route path="product" element={<Product/>} />
<Route path="pricing" element = {<Pricing/>}/>
<Route path ="/login" element = {<Login/>}/>
<Route path="app" element = {<AppLayout/>}>
<Route index element = {<Navigate to = "cities"/>}/>

<Route index element= {<CityList/>}/>
  <Route path='cities:id' element={<City/>} />
<Route path='cities' element = {<CityList cities={cities} isLoading={isLoading}/>}/>
<Route path = 'countries' element = {<CountriesList/>} />
<Route path = 'form' element ={<Form/>}/>
</Route>
<Route path ="*" element = {<PageNotFound/>}/>
  </Routes>

  </BrowserRouter>
  </CitiesProvider>
  </div>
}

