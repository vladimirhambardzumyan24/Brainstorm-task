import { useEffect, useState } from "react";
import getUser from "../../data/users.data";
import Pagination from "../Pagination/Pagination";
import Navbar from "../Navigation/Navigation";

export default function Users({ editThisUser }) {
  const [data, setData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [pageArray, setPageArray] = useState([1, 2, 3]);
  const [pageCount, setPageCount] = useState(0);
  const [thisPage, setThisPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    getUser(thisPage, limit).then((res) => {
      setData(res.data);
      setUsersCount(res.headers["x-total-count"]);
    });
  }, [thisPage]);

  useEffect(() => {
    setPageCount(Math.ceil(usersCount / limit));
  }, [usersCount]);

  const handleGivPage = (page) => {
    setThisPage(page);
    if (page === 1) {
      setPageArray([page, page + 1]);
    } else if (page === pageCount) {
      setPageArray([page - 1, page]);
    } else if (page - 1 >= 1 && page + 1 <= pageCount) {
      setPageArray([page - 1, page, page + 1]);
    }
  };

  const handleGivPrevPage = () => {
    if (thisPage > 1) {
      setThisPage(thisPage - 1);
    }
    if (thisPage === 1) {
      setPageArray([thisPage, thisPage + 1]);
    } else if (thisPage - 1 > 1) {
      setPageArray([thisPage - 1, thisPage, thisPage + 1]);
    }
  };

  const handleGivNextPage = () => {
    if (thisPage < pageCount) {
      setThisPage(thisPage + 1);
    }
    if (thisPage === pageCount) {
      setPageArray([thisPage - 1, thisPage]);
    } else if (thisPage + 1 <= pageCount) {
      setPageArray([thisPage - 1, thisPage, thisPage + 1]);
    }
  };

  return (
    <>
      <Navbar />
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
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.photo}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.location}
                        </div>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap">
                        <span className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.registeredDate}
                        </span>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActiveDate}
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            editThisUser(user.id);
                          }}
                          className="text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-blue-100"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-700 cursor-pointer hover:bg-red-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-red-100">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center">
                <Pagination
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
    </>
  );
}
