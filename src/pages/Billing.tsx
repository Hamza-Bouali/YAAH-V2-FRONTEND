import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, Download, Calendar, FileText } from 'lucide-react';

const invoices = [
  {
    id: 1,
    patient: 'John Doe',
    date: '2024-03-01',
    amount: 150.0,
    service: 'General Consultation',
    status: 'Paid',
    insurance: 'Blue Cross',
    paymentHistory: [
      { date: '2024-03-01', amount: 150.0, method: 'Credit Card' },
    ],
  },
  {
    id: 2,
    patient: 'Jane Smith',
    date: '2024-03-02',
    amount: 250.0,
    service: 'Specialist Consultation',
    status: 'Pending',
    insurance: 'Aetna',
    paymentHistory: [],
  },
  {
    id: 3,
    patient: 'Mike Johnson',
    date: '2024-03-03',
    amount: 300.0,
    service: 'Lab Tests',
    status: 'Partially Paid',
    insurance: 'Cigna',
    paymentHistory: [
      { date: '2024-03-03', amount: 150.0, method: 'Cash' },
    ],
  },
];

function Billing() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseInvoice = () => {
    setSelectedInvoice(null);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus =
      filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesDate =
      (!startDate || invoice.date >= startDate) && (!endDate || invoice.date <= endDate);
    return matchesStatus && matchesDate;
  });

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingPayments = invoices
    .filter((invoice) => invoice.status === 'Pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Billing</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-800">${pendingPayments.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Paid Amount</p>
              <p className="text-2xl font-bold text-gray-800">${paidAmount.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <option value="all">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="partially paid">Partially Paid</option>
        </select>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insurance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">#{invoice.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{invoice.patient}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {invoice.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {invoice.insurance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => handleViewInvoice(invoice)}
                  >
                    View
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Invoice Details</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseInvoice}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Patient</label>
                <p className="font-medium text-gray-800">{selectedInvoice.patient}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Service</label>
                <p className="font-medium text-gray-800">{selectedInvoice.service}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Amount</label>
                <p className="font-medium text-gray-800">
                  ${selectedInvoice.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <p className="font-medium text-gray-800">{selectedInvoice.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Payment History</label>
                {selectedInvoice.paymentHistory.length > 0 ? (
                  selectedInvoice.paymentHistory.map((payment, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm text-gray-800">
                        {payment.date}: ${payment.amount.toFixed(2)} ({payment.method})
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No payment history available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;