import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTable from "../components/Table";
import { User } from "../interfaces/IUser";
import { useFetchUsers } from "../services/UserService";
import { customClasses, USERCOLUMNS } from "../utils/constant";

const UserBoard: React.FC = () => {
  console.log("User Board ");
  const { data, isLoading, isError } = useFetchUsers();
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching Users</div>;
  }

  return (
    <div className={customClasses.pageBody}>
      <div>
        <h2 className={customClasses.formHeading}>User Board</h2>
        <ReactTable tableColumns={USERCOLUMNS} tableData={data} />
      </div>
    </div>
  );
};

export default UserBoard;
