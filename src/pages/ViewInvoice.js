import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FileTextIcon, ExitIcon } from "@radix-ui/react-icons";

const ViewInvoice = () => {
    const { invoiceNumber } = useParams();
    const [ data,setData ] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/view-invoice/${invoiceNumber}/`);
          setData(response.data);
        } catch (err) {
          setError("Failed to fetch invoice data. Please try again.");
          console.error(err);
        }
      };
      
      fetchData();
    },
    [invoiceNumber]);

  const handlePrint = () => {
    window.print('#Printale');
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!data) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  
  return (
    
    <div className="mx-auto">
        <div className="fixed bottom-2 md:bottom-4 right-4 rounded-lg text-sm z-50">
        <button
            onClick={() => (navigate(`/invoices/`))}
            className="px-2 py-2 mx-1 bg-red-600 text-white shadow-md font-semibold rounded hover:bg-blue-600"
          >
            <ExitIcon className="h-6 w-auto"/>
          </button>
          <button
            onClick={handlePrint}
            className="px-2 py-2 mx-1 bg-blue-500 text-white shadow-md font-semibold rounded hover:bg-blue-600"
          >
            <FileTextIcon className="h-6 w-auto"/>
          </button>
        </div>
    <div className="card py-8 px-6 md:px-12 bg-white shadow-md overflow-auto md:my-10 md:mx-20" id="Printale">
      {/* Header Section */}
      <div className="flex flex-row justify-between border-b pb-5 min-w-max">
        {/*<div className="flex flex-col">
          <img className="w-20 md:w-32 h-auto mx-2" src={logo} alt="Ampler Mettle Logo" />
          <div className="my-3 text-xl md:text-3xl font-bold text-gray-900">AMPLER METTLE</div>
          <span className="mb-2">Mohanpur Lakhaipur Fatehpur Gaya</span>
          <span>824232, Bihar</span>
        </div>*/}
        {/*Left Header*/}
        <div className="flex flex-col flex-1">
          <div className="mb-3 text-lg text-gray-800 md:text-2xl font-medium">BILL TO</div>
          <span className="mb-2 text-gray-600">{data.seller.name}</span>
          <span className="text-gray-600">{data.seller.address}</span>
        </div>
        {/*Right Header*/}
        <div className="flex flex-col flex-1">
          <div className="text-lg md:text-2xl font-semibold text-right mb-3">
            INVOICE
          </div>
          <div className="">
            <div className="text-sm md:text-md flex flex-row gap-1 md:gap-2 items-center mb-2">
              <span className="text-md text-gray-800">DATE</span>
              <span className="text-gray-700">{data.report_date}</span>
            </div>
            <div className="text-sm md:text-md flex flex-row gap-1 md:gap-2 items-center mb-2">
              <span className=" text-gray-800">INVOICE#</span>
              <span className="text-gray-700">{data.invoice_number}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bill To Section 
      <div className="mt-5 mb-8 flex flex-col">
        <div className="mb-3 text-lg md:text-2xl font-medium">BILL TO</div>
        <span className="mb-2">Rahul Kumar, Aurangabad </span>
        <span>Aurangabad, Bihar</span>
      </div>*/}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="text-gray-800">
              <th className="text-left font-semibold py-3 border-b whitespace-nowrap">
                Description
              </th>
              <th className="text-right font-semibold py-3 border-b whitespace-nowrap px-3">
                Weight
              </th>
              <th className="text-right font-semibold py-3 border-b whitespace-nowrap px-3">
                Rate
              </th>
              <th className="text-right font-semibold py-3 border-b whitespace-nowrap">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.purchases.map((item) => (
            <tr key={item.id}>
              <td className="text-left py-3 border-b whitespace-nowrap">
                {item.metal_type}
              </td>
              <td className="text-right py-3 border-b px-3">{item.weight}</td>
              <td className="text-right py-3 border-b px-3">₹{item.rate}</td>
              <td className="text-right py-3 border-b">₹{item.amount}</td>
            </tr>
            ))
            }
    
          </tbody>
        </table>
      </div>

      {/* Notes and Total Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mt-8">
      <div className="font-semibold text-gray-800 mb-3 md:mb-0">NOTES</div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-800 mr-6">SUBTOTAL</span>
            <span className="text-gray-700">₹{data.bill_amount || '0.00'}</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="text-left py-3 border-b whitespace-nowrap">
                GST
              </td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b">₹0.00</td>
            </tr>
            <tr>
              <td className="text-left py-3 text-red-600 border-b whitespace-nowrap">
                Driver
              </td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right text-red-600 py-3 border-b">₹2000</td>
            </tr>
            <tr>
              <td className="text-left py-3 border-b whitespace-nowrap">
                Total
              </td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b">₹316655</td>
            </tr>
            <tr>
              <td className="text-left text-red-600 py-3 border-b whitespace-nowrap">
                Payment
              </td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right text-red-600 py-3 border-b">₹260142</td>
            </tr>
            <tr>
              <td className="text-left py-3 border-b whitespace-nowrap">
                Dues
              </td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b px-3"></td>
              <td className="text-right py-3 border-b">₹56513</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ViewInvoice;
