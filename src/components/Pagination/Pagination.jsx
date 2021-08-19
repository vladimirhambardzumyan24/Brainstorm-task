export default function Pagination({
  pageArray,
  givThisPage,
  givPrevPage,
  givNextPage,
}) {
  // console.log(`pageCount`, pageCount)
  //   let pageArray = [];

  //   for (let i = 1; i <= pageCount; i++) {
  //     pageArray = [...pageArray, i];
  //   }

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex space-x-2">
        <li>
          <button
            onClick={givPrevPage}
            className="flex items-center justify-center w-10 h-10 text-indigo-100 transition-colors bg-indigo-400 duration-150 rounded-full focus:shadow-outline hover:bg-indigo-700"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        {pageArray.map((item) => {
          return (
            <li key={item}>
              <button
                onClick={() => {
                  givThisPage(item);
                }}
                className="w-10 h-10 text-indigo-200 transition-colors duration-150 rounded-full bg-indigo-500 focus:shadow-outline hover:bg-indigo-900"
              >
                {item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={givNextPage}
            className="flex items-center justify-center w-10 h-10 text-indigo-100 transition-colors bg-indigo-400 duration-150  rounded-full focus:shadow-outline hover:bg-indigo-700"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
