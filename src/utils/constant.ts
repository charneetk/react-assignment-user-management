import { User } from "../interfaces/IUser";

export const customClasses = {
  tableBody: "col-md-2",
  pageBody: "col-md-12",
  formContainer: "card card-container",
  formHeading: "text-2xl  font-medium text-primary mt-4 mb-12 text-center",
  btnContainer: "flex justify-center items-center mt-6",
  inputText:
    "w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2",
  inputTextBorder: "border-red-500 focus:ring-red-500",
  inputErrorBorder: "border-gray-300 focus:ring-blue-500",
  buttonBase: "btn btn-primary btn-block",
  loadingSpinner: "spinner-border spinner-border-sm",
  table:
    "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
  tableHead:
    "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
  tableHeadData: "px-6 py-3",
  tableBodyData:
    "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",
};

export const LOGIN_URL = "https://dummyjson.com/auth/login";
export const PROFILE_URL = "https://dummyjson.com/auth/me";

export const USER_URL = "https://dummyjson.com/users/";
export const USERCOLUMNS = [
  {
    Header: "id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: (row: User) => `${row.firstName} ${row.lastName}`,
  },
  {
    Header: "userName",
    accessor: "username",
  },
  {
    Header: "password",
    accessor: "password",
    disableFilters: true,
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "Date Of Birth",
    accessor: "birthDate",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Contact",
    accessor: "phone",
  },
];
