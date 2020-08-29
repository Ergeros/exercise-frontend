import React from "react";
import "./List.scss";
export default function List({ children }) {
  return <ul className="list">{children}</ul>;
}
