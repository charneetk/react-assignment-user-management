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
  errorComponent: "text-white error-message",
  profileContainer:
    "max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200",
  imageContainer: "w-full h-56 object-cover",
  profileText: "text-sm text-gray-600",
  todoContainer:
    "min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center px-4 py-8",
  todoList:
    "bg-black bg-opacity-70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-lg space-y-6",
  listHeading: "text-4xl font-bold text-center text-white",
  addToDo:
    "flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500",
  addButton:
    "w-12 h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-lg transition",
  pageButton:
    "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed",
  todoItem:
    "flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl",
  todoActionComplete:
    "w-10 h-10 flex items-center justify-center rounded-md bg-green-600 hover:bg-green-700 transition",
  todoActionDelete:
    "w-10 h-10 flex items-center justify-center rounded-md bg-rose-600 hover:bg-rose-700 transition",
  navigationBar: "navbar navbar-expand navbar-dark bg-dark",
  navigationItem: "nav-item",
  navigationLink: "nav-link",
  layout: "min-h-screen bg-cover bg-center font-sans text-gray-800",
  labelText: "block text-gray-300 mb-2",
};

export const BASE_URL = "https://dummyjson.com";

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
