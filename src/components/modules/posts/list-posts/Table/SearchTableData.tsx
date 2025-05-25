import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetDynamicUrl } from '@/hooks/useGetDyanmicUrl';
import { LIMIT_GET_POSTS } from '@/lib/constant';
import { FilterSearchParams } from '@/types/globals';

import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const SearchTableData = ({ searchParams }: { searchParams?: FilterSearchParams }) => {
  const [search, setSearch] = useState<string>(() => searchParams?._q || '');

  const { pathname } = useGetDynamicUrl();
  const { push } = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (searchParams?._q === search) {
      return;
    }

    const tempData = { ...searchParams };
    if (!!search) {
      tempData['_q'] = search;
      tempData['_offsetFrom'] = '0';
      tempData['_offsetTo'] = `${LIMIT_GET_POSTS}`;
      push({
        pathname: pathname,
        search: new URLSearchParams(tempData).toString(),
      });
    } else {
      if (tempData._q) {
        delete tempData['_q'];
        tempData['_offsetFrom'] = '0';
        tempData['_offsetTo'] = `${LIMIT_GET_POSTS}`;
        push({
          pathname: pathname,
          search: new URLSearchParams(tempData).toString(),
        });
      }
    }
  };
  return (
    <div className="flex items-center space-x-2 w-full sm:w-fit">
      <form action="" onSubmit={handleSubmit} className="w-full ">
        <div className="flex gap-2 w-full relative">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            data-test="search-table-report-mass-gl"
            placeholder="Search Item..."
            className="h-8  w-full sm:w-[200px] md:w-[250px] border-input pr-16"
          />
          {search.length > 0 && (
            <button
              type="button"
              aria-label="button-search"
              onClick={() => {
                const tempData = { ...searchParams };
                if (!!tempData._q) {
                  setSearch('');
                  delete tempData['_q'];
                  tempData['_offsetFrom'] = '0';
                  tempData['_offsetTo'] = `${LIMIT_GET_POSTS}`;
                  push({
                    pathname: pathname,
                    search: new URLSearchParams(tempData).toString(),
                  });
                } else {
                  setSearch('');
                }
              }}
              className=" hover:bg-muted h-fit p-1 rounded-md absolute shadow-none right-10  top-1/2 transform -translate-y-1/2"
            >
              <Cross2Icon width={14} height={14} />
            </button>
          )}
          <Button
            variant="outline"
            data-test="search-button-table-report-mass-gl"
            size="icon"
            className="h-full px-2 absolute shadow-none right-0 top-1/2 transform -translate-y-1/2"
            type="submit"
          >
            <MagnifyingGlassIcon width={16} height={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchTableData;
