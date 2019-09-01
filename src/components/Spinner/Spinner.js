import React from "react";
import { BounceLoader } from "react-spinners";
import "./spinner.scss";

export default function Spinner({ size = 100 }) {
  return (
    <div className="spinner_container">
      <BounceLoader size={size} />
    </div>
  );
}
