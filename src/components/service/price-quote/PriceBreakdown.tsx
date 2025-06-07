
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from 'lucide-react';

interface PriceBreakdownProps {
  priceQuote: number;
  serviceFee: number;
  totalPrice: number;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  priceQuote,
  serviceFee,
  totalPrice
}) => {
  return (
    <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3">
      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
        {priceQuote.toFixed(2)} BGN
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-500">+ {serviceFee.toFixed(2)} BGN fee</span>
        <Popover>
          <PopoverTrigger asChild>
            <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </PopoverTrigger>
          <PopoverContent className="max-w-xs">
            <p className="text-sm">
              A small fee for maintaining the app and assuring it functions as intended, 
              also covering future updates and new exciting features for you to enjoy.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            {totalPrice.toFixed(2)} BGN
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
