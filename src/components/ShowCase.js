import React, { useState } from "react";
import Footer from './layout/footer';
import Navbar from './layout/navbar';
import "./showcase.css"

export default function ShowCase({ showcase }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; 

  const filteredShowcase = showcase.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedShowcase = filteredShowcase.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredShowcase.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Navbar/>
      <div className="showcase-container">
        <div className="showcase-header">
          <h3>React Components Showcase</h3>
        </div>

        <div className="showcase-search" sx={3}>
          <input 
            placeholder="Search components"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
          />
        </div>

        <div className="showcase-grid">
          {paginatedShowcase.length > 0 ? (
            paginatedShowcase.map((item) => (
              <div className="showcase-card" item key={item.id}>
                <div className="showcase-card-content">
                  <div className="">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <a href={item.path}>keşfet</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-components">
              No components found.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="showcase-pagination">
            <div className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => currentPage > 1 && handlePageChange(null, currentPage - 1)}>
              Previous
            </div>
          
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <div key={page}
                  className={`pagination-page ${page === currentPage ? "active" : ""}`}
                  onClick={() => handlePageChange(null, page)}>
                  {page}
                </div>
              );
            })}
          
            <div className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => currentPage < totalPages && handlePageChange(null, currentPage + 1)}>
              Next
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
