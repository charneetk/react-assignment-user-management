import { User } from "../interfaces/IUser";

export const customClasses = {
  tableBody: "col-md-2",
  pageBody:
    "min-h-screen flex items-center justify-center bg-cover bg-center relative",
  formContainer:
    "bg-black bg-opacity-60 p-8 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-md",
  formHeading: "text-3xl font-bold text-white mb-8 text-center",
  loadingSpinner:
    "animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-400 mr-2",
  btnContainer: "flex justify-center items-center mt-6",
  inputText:
    "w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition",
  inputTextBorder: "border border-gray-700",
  inputErrorBorder: "border border-red-500",
  buttonBase:
    "w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
  table:
    "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
  tableHead:
    "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
  tableHeadData: "px-6 py-3",
  tableBodyData:
    "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",
};

export const BASE_URL = "https://dummyjson.com/";
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
    Header: "Contact",
    accessor: "phone",
  },
];
