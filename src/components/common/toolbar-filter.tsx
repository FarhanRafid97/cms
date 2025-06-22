import { Filter, Search, X, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const ToolbarFilter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
    { id: 'entertainment', label: 'Entertainment' },
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchValue('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || searchValue.length > 0;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="bg-white/95 backdrop-blur-sm  nice-box-shadow  rounded-2xl p-2">
        {/* Main toolbar */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
            />
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu modal={false} open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`h-11 px-4 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
                  selectedCategories.length > 0 ? 'border-blue-300 bg-blue-50 text-blue-700' : ''
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {selectedCategories.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 px-1.5 text-xs bg-blue-100 text-blue-700 border-0"
                  >
                    {selectedCategories.length}
                  </Badge>
                )}
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                    isFilterOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2" align="end" sideOffset={8}>
              <div className="flex items-center justify-between px-2 py-1 mb-2">
                <DropdownMenuLabel className="p-0 font-semibold text-gray-900">
                  Categories
                </DropdownMenuLabel>
                {selectedCategories.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-auto p-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator className="mb-2" />
              <div className="space-y-1">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                    className="rounded-md cursor-pointer focus:bg-blue-50 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700"
                  >
                    {category.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear All Button - Only show when filters are active */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-11 px-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {selectedCategories.length > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-500">Active filters:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((cat) => cat.id === categoryId);
                return (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className="h-6 px-2 text-xs bg-blue-100 text-blue-700 border-0 hover:bg-blue-200 cursor-pointer transition-colors"
                    onClick={() => handleCategoryChange(categoryId, false)}
                  >
                    {category?.label}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolbarFilter;
