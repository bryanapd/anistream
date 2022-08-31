import { Box } from '@chakra-ui/react';
import React from 'react';

const Pagination = ({ animePerPage = 15, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / animePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <ul>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Pagination;
