// pages/user/application.js

import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Application() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  const [additionalRenters, setAdditionalRenters] = useState([
    {
      firstName: '',
      lastName: '',
      isAdult: false,
      isChild: false,
      sameAddress: true,
      street1: '',
      street2: '',
      city: '',
      stateValue: '',
      zip: '',
    },
  ]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState('');

  const addRenter = () => {
    setAdditionalRenters((prev) => [
      ...prev,
      {
        firstName: '',
        lastName: '',
        isAdult: false,
        isChild: false,
        sameAddress: true,
        street1: '',
        street2: '',
        city: '',
        stateValue: '',
        zip: '',
      },
    ]);
  };

  const handleRenterChange = (index, field, value) => {
    const updated = [...additionalRenters];
    updated[index][field] = value;
    setAdditionalRenters(updated);
  };

  const handleRenterCheck = (index, role) => {
    setAdditionalRenters((prev) => {
      const updated = [...prev];
      if (role === 'adult') {
        updated[index].isAdult = !updated[index].isAdult;
        if (updated[index].isAdult) updated[index].isChild = false;
      } else if (role === 'child') {
        updated[index].isChild = !updated[index].isChild;
        if (updated[index].isChild) updated[index].isAdult = false;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (dateObj) => {
      if (!dateObj) return '';
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const applicationData = {
      firstName,
      lastName,
      street1,
      street2,
      city,
      stateValue,
      zip,
      phone,
      additionalRenters,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Your application has been submitted. We will contact you soon.');
      } else {
        setMessage(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="flex justify-end mb-4">
            <Link
              href="/user/dashboard"
              className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 text-sm"
            >
              Return to User Dashboard
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Application</h1>

          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {/* Main Renter Info */}
            <div className="mb-4">
              <label className="block text-neutral-700 text-sm mb-1">First Name</label>
              <input
                type="text"
                className="border rounded w-full p-2 text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-neutral-700 text-sm mb-1">Last Name</label>
              <input
                type="text"
                className="border rounded w-full p-2 text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-neutral-700 text-sm mb-1">Street 1</label>
              <input
                type="text"
                className="border rounded w-full p-2 text-sm"
                value={street1}
                onChange={(e) => setStreet1(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-neutral-700 text-sm mb-1">Street 2</label>
              <input
                type="text"
                className="border rounded w-full p-2 text-sm"
                value={street2}
                onChange={(e) => setStreet2(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 mb-4">
              <div className="w-1/2">
                <label className="block text-neutral-700 text-sm mb-1">City</label>
                <input
                  type="text"
                  className="border rounded w-full p-2 text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/4">
                <label className="block text-neutral-700 text-sm mb-1">State</label>
                <input
                  type="text"
                  className="border rounded w-full p-2 text-sm"
                  value={stateValue}
                  onChange={(e) => setStateValue(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/4">
                <label className="block text-neutral-700 text-sm mb-1">Zip</label>
                <input
                  type="text"
                  className="border rounded w-full p-2 text-sm"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-neutral-700 text-sm mb-1">Phone</label>
              <input
                type="tel"
                className="border rounded w-full p-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Additional Renters */}
            <h2 className="text-sm font-semibold text-neutral-700 mb-2">Additional Renters</h2>
            <div className="space-y-4 mb-4">
              {additionalRenters.map((renter, idx) => (
                <div key={idx} className="border p-3 rounded bg-neutral-50">
                  <div className="flex space-x-2 mb-2">
                    <div className="w-1/2">
                      <label className="block text-neutral-700 text-xs mb-1">First Name</label>
                      <input
                        type="text"
                        className="border rounded w-full p-1 text-xs"
                        value={renter.firstName}
                        onChange={(e) =>
                          handleRenterChange(idx, 'firstName', e.target.value)
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-neutral-700 text-xs mb-1">Last Name</label>
                      <input
                        type="text"
                        className="border rounded w-full p-1 text-xs"
                        value={renter.lastName}
                        onChange={(e) =>
                          handleRenterChange(idx, 'lastName', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-1 text-xs text-neutral-700">
                      <input
                        type="checkbox"
                        checked={renter.isAdult}
                        onChange={() => handleRenterCheck(idx, 'adult')}
                      />
                      <span>Adult</span>
                    </label>
                    <label className="flex items-center space-x-1 text-xs text-neutral-700">
                      <input
                        type="checkbox"
                        checked={renter.isChild}
                        onChange={() => handleRenterCheck(idx, 'child')}
                      />
                      <span>Child</span>
                    </label>
                  </div>

                  <div className="mt-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-700">
                      <input
                        type="checkbox"
                        checked={renter.sameAddress}
                        onChange={() => {
                          const updated = [...additionalRenters];
                          updated[idx].sameAddress = !updated[idx].sameAddress;
                          setAdditionalRenters(updated);
                        }}
                      />
                      <span>Same Address as Main Renter?</span>
                    </label>
                  </div>

                  {!renter.sameAddress && (
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="block text-xs text-neutral-700 mb-1">Street 1</label>
                        <input
                          type="text"
                          className="border rounded w-full p-1 text-xs"
                          value={renter.street1}
                          onChange={(e) =>
                            handleRenterChange(idx, 'street1', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-700 mb-1">Street 2</label>
                        <input
                          type="text"
                          className="border rounded w-full p-1 text-xs"
                          value={renter.street2}
                          onChange={(e) =>
                            handleRenterChange(idx, 'street2', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label className="block text-xs text-neutral-700 mb-1">City</label>
                          <input
                            type="text"
                            className="border rounded w-full p-1 text-xs"
                            value={renter.city}
                            onChange={(e) =>
                              handleRenterChange(idx, 'city', e.target.value)
                            }
                          />
                        </div>
                        <div className="w-1/4">
                          <label className="block text-xs text-neutral-700 mb-1">State</label>
                          <input
                            type="text"
                            className="border rounded w-full p-1 text-xs"
                            value={renter.stateValue}
                            onChange={(e) =>
                              handleRenterChange(idx, 'stateValue', e.target.value)
                            }
                          />
                        </div>
                        <div className="w-1/4">
                          <label className="block text-xs text-neutral-700 mb-1">Zip</label>
                          <input
                            type="text"
                            className="border rounded w-full p-1 text-xs"
                            value={renter.zip}
                            onChange={(e) =>
                              handleRenterChange(idx, 'zip', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRenter}
              className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-400 mb-4"
            >
              + Add Another Renter
            </button>

            <div className="mb-4">
              <label className="block text-neutral-700 text-sm mb-1">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border rounded w-full p-2 text-sm"
                placeholderText="Select start date"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </div>

            <div className="mb-6">
              <label className="block text-neutral-700 text-sm mb-1">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="border rounded w-full p-2 text-sm"
                placeholderText="Select end date"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-600 transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
