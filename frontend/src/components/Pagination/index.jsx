import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Pagination({ page, pages }) {
  return (
    pages > 1 && (
      <ul className="flex">
        <Link to={sessionStorage.getItem('adminAccount')?`/admin/1`:`/user/1`}>
          <button
            className="dark:text-white relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none disabled:opacity-50"
            disabled={page <=1 }
          >
            First
          </button>
        </Link>

        {[...Array(pages).keys()].map((x) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-blue-primary rounded-full border-[1px] "
                  : "rounded-full"
              }
              key={x + 1}
              to={sessionStorage.getItem('adminAccount')?`/admin/${x + 1}`:`/user/${x + 1}`}
            >
              <li className="dark:text-white relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                {x + 1}
              </li>
            </NavLink>
          );
        })}

        <Link to={sessionStorage.getItem('adminAccount')?`/admin/${pages}`:`/user/${pages}`}>
          <button
            className="dark:text-white relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none disabled:opacity-50"
            disabled={page >= pages}
     >
            Last
          </button>
        </Link>
      </ul>
    )
  );
}
