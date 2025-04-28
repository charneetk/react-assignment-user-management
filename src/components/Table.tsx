import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { ListTodo } from "lucide-react";

export const ReactTable = (props: { tableColumns: any; tableData: any }) => {
  const { tableColumns, tableData } = props;
  console.log("TableDataaa ", tableData);
  const columns = useMemo(() => tableColumns, []);
  const navigate = useNavigate();
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
          {
            id: "fetchTodos",
            Header: "Actions",
            Cell: ({ row }) => {
              const userRow = row.original as { [x: string]: any };
              return (
                <div className="flex justify-center items-center">
                  <button
                    title="Fetch Todos for the User"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => {
                      const userId = userRow?.id;
                      navigate(`/todo/${userId}`);
                    }}
                  >
                    <ListTodo size={20} />
                  </button>
                </div>
              );
            },
          },
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
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="w-full overflow-x-auto mt-4">
        <table className="min-w-full border-collapse" {...getTableProps()}>
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
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
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
      </div>
      <div>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
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
        </div>
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
      <pre className="mt-4">
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
