import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Download, Search, Filter, Plus } from 'lucide-react';
import axiosInstance from '../components/models/AxiosInstance';

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

// Interfaces
interface Depense {
  id: number;
  date: string;
  direction: string;
  doctor: string;
  type: string;
  price: string;
}

interface Revenue {
  id: number;
  price: string;
  date: string;
  source: string;
  doctor: string;
  type: string;
}

function AccountantPage() {
  const [reportType, setReportType] = useState('bilan');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [DoctorID,setDoctorID]=useState('');

  const [depenses, setDepenses] = useState<Depense[]>([]);
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [totalDepenses, setTotalDepenses] = useState(0);
  const [totalRevenues, setTotalRevenues] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);

  const [newDepense, setNewDepense] = useState<Depense>({
    id: 0,
    date: '',
    direction: '',
    doctor: DoctorID,
    type: '',
    price: '',
  });

  const [newRevenue, setNewRevenue] = useState<Revenue>({
    id: 0,
    price: '',
    date: '',
    source: '',
    doctor: DoctorID,
    type: '',
  });

  // Fetch expenses and revenues on component mount
  useEffect(() => {
    const fetchData = async () => {
      const ID = await axiosInstance('/api/get_user_data/');
      setDoctorID(ID.data.id);
      fetchDepenses();
      fetchRevenues();
    };
    fetchData();
  }, []);

  const fetchDepenses = () => {
    axiosInstance.get('/api/depenses/').then((res) => {
      setDepenses(res.data);
      let total = 0;
      res.data.forEach((depense: Depense) => {
        total += parseFloat(depense.price);
      });
      setTotalDepenses(total);
    });
  };

  const fetchRevenues = () => {
    axiosInstance.get('/api/revenues/').then((res) => {
      setRevenues(res.data);
      let total = 0;
      res.data.forEach((revenue: Revenue) => {
        total += parseFloat(revenue.price);
      });
      setTotalRevenues(total);
      setTotalProfits(total - totalDepenses);
    });
  };

  // Add a new expense
  const addDepense = () => {
    setNewDepense({ ...newDepense, doctor: DoctorID });
    axiosInstance.post('/api/depenses/', newDepense).then(() => {
      fetchDepenses(); // Refresh the list
      setNewDepense({
        id: 0,
        date: '',
        direction: '',
        doctor: DoctorID,
        type: '',
        price: '',
      });
    });
  };

  // Remove an expense
  const removeDepense = (id: number) => {
    axiosInstance.delete(`/api/depenses/${id}/`).then(() => {
      fetchDepenses(); // Refresh the list
    });
  };

  // Add a new revenue
  const addRevenue = () => {
    setNewRevenue({ ...newRevenue, doctor: DoctorID });
    axiosInstance.post('/api/revenues/',newRevenue ).then(() => {
      fetchRevenues(); // Refresh the list
      setNewRevenue({
        id: 0,
        price: '',
        date: '',
        source: '',
        doctor: DoctorID,
        type: '',
      });
    });
  };

  // Remove a revenue
  const removeRevenue = (id: number) => {
    axiosInstance.delete(`/api/revenues/${id}/`).then(() => {
      fetchRevenues(); // Refresh the list
    });
  };

  // Generate financial report
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

  // Download report in CSV format
  const downloadReport = (format: string) => {
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

  // Format currency in MAD
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-800">Accountant Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Profit</p>
                <p className="text-lg font-bold text-blue-800">{formatCurrency(totalProfits)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Revenue</p>
                <p className="text-lg font-bold text-green-800">{formatCurrency(totalRevenues)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-red-50 p-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-red-600 font-medium">Expenses</p>
                <p className="text-lg font-bold text-red-800">{formatCurrency(totalDepenses)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Generation Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Generate Financial Reports
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={generateReport}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
          {reportData.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                {reportType.toUpperCase()} Report
              </h3>
              <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {Object.keys(reportData[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        {Object.values(row).map((value, idx) => (
                          <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {typeof value === 'number' && !String(value).includes('%')
                              ? formatCurrency(value)
                              : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                  onClick={() => downloadReport('csv')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </button>
                <button
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  onClick={() => downloadReport('pdf')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenues)}</p>
            <p className="text-sm text-gray-500 mt-2">From {revenues.length} transactions</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalDepenses)}</p>
            <p className="text-sm text-gray-500 mt-2">From {depenses.length} transactions</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Net Profit</h3>
            <p className={`text-2xl font-bold ${totalProfits >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalProfits)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Profit margin: {totalRevenues > 0 ? ((totalProfits / totalRevenues) * 100).toFixed(2) : 0}%
            </p>
          </div>
        </div>

        {/* Expense Management */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-red-600" />
              Expenses
            </h2>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                onClick={() => {
                  setNewDepense({
                    id: 0,
                    date: '',
                    direction: '',
                    doctor: DoctorID,
                    type: '',
                    price: '',
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </button>
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Expense</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={newDepense.date}
                onChange={(e) => setNewDepense({ ...newDepense, date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Direction"
                value={newDepense.direction}
                onChange={(e) => setNewDepense({ ...newDepense, direction: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <select
                value={newDepense.type}
                onChange={(e) => setNewDepense({ ...newDepense, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="immobilier">Immobilier</option>
                <option value="publicite">Publicité</option>
                <option value="fourniture consommable">Fourniture Consommable</option>
                <option value="capital humain">Capital Humain</option>
                <option value="rembouresement d'empreint">Remboursement d'Emprunt</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={newDepense.price}
                onChange={(e) => setNewDepense({ ...newDepense, price: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                onClick={addDepense}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </button>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Direction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {depenses.length > 0 ? (
                  depenses.map((depense) => (
                    <tr key={depense.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(depense.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        {formatCurrency(parseFloat(depense.price))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {depense.direction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {depense.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        
                        <button
                          className="text-red-600 hover:text-red-800 mx-1"
                          onClick={() => removeDepense(depense.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No expenses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Management */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Revenues
            </h2>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search revenues..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                onClick={() => {
                  setNewRevenue({
                    id: 0,
                    price: '',
                    date: '',
                    source: '',
                    doctor: DoctorID,
                    type: '',
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Revenue
              </button>
            </div>
          </div>

          {/* Add Revenue Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Revenue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={newRevenue.date}
                onChange={(e) => setNewRevenue({ ...newRevenue, date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Source"
                value={newRevenue.source}
                onChange={(e) => setNewRevenue({ ...newRevenue, source: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <select
                value={newRevenue.type}
                onChange={(e) => setNewRevenue({ ...newRevenue, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="consultation">consultation</option>
                <option value="prescription">prescription</option>
                <option value="analyse">analyse</option>
                <option value="pret bancaire">pret bancaire</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={newRevenue.price}
                onChange={(e) => setNewRevenue({ ...newRevenue, price: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                onClick={addRevenue}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Revenue
              </button>
            </div>
          </div>

          {/* Revenues Table */}
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {revenues.length > 0 ? (
                  revenues.map((revenue) => (
                    <tr key={revenue.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(revenue.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatCurrency(parseFloat(revenue.price))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {revenue.source}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {revenue.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        
                        <button
                          className="text-red-600 hover:text-red-800 mx-1"
                          onClick={() => removeRevenue(revenue.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No revenues found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountantPage;