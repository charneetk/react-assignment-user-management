import React from "react";
import { customClasses } from "../utils/constant";

const Home: React.FC = () => {
  return (
    <div className={customClasses.pageBody}>
      <div className={customClasses.formContainer}>
        <h1 className={customClasses.formHeading}>
          Welcome to User Task Manager
        </h1>

        <p className={customClasses.inputText}>
          This application is designed to help you stay organized and
          productive.
        </p>

        <p className={customClasses.inputText}>
          <strong>Moderators</strong> can view and manage their own to-do lists,
          keeping track of personal tasks and making updates as needed.
        </p>

        <p className={customClasses.inputText}>
          <strong>Admins</strong> have a broader overview, allowing them to
          manage the to-do lists of all users, providing support and overseeing
          team tasks.
        </p>

        <p className={customClasses.inputText}>
          Simply log in to access your personalized dashboard and start managing
          tasks efficiently!
        </p>
      </div>
    </div>
  );
};

export default Home;
