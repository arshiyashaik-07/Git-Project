import React, { useState } from 'react';
import { FaTrash, FaEnvelope, FaFilter, FaPlus } from 'react-icons/fa';
import './Payslips.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Payslips = ({data}) => {
    const [payslips, setPayslips] = useState([
        { id: 1, employee: 'Adam Luis', startDate: '01/11/2024', endDate: '09/11/2024', batch: 'None', grossPay: 'ETB 2394345.33', deduction: 'ETB 166407.00', netPay: 'ETB 2227938.33' },
        { id: 2, employee: 'Sofia Howard (#PEP75)', startDate: '01/05/2021', endDate: '01/12/2024', batch: 'None', grossPay: 'ETB 12378.67', deduction: 'ETB 0.00', netPay: 'ETB 18345.67' },
        { id: 3, employee: 'John Deopha (#PEP45)', startDate: '17/08/2000', endDate: '01/01/2022', batch: 'None', grossPay: 'ETB 145674.77', deduction: 'ETB 0.00', netPay: 'ETB 12345.67' },
        { id: 4, employee: 'Herry Potter (#PEP66)', startDate: '02/02/2016', endDate: '15/05/2021', batch: 'None', grossPay: 'ETB 232133.97', deduction: 'ETB 0.00', netPay: 'ETB 67890.67' },
        // Add more data as needed
    ]);

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({
        startDate: null,
        endDate: null,
        status: '',
        batch: '',
        mailSent: '',
        startDateFrom: null,
        startDateTill: null,
        endDateFrom: null,
        endDateTill: null,
        grossPayLessThan: '',
        grossPayGreaterOrEqual: '',
        deductionLessThan: '',
        deductionGreaterOrEqual: '',
        netPayLessThan: '',
        netPayGreaterOrEqual: '',
    });

    const toggleFilterModal = () => {
        setShowFilterModal(!showFilterModal);
    };

    const handleDateChange = (field, date) => {
        setFilterCriteria(prev => ({ ...prev, [field]: date }));
    };

    const [selectedPayslips, setSelectedPayslips] = useState([]);
    const [filterText, setFilterText] = useState('');

    const handleSelectAll = () => {
        if (selectedPayslips.length === payslips.length) {
            setSelectedPayslips([]);
        } else {
            setSelectedPayslips(payslips.map(p => p.id));
        }
    };

    const handleSelect = (id) => {
        if (selectedPayslips.includes(id)) {
            setSelectedPayslips(selectedPayslips.filter(sid => sid !== id));
        } else {
            setSelectedPayslips([...selectedPayslips, id]);
        }
    };

    const handleFilter = (e) => {
        setFilterText(e.target.value);
    };

    const filteredPayslips = payslips.filter(payslip =>
        payslip.employee.toLowerCase().includes(filterText.toLowerCase())
    );

    const [filteredData, setFilteredData] = useState(data);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '',
        batch: '',
        mailSent: '',
        grossPayLess: '',
        grossPayMore: '',
        deductionLess: '',
        deductionMore: '',
        netPayLess: '',
        netPayMore: ''
    });
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    const toggleFilterPopup = () => setIsFilterPopupOpen(!isFilterPopupOpen);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const applyFilters = () => {
        let updatedData = data;

        if (filters.startDate) {
            updatedData = updatedData.filter(item => new Date(item.startDate) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            updatedData = updatedData.filter(item => new Date(item.endDate) <= new Date(filters.endDate));
        }
        if (filters.status) {
            updatedData = updatedData.filter(item => item.status === filters.status);
        }
        if (filters.batch) {
            updatedData = updatedData.filter(item => item.batch === filters.batch);
        }
        if (filters.mailSent) {
            updatedData = updatedData.filter(item => item.mailSent === filters.mailSent);
        }
        if (filters.grossPayLess) {
            updatedData = updatedData.filter(item => item.grossPay <= parseFloat(filters.grossPayLess));
        }
        if (filters.grossPayMore) {
            updatedData = updatedData.filter(item => item.grossPay >= parseFloat(filters.grossPayMore));
        }
        if (filters.deductionLess) {
            updatedData = updatedData.filter(item => item.deduction <= parseFloat(filters.deductionLess));
        }
        if (filters.deductionMore) {
            updatedData = updatedData.filter(item => item.deduction >= parseFloat(filters.deductionMore));
        }
        if (filters.netPayLess) {
            updatedData = updatedData.filter(item => item.netPay <= parseFloat(filters.netPayLess));
        }
        if (filters.netPayMore) {
            updatedData = updatedData.filter(item => item.netPay >= parseFloat(filters.netPayMore));
        }

        setFilteredData(updatedData);
        toggleFilterPopup();
    };

    const resetFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            status: '',
            batch: '',
            mailSent: '',
            grossPayLess: '',
            grossPayMore: '',
            deductionLess: '',
            deductionMore: '',
            netPayLess: '',
            netPayMore: ''
        });
        setFilteredData(data);
    };

    return (
        <div className="payslip-dashboard">
            <div className="header">
                <h2>Payslip</h2>
                <div className="actions">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={filterText} 
                        onChange={handleFilter} 
                        className="search-bar"
                    />
                    <button className="filter-btn" onClick={toggleFilterPopup}>
                        <FaFilter /> Filter
                    </button>


                    

                    <button className="group-by-btn">Group By</button>
                    <button className="actions-btn">Actions</button>
                    <button className="create-btn">
                        <FaPlus /> Create
                    </button>
                </div>
            </div>

             

            <table className="payslip-table">
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox" 
                                checked={selectedPayslips.length === payslips.length} 
                                onChange={handleSelectAll}
                            /> Select All
                        </th>
                        <th>Employee</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Batch</th>
                        <th>Gross Pay</th>
                        <th>Deduction</th>
                        <th>Net Pay</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayslips.map(payslip => (
                        <tr key={payslip.id}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={selectedPayslips.includes(payslip.id)} 
                                    onChange={() => handleSelect(payslip.id)} 
                                />
                            </td>
                            <td>{payslip.employee}</td>
                            <td>{payslip.startDate}</td>
                            <td>{payslip.endDate}</td>
                            <td>{payslip.batch}</td>
                            <td>{payslip.grossPay}</td>
                            <td>{payslip.deduction}</td>
                            <td>{payslip.netPay}</td>
                            <td>
                                <button className="action-btn"><FaEnvelope /></button>
                                <button className="action-btn"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <span>Page 1 of 1</span>
            </div>


        </div>
    );
};

export default Payslips;