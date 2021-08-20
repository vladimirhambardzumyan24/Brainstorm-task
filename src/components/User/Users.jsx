import { useEffect, useState } from "react";
import { getUsers } from "../../service/user.service";
import Navbar from "../Navigation/Navigation";
import Pagination from "../Pagination/Pagination";
import UsersInterface from "../UsersInterface/UsersInterface";
import "./User.css";

export default function Users() {
  const [data, setData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [pageArray, setPageArray] = useState([1, 2, 3]);
  const [pageCount, setPageCount] = useState(0);
  const [thisPage, setThisPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    getUsers(thisPage, limit).then((res) => {
      setData(res.data);
      setUsersCount(res.headers["x-total-count"]);
    });
  }, [thisPage]);

  useEffect(() => {
    setPageCount(Math.ceil(usersCount / limit));
  }, [usersCount]);

  const handleGivPage = (page) => {
    if (page === 1) {
      setThisPage(page);
      setPageArray([page, page + 1]);
    } else if (page === pageCount) {
      setThisPage(page);
      setPageArray([page - 1, page]);
    } else if (page - 1 >= 1 && page + 1 <= pageCount) {
      setThisPage(page);
      setPageArray([page - 1, page, page + 1]);
    }
  };

  const handleGivPrevPage = () => handleGivPage(thisPage - 1);
  const handleGivNextPage = () => handleGivPage(thisPage + 1);

  return (
    <>
      <Navbar />
      {data.length === 0 ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-white">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className=" min-h-screen   flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="shadow  overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-max  w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr className="pl-10">
                      <th
                        scope="col"
                        className="pl-10 px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="pl-12 px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="pl-24 px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Registered date
                      </th>
                      <th
                        scope="col"
                        className="pl-12 px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        LAst active date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <UsersInterface data={data} />
                  </tbody>
                </table>
                <div className="flex justify-center">
                  <Pagination
                    currentPage={thisPage}
                    pageArray={pageArray}
                    givThisPage={handleGivPage}
                    givPrevPage={handleGivPrevPage}
                    givNextPage={handleGivNextPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
