import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { jsPDF } from 'jspdf';


const GenerateInvoicePage = () => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      date: '',
      name: '',
      contact: '',
      address: '',
      plant: '',
      vehicle_no: '',
      purchased_items: [
        { item: '', weight: '', rate: '', amount: '' },
      ],
      carrier_charge: 0,
      miscellaneous: 0,
      sell_items: [
        { item: '', weight: '', rate: '', amount: '' },
      ],
      road_clearance: 0,
      loading: 0,
      food: 0,
      site_visit: 0,
      extra_expenses: 0,
      petrol: 0,
      toll_tax: 0,
    },
    json_data : {
      "invoice_number": "INV-12350",
      "seller": {
        "name": "Seller Name",
        "phone_number": "+1234567890",
        "address": "Seller Address"
      },
      "buyer": {
        "name": "Buyer Name",
        "phone_number": "+0987654321",
        "address": "Buyer Address"
      },
      "bill_amount": 1000.00,
      "total_landed_cost": 1200.00,
      "advance_recived": 500.00,
      "carrier_charge": 50.00,
      "missclenous": 30.00,
      "roadclearance": 20.00,
      "loading": 10.00,
      "food": 5.00,
      "site_visit": 15.00,
      "extra_expense": 25.00,
      "petrol": 40.00,
      "toll_tax": 10.00,
      "purchases": [
        {
          "metal_type": "heavy",
          "weight": 100.00,
          "rate": 500.00,
          "total_amount": 50000.00
        },
        {
          "metal_type": "light",
          "weight": 50.00,
          "rate": 300.00,
          "total_amount": 15000.00
        }
      ],
      "sales": [
        {
          "metal_type": "heavy",
          "weight": 100.00,
          "rate": 600.00,
          "total_amount": 60000.00
        }
      ]
    }    
    
  });

  const [activeTab, setActiveTab] = useState('seller'); // Default active tab
  const { fields: purchaseFields, append: appendPurchaseRow } = useFieldArray({
    control,
    name: 'purchased_items', // Track array of items
  });
  const { fields: sellFields, append: appendSellRow } = useFieldArray({
    control,
    name: 'sell_items', // Track array of sell items
  });
  const metalItems = ["Heavy","Dehati","Light","Teena","CI","Dust"];
  const [buyers, setBuyers] = useState([]);


  const onSubmit = (data) => {
    // Handle form submission
    console.log('Form Data:', data);
    generatePDF(data);
  };
   // Function to generate PDF
   const generatePDF = (data) => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(20);
    doc.text('Invoice Preview', 14, 22);

    // Add Seller Info
    doc.setFontSize(12);
    doc.text(`Date: ${data.date}`, 14, 30);
    doc.text(`Name: ${data.name}`, 14, 38);
    doc.text(`Contact: ${data.contact}`, 14, 46);
    doc.text(`Address: ${data.address}`, 14, 54);

    // Add Purchase Info
    doc.text(`Plant: ${data.plant}`, 14, 62);
    doc.text(`Vehicle No: ${data.vehicle_no}`, 14, 70);

    // Add Purchased Items
    doc.text('Purchased Items:', 14, 78);
    data.purchased_items.forEach((item, index) => {
      doc.text(`Item: ${item.item}, Weight: ${item.weight}, Rate: ${item.rate}, Amount: ${item.amount}`, 14, 86 + index * 8);
    });

    // Add Miscellaneous Charges
    doc.text(`Carrier Charge: ${data.carrier_charge}`, 14, 86 + data.purchased_items.length * 8);
    doc.text(`Miscellaneous: ${data.miscellaneous}`, 14, 94 + data.purchased_items.length * 8);

    // Save as PDF
    doc.save('invoice.pdf');
  };
  

  return (
    <div className="max-w-3xl mx-4 md:mx-auto">
      {/* Tabs */}
      <ul className="flex space-x-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
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
            Buyer & Miscellaneous
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('sell')}
            className={`p-4 rounded-t-lg ${activeTab === 'sell' ? 'bg-gray-100 text-blue-600' : 'hover:text-gray-600 hover:bg-gray-50'}`}
          >
            Sell Invoice
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
                  <input type="date" {...field} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" {...register('name')} placeholder="Seller's Name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input type="text" {...register('contact')} placeholder="Seller's Contact" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" {...register('address')} placeholder="Seller's Address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next 
        </button>
          </div>
        )}

        {activeTab === 'purchase' && (
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle No</label>
              <input type="text" {...register('vehicle_no')} placeholder="Vehicle Numer" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

           {/* Dynamic Purchased Items Rows */}
           <div>
            <p className='block text-sm mt-2 font-medium text-gray-700 md:hidden'>Purchased Items</p>
              {purchaseFields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-4 gap-4 mt-1">
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Item</label>
                    <input
                      type="text"
                      list='metalList'
                      {...register(`purchased_items[${index}].item`)}
                      placeholder="Item"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
                      {...register(`purchased_items[${index}].weight`)}
                      placeholder="Weight"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Purchase Rate</label>
                    <input
                      type="text"
                      {...register(`purchased_items[${index}].rate`)}
                      placeholder="Rate"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Purchase Amount</label>
                    <input
                      type="text"
                      {...register(`purchased_items[${index}].amount`)}
                      placeholder="Amount"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendPurchaseRow({ item: '', weight: '', rate: '', amount: '' })}
                className="mt-4 text-sm text-indigo-600 font-semibold"
              >
                Add Item Row +
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Carrier Charge</label>
              <input type="number" step="100" placeholder="0.00" {...register('carrier_charge')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>
            <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
          </div>
        )}

        {activeTab === 'buyer' && (
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Miscellaneous</label>
              <input type="number" step="100" placeholder="0.00" {...register('miscellaneous')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Food</label>
              <input type="number" step="100" placeholder="0.00" {...register('food')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Site Visit</label>
              <input type="number" step="100" placeholder="0.00" {...register('site_visit')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Extra Expenses</label>
              <input type="number" step="100" placeholder="0.00" {...register('extra_expenses')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Petrol</label>
              <input type="number" step="100" placeholder="0.00" {...register('petrol')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Toll Tax</label>
              <input type="number" step="100" placeholder="0.00" {...register('toll_tax')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
          </div>
        )}

        {activeTab === 'sell' && (
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant</label>
              <input type="text" {...register('plant')} placeholder="Plant Name/Address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
            <p className='block text-sm mt-2 font-medium text-gray-700 md:hidden'>Selling Items</p>
              {sellFields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-4 gap-4 mt-1">
                  <div>
                    <label className="hidden md:block  text-sm font-medium text-gray-700">Item</label>
                    <input
                      type="text"
                      list='metalList2'
                      {...register(`sell_items[${index}].item`)}
                      placeholder="Item"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
                      type="text"
                      {...register(`sell_items[${index}].weight`)}
                      placeholder="Weight"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Selling Rate</label>
                    <input
                      type="text"
                      {...register(`sell_items[${index}].rate`)}
                      placeholder="Rate"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="hidden md:block text-sm font-medium text-gray-700">Selling Amount</label>
                    <input
                       type="text"
                      {...register(`sell_items[${index}].amount`)}
                      placeholder="Amount"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendSellRow({ item: '', weight: '', rate: '', amount: '' })}
                className="mt-4 text-sm text-indigo-600 font-semibold"
              >
                Add Sell Item Row +
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Road Clearance</label>
              <input type="number" step="100" {...register('road_clearance')} placeholder="0.00" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Loading Cost</label>
              <input type="number" step="100" {...register('loading')} placeholder="0.00" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className='grid grid-cols-3 gap-4 mt-2'>
            <button
          type=""
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
            <button
          onClick={()=>{}}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save & Export PDF
        </button>
        </div>
          </div>
        )}

        
      </form>
    </div>
  );
};

export default GenerateInvoicePage;
