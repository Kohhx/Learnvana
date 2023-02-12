import React from "react";
import { Fragment } from "react";

const Table = ({ data, config }) => {
  // Create Header content
  const headerContent = config.map((dataCol, i) => {
    if (dataCol.header) {
      return <Fragment key={i}>{dataCol.header()}</Fragment>;
    }
    return <th key={i}>{dataCol.label}</th>;
  });

  // Create body content
  const tableBodyContent = data.map((dataRow, i) => {
    const rowContent = config.map((dataCol, j) => {
      return (
        <td key={j} className="p-2">
          {dataCol.render(dataRow)}
        </td>
      );
    });
    return <tr key={i}>{rowContent}</tr>;
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{headerContent}</tr>
      </thead>
      <tbody>{tableBodyContent}</tbody>
    </table>
  );
};

export default Table;
