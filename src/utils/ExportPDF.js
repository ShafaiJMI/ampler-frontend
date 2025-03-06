import React from "react";
import { jsPDF } from 'jspdf';

function ExportPurchaseInvoice() {
    return null;
};
function ExportSellerInvoice() {
    return null;
};
function ExportFinalInvoice() {
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
};