import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../service/user.service";
import Navbar from "../Navigation/Navigation";
import Pagination from "../Pagination/Pagination";
import User from "../User/User";

const SORT_DIRECTION = {
  DESC: "desc",
  ASC: "asc",
  NONE: "",
};

const SORT_KEY = {
  EMAIL: "email",
  NAME: "name",
  LOCATION: "location",
  REGISTER_DATE: "registeredDate",
  LAST_ACTIVE_DATE: "lastActiveDate",
  NONE: "",
};

export default function Users() {
  const [data, setData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [pageArray, setPageArray] = useState([1, 2, 3]);
  const [pageCount, setPageCount] = useState(0);
  const [thisPage, setThisPage] = useState(1);
  const [limit] = useState(10);
  const [direction, setDirection] = useState(SORT_DIRECTION.NONE);
  const [sortKey, setSortKey] = useState(SORT_KEY.NONE);

  const handleChangeSortKey = (key) => {
    setSortKey(key);
    if (direction === SORT_DIRECTION.DESC) setDirection(SORT_DIRECTION.ASC);
    if (direction === SORT_DIRECTION.NONE) setDirection(SORT_DIRECTION.DESC);
    if (direction === SORT_DIRECTION.ASC) {
      setDirection(SORT_DIRECTION.NONE);
      setSortKey(SORT_KEY.NONE);
    }
  };

  const getUsersCallback = useCallback(() => {
    getUsers(thisPage, limit, direction, sortKey).then((res) => {
      setData(res.data);
      setUsersCount(res.headers["x-total-count"]);
    });
  }, [direction, limit, sortKey, thisPage]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  useEffect(() => {
    setPageCount(Math.ceil(usersCount / limit));
  }, [limit, usersCount]);

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
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center">
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
          <br></br>
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
                        className="pl-10 px-6 py-3 text-left cursor-pointer text-sm font-medium text-gray-700 uppercase tracking-wider"
                        onClick={() => handleChangeSortKey(SORT_KEY.NAME)}
                      >
                        Name{" "} {SORT_KEY.NAME === sortKey && direction}
                      </th>
                      <th
                        scope="col"
                        className="pl-12 px-6 py-3 text-left cursor-pointer text-sm font-medium text-gray-700 uppercase tracking-wider"
                        onClick={() => handleChangeSortKey(SORT_KEY.LOCATION)}
                      >
                        Location{" "} {SORT_KEY.LOCATION === sortKey && direction}
                      </th>
                      <th
                        scope="col"
                        className="pl-24 px-6 py-3 text-left cursor-pointer text-sm font-medium text-gray-700 uppercase tracking-wider"
                        onClick={() =>
                          handleChangeSortKey(SORT_KEY.REGISTER_DATE)
                        }
                      >
                        Registered date{" "}
                        {SORT_KEY.REGISTER_DATE === sortKey && direction}
                      </th>
                      <th
                        scope="col"
                        className="pl-12 px-6 py-3 text-left cursor-pointer text-sm font-medium text-gray-700 uppercase tracking-wider"
                        onClick={() => handleChangeSortKey(SORT_KEY.LAST_ACTIVE_DATE)}
                      >
                        LAst active date{" "}
                        {sortKey === SORT_KEY.LAST_ACTIVE_DATE && direction}
                      </th>
                      <th
                        scope="col"
                        className="pl-6 px-6 py-3 text-left cursor-pointer text-sm font-medium text-gray-700 uppercase tracking-wider"
                        onClick={() => handleChangeSortKey(SORT_KEY.EMAIL)}
                      >
                        Email{" "} {sortKey === SORT_KEY.EMAIL && direction}
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
                      <User
                        user={user}
                        key={user.id}
                        onDelete={async () => await getUsersCallback()}
                      />
                    ))}
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
