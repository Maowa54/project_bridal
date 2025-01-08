// InvoiceContent.js
import { FaShopify } from 'react-icons/fa';

export function InvoiceContent({ order, sampleImage }) {
  return (
    `<div class="p-6 max-w-4xl mx-auto">
      <div class='flex justify-between'>
        <div>
          <img src="${sampleImage}" alt="Company Logo" class="w-24 h-24 object-cover mb-4" />
          <h1 class="pb-2 mb-2">Customer Name: ${order.c_name}</h1>
          <h1 class="pb-2 mb-2">Business Address: ${order.address}</h1>
          <h1 class="pb-2 mb-2">Customer Phone: ${order.c_phone}</h1>
        </div>
        <div>
          <h1 class="flex items-center">
            <FaShopify/> Shop Address
          </h1>
          <h1 class="text-3xl font-bold pb-2 mb-2">Invoice</h1>
          <h1 class="pb-2 mb-2">Invoice Date: ${formatDate(order.created_at)}</h1>
          <h1 class="pb-2 mb-2">Delivery Method: ${order.courier}</h1>
          <h1 class="pb-2 mb-2">Payment Method: ${order.payment_method || 'Cash'}</h1>
        </div>
      </div>
      <div class="mb-6">
        <table class="w-full border-collapse">
          <thead>
            <tr class="text-center">
              <th class="px-3 py-2">Image</th>
              <th class="px-2 py-2">Product Name</th>
              <th class="px-2 py-2">Size</th>
              <th class="px-2 py-2">Price</th>
              <th class="px-2 py-2">Quantity</th>
              <th class="px-2 py-2">Total</th>
            </tr>
          </thead>
          <tbody class="text-center">
            ${order?.order_products?.map(
              (product) => `
              <tr>
                <td class="px-2 py-2">
                  <img src="https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.image}" class="w-20 h-20 object-cover rounded-lg" alt="${product.name}" />
                </td>
                <td class="px-2 py-2">${product.name}</td>
                <td class="px-2 py-2">N/A</td>
                <td class="px-2 py-2">${product.price}</td>
                <td class="px-2 py-2">${order.s_product_qty || ''}, ${order.v_product_qty || ''}</td>
                <td class="px-3 py-2">${order.cod_amount}</td>
              </tr>`
            ).join('')}
            ${order?.order_variable_products?.map(
              (product) => `
              <tr>
                <td class="px-2 py-2">
                  <img src="https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/Attire_Idyll/image/${product.product.image}" class="w-20 h-20 object-cover rounded-lg" alt="${product.product.name}" />
                </td>
                <td class="px-2 py-2">${product.product.name}</td>
                <td class="px-2 py-2">${product.values}</td>
                <td class="px-2 py-2">${product.price}</td>
                <td class="px-2 py-2">${order.s_product_qty || ''}, ${order.v_product_qty || ''}</td>
                <td class="px-3 py-2">${product.price}</td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>
      <div>
        ${order.cod_amount ? `<p>Total Amount : ${order.cod_amount}</p>` : ''}
        <div class="flex justify-end">
          ${order.advance ? `<p>Advanced Paid : ${order.advance}</p>` : ''}
          ${order.delivery_charge ? `<p>Delivery Charge : ${order.delivery_charge}</p>` : ''}
          ${order.discount_amount ? `<p>Discount Amount : ${order.discount_amount}</p>` : ''}
        </div>
        <div class="text-center text-sm text-gray-600 mt-6">
          <h1>Terms & Condition : <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
        </div>
      </div>
      <div class="text-center text-sm text-gray-600 mt-6">
        Thank you for your business!
      </div>
    </div>`
  );
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}
 