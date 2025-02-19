import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Navbar/AdminSidebar";
import {
  getMerchantRaffles,
  getSalseList,
} from "../../Services/Admin/getDashboardData";
import { Link, useParams } from "react-router-dom";
import { CONSTANT_DATA } from "../../constants";
import moment from "moment";

const ViewSalse = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const itemsPerPage = 10;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getSalseData(
        id,
        currentPage,
        itemsPerPage,
        searchQuery,
        startDate,
        endDate
      );
    }
  }, [id, currentPage, searchQuery, startDate, endDate]);

  const getSalseData = async (
    ownerId: string,
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      const res = await getSalseList(
        ownerId,
        page,
        limit,
        search,
        startDate,
        endDate
      );
      setSalesData(res.result);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex footer-manage" style={{ fontFamily: "poppins, sans-serif" }}>
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500">
        <div className="m-auto w-[100%] lg:w-[90%]">
          <nav aria-label="breadcrumb" className="breadcrumb-container ">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/reports" className="breadcrumb-link">
                  Dashboard
                </Link>
              </li>
              <li className="px-2">{">"}</li>
              <li className="breadcrumb-item">
                <Link to="/admin/merchants" className="breadcrumb-link">
                  Merchants
                </Link>
              </li>
              <li className="px-2">{">"}</li>
              <li className="breadcrumb-item active" aria-current="page">
                Sales
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md">
          <div className="block lg:flex items-center justify-between ">
            <h4>View Sales</h4>
            <div className="block lg:flex items-center gap-2">
              <div className="block lg:flex items-center gap-2">
                <input
                  className="border-[1px] p-2 border-none outline-none cursor-pointer"
                  type="date"
                  placeholder="From"
                  name="start_date"
                  id="start_date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <input
                  className="border-[1px] p-2 border-none outline-none cursor-pointer my-3 lg:my-0"
                  type="date"
                  placeholder="To"
                  name="end_date"
                  id="end_date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="hidden  p-3 lg:flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                    fill="black"
                  />
                </svg>
                <input
                  type="text"
                  className="border-none outline-none"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="block lg:hidden p-2 w-40 flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                    fill="black"
                  />
                </svg>
                <input
                  type="text"
                  className="w-[100%] border-none outline-none"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div>
            {salesData?.map((item: any, i: number) => (
              <>
                <div className="hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4">
                  <div className="w-[100%]">
                    <table className="w-[100%]">
                      <thead className="border-b-[2px] grid grid-cols-5 gap-4">
                        <th className="font-[400] text-[15px]">Raffle Name</th>
                        <th className="font-[400] text-[15px]">Purchase Id</th>
                        <th className="font-[400] text-[15px]">Quantity</th>
                        <th className="font-[400] text-[15px]">Created Date</th>
                        <th className="font-[400] text-[15px]">Total Amount</th>
                      </thead>
                      <tbody>
                        <tr className="grid grid-cols-5 gap-4">
                          <td className="text-center">
                            {item?.raffleID?.raffle_name}
                          </td>
                          <td className="text-center">{item?.purchaseId}</td>
                          <td className="text-center">{item?.quantity}</td>
                          <td className="text-center">
                            {moment(item?.createdAt).format("YYYY-MM-DD HH:mm")}
                          </td>
                          <td className="text-center">
                            {item?.quantity * item?.raffleID?.ticket_price}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="block lg:hidden flex  justify-between bg-white p-2 rounded-md mt-4">
                  <div className="w-[100%]">
                    <table className="w-[100%]">
                      <thead className="border-b-[2px]">
                        <th className="font-[400] text-[10px]">Raffle Name</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center text-[10px]">
                            {item?.raffleID?.raffle_name}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <table className="w-[100%]">
                      <thead className="border-b-[2px]">
                        <th className="font-[400] text-[10px]">Quantity</th>
                        <th className="font-[400] text-[10px]">Prize</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center text-[10px]">
                            {item?.quantity}
                          </td>
                          <td className="text-center text-[10px]">
                            {item?.raffleID?.ticket_price}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <table className="w-[100%]">
                      <thead className="border-b-[2px]">
                        <th className="font-[400] text-[10px]">Purchase Id</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center text-[10px]">
                            {item?.purchaseId}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <table className="w-[100%]">
                      <thead className="border-b-[2px]">
                        <th className="font-[400] text-[10px]">Total Amount</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center text-[10px]">
                            {item?.quantity * item?.raffleID?.ticket_price}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ))}

            {salesData?.length == 0 && (
              <p className="text-center my-6 h-[400px]">No Data Found</p>
            )}
          </div>
          <div className="text-xs lg:text-md text-right mt-4 flex items-center justify-end gap-2 cursor-pointer">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.78052 9.79541L1.5415 5.5564L5.78052 1.31738"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSalse;
