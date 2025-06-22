import { Filter } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

const ToolbarFilter = () => {
  return (
    <div className="flex gap-2 fixed bottom-0 left-0 right-0 z-50 bg-background-new p-4">
      <Button variant="outline">
        <Filter className="w-4 h-4" />
        Filter
      </Button>
    </div>
  );
};

export default ToolbarFilter;
