import React, { useState } from "react";
import Table from "./Table";

const SortableTable = (props) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, data, index } = props;

  const handleClick = (label) => {
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const getIcons = (label, sortBy, sortOrder) => {
    if (label !== sortBy) {
      return "Show both icons"
    }

    if (sortOrder === null) {
      return 'show both icons'
    } else if ( sortOrder === 'asc') {
      return 'show up icons'
    } else {
      return 'show down icons'
    }

  }

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    } else {
      return {
        ...column,
        header: () => (
          <th onClick={() => handleClick(column.label)}>
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </th>
        ),
      };
    }
  });

  let sortData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }


  return (
    <>
      <Table {...props} config={updatedConfig} data={sortData} />
    </>
  );
};

export default SortableTable;
