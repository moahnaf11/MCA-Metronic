import { useState } from 'react';
import { Images } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import {
  A11y,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Vehicle } from '@/lib/vehicles';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import DialogContent, {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type CarImagesProps = {
  vehicle: Vehicle;
  images: string[];
};

const CarImages = ({ vehicle, images }: CarImagesProps) => {
  const [open, setOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setThumbsSwiper(null);
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Card className='p-2'>
          <div className="flex justify-between items-center">
            <CardTitle>
              {vehicle?.year + ' ' + vehicle?.make + ' ' + vehicle?.model}
            </CardTitle>
            <Button variant="outline">
              <Images />
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>
            {vehicle?.year + ' ' + vehicle?.make + ' ' + vehicle?.model}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="relative h-[600px]">
          {/* Custom navigation buttons */}
          <Button
            variant="outline"
            className="custom-prev absolute left-2 top-1/2 z-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
          >
            ←
          </Button>
          <Button
            variant="outline"
            className="custom-next absolute right-2 top-1/2 z-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
          >
            →
          </Button>

          {/* Swiper Carousel */}
          <Swiper
            loop={true}
            className="h-[85%] mb-4"
            modules={[Navigation, Thumbs, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            // pagination={{ clickable: true }}
            thumbs={{
              swiper: thumbsSwiper,
              slideThumbActiveClass: 'thumb-active-custom',
            }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Car ${index + 1}`}
                  className="h-full w-full object-cover rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}

          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs, FreeMode, Navigation]}
            spaceBetween={10}
            slidesPerView={6}
            watchSlidesProgress
            freeMode
            className="h-20 w-full"
          >
            {images.map((src, index) => (
              <SwiperSlide
                key={`thumb-${index}`}
                className="cursor-pointer rounded-md [&.thumb-active-custom]:opacity-100 [&.thumb-active-custom]:border-4 [&.thumb-active-custom]:border-primary"
              >
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover rounded-sm"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </DialogBody>

        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default CarImages;
