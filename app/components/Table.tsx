import React, { useState } from "react";
import Table from "react-bootstrap/Table";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { User } from "../@types/User";

type PropTypes = {
  data: User[];
  handleSelect: (user: User) => void;
};

type SortKey = keyof User | "address.city" | "company.name";

function DataTable({ data, handleSelect }: PropTypes) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getNestedValue = (obj: User, key: SortKey) => {
    const keys = key.split(".");
    let value: any = obj;
    for (const k of keys) {
      value = value[k];
    }
    return value;
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
    if (!sortConfig) {
      return <FunnelIcon className="w-5 text-gray-400" />;
    }
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <ArrowUpIcon className="w-5 text-gray-400" />
      ) : (
        <ArrowDownIcon className="w-5 text-gray-400" />
      );
    }
    return <FunnelIcon className="w-5 text-gray-400" />;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      {data.length !== 0 && (
        <div>
          <Table striped bordered hover size="sm" className="cursor-pointer">
            <thead>
              <tr>
                <th onClick={() => requestSort("name")}>
                  <span className="flex justify-around">
                    Name {getSortIcon("name")}
                  </span>
                </th>
                <th onClick={() => requestSort("username")}>
                  <span className="flex justify-around">
                    Username {getSortIcon("username")}
                  </span>
                </th>
                <th onClick={() => requestSort("email")}>
                  <span className="flex justify-around">
                    {" "}
                    Email {getSortIcon("email")}
                  </span>
                </th>
                <th onClick={() => requestSort("phone")}>
                  <span className="flex justify-around">
                    Phone {getSortIcon("phone")}
                  </span>
                </th>
                <th onClick={() => requestSort("address.city")}>
                  <span className="flex justify-around">
                    City {getSortIcon("address.city")}
                  </span>
                </th>
                <th onClick={() => requestSort("company.name")}>
                  <span className="flex justify-around">
                    Company {getSortIcon("company.name")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id} onClick={() => handleSelect(user)}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-end gap-2">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
            <Form.Group controlId="itemsPerPageSelect">
              <Form.Control
                as="select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
      )}
    </>
  );
}

export default DataTable;
