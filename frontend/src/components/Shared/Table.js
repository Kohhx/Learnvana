import React from "react";
import { Fragment } from "react";

const Table = ({ data, config, className }) => {
  // Create Header content
  const headerContent = config.map((dataCol, i) => {
    if (dataCol.header) {
      return <Fragment key={i}>{dataCol.header()}</Fragment>;
    }
    return (
      <th className="px-3" key={i}>
        {dataCol.label}
      </th>
    );
  });

  // Create body content
  const tableBodyContent = data.map((dataRow, i) => {
    const rowContent = config.map((dataCol, j) => {
      let dataColContent;
      if (dataCol.index) {
        dataColContent = (
          <td key={j} className="px-3">
            {dataCol.render(i + 1)}
          </td>
        );
      } else {
        dataColContent = (
          <td key={j} className="px-3">
            {dataCol.render(dataRow)}
          </td>
        );
      }
      return dataColContent;
    });
    return (
      <tr className="border-b-2 last:border-none" key={i}>
        {rowContent}
      </tr>
    );
  });

  return (
    <div className="max-h-[6rem] overflow-auto">
    <table className="text-left table-auto border-spacing-2 mx-auto text-sm">
      <thead className="sticky top-0 bg-proj-white3-200">
        <tr className="border-b-2">{headerContent}</tr>
      </thead>
      <tbody className="">{tableBodyContent}</tbody>
    </table>
    </div>
  );
};

export default Table;
