import React, { useState,useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { PersonIcon, ArrowTopRightIcon, FilePlusIcon, DownloadIcon } from "@radix-ui/react-icons";

//Profile Card Component
const Profile = ({data,...rest}) => (
    <div className="group backdrop-blur-sm bg-white drop-shadow-lg rounded-2xl p-4 border-1 border-gray-500">
        <div className="flex flex-row justify-between py-2">
            <div className="flex flex-row justify-between items-centre gap-4">
                <div className="bg-gray-100 rounded-full p-2"><PersonIcon /></div>
                <h4>{data.name}</h4>
            </div>
            <div className="bg-gray-100 group-hover:bg-indigo-600 group-hover:text-white rounded-full p-2"><ArrowTopRightIcon /></div>
            
            </div>
            <hr></hr>
            <div className="py-2">
                <div className=" py-8">
                
                    <h4>Total deals : ₹{data.total_deals}</h4>
                    <p>Dues : ₹{data.dues}</p>
                    <p>Trips : {data.total_trips}</p>
                </div>
            </div>
            <hr></hr>
            <div className="py-2 flex flex-row justify-between">
                <div className="">
                    <p className="text-sm">Actions</p>
                </div>
                <div className="flex flex-row gap-4">
                    <FilePlusIcon />
                    <DownloadIcon />
                </div>
            </div>
        </div>
);

//Fetching and Rendering Buyers List
function BuyersList () {
    const [buyers, setBuyers] = useState([]);
    useEffect(() => {
        axiosInstance.get("buyers/")
        .then(response => {
            setBuyers(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },[]);
    return (
        <>
        {buyers.map((buyer) => (
            <Profile data={buyer} />
        ))
}
        </>
    );
};

//Fetching and Rendering Sellers List
function SellersList () {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        axiosInstance.get("sellers/")
        .then(response => {
            setSellers(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },[]);
    return (
        <>
        {sellers.map((seller) => (
           <Profile data={seller} />
        ))
    }
        </>
    );
};

function SellerBuyer() {   
    return (
    <>
    <div className="container-sm my-4">
        <div className="p-6 backdrop-blur-sm bg-white/60 rounded-3xl mx-6">
        
        <h1 className="font-bold">Buyer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BuyersList />
        </div>
        </div>
    </div>
    <div className="container-sm">
    <div className="p-6 backdrop-blur-sm bg-white/60 rounded-3xl mx-6">
        <h1 className="font-bold">Seller</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SellersList />
        </div>
        </div>
    </div>
    </>
    );
};
export default SellerBuyer;