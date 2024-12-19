import React from 'react';
import { useLocation } from 'react-router-dom';

const AddressPage = () => {
    const { state } = useLocation();  // Get cart and pricing data from the MedicineOrderPage

    if (!state) {
        return <p>No cart data found</p>;
    }

    const { cart, subtotal, gst, discount, total } = state;

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Address Page</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2">Cart Items</h3>
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-2 flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{gst}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span>Discount (10%):</span>
                    <span>-₹{discount}</span>
                </div>
                <div className="font-semibold flex justify-between">
                    <span>Total:</span>
                    <span>₹{total}</span>
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
