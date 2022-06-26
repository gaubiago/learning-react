import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageClick } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  let activateCurrentPage = (page) => {
    let classes = "page-item";
    if (page === currentPage) return (classes += " active");
  };

  return (
    <nav aria-label="Page navigation example">
      <ul
        className="pagination position-absolute top-0"
        style={{ marginTop: 330 }}
      >
        {pages.map((page) => {
          return (
            <li className={activateCurrentPage(page)} key={page}>
              <a className="page-link" onClick={() => onPageClick(page)}>
                {page}{" "}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

export default Pagination;
