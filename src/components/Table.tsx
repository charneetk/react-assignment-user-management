import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { customClasses } from "../utils/constant";
import { Checkbox } from "./Checkbox";
import { ColumnFilter } from "./ColumnFilter";
import { GlobalFilter } from "./GlobalFilter";

export const ReactTable = (props: { tableColumns: any; tableData: any }) => {
  const { tableColumns, tableData } = props;

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  console.log("columns ", columns, data);
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table className="flex" {...getTableProps()}>
        <thead className={customClasses.tableHead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={customClasses.tableHeadData}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={customClasses.tableBodyData}
                      {...cell.getCellProps()}
                    >
                      {" "}
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target?.value))}
          >
            {[10, 25, 50].map((customPageSize) => (
              <option key={customPageSize} value={customPageSize}>
                Show {customPageSize}
              </option>
            ))}
          </select>
        </span>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}{" "}
          </strong>
        </span>
        <span>
          | Go to Page{" "}
          <input
            type="number"
            onClick={(e) => {
              const pageNumber = (e.target as HTMLInputElement).value
                ? Number((e.target as HTMLInputElement).value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          ></input>{" "}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
};

export default ReactTable;
