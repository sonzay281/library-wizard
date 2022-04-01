import React from "react";

import Button from "components/Button";

import "styles/confirm.scss";

const ConfirmationPage = ({ handleCreateNew }) => (
  <div className="confirm p-3">
    <div className="image">&#10003;</div>
    <div className="text my-3">Book added successfully</div>
    <Button
      extraClassName="active px-3"
      label="Add another book"
      onClick={handleCreateNew}
    />
  </div>
);

export default ConfirmationPage;
