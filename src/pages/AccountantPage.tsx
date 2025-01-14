import React, { useState } from 'react';
import { DollarSign, FileText, Download, Search, Filter, Plus, ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';

// Sample data for Moroccan reports
const bilanData = [
  { category: 'Actif', subCategory: 'Actif Immobilisé', amount: 500000 },
  { category: 'Actif', subCategory: 'Actif Circulant', amount: 300000 },
  { category: 'Passif', subCategory: 'Capitaux Propres', amount: 400000 },
  { category: 'Passif', subCategory: 'Dettes', amount: 400000 },
];

const cpcData = [
  { category: 'Produits', subCategory: 'Ventes', amount: 1000000 },
  { category: 'Charges', subCategory: 'Achats', amount: 600000 },
  { category: 'Charges', subCategory: 'Salaires', amount: 200000 },
  { category: 'Résultat', subCategory: 'Résultat Net', amount: 200000 },
];

const esgData = [
  { category: 'Marge Commerciale', amount: 400000 },
  { category: 'Valeur Ajoutée', amount: 300000 },
  { category: 'Excédent Brut d\'Exploitation', amount: 200000 },
  { category: 'Résultat d\'Exploitation', amount: 150000 },
];

const tftData = [
  { category: 'Activités d\'Exploitation', amount: 300000 },
  { category: 'Activités d\'Investissement', amount: -100000 },
  { category: 'Activités de Financement', amount: -50000 },
  { category: 'Trésorerie Nette', amount: 150000 },
];

const eticData = [
  { category: 'Informations sur les Immobilisations', amount: 500000 },
  { category: 'Informations sur les Stocks', amount: 100000 },
  { category: 'Informations sur les Dettes', amount: 400000 },
];

const isDeclarationData = [
  { category: 'Chiffre d\'Affaires', amount: 1000000 },
  { category: 'Charges Déductibles', amount: 600000 },
  { category: 'Résultat Fiscal', amount: 400000 },
  { category: 'Impôt sur les Sociétés', amount: 100000 },
];

const tvaDeclarationData = [
  { period: 'Janvier 2024', tvaCollectée: 50000, tvaDéductible: 30000, tvaNet: 20000 },
  { period: 'Février 2024', tvaCollectée: 60000, tvaDéductible: 35000, tvaNet: 25000 },
];

const irDeclarationData = [
  { category: 'Revenus Professionnels', amount: 500000 },
  { category: 'Charges Déductibles', amount: 200000 },
  { category: 'Revenu Net Imposable', amount: 300000 },
  { category: 'Impôt sur le Revenu', amount: 75000 },
];

const taxeProfessionnelleData = [
  { category: 'Base d\'Imposition', amount: 1000000 },
  { category: 'Taux d\'Imposition', amount: '10%' },
  { category: 'Montant de la Taxe', amount: 100000 },
];

const cnssReportsData = [
  { employee: 'John Doe', salaireBrut: 5000, cotisationCNSS: 500 },
  { employee: 'Jane Smith', salaireBrut: 6000, cotisationCNSS: 600 },
];

// Sample data for interactive components
const invoices = [
  {
    id: 1,
    patient: 'John Doe',
    date: '2024-03-01',
    amount: 150.0,
    service: 'General Consultation',
    status: 'Paid',
    insurance: 'Blue Cross',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    date: '2024-03-02',
    amount: 250.0,
    service: 'Specialist Consultation',
    status: 'Pending',
    insurance: 'Aetna',
  },
];

const expenses = [
  {
    id: 1,
    date: '2024-03-01',
    description: 'Office Supplies',
    amount: 200.0,
    category: 'Operational',
  },
  {
    id: 2,
    date: '2024-03-02',
    description: 'Medical Equipment',
    amount: 1500.0,
    category: 'Equipment',
  },
];

const budgets = [
  {
    id: 1,
    department: 'Cardiology',
    budget: 100000,
    actual: 95000,
  },
  {
    id: 2,
    department: 'Orthopedics',
    budget: 80000,
    actual: 85000,
  },
];

const taxData = [
  {
    id: 1,
    type: 'Income Tax',
    amount: 20000,
  },
  {
    id: 2,
    type: 'Sales Tax',
    amount: 10000,
  },
];

const auditLogs = [
  {
    id: 1,
    action: 'Invoice Created',
    user: 'Dr. Smith',
    timestamp: '2024-03-01 10:00 AM',
  },
  {
    id: 2,
    action: 'Expense Added',
    user: 'Accountant',
    timestamp: '2024-03-02 11:00 AM',
  },
];

function AccountantPage() {
  const [reportType, setReportType] = useState('bilan');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);

  const generateReport = () => {
    let data = [];
    switch (reportType) {
      case 'bilan':
        data = bilanData;
        break;
      case 'cpc':
        data = cpcData;
        break;
      case 'esg':
        data = esgData;
        break;
      case 'tft':
        data = tftData;
        break;
      case 'etic':
        data = eticData;
        break;
      case 'is-declaration':
        data = isDeclarationData;
        break;
      case 'tva-declaration':
        data = tvaDeclarationData;
        break;
      case 'ir-declaration':
        data = irDeclarationData;
        break;
      case 'taxe-professionnelle':
        data = taxeProfessionnelleData;
        break;
      case 'cnss-reports':
        data = cnssReportsData;
        break;
      default:
        break;
    }
    setReportData(data);
  };

  const downloadReport = (format) => {
    if (reportData.length === 0) {
      alert('No data to export. Please generate a report first.');
      return;
    }

    if (format === 'csv') {
      const headers = Object.keys(reportData[0]).join(',');
      const rows = reportData.map((item) => Object.values(item).join(',')).join('\n');
      const csvContent = `${headers}\n${rows}`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_report.csv`;
      link.click();
    } else if (format === 'pdf') {
      alert('PDF export functionality will be implemented soon.');
    }
  };

  const addInvoice = () => {
    const newInvoice = {
      id: invoices.length + 1,
      patient: 'New Patient',
      date: '2024-03-01',
      amount: 0,
      service: 'New Service',
      status: 'Pending',
      insurance: 'None',
    };
    setInvoices([...invoices, newInvoice]);
  };

  const addExpense = () => {
    const newExpense = {
      id: expenses.length + 1,
      date: '2024-03-01',
      description: 'New Expense',
      amount: 0,
      category: 'Operational',
    };
    setExpenses([...expenses, newExpense]);
  };

  const addBudget = () => {
    const newBudget = {
      id: budgets.length + 1,
      department: 'New Department',
      budget: 0,
      actual: 0,
    };
    setBudgets([...budgets, newBudget]);
  };

  const addTax = () => {
    const newTax = {
      id: taxData.length + 1,
      type: 'New Tax',
      amount: 0,
    };
    setTaxData([...taxData, newTax]);
  };

  return (

    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accountant Dashboard</h1>
      </div>

      {/* Report Generation Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Generate Reports</h2>
        <div className="flex gap-4 mb-6">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <option value="bilan">BILAN (Balance Sheet)</option>
            <option value="cpc">CPC - Compte de Produits et Charges (Income Statement)</option>
            <option value="esg">ESG - État des Soldes de Gestion (Management Balances)</option>
            <option value="tft">TFT - Tableau de Financement (Cash Flow Statement)</option>
            <option value="etic">ETIC - État des Informations Complémentaires (Additional Information Statement)</option>
            <option value="is-declaration">Déclaration IS (Corporate Tax Return)</option>
            <option value="tva-declaration">Déclarations TVA (Monthly/Quarterly VAT Returns)</option>
            <option value="ir-declaration">Déclaration IR (Personal Income Tax for Businesses)</option>
            <option value="taxe-professionnelle">Taxe Professionnelle (Business Tax)</option>
            <option value="cnss-reports">CNSS Reports (Social Security)</option>
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
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={generateReport}
          >
            Generate Report
          </button>
        </div>
        {reportData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Report</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(reportData[0]).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(row).map((value, idx) => (
                        <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => downloadReport('csv')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => downloadReport('pdf')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Management */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Invoices</h2>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={addInvoice}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
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
                  Amount
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">#{invoice.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{invoice.patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${invoice.amount.toFixed(2)}
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
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Management */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Expenses</h2>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={addExpense}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expense.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{expense.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Management */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Budgets</h2>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={addBudget}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Budget
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{budget.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${budget.budget.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${budget.actual.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Management */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Taxes</h2>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={addTax}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tax
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taxData.map((tax) => (
                <tr key={tax.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{tax.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${tax.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Audit Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountantPage;