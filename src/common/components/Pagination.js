import React from "react";

function Pagination(props) {
  const { totalPaginationCount, setPagination, setCurrentPage } = props;
  if (totalPaginationCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(totalPaginationCount / 10); ++i) {
    range.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination myPaginationClass">
          {range.map(value => (
            <li
              className="page-item customCursor"
              key={value}
              onClick={() => setPagination(value)}
            >
              <a
                className={
                  setCurrentPage === value
                    ? "page-link activePaginationColor"
                    : "page-link paginationBtnColor"
                }
              >
                {value + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
