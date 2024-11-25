import React from 'react';
import axios from 'axios';

export default function YourApplicationForm() {
  const handlePreviewClick = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.error('No access token found.');
      alert('You must be logged in to preview the application.');
      return;
    }

    try {
      // API call to generate and fetch the PDF
      const response = await axios.get('http://localhost:3001/api/PDF/genpdf', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Ensure the response is treated as a blob
      });

      if (response.status === 200) {
        // Create a downloadable link for the PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'YourApplication.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
      } else {
        console.error('Failed to fetch profile data');
        alert('Unable to preview the application. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the PDF.');
    }
  };

  const handlePaymentClick = async () => {
    try {
      const amount = 500; // Payment amount (e.g., ₹500)

      // Step 1: Create Razorpay order on the server
      const response = await axios.post('http://localhost:3001/api/Pay/order', { amount });
      const { id: order_id, amount: order_amount, currency } = response.data;

      // Step 2: Configure Razorpay payment options
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
        amount: order_amount,
        currency,
        name: 'Your Application',
        description: 'Application Payment',
        order_id,
        handler: function (response) {
          console.log('Payment successful:', response);
          alert('Payment successful!');
          // Add further logic (e.g., call a server endpoint to verify payment)
        },
        prefill: {
          name: 'Your Name', // Replace with user's name dynamically
          email: 'user@example.com', // Replace with user's email dynamically
          contact: '9999999999', // Replace with user's phone number dynamically
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initiate payment.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>

      <p>You can preview your application or proceed with the payment below.</p>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        {/* Preview Application Button */}
        <button
          onClick={handlePreviewClick}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '180px'
          }}
        >
          Preview Application
        </button>

        {/* Payment Button */}
        <button
          onClick={handlePaymentClick}
          style={{
            backgroundColor: '#2196F3',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '180px',
          }}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}
