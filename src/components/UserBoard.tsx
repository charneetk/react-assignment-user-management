import React, { useState, useEffect } from "react";
import { getUserData } from "../services/user.service";
import { customClasses, USERCOLUMNS } from "../utils/constant";
import ReactTable from "./Table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  // Add other fields depending on your actual data shape
}

const UserBoard: React.FC = () => {
  const [userData, setUserData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: User[] = await getUserData();
        setUserData(response);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!userData) return null;

  return (
    <div className={customClasses.pageBody}>
      <div>
        <h2 className={customClasses.formHeading}>User Board</h2>
        <ReactTable tableColumns={USERCOLUMNS} tableData={userData} />
      </div>
    </div>
  );
};

export default UserBoard;
