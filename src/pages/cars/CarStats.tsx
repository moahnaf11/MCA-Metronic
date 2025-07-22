import { Fragment } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

interface ICarStatsItem {
  logo: string;
  logoDark?: string;
  info: string;
  desc: string;
  path: string;
}
type ICarStatsItems = Array<ICarStatsItem>;

const CarStats = () => {
  const items: ICarStatsItems = [
    { logo: 'linkedin-2.svg', info: '2.3k', desc: 'Cars Sold', path: '' },
    { logo: 'youtube-2.svg', info: '2k', desc: 'In Stock', path: '' },
    {
      logo: 'instagram-03.svg',
      info: '608',
      desc: 'New Cars',
      path: '',
    },
    {
      logo: 'tiktok.svg',
      logoDark: 'tiktok-dark.svg',
      info: '2.5k',
      desc: 'User Queries',
      path: '',
    },
  ];

  const renderItem = (item: ICarStatsItem, index: number) => {
    return (
      <Card key={index}>
        <CardContent className="p-2 flex flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
          <div className='w-full flex justify-end'>
           {item.logoDark ? (
            <>
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)}
                className="dark:hidden w-7 "
                alt="image"
              />
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${item.logoDark}`)}
                className="light:hidden w-7 "
                alt="image"
              />
            </>
          ) : (
            <img
              src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)}
              className="w-7 "
              alt="image"
            />
          )}
           </div>
          <div className="flex flex-col gap-1 pb-4 px-5">
            <span className="text-3xl font-semibold text-mono">
              {item.info}
            </span>
            <span className="text-sm font-normal text-muted-forehead">
              {item.desc}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { CarStats, type ICarStatsItem, type ICarStatsItems };
