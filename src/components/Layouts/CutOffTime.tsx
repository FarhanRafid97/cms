'use client';

import { cn } from '@/lib/utils';
import { useGetCutOff } from '@/querries/parameter/useApplication';
import type React from 'react';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, AlertCircle } from 'lucide-react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isClosed: boolean;
}

const CutOffTime: React.FC<{ isShow: boolean }> = ({ isShow }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isClosed: false,
  });

  const { data, isPending } = useGetCutOff();

  useEffect(() => {
    if (!data?.CutOffStart || !data?.CutOffEnd) return;

    const cutOffStart = Number.parseInt(data.CutOffStart, 10);
    const cutOffEnd = Number.parseInt(data.CutOffEnd, 10);

    const updateCountdown = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const cutoffTime = new Date();
      cutoffTime.setHours(cutOffEnd, 0, 0, 0);

      const isClosed = currentHour >= cutOffStart && currentHour < cutOffEnd ? false : true;

      let difference = cutoffTime.getTime() - now.getTime();
      if (difference < 0) {
        cutoffTime.setDate(cutoffTime.getDate() + 1);
        difference = cutoffTime.getTime() - now.getTime();
      }

      setTimeLeft({
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isClosed,
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [data?.CutOffStart, data?.CutOffEnd]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800/80 px-2 py-1 rounded shadow-sm backdrop-blur-sm text-base font-mono font-bold text-gray-800 dark:text-gray-200 min-w-[32px] text-center border border-gray-200/30 dark:border-gray-700/30">
        {value < 10 ? `0${value}` : value}
      </div>
      <div className="text-[10px] mt-0.5 font-medium text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );

  return (
    <div
      className={cn(
        'w-full transition-all duration-300 ease-in-out overflow-hidden',
        isShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full',
      )}
    >
      {match(isPending)
        .with(true, () => <Skeleton className="h-[88px] w-full rounded-none" />)
        .otherwise(() => (
          <div
            className={cn(
              'w-full border-t border-gray-200 dark:border-gray-800 rounded-xl bg-gradient-to-b from-gray-50/80 to-gray-50/50 dark:from-gray-900/80 dark:to-gray-900/50 backdrop-blur-sm shadow-sm',
            )}
          >
            {match(timeLeft.isClosed)
              .with(true, () => (
                <div className="flex items-center justify-between h-[88px] px-4 py-3">
                  <div className="flex flex-col space-y-2.5 w-full">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <AlertCircle className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <p className="text-sm font-medium">Currently Closed</p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 h-[1px]"></div>
                    <div className="flex justify-between items-center w-full px-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Opens in:</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium tabular-nums text-gray-700 dark:text-gray-300">
                          {timeLeft.hours}h {timeLeft.minutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .otherwise(() => (
                <div className="p-3.5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Operating Hours
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-1">
                    {[
                      { label: 'HOURS', value: timeLeft.hours },
                      { label: 'MIN', value: timeLeft.minutes },
                      { label: 'SEC', value: timeLeft.seconds },
                    ].map(({ label, value }, index) => (
                      <div key={label} className="flex items-center">
                        <TimeBlock value={value} label={label} />
                        {index < 2 && (
                          <span className="mx-1.5 text-gray-400 dark:text-gray-600 font-mono font-bold text-base">
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default CutOffTime;
