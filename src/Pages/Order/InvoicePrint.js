import sampleImage from '../../assets/unnamed.png';
import { InvoiceContent } from './InvoiceContent'; // Import the new component

export function printInvoice(order) {
  const printWindow = window.open('', '', '');
  printWindow.document.write('<html><head><title>Invoice</title>');

  // Add Tailwind CSS for styling
  printWindow.document.write(`
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  `);

  printWindow.document.write('</head><body>');

  // Render the InvoiceContent component and pass the order and image
  printWindow.document.write(InvoiceContent({ order, sampleImage }));

  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
