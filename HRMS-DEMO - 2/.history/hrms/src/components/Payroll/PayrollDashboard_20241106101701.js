// PayrollDashboard.js
import React, { useState } from 'react';
import './Payroll.css';

const PayrollDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="payroll-dashboard">
      <h1>Payroll Dashboard</h1>

      <div className="dashboard-header">
        <div className="date-selector">
          <label>Select Month and Year:</label>
          <input 
            type="month" 
            value={selectedDate} 
            onChange={handleDateChange}
          />
        </div>

        <div className="stats">
          <div className="stat-item">
            <h2>1</h2>
            <p>Payrolls</p>
          </div>
          <div className="stat-item">
            <h2>0</h2>
            <p>Drafts</p>
          </div>
          <div className="stat-item">
            <h2>12</h2>
            <p>Employees</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="employee-payslips">
          <h3>Employee Payslips</h3>
          <div className="payslip-chart">[Chart Placeholder]</div>
        </div>

        <div className="contributions">
          <h3>Employer Contributions</h3>
          <select className="employee-dropdown">
            <option>Hannah Brooks</option>
            {/* Add other employee names */}
          </select>
          <table>
            <thead>
              <tr>
                <th>Deduction</th>
                <th>Employee Contribution</th>
                <th>Employer Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ESI</td>
                <td>PKR 0.00</td>
                <td>PKR 27.36</td>
              </tr>
              <tr>
                <td>Social Security (PICA)</td>
                <td>PKR 0.00</td>
                <td>PKR 128.31</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="contracts-ending">
          <h3// PayrollDashboard.js
import React, { useState } from 'react';
import './PayrollDashboard.css';

const PayrollDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [employeeData] = useState([
    { name: 'John Doe', status: 'Draft', amount: 500 },
    { name: 'Jane Smith', status: 'Reviewed', amount: 1000 },
    { name: 'Alice Johnson', status: 'Confirmed', amount: 1500 },
    { name: 'Bob Brown', status: 'Paid', amount: 2000 },
  ]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelection = (day) => {
    console.log(`Selected Date: ${day} ${selectedMonth} ${selectedYear}`);
    setShowCalendar(false);
  };

  return (
    <div className="payroll-dashboard">
      <div className="status-containers">
        <div className="status-container paid">Paid</div>
        <div className="status-container confirmed">Confirmed</div>
        <div className="status-container review">Review Ongoing</div>
        <div className="status-container draft">Draft</div>
      </div>

      <div className="row-container">
        <div className="month-year-selector">
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button onClick={toggleCalendar}>
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </button>
          {showCalendar && (
            <div className="calendar">
              <h3>Select a Day</h3>
              <div className="calendar-month">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'].map((day) => (
                  <div key={day} className="calendar-day" onClick={() => handleDateSelection(day)}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="employee-details">
          <h3>Employee Details for {selectedMonth} {selectedYear}</h3>
          <div className="employee-chart">
            {employeeData.map((employee, index) => (
              <div key={index} className={`employee-status ${employee.status.toLowerCase()}`}>
                <span>{employee.name}</span>
                <span>{employee.status}</span>
                <span>${employee.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;
>Contracts Ending</h3>
          <p>Number of contracts expiring in November 2024: 0</p>
          <div className="no-contracts">
            <p>No contracts ending this month</p>
          </div>
        </div>

        <div className="department-chart">
          <h3>Department Chart</h3>
          <div className="chart-placeholder">[Pie Chart Placeholder]</div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;