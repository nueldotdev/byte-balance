import React, { useState } from 'react';
import Header from '../components/Header';

const Transactions = () => {
  // Example data for transactions
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-08-01', type: 'Received', from: 'John Doe', amount: 1200 },
    { id: 2, date: '2024-08-03', type: 'Sent', to: 'Jane Smith', amount: 200 },
    { id: 3, date: '2024-08-05', type: 'Deposit', amount: 500 },
    { id: 4, date: '2024-08-07', type: 'Received', from: 'Alice Johnson', amount: 150 },
    // Add more transaction objects here...
  ]);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="w-full h-full py-4 px-6 flex flex-col">
      <Header title="Transactions" />
      <div className="p-6 bg-white rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Date</th>
            <th className="border-b-2 p-2">Title</th>
            <th className="border-b-2 p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100">
              <td className="border-b p-2">{transaction.date}</td>
              <td className="border-b p-2">
                {transaction.type === 'Received' && `Received from ${transaction.from}`}
                {transaction.type === 'Sent' && `Sent to ${transaction.to}`}
                {transaction.type === 'Deposit' && 'Deposit'}
              </td>
              <td className="border-b p-2">${transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Transactions;
