import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { PlusIcon } from '@radix-ui/react-icons';
import PopMessage from '../components/PopMessage';

const CreateInvoicePage = () => {
  const { control, handleSubmit, register, watch, reset, setValue } = useForm({
    defaultValues : {
      id: null,
      seller: {},
      buyer: {},
      purchases: [
      ],
      sales: [
      ],
      invoice_number: "",
      report_date: "",
      purchase_date: null,
      sale_date: null,
      oversize: 0,
      carrier_charge: 0,
      loading: 0,
      roadclearance: 0,
      food: 0,
      site_visit: 0,
      extra_expense: 0,
      petrol: 0,
      toll_tax: 0,
      total_amount: 0,
      miscellaneous: 0,
      bill_amount: 0,
      landed_cost: 0,
      benifit: 0,
      advance_paid: 0,
      advance_recived: 0,
    },
    
    
  });
  const { invoiceNumber } = useParams();
  const [searchParams, setSearchParams] = useSearchParams()
  const viewMode = searchParams.get('View') === 'true';
  const [activeTab, setActiveTab] = useState('seller'); // Default active tab
  const [isDisabled, setIsDisabled] = useState(false)
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const { fields: purchaseFields, append: appendPurchaseRow } = useFieldArray({
    control,
    name: 'purchases', // Track array of items
  });
  const { fields: sellFields, append: appendSellRow } = useFieldArray({
    control,
    name: 'sales', // Track array of sell items
  });
  const metalItems = ["Heavy","Dehati","Light","Teena","CI","Dust"];

  const watchPurchases = watch('purchases');
  const watchSales = watch('sales');
  const watchMiscellaneous = watch([
    'carrier_charge',
    'loading',
    'roadclearance',
    'food',
    'site_visit',
    'extra_expense',
    'petrol',
    'toll_tax'
  ]);
  
  useEffect(() => {
    const total = Object.values(watchMiscellaneous).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    setValue('miscellaneous', total.toFixed(2));
  }, [watchMiscellaneous, setValue]);

  useEffect(() => {
    watchPurchases.forEach((item, index) => {
      const weight = parseFloat(item.weight) || 0;
      const rate = parseFloat(item.rate) || 0;
      const amount = weight * rate;
      setValue(`purchases[${index}].amount`, amount.toFixed(2));
    });
    watchSales.forEach((item, index) => {
      const weight = parseFloat(item.weight) || 0;
      const rate = parseFloat(item.rate) || 0;
      const amount = weight * rate;
      setValue(`sales[${index}].amount`, amount.toFixed(2));
    });
  }, [watchPurchases, watchSales, setValue]);

  useEffect(() => {
    if (viewMode) {
      setIsDisabled(true);
    }
  }, []);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if(invoiceNumber) {
          const Invoice = await axiosInstance.get(`/view-invoice/${invoiceNumber}/`);
          reset(Invoice.data)
        }
        if (!invoiceNumber) {
        reset({
          id: null,
          seller: {},
          buyer: {},
          purchases: [
          ],
          sales: [
          ],
          invoice_number: "",
          report_date: "",
          purchase_date: null,
          sale_date: null,
          oversize: null,
          carrier_charge: "",
          loading: "",
          roadclearance: "",
          food: "",
          site_visit: "",
          extra_expense: "",
          petrol: "",
          toll_tax: "",
          total_amount: null,
          miscellaneous: null,
          bill_amount: "",
          landed_cost: "",
          benifit: null,
          advance_paid: "",
          advance_recived: "",
        })
      }
        const sellersresponse = await axiosInstance.get('sellers/');
        const buyersresponse = await axiosInstance.get('buyers/');
        setSellers(sellersresponse.data);  // Save the fetched data
        setBuyers(buyersresponse.data);  // Save the fetched data
      } catch (err) {
        alert(err.message);   // Handle errors
           
      }
    };

    fetchData(); // Call the function to fetch data
  }, [invoiceNumber,reset]);

  const fillSellerData = (e) => {
    const selectedName = e.target.value;
    const selectedSeller = sellers.find((seller) => seller.name === selectedName);
    if (selectedSeller) {
      setValue('seller',selectedSeller);
    console.log('updating seller data..');
    }
    
  };

  const fillBuyerData = (e) => {
    const selectedName = e.target.value;
    const selectedBuyer = buyers.find((buyer) => buyer.name === selectedName);
    if (selectedBuyer) {
      setValue('buyer',selectedBuyer);
    console.log('updating buyer data..');
    }
    
  };

  const onSubmit = async (data) => {
    // Handle form submission
    try {
      console.log('Form Data:', data);
      const response = await axiosInstance.post('create-invoice/', data);
    }
    catch (e){
      alert(e.message);
    }
    
  };

  // Text Field Component
  const TxTField = ({fieldlabel, fieldname, Placeholder, ...rest}) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{fieldlabel}</label>
        <input disabled={isDisabled} type="text" {...register(fieldname)} {...rest} placeholder={Placeholder} className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`} />
      </div>
    );
  };

  // Number Field Component
  const NumField = ({fieldlabel, fieldname, Placeholder, ...rest}) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{fieldlabel}</label>
        <input disabled={isDisabled} type="number" step={'any'} {...rest} placeholder={Placeholder} {...register(fieldname)} className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`} />
      </div>
    );
  };

  return (
    <div className="max-w-3xl backdrop-blur-md bg-white/60 shadow-md p-4 md:p-8 rounded-3xl mx-4 md:mx-auto">
      {/* Tabs */}
      <ul className="flex md:space-x-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li>
          <button
            onClick={() => setActiveTab('seller')}
            className={`p-4 rounded-t-lg ${activeTab === 'seller' ? 'bg-gray-100 text-blue-600' : 'hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Seller Info
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('purchase')}
            className={`p-4 rounded-t-lg ${activeTab === 'purchase' ? 'bg-gray-100 text-blue-600' : 'hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Purchase Invoice
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('buyer')}
            className={`p-4 rounded-t-lg ${activeTab === 'buyer' ? 'bg-gray-100 text-blue-600' : 'hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Miscellaneous Expenses
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('sell')}
            className={`p-4 rounded-t-lg ${activeTab === 'sell' ? 'bg-gray-100 text-blue-600' : 'hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Plant Invoice
          </button>
        </li>
      </ul>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {activeTab === 'seller' && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <input disabled={isDisabled} type="date" {...field} className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`} />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input disabled={isDisabled} type="text" list='sellersList' {...register('seller.name')} onInput={fillSellerData} placeholder="Seller's Name" className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`} />
              <datalist id='sellersList'>
                    { sellers.map((data) => (
                      <option key={data.id} value={data.name}/>
                    )) };
              </datalist>
            </div>

            <TxTField fieldlabel='Contact' fieldname='seller.phone_number' Placeholder="Seller's Contact"/>
            <TxTField fieldlabel='Address' fieldname='seller.address' Placeholder="Seller's Address"/>
            <NumField fieldlabel="Advance Paid" fieldname="advance_paid" Placeholder="0.00"/>

            <button type='button'
          onClick={() => setActiveTab('purchase')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next 
        </button>
          </div>
        )}

        {activeTab === 'purchase' && (
          <div>
            <TxTField fieldlabel='Vehicle No' fieldname='vehicle_no' Placeholder="Vehicle Numer"/>

           {/* Dynamic Purchased Items Rows */}
           <div>
            <p className='block text-sm mt-2 font-medium text-gray-700 md:hidden'>Purchased Items</p>
              {purchaseFields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-4 gap-1 md:gap-4 mt-1">
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Item</label>
                    <input
                      type="text"
                      list='metalList'
                      disabled={isDisabled}
                      {...register(`purchases[${index}].metal_type`)}
                      placeholder="Item"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                    <datalist id='metalList'>
                    { metalItems.map((items,index) => (
                      <option key={index} value={items}/>
                    )) };
                    </datalist>
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Purchase Weight</label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      {...register(`purchases[${index}].weight`)}
                      placeholder="Weight"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Purchase Rate</label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      {...register(`purchases[${index}].rate`)}
                      placeholder="Rate"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Purchase Amount</label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      {...register(`purchases[${index}].amount`)}
                      placeholder="Amount"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendPurchaseRow({ metal_type: '', weight: '', rate: '', amount: '' })}
                className="mt-4 text-sm text-indigo-600 font-semibold"
              >
                <span className='flex flex-row gap-2'><PlusIcon className='font-bold'/> Add Items</span>
              </button>
            </div>

            <NumField fieldlabel="Carrier Charge" fieldname="carrier_charge" Placeholder="0.00"/>
            <button type='button'
          onClick={() => setActiveTab('buyer')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next 
        </button>
          </div>
        )}

        {activeTab === 'buyer' && (
          <div>
            <NumField fieldlabel="Miscellaneous" fieldname="miscellaneous" Placeholder="Calculated Total"/>
            <NumField fieldlabel="Food" fieldname="food" Placeholder="0.00" />
            <NumField fieldlabel="Site Visit" fieldname="site_visit" Placeholder="0.00" />
            <NumField fieldlabel="Extra Expenses" fieldname="extra_expenses" Placeholder="0.00" />
            <NumField fieldlabel="Petrol" fieldname="petrol" Placeholder="0.00" />
            <NumField fieldlabel="Toll Tax" fieldname="toll_tax" Placeholder="0.00" />
            <NumField fieldlabel="Road Clearance" fieldname="road_clearance" Placeholder="0.00" />
            <NumField fieldlabel="Loading Cost" fieldname="loading" Placeholder="0.00" />
            <button type='button'
          onClick={() => setActiveTab('sell')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next 
        </button>
          </div>
        )}

        {activeTab === 'sell' && (
          <div>
            <TxTField list="buyersList" onClick={fillBuyerData} fieldlabel="Plant" fieldname="buyer.name" Placeholder="Plant Name/Address"/>
            <datalist id='buyersList'>
                    { buyers.map((data) => (
                      <option key={data.id} value={data.name}/>
                    )) };
              </datalist>
              <NumField fieldlabel="Advance Recived" fieldname="advance_recived" Placeholder="0.00"/>
            <div>
            <p className='block text-sm mt-2 font-medium text-gray-700 md:hidden'>Selling Items</p>
              {sellFields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-4 gap-1 md:gap-4 mt-1">
                  <div>
                    <label className="hidden md:block  text-sm font-medium text-gray-700">Item</label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      list='metalList2'
                      {...register(`sales[${index}].metal_type`)}
                      placeholder="Item"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                    <datalist id='metalList2'>
                    { metalItems.map((items,index) => (
                      <option key={index} value={items}/>
                    )) };
                    </datalist>
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Selling Weight</label>
                    <input
                     disabled={isDisabled}
                      type="text"
                      {...register(`sales[${index}].weight`)}
                      placeholder="Weight"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Selling Rate</label>
                    <input
                      type="text"
                      disabled={isDisabled}
                      {...register(`sales[${index}].rate`)}
                      placeholder="Rate"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Selling Amount</label>
                    <input
                       type="text"
                       disabled={isDisabled}
                      {...register(`sales[${index}].amount`)}
                      placeholder="Amount"
                      className={`mt-1 block w-full ${isDisabled?"border-0 bg-transparent shadow-none":"border border-gray-300 rounded-md shadow-sm"}`}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendSellRow({ metal_type: '', weight: '', rate: '', amount: '' })}
                className="mt-4 text-sm text-indigo-600 font-semibold "
              >
                <span className='flex flex-row gap-2'><PlusIcon className='font-bold'/> Add Items</span>
              </button>
            </div>
            
            <NumField fieldlabel="Oversize" fieldname="oversize" Placeholder="0.00"/>
            <div className='grid grid-cols-3 gap-4 mt-2'>
            <button
          type="button"
          className="mt-4 px-4 py-2 bg-yellow-400 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Preview
        </button>
            <button
          type="submit"
          className="mt-4 px-4 py-2 bg-cyan-500 text-white font-semibold rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
            <button type='button'
          onClick={()=>{}}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Draft
        </button>
        </div>
          </div>
        )}

        
      </form>
    </div>
  );
};

export default CreateInvoicePage;
