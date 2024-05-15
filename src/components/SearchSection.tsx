import { useServerStore } from '~/store/useServerStore';
import { useLocation, useNavigate } from 'react-router-dom';
import nosh_bg from '/src/assets/nosh_bg.png';
import nosh_logo from '/src/assets/nosh_logo.png';
import { useForm } from 'react-hook-form';
import { useGenreStore } from '~/store/useGenreStore';
import { path } from '~/constants';
import { createSearchParams } from 'react-router-dom';
import { withRouter, WithRouterProps } from '~/hocs/withRouter';
import Select from 'react-select';
// import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import nosh_search from '/src/assets/nosh_search.png';

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
  let server = localStorage.getItem('selectedServer');
  if (server == null) {
    server = 'truyen.tangthuvien.vn';
    localStorage.setItem('selectedServer', server);
  }
  const { register, handleSubmit, setValue } = useForm();
  const { serverList } = useServerStore();
  const { genreList, getGenreList } = useGenreStore();
  const [selectedServer, setSelectedServer] = useState(server);
  const options: OptionType[] = genreList.map((genre) => ({ value: genre.slug, label: genre.name }));
  const serverOptions: OptionType[] = serverList.map((server) => ({ value: server, label: server }));
  const defaultOption = serverOptions.find((option) => option.value === selectedServer);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handleSelectServer = (option: any) => {
    const value = option ? option.value : '';
    localStorage.setItem('selectedServer', value);
    setSelectedServer(value);
  };
  useEffect(() => {
    console.log(selectedServer);
    getGenreList(selectedServer);
  }, [selectedServer]);

  const handleSearch = (data: SearchData) => {
    const param: Record<string, string | string[]> = {};
    param.server = selectedServer.toString();
    if (data.keyword) param.keyword = data.keyword.toString();
    else if (data.genre) param.genre = data.genre.toString();
    if (param.keyword || param.genre) {
      param.page = '1';
      navigate({
        pathname: `/${path.SEARCH}`,
        search: createSearchParams(param).toString(),
      });
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: 'green',
      borderRadius: '0.375rem',
      padding: '0.3rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'blue',
      },
      textAlign: 'center',
      fontSize: '13px',
      caretColor: 'transparent',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
      padding: '0.5rem',
    }),

    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      paddingLeft: '0.5rem',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translateX(3rem)',
    }),
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
                  <label className=" text-[13px] absolute left-2 top-1/2 transform -translate-y-1/2 text-app_primary z-10">
                    Nguồn truyện
                  </label>
                  <Select
                    {...register('server')}
                    options={serverOptions}
                    placeholder="Chọn nguồn truyện"
                    styles={customStyles}
                    onChange={(val) => handleSelectServer(val)}
                    className="block w-full"
                    isSearchable={false}
                    defaultValue={defaultOption}
                    key={defaultOption?.value}
                  />
                </div>
              </div>
              <div className="categories-select w-[20rem] ">
                <div className="relative">
                  <label className=" text-[13px] absolute left-2 top-6 transform -translate-y-1/2 text-app_primary z-10 ">
                    Thể loại
                  </label>
                  <Select
                    id="genre"
                    options={options}
                    placeholder="Chọn thể loại"
                    value={selectedOption}
                    isSearchable
                    menuPlacement="bottom"
                    formatOptionLabel={(option: OptionType) => (
                      <div className="flex items-center justify-center gap-2">
                        <span>{option.label}</span>
                      </div>
                    )}
                    styles={{
                      ...customStyles,
                      valueContainer: (provided: any) => ({
                        ...provided,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'translateX(6rem)',
                      }),
                    }}
                    onChange={(val) => {
                      setSelectedOption(val);
                      setValue('keyword', '');
                      setValue('genre', val?.value);
                      handleSearch({ genre: val?.value });
                    }}
                    className="block w-full "
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
                  className="bg-gray-50 border border-app_primary text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2 text-dark outline-none focus:outline-none "
                  placeholder="Nhập tên truyện..."
                  onFocus={() => {
                    setSelectedOption(null);
                  }}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center gap-4  border border-app_primary"
                  style={{
                    backgroundColor: '#D1F4BC',
                    borderTopRightRadius: '0.375rem',
                    borderBottomRightRadius: '0.375rem',
                  }}
                >
                  <button
                    style={{
                      backgroundImage: `url(${nosh_search})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    onClick={handleSubmit(handleSearch)}
                    className="hover:opacity-50 w-10 h-10 rounded bg-none"
                    children={undefined}
                  />
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
