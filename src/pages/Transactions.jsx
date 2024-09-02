import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";
import {isauthenticated} from "../../Services";

const Transactions = () => {
  const { transactions, currentDate } = useContext(UserContext);

  // Example data for transactions
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (isauthenticated()) {
    } else {
      window.location.href = "/entry?action=signin"
    }
  }, [])

  useEffect(() => {
    setArr(transactions);
  }, [transactions]);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 7;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = arr.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

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
      <div className="p-6 h-full bg-white rounded-lg flex flex-col justify-between">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary text-tertiary rounded-lg">
            <tr>
              <th className="border-b-2 p-2">Date</th>
              <th className="border-b-2 p-2">Title</th>
              <th className="border-b-2 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="border-b p-2">
                  {currentDate(new Date(transaction.transaction_date))}
                </td>
                <td className="border-b p-2">
                  {/* {transaction.sender_name }/ */}

                  {transaction.transaction_type === "transfer" ?
                    `Sent to ${transaction.receiver_name}` :
                    transaction.sender_name ? `Received from ${transaction.sender_name}` :
                      `Deposited into account`
                  }
                </td>
                <td className="border-b p-2">₦{Number(transaction.amount)}</td>
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
