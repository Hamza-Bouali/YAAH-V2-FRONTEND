import axios from 'axios';

interface Report {
    type: string;
    data: JSON;
}

const reportTypes = [
    { value: "bilan", label: "BILAN (Balance Sheet)" },
    { value: "cpc", label: "CPC - Compte de Produits et Charges (Income Statement)" },
    { value: "esg", label: "ESG - État des Soldes de Gestion (Management Balances)" },
    { value: "tft", label: "TFT - Tableau de Financement (Cash Flow Statement)" },
    { value: "etic", label: "ETIC - État des Informations Complémentaires (Additional Information Statement)" },
    { value: "is-declaration", label: "Déclaration IS (Corporate Tax Return)" },
    { value: "tva-declaration", label: "Déclarations TVA (Monthly/Quarterly VAT Returns)" },
    { value: "ir-declaration", label: "Déclaration IR (Personal Income Tax for Businesses)" },
    { value: "taxe-professionnelle", label: "Taxe Professionnelle (Business Tax)" },
    { value: "cnss-reports", label: "CNSS Reports (Social Security)" }
];

export const getReport = async (type: string): Promise<Report> => {
    try {
        const response = await axios.get(`http://localhost:3001/reports/${type}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
};