import nosh_bg from '/src/assets/nosh_bg.png';
import nosh_logo from '/src/assets/nosh_logo.png';
import nosh_search from '/src/assets/nosh_search.png';

export const SearchSection = () => {
  return (
    <>
      <section className="banner flex flex-col w-full items-center justify-center min-h-[10rem]">
        <img className="w-full relative h-[35rem]" src={nosh_bg} alt="banner" />
        <div className="wrapper absolute flex flex-col items-center justify-center w-[30rem]">
          <img className="w-[13rem] h-[13rem]" src={nosh_logo} alt="banner" />
          <div className="banner-text flex flex-col justify-center items-start text-white">
            <h1 className="text-5xl font-bold text-app_primary">Nosh Novel</h1>
          </div>
          <form className="search-module w-[40rem] h-[15rem] flex flex-col">
            <div className="filter-selection flex flex-row justify-between space-x-5 mt-5">
              <div className="source-select w-[20rem]">
                <div className="relative">
                  <label className=" text-[10px] absolute left-2 top-1/2 transform -translate-y-1/2 text-app_primary">
                    Nguồn truyện
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-app_primary text-gray-900
                      text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500 pl-20"
                  >
                    <option value="US">United States</option>
                    <option selected value="CA">
                      Canada
                    </option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
              <div className="categories-select w-[20rem]">
                <div className="relative">
                  <label className=" text-[10px] absolute left-2 top-1/2 transform -translate-y-1/2 text-app_primary">
                    Thể loại
                  </label>
                  <select
                    id="categories"
                    className=" border-2-app_primary bg-gray-50 border border-app_primary text-gray-900
                      text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500 pl-20"
                  >
                    <option value="US" selected>
                      United States
                    </option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="search-input flex flex-row mt-5">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute text-app_primary inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-app_primary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search story name..."
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundImage: nosh_search,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '50px 50px',
                }}
                className="border-none hover:opacity-60 p-5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800
                    focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
