import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';

const EnquiryCard = ({ enquiry }) => {
    const [loading, setLoading] = useState(false);
    const [hasReplied, setHasReplied] = useState(enquiry.has_replied);

    const handleToggle = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('enquiries')
            .update({ has_replied: !hasReplied })
            .eq('id', enquiry.id)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error updating replied status:', error.message);
        } else {
            setHasReplied(!hasReplied);
        }

        setLoading(false);
    };

    return (
        <div className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{enquiry.name}</h3>
                <span className="text-sm text-gray-500">{enquiry.email}</span>
            </div>

            <div className="mb-3">
                <span className="text-sm font-medium text-gray-600">Subject:</span>
                <p className="text-gray-700 mt-1">{enquiry.subject}</p>
            </div>

            <div>
                <span className="text-sm font-medium text-gray-600">Message:</span>
                <p className="text-gray-700 mt-1">{enquiry.message}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={hasReplied}
                        onChange={handleToggle}
                        disabled={loading}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className={`text-sm font-medium ${hasReplied ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasReplied ? 'Replied' : 'Pending'}
                    </span>
                </label>

               
            </div>
        </div>
    );
};

export default EnquiryCard;
