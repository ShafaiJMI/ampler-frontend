// GenerateInvoicePage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const SearchInvoicePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [invoice, setInvoice] = useState({
        invoice_number: '',
        customer_name: '',
        date: '',
        total_amount: '',
    });

    const handleChange = (e) => {
        setInvoice({
            ...invoice,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/invoices/', invoice)
            .then(response => {
                console.log('Invoice created:', response.data);
            })
            .catch(error => {
                console.error('There was an error creating the invoice!', error);
            });
    };
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get('/invoices/');
            setData(response.data);  // Save the fetched data to state
            setLoading(false);        // Set loading to false after data is fetched
          } catch (err) {
            setError(err.message);   // Handle errors
            setLoading(false);       // Set loading to false if there is an error
          }
        };
    
        fetchData(); // Call the function to fetch data
      }, []);

      const DataList = () => {
        if (loading) {
            return <div>Loading...</div>;
            }
        if (error) {
            return <div>Error Occured: {error}</div>;
            }
        return (
            data.map((item) => (
               
                    <tr key={item.id} className="even:bg-white">
                      <td className="border border-gray-300 px-4 py-4 text-sm font-medium text-gray-700 capitalize">
                      {item.invoice_number}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {item.seller_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {item.buyer_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {item.total_landed_cost}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                      <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                      </svg>
                      </td>
                    </tr>
            
                ))
            )
      };
    return (
        <section className='container mx-auto p-4'>
            <div className='bg-white shadow-md rounded-md'>
        <form className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-6 p-6' onSubmit={handleSubmit}>
            <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" type="text" name="invoice_number" value={invoice.invoice_number} onChange={handleChange} placeholder="Invoice Number" />
            <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" type="text" name="customer_name" value={invoice.customer_name} onChange={handleChange} placeholder="Customer Name" />
            <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" type="date" name="date" value={invoice.date} onChange={handleChange} />
            <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" type="number" name="total_amount" value={invoice.total_amount} onChange={handleChange} placeholder="Total Amount" />
            <button className='py-2 bg-indigo-600 hover:bg-indigo-700 text-white' type="submit">Search Invoice</button>
        </form>
        </div>
        <div className='mt-4'>
            <div className="">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full border-collapse border rounded-md border-gray-300 ">
          <thead>
            <tr className="bg-white">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Invoice Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Seller Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Buyer Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Total Landed Cost
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Action
              </th>
            </tr>
          </thead>
          <tbody>
            <DataList />
          </tbody>
        </table>
      </div>
    </div>
        </div>
        </section>
    );
};

export default SearchInvoicePage;
