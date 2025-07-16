import { HexagonBadge } from '@/partials/common/hexagon-badge';
import {
  MessagesSquare,
  Truck,
  Volleyball,
  Zap,
  type LucideIcon,
} from 'lucide-react';
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ICommunityBadgesItem {
  stroke: string;
  fill: string;
  icon: LucideIcon;
  iconColor: string;
}
type ICommunityBadgesItems = Array<ICommunityBadgesItem>;

interface ICommunityBadgesProps {
  title: string;
  images: string[]; // <-- new
}

const CommunityBadges = ({ title, images }: ICommunityBadgesProps) => {
  const items: ICommunityBadgesItems = [
    {
      stroke: 'stroke-blue-200 dark:stroke-blue-950',
      fill: 'fill-blue-50 dark:fill-blue-950/30',
      icon: Volleyball,
      iconColor: 'text-blue-500',
    },
    {
      stroke: 'stroke-orange-200 dark:stroke-orange-950',
      fill: 'fill-orange-50 dark:fill-orange-950/30',
      icon: Zap,
      iconColor: 'text-orange-500',
    },
    {
      stroke: 'stroke-green-200 dark:stroke-green-950',
      fill: 'fill-green-50 dark:fill-green-950/30',
      icon: MessagesSquare,
      iconColor: 'text-green-500',
    },
    {
      stroke: 'stroke-violet-200 dark:stroke-violet-950',
      fill: 'fill-violet-50  dark:fill-violet-950/30',
      icon: Truck,
      iconColor: 'text-violet-500',
    },
  ];

  const renderItem = (item: ICommunityBadgesItem, index: number) => {
    return (
      <HexagonBadge
        key={index}
        stroke={item.stroke}
        fill={item.fill}
        size="size-[50px]"
        badge={<item.icon className={`text-xl ps-px ${item.iconColor}`} />}
      />
    );
  };

  return (
    <Card className="p-0">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-7.5">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Car ${index + 1}`}
                className="w-full h-60 object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </CardContent>
    </Card>
  );
};

export {
  CommunityBadges,
  type ICommunityBadgesItem,
  type ICommunityBadgesItems,
  type ICommunityBadgesProps,
};
