// GenerateInvoicePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons"
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

      const navigate = useNavigate();
      const handleView = (inv) => {
        navigate(`/view/invoice/${inv}/`);
      };
  
      const handleEdit = (inv) => {
        navigate(`/edit/invoice/${inv}/`);
      };

      const Actions = ({invoiceNumber}) => (
        <div className='flex flex-row gap-4 justify-center'>
          <button className="bg-gray-100 p-2 rounded-full" onClick={handleView.bind(null,invoiceNumber)}><TrashIcon className='text-blue-600' /></button>
          <button className="bg-gray-100 p-2 rounded-full" onClick={handleEdit.bind(null,invoiceNumber)}><Pencil1Icon className='text-red-600' /></button>
        </div>
      )

      const DataList = () => {
        if (loading) {
            return <div>Loading...</div>;
            }
        if (error) {
            return <div>Error Occured: {error}</div>;
            }
        return (
            data.map((item) => (
                    <tr key={item.id} className="even:bg-white h-14">
                      <td className="border-gray-200 px-4 py-4 text-sm font-medium text-blue-700 capitalize hover:underline">
                      <Link to={`/view/invoice/${item.invoice_number}/`}>{item.invoice_number}</Link>
                      </td>
                      <td className="border-gray-200 px-4 py-2 text-sm text-gray-700">
                      {item.seller_name || '--empty--'}
                      </td>
                      <td className="border-gray-200 px-4 py-2 text-sm text-gray-700 hidden md:table-cell">
                      {item.buyer_name || '--empty--'}
                      </td>
                      <td className="border-gray-200 px-4 py-2 text-sm text-gray-700 hidden md:table-cell">
                      {item.report_date || '--empty--'}
                      </td>
                      <td className="border-gray-200 px-4 py-2 text-sm text-gray-700 hidden md:table-cell">
                      {item.landed_cost || '0.00'}
                      </td>
                      <td className="border-gray-200 px-4 py-2 text-sm text-gray-700 hidden md:table-cell">
                        <div className='bg-yellow-100 text-yellow-600 rounded-s-full rounded-e-full p-1 text-center'><a>Draft</a></div>
                      
                      </td>
                      <td className="border-gray-200 px-4 py-2 text-sm text-gray-700">
                        <Actions invoiceNumber={item.invoice_number} /> 
                      </td>
                    </tr>
                ))
            )
      };
    return (
        <section className='container mx-auto p-4'>
        <div className='backdrop-blur-md bg-white/60 shadow-md rounded-3xl'>
        <form className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-6 p-6' onSubmit={handleSubmit}>
            <input className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm" type="text" name="invoice_number" value={invoice.invoice_number} onChange={handleChange} placeholder="Invoice Number" />
            <input className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm" type="text" name="customer_name" value={invoice.customer_name} onChange={handleChange} placeholder="Party Name" />
            <input className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm" type="date" name="date" value={invoice.date} onChange={handleChange} />
            <input className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm" type="number" name="total_amount" value={invoice.total_amount} onChange={handleChange} placeholder="Search by Amount" />
            <button className='py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 text-white' type="submit">Search Invoice</button>
        </form>
        </div>
        <div className='mt-4'>
            <div className="">
      <div className="overflow-x-auto rounded-3xl bg-white p-8 shadow-lg">
        <h4 className='text-lg font-semibold'>Invoices</h4>
        <table className="min-w-full mt-4 rounded-md border-gray-200">
          <thead>
            <tr className="bg-slate-100 h-20">
              <th className=" border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700">
                Invoice Number
              </th>
              <th className="border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700">
                Seller Name
              </th>
              <th className="border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700 hidden md:table-cell">
                Buyer Name
              </th>
              <th className="border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700 hidden md:table-cell">
                Report Date
              </th>
              <th className="border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700 hidden md:table-cell">
              Landed Cost
              </th>
              <th className="border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700 hidden md:table-cell">
              Status
              </th>
              <th className="border-gray-200 px-4 py-2 text-left text-md font-semibold text-gray-700">
              
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