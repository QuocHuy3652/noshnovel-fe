import { useServerStore } from '~/store/useServerStore';
import { useLocation, useNavigate } from 'react-router-dom';
import nosh_bg from '/src/assets/nosh_bg.png';
import nosh_logo from '/src/assets/nosh_logo.png';
import nosh_search from '/src/assets/nosh_search.png';
import { useForm } from 'react-hook-form';
import { useGenreStore } from '~/store/useGenreStore';
import { path } from '~/constants';
import { createSearchParams } from 'react-router-dom';
import { withRouter, WithRouterProps } from '~/hocs/withRouter';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface OptionType {
  label: string;
  value: string;
}

interface SearchData {
  server?: string;
  keyword?: string;
  genre?: string;
}
const SearchSection = ({ navigate }: WithRouterProps) => {
  const { register, handleSubmit, setValue } = useForm();
  const { serverList } = useServerStore();
  const { genreList, getGenreList } = useGenreStore();
  const [selectedServer, setSelectedServer] = useState('truyenchu.com.vn');
  console.log(serverList[0]);
  const options: OptionType[] = genreList.map((genre) => ({ value: genre.slug, label: genre.name }));

  useEffect(() => {
    getGenreList(selectedServer);
  }, [selectedServer]);

  const handleSearch = (data: SearchData) => {
    const param: Record<string, string | string[]> = {};
    if (data.server) param.server = data.server.toString();
    if (data.keyword) param.keyword = data.keyword.toString();
    if (data.genre) param.genre = data.genre.toString();

    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams(param).toString(),
    });
  };
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
                    {...register('server')}
                    onChange={(e) => setSelectedServer(e.target.value)}
                    id="countries"
                    className="bg-white border border-app_primary text-black
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                block w-full p-2.5   focus:ring-blue-500
                                focus:border-blue-500 pl-20"
                  >
                    <option value="" className="text-gray-900" disabled hidden>
                      Chọn Server
                    </option>
                    {serverList.map((server, index) => (
                      <option className="text-gray-900 text-base bg-white p-2" key={index} value={server.id}>
                        {server}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="categories-select w-[20rem]">
                <div className="relative">
                  <label className=" text-[10px] absolute left-2 top-1/2 transform -translate-y-1/2 text-app_primary">
                    Thể loại
                  </label>
                  <Select
                    id="genre"
                    options={options}
                    placeholder="Chọn thể loại"
                    isSearchable
                    isClearable
                    formatOptionLabel={(option: OptionType) => (
                      <div className="flex items-center justify-center gap-2">
                        <span>{option.label}</span>
                      </div>
                    )}
                    className="bg-white border border-app_primary rounded-lg text-gray-900 z-10 color-black  "
                    onChange={(val) => setValue('genre', val?.value)}
                  />
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
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <input
                  {...register('keyword')}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-app_primary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 text-dark "
                  placeholder="Search story name..."
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <FaSearch onClick={handleSubmit(handleSearch)} className="text-gray-500 cursor-pointer text-xl" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default withRouter(SearchSection);
