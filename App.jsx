import React, { useState } from "react";

const DataTable = () => {
  // Sample data
  const data = [
    { id: 1, name: "Anshuman padhee", age: 21, department: "IT", year: "3rd" },
    { id: 2, name: "adarsh guru", age: 22, department: "IT", year: "3rd" },
    { id: 3, name: "pranab", age: 22, department: "cse", year: "3rd" },
    { id: 4, name: "lokesh", age: 45, department: "civil", year: "3rd" },
    { id: 5, name: "Chintu", age: 30, department: "mme", year: "3rd" },
    { id: 6, name: "sidhant", age: 29, department: "civil", year: "2nd" },
    { id: 7, name: "raman", age: 33, department: "eco", year: "3rd" },
    { id: 8, name: "aditya", age: 27, department: "IT", year: "3rd" },
    { id: 9, name: "faizan", age: 40, department: "chemical", year: "3rd" },
    { id: 10, name: "soumya ranjan", age: 25, department: "mechanical", year: "2nd" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterDepartment, setFilterDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) => {
    return (
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment ? item.department === filterDepartment : true)
    );
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    setFilterDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-dark-teal">
      <div className="p-12 bg-dark-blue rounded-xl shadow-xl w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
        <h1 className="text-4xl font-extrabold text-center text-light-teal mb-8">Custom DataTable</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 p-4 border border-teal-700 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-light-teal"
          />
          <select
            value={filterDepartment}
            onChange={handleFilterChange}
            className="p-4 border border-teal-700 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-light-teal"
          >
            <option value="">All Departments</option>
            <option value="cse">cse</option>
            <option value="IT">IT</option>
            <option value="civil">civil</option>
            <option value="mme">mme</option>
            <option value="chemical">chemical</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-light-blue rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-teal-700"
                  onClick={() => handleSort("name")}
                >
                  Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-teal-700"
                  onClick={() => handleSort("age")}
                >
                  Age {sortConfig.key === "age" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-teal-700"
                  onClick={() => handleSort("department")}
                >
                  Department {sortConfig.key === "department" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-teal-700"
                  onClick={() => handleSort("year")}
                >
                   year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-teal-100 transition-colors">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.age}</td>
                  <td className="px-6 py-4">{item.department}</td>
                  <td className="px-6 py-4">{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-light-teal text-white rounded-lg hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-teal-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-light-teal text-white rounded-lg hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
