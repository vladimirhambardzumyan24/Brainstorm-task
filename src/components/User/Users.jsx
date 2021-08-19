import { useEffect, useState } from "react";
import getUser from "../../data/users.data";
import Pagination from "../Pagination/Pagination";

export default function Users() {
  const [data, setData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [pageCount, setPageCount] = useState("");
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
  };

  const handleGivPrevPage = () => {
    if (thisPage > 1) {
      setThisPage(thisPage - 1);
    }
  };

  const handleGivNextPage = () => {
    if (thisPage < pageCount) {
      setThisPage(thisPage + 1);
    }
  };

  return (
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
                      <a
                        href="/"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                    <td className="px-12 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="/"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Delate
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <Pagination
                pageCount={pageCount}
                givThisPage={handleGivPage}
                givPrevPage={handleGivPrevPage}
                givNextPage={handleGivNextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
