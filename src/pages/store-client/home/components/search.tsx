import { useState } from 'react';
import { Search as SearchInput } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function Search() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <Card className="shadow-none relative h-[140px] bg-cover bg-no-repeat light:bg-accent/50 mb-3.5 overflow-hidden">
      <div className="relative flex items-center max-w-[420px] w-[90%] mx-auto top-1/2 -translate-y-1/2 z-1">
        <SearchInput
          className="absolute start-4 text-muted-foreground"
          size={18}
        />

        <Input
          variant="lg"
          id="search-input"
          value={searchInput}
          placeholder="Search shop"
          onChange={(e) => setSearchInput(e.target.value)}
          className="ps-9 pe-10 w-full"
        />

        <Badge className="absolute end-3 gap-1" variant="outline" size="sm">
          ⌘ K
        </Badge>
      </div>
      <div className="absolute top-1/2 start-1/2 -translate-1/2 w-[90%] text-white dark:text-black/30">
        <svg
          viewBox="0 0 1140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_34073_49244)">
            <mask
              id="mask0_34073_49244"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="99"
              y="10"
              width="942"
              height="120"
            >
              <path
                d="M1039.76 70C1039.76 73.8626 1036.68 77.7768 1030.44 81.6678C1024.23 85.5392 1015.04 89.2917 1003.16 92.876C979.399 100.042 944.997 106.503 902.458 111.93C817.385 122.785 699.843 129.5 570 129.5C440.157 129.5 322.616 122.785 237.543 111.93C195.003 106.503 160.601 100.042 136.844 92.876C124.962 89.2917 115.773 85.5392 109.564 81.6678C103.323 77.7768 100.245 73.8626 100.245 70C100.245 66.1374 103.323 62.2232 109.564 58.3322C115.773 54.4608 124.962 50.7083 136.844 47.124C160.601 39.9576 195.003 33.4972 237.543 28.0696C322.616 17.2151 440.157 10.5 570 10.5C699.843 10.5 817.385 17.2151 902.458 28.0696C944.997 33.4972 979.399 39.9576 1003.16 47.124C1015.04 50.7083 1024.23 54.4608 1030.44 58.3322C1036.68 62.2232 1039.76 66.1374 1039.76 70Z"
                fill="#D9D9D9"
                stroke="#262D6B"
              />
            </mask>
            <g mask="url(#mask0_34073_49244)">
              <path d="M114 16.5H95V-2.5H114V16.5Z" stroke="currentColor" />
              <path d="M133 16.5H114V-2.5H133V16.5Z" stroke="currentColor" />
              <path d="M152 16.5H133V-2.5H152V16.5Z" stroke="currentColor" />
              <path d="M171 16.5H152V-2.5H171V16.5Z" stroke="currentColor" />
              <path d="M190 16.5H171V-2.5H190V16.5Z" stroke="currentColor" />
              <path d="M209 16.5H190V-2.5H209V16.5Z" stroke="currentColor" />
              <path d="M228 16.5H209V-2.5H228V16.5Z" stroke="currentColor" />
              <path d="M247 16.5H228V-2.5H247V16.5Z" stroke="currentColor" />
              <path d="M266 16.5H247V-2.5H266V16.5Z" stroke="currentColor" />
              <path d="M285 16.5H266V-2.5H285V16.5Z" stroke="currentColor" />
              <path d="M304 16.5H285V-2.5H304V16.5Z" stroke="currentColor" />
              <path d="M323 16.5H304V-2.5H323V16.5Z" stroke="currentColor" />
              <path d="M342 16.5H323V-2.5H342V16.5Z" stroke="currentColor" />
              <path d="M361 16.5H342V-2.5H361V16.5Z" stroke="currentColor" />
              <path d="M380 16.5H361V-2.5H380V16.5Z" stroke="currentColor" />
              <path d="M399 16.5H380V-2.5H399V16.5Z" stroke="currentColor" />
              <path d="M418 16.5H399V-2.5H418V16.5Z" stroke="currentColor" />
              <path d="M437 16.5H418V-2.5H437V16.5Z" stroke="currentColor" />
              <path d="M456 16.5H437V-2.5H456V16.5Z" stroke="currentColor" />
              <path d="M475 16.5H456V-2.5H475V16.5Z" stroke="currentColor" />
              <path d="M494 16.5H475V-2.5H494V16.5Z" stroke="currentColor" />
              <path d="M513 16.5H494V-2.5H513V16.5Z" stroke="currentColor" />
              <path d="M532 16.5H513V-2.5H532V16.5Z" stroke="currentColor" />
              <path d="M551 16.5H532V-2.5H551V16.5Z" stroke="currentColor" />
              <path d="M570 16.5H551V-2.5H570V16.5Z" stroke="currentColor" />
              <path d="M589 16.5H570V-2.5H589V16.5Z" stroke="currentColor" />
              <path d="M608 16.5H589V-2.5H608V16.5Z" stroke="currentColor" />
              <path d="M627 16.5H608V-2.5H627V16.5Z" stroke="currentColor" />
              <path d="M646 16.5H627V-2.5H646V16.5Z" stroke="currentColor" />
              <path d="M665 16.5H646V-2.5H665V16.5Z" stroke="currentColor" />
              <path d="M684 16.5H665V-2.5H684V16.5Z" stroke="currentColor" />
              <path d="M703 16.5H684V-2.5H703V16.5Z" stroke="currentColor" />
              <path d="M722 16.5H703V-2.5H722V16.5Z" stroke="currentColor" />
              <path d="M741 16.5H722V-2.5H741V16.5Z" stroke="currentColor" />
              <path d="M760 16.5H741V-2.5H760V16.5Z" stroke="currentColor" />
              <path d="M779 16.5H760V-2.5H779V16.5Z" stroke="currentColor" />
              <path d="M798 16.5H779V-2.5H798V16.5Z" stroke="currentColor" />
              <path d="M817 16.5H798V-2.5H817V16.5Z" stroke="currentColor" />
              <path d="M836 16.5H817V-2.5H836V16.5Z" stroke="currentColor" />
              <path d="M855 16.5H836V-2.5H855V16.5Z" stroke="currentColor" />
              <path d="M874 16.5H855V-2.5H874V16.5Z" stroke="currentColor" />
              <path d="M893 16.5H874V-2.5H893V16.5Z" stroke="currentColor" />
              <path d="M912 16.5H893V-2.5H912V16.5Z" stroke="currentColor" />
              <path d="M931 16.5H912V-2.5H931V16.5Z" stroke="currentColor" />
              <path d="M950 16.5H931V-2.5H950V16.5Z" stroke="currentColor" />
              <path d="M969 16.5H950V-2.5H969V16.5Z" stroke="currentColor" />
              <path d="M988 16.5H969V-2.5H988V16.5Z" stroke="currentColor" />
              <path d="M1007 16.5H988V-2.5H1007V16.5Z" stroke="currentColor" />
              <path d="M1026 16.5H1007V-2.5H1026V16.5Z" stroke="currentColor" />
              <path d="M1045 16.5H1026V-2.5H1045V16.5Z" stroke="currentColor" />
              <path d="M114 35.5H95V16.5H114V35.5Z" stroke="currentColor" />
              <path d="M133 35.5H114V16.5H133V35.5Z" stroke="currentColor" />
              <path d="M152 35.5H133V16.5H152V35.5Z" stroke="currentColor" />
              <path d="M171 35.5H152V16.5H171V35.5Z" stroke="currentColor" />
              <path d="M190 35.5H171V16.5H190V35.5Z" stroke="currentColor" />
              <path d="M209 35.5H190V16.5H209V35.5Z" stroke="currentColor" />
              <path d="M228 35.5H209V16.5H228V35.5Z" stroke="currentColor" />
              <path d="M247 35.5H228V16.5H247V35.5Z" stroke="currentColor" />
              <path d="M266 35.5H247V16.5H266V35.5Z" stroke="currentColor" />
              <path d="M285 35.5H266V16.5H285V35.5Z" stroke="currentColor" />
              <path d="M304 35.5H285V16.5H304V35.5Z" stroke="currentColor" />
              <path d="M323 35.5H304V16.5H323V35.5Z" stroke="currentColor" />
              <path d="M342 35.5H323V16.5H342V35.5Z" stroke="currentColor" />
              <path d="M361 35.5H342V16.5H361V35.5Z" stroke="currentColor" />
              <path d="M380 35.5H361V16.5H380V35.5Z" stroke="currentColor" />
              <path d="M399 35.5H380V16.5H399V35.5Z" stroke="currentColor" />
              <path d="M418 35.5H399V16.5H418V35.5Z" stroke="currentColor" />
              <path d="M437 35.5H418V16.5H437V35.5Z" stroke="currentColor" />
              <path d="M456 35.5H437V16.5H456V35.5Z" stroke="currentColor" />
              <path d="M475 35.5H456V16.5H475V35.5Z" stroke="currentColor" />
              <path d="M494 35.5H475V16.5H494V35.5Z" stroke="currentColor" />
              <path d="M513 35.5H494V16.5H513V35.5Z" stroke="currentColor" />
              <path d="M532 35.5H513V16.5H532V35.5Z" stroke="currentColor" />
              <path d="M551 35.5H532V16.5H551V35.5Z" stroke="currentColor" />
              <path d="M570 35.5H551V16.5H570V35.5Z" stroke="currentColor" />
              <path d="M589 35.5H570V16.5H589V35.5Z" stroke="currentColor" />
              <path d="M608 35.5H589V16.5H608V35.5Z" stroke="currentColor" />
              <path d="M627 35.5H608V16.5H627V35.5Z" stroke="currentColor" />
              <path d="M646 35.5H627V16.5H646V35.5Z" stroke="currentColor" />
              <path d="M665 35.5H646V16.5H665V35.5Z" stroke="currentColor" />
              <path d="M684 35.5H665V16.5H684V35.5Z" stroke="currentColor" />
              <path d="M703 35.5H684V16.5H703V35.5Z" stroke="currentColor" />
              <path d="M722 35.5H703V16.5H722V35.5Z" stroke="currentColor" />
              <path d="M741 35.5H722V16.5H741V35.5Z" stroke="currentColor" />
              <path d="M760 35.5H741V16.5H760V35.5Z" stroke="currentColor" />
              <path d="M779 35.5H760V16.5H779V35.5Z" stroke="currentColor" />
              <path d="M798 35.5H779V16.5H798V35.5Z" stroke="currentColor" />
              <path d="M817 35.5H798V16.5H817V35.5Z" stroke="currentColor" />
              <path d="M836 35.5H817V16.5H836V35.5Z" stroke="currentColor" />
              <path d="M855 35.5H836V16.5H855V35.5Z" stroke="currentColor" />
              <path d="M874 35.5H855V16.5H874V35.5Z" stroke="currentColor" />
              <path d="M893 35.5H874V16.5H893V35.5Z" stroke="currentColor" />
              <path d="M912 35.5H893V16.5H912V35.5Z" stroke="currentColor" />
              <path d="M931 35.5H912V16.5H931V35.5Z" stroke="currentColor" />
              <path d="M950 35.5H931V16.5H950V35.5Z" stroke="currentColor" />
              <path d="M969 35.5H950V16.5H969V35.5Z" stroke="currentColor" />
              <path d="M988 35.5H969V16.5H988V35.5Z" stroke="currentColor" />
              <path d="M1007 35.5H988V16.5H1007V35.5Z" stroke="currentColor" />
              <path d="M1026 35.5H1007V16.5H1026V35.5Z" stroke="currentColor" />
              <path d="M1045 35.5H1026V16.5H1045V35.5Z" stroke="currentColor" />
              <path d="M114 54.5H95V35.5H114V54.5Z" stroke="currentColor" />
              <path d="M133 54.5H114V35.5H133V54.5Z" stroke="currentColor" />
              <path d="M152 54.5H133V35.5H152V54.5Z" stroke="currentColor" />
              <path d="M171 54.5H152V35.5H171V54.5Z" stroke="currentColor" />
              <path d="M190 54.5H171V35.5H190V54.5Z" stroke="currentColor" />
              <path d="M209 54.5H190V35.5H209V54.5Z" stroke="currentColor" />
              <path d="M228 54.5H209V35.5H228V54.5Z" stroke="currentColor" />
              <path d="M247 54.5H228V35.5H247V54.5Z" stroke="currentColor" />
              <path d="M266 54.5H247V35.5H266V54.5Z" stroke="currentColor" />
              <path d="M285 54.5H266V35.5H285V54.5Z" stroke="currentColor" />
              <path d="M304 54.5H285V35.5H304V54.5Z" stroke="currentColor" />
              <path d="M323 54.5H304V35.5H323V54.5Z" stroke="currentColor" />
              <path d="M342 54.5H323V35.5H342V54.5Z" stroke="currentColor" />
              <path d="M361 54.5H342V35.5H361V54.5Z" stroke="currentColor" />
              <path d="M380 54.5H361V35.5H380V54.5Z" stroke="currentColor" />
              <path d="M399 54.5H380V35.5H399V54.5Z" stroke="currentColor" />
              <path d="M418 54.5H399V35.5H418V54.5Z" stroke="currentColor" />
              <path d="M437 54.5H418V35.5H437V54.5Z" stroke="currentColor" />
              <path d="M456 54.5H437V35.5H456V54.5Z" stroke="currentColor" />
              <path d="M475 54.5H456V35.5H475V54.5Z" stroke="currentColor" />
              <path d="M494 54.5H475V35.5H494V54.5Z" stroke="currentColor" />
              <path d="M513 54.5H494V35.5H513V54.5Z" stroke="currentColor" />
              <path d="M532 54.5H513V35.5H532V54.5Z" stroke="currentColor" />
              <path d="M551 54.5H532V35.5H551V54.5Z" stroke="currentColor" />
              <path d="M570 54.5H551V35.5H570V54.5Z" stroke="currentColor" />
              <path d="M589 54.5H570V35.5H589V54.5Z" stroke="currentColor" />
              <path d="M608 54.5H589V35.5H608V54.5Z" stroke="currentColor" />
              <path d="M627 54.5H608V35.5H627V54.5Z" stroke="currentColor" />
              <path d="M646 54.5H627V35.5H646V54.5Z" stroke="currentColor" />
              <path d="M665 54.5H646V35.5H665V54.5Z" stroke="currentColor" />
              <path d="M684 54.5H665V35.5H684V54.5Z" stroke="currentColor" />
              <path d="M703 54.5H684V35.5H703V54.5Z" stroke="currentColor" />
              <path d="M722 54.5H703V35.5H722V54.5Z" stroke="currentColor" />
              <path d="M741 54.5H722V35.5H741V54.5Z" stroke="currentColor" />
              <path d="M760 54.5H741V35.5H760V54.5Z" stroke="currentColor" />
              <path d="M779 54.5H760V35.5H779V54.5Z" stroke="currentColor" />
              <path d="M798 54.5H779V35.5H798V54.5Z" stroke="currentColor" />
              <path d="M817 54.5H798V35.5H817V54.5Z" stroke="currentColor" />
              <path d="M836 54.5H817V35.5H836V54.5Z" stroke="currentColor" />
              <path d="M855 54.5H836V35.5H855V54.5Z" stroke="currentColor" />
              <path d="M874 54.5H855V35.5H874V54.5Z" stroke="currentColor" />
              <path d="M893 54.5H874V35.5H893V54.5Z" stroke="currentColor" />
              <path d="M912 54.5H893V35.5H912V54.5Z" stroke="currentColor" />
              <path d="M931 54.5H912V35.5H931V54.5Z" stroke="currentColor" />
              <path d="M950 54.5H931V35.5H950V54.5Z" stroke="currentColor" />
              <path d="M969 54.5H950V35.5H969V54.5Z" stroke="currentColor" />
              <path d="M988 54.5H969V35.5H988V54.5Z" stroke="currentColor" />
              <path d="M1007 54.5H988V35.5H1007V54.5Z" stroke="currentColor" />
              <path d="M1026 54.5H1007V35.5H1026V54.5Z" stroke="currentColor" />
              <path d="M1045 54.5H1026V35.5H1045V54.5Z" stroke="currentColor" />
              <path d="M114 73.5H95V54.5H114V73.5Z" stroke="currentColor" />
              <path d="M133 73.5H114V54.5H133V73.5Z" stroke="currentColor" />
              <path d="M152 73.5H133V54.5H152V73.5Z" stroke="currentColor" />
              <path d="M171 73.5H152V54.5H171V73.5Z" stroke="currentColor" />
              <path d="M190 73.5H171V54.5H190V73.5Z" stroke="currentColor" />
              <path d="M209 73.5H190V54.5H209V73.5Z" stroke="currentColor" />
              <path d="M228 73.5H209V54.5H228V73.5Z" stroke="currentColor" />
              <path d="M247 73.5H228V54.5H247V73.5Z" stroke="currentColor" />
              <path d="M266 73.5H247V54.5H266V73.5Z" stroke="currentColor" />
              <path d="M285 73.5H266V54.5H285V73.5Z" stroke="currentColor" />
              <path d="M304 73.5H285V54.5H304V73.5Z" stroke="currentColor" />
              <path d="M323 73.5H304V54.5H323V73.5Z" stroke="currentColor" />
              <path d="M342 73.5H323V54.5H342V73.5Z" stroke="currentColor" />
              <path d="M361 73.5H342V54.5H361V73.5Z" stroke="currentColor" />
              <path d="M380 73.5H361V54.5H380V73.5Z" stroke="currentColor" />
              <path d="M399 73.5H380V54.5H399V73.5Z" stroke="currentColor" />
              <path d="M418 73.5H399V54.5H418V73.5Z" stroke="currentColor" />
              <path d="M437 73.5H418V54.5H437V73.5Z" stroke="currentColor" />
              <path d="M456 73.5H437V54.5H456V73.5Z" stroke="currentColor" />
              <path d="M475 73.5H456V54.5H475V73.5Z" stroke="currentColor" />
              <path d="M494 73.5H475V54.5H494V73.5Z" stroke="currentColor" />
              <path d="M513 73.5H494V54.5H513V73.5Z" stroke="currentColor" />
              <path d="M532 73.5H513V54.5H532V73.5Z" stroke="currentColor" />
              <path d="M551 73.5H532V54.5H551V73.5Z" stroke="currentColor" />
              <path d="M570 73.5H551V54.5H570V73.5Z" stroke="currentColor" />
              <path d="M589 73.5H570V54.5H589V73.5Z" stroke="currentColor" />
              <path d="M608 73.5H589V54.5H608V73.5Z" stroke="currentColor" />
              <path d="M627 73.5H608V54.5H627V73.5Z" stroke="currentColor" />
              <path d="M646 73.5H627V54.5H646V73.5Z" stroke="currentColor" />
              <path d="M665 73.5H646V54.5H665V73.5Z" stroke="currentColor" />
              <path d="M684 73.5H665V54.5H684V73.5Z" stroke="currentColor" />
              <path d="M703 73.5H684V54.5H703V73.5Z" stroke="currentColor" />
              <path d="M722 73.5H703V54.5H722V73.5Z" stroke="currentColor" />
              <path d="M741 73.5H722V54.5H741V73.5Z" stroke="currentColor" />
              <path d="M760 73.5H741V54.5H760V73.5Z" stroke="currentColor" />
              <path d="M779 73.5H760V54.5H779V73.5Z" stroke="currentColor" />
              <path d="M798 73.5H779V54.5H798V73.5Z" stroke="currentColor" />
              <path d="M817 73.5H798V54.5H817V73.5Z" stroke="currentColor" />
              <path d="M836 73.5H817V54.5H836V73.5Z" stroke="currentColor" />
              <path d="M855 73.5H836V54.5H855V73.5Z" stroke="currentColor" />
              <path d="M874 73.5H855V54.5H874V73.5Z" stroke="currentColor" />
              <path d="M893 73.5H874V54.5H893V73.5Z" stroke="currentColor" />
              <path d="M912 73.5H893V54.5H912V73.5Z" stroke="currentColor" />
              <path d="M931 73.5H912V54.5H931V73.5Z" stroke="currentColor" />
              <path d="M950 73.5H931V54.5H950V73.5Z" stroke="currentColor" />
              <path d="M969 73.5H950V54.5H969V73.5Z" stroke="currentColor" />
              <path d="M988 73.5H969V54.5H988V73.5Z" stroke="currentColor" />
              <path d="M1007 73.5H988V54.5H1007V73.5Z" stroke="currentColor" />
              <path d="M1026 73.5H1007V54.5H1026V73.5Z" stroke="currentColor" />
              <path d="M1045 73.5H1026V54.5H1045V73.5Z" stroke="currentColor" />
              <path d="M114 92.5H95V73.5H114V92.5Z" stroke="currentColor" />
              <path d="M133 92.5H114V73.5H133V92.5Z" stroke="currentColor" />
              <path d="M152 92.5H133V73.5H152V92.5Z" stroke="currentColor" />
              <path d="M171 92.5H152V73.5H171V92.5Z" stroke="currentColor" />
              <path d="M190 92.5H171V73.5H190V92.5Z" stroke="currentColor" />
              <path d="M209 92.5H190V73.5H209V92.5Z" stroke="currentColor" />
              <path d="M228 92.5H209V73.5H228V92.5Z" stroke="currentColor" />
              <path d="M247 92.5H228V73.5H247V92.5Z" stroke="currentColor" />
              <path d="M266 92.5H247V73.5H266V92.5Z" stroke="currentColor" />
              <path d="M285 92.5H266V73.5H285V92.5Z" stroke="currentColor" />
              <path d="M304 92.5H285V73.5H304V92.5Z" stroke="currentColor" />
              <path d="M323 92.5H304V73.5H323V92.5Z" stroke="currentColor" />
              <path d="M342 92.5H323V73.5H342V92.5Z" stroke="currentColor" />
              <path d="M361 92.5H342V73.5H361V92.5Z" stroke="currentColor" />
              <path d="M380 92.5H361V73.5H380V92.5Z" stroke="currentColor" />
              <path d="M399 92.5H380V73.5H399V92.5Z" stroke="currentColor" />
              <path d="M418 92.5H399V73.5H418V92.5Z" stroke="currentColor" />
              <path d="M437 92.5H418V73.5H437V92.5Z" stroke="currentColor" />
              <path d="M456 92.5H437V73.5H456V92.5Z" stroke="currentColor" />
              <path d="M475 92.5H456V73.5H475V92.5Z" stroke="currentColor" />
              <path d="M494 92.5H475V73.5H494V92.5Z" stroke="currentColor" />
              <path d="M513 92.5H494V73.5H513V92.5Z" stroke="currentColor" />
              <path d="M532 92.5H513V73.5H532V92.5Z" stroke="currentColor" />
              <path d="M551 92.5H532V73.5H551V92.5Z" stroke="currentColor" />
              <path d="M570 92.5H551V73.5H570V92.5Z" stroke="currentColor" />
              <path d="M589 92.5H570V73.5H589V92.5Z" stroke="currentColor" />
              <path d="M608 92.5H589V73.5H608V92.5Z" stroke="currentColor" />
              <path d="M627 92.5H608V73.5H627V92.5Z" stroke="currentColor" />
              <path d="M646 92.5H627V73.5H646V92.5Z" stroke="currentColor" />
              <path d="M665 92.5H646V73.5H665V92.5Z" stroke="currentColor" />
              <path d="M684 92.5H665V73.5H684V92.5Z" stroke="currentColor" />
              <path d="M703 92.5H684V73.5H703V92.5Z" stroke="currentColor" />
              <path d="M722 92.5H703V73.5H722V92.5Z" stroke="currentColor" />
              <path d="M741 92.5H722V73.5H741V92.5Z" stroke="currentColor" />
              <path d="M760 92.5H741V73.5H760V92.5Z" stroke="currentColor" />
              <path d="M779 92.5H760V73.5H779V92.5Z" stroke="currentColor" />
              <path d="M798 92.5H779V73.5H798V92.5Z" stroke="currentColor" />
              <path d="M817 92.5H798V73.5H817V92.5Z" stroke="currentColor" />
              <path d="M836 92.5H817V73.5H836V92.5Z" stroke="currentColor" />
              <path d="M855 92.5H836V73.5H855V92.5Z" stroke="currentColor" />
              <path d="M874 92.5H855V73.5H874V92.5Z" stroke="currentColor" />
              <path d="M893 92.5H874V73.5H893V92.5Z" stroke="currentColor" />
              <path d="M912 92.5H893V73.5H912V92.5Z" stroke="currentColor" />
              <path d="M931 92.5H912V73.5H931V92.5Z" stroke="currentColor" />
              <path d="M950 92.5H931V73.5H950V92.5Z" stroke="currentColor" />
              <path d="M969 92.5H950V73.5H969V92.5Z" stroke="currentColor" />
              <path d="M988 92.5H969V73.5H988V92.5Z" stroke="currentColor" />
              <path d="M1007 92.5H988V73.5H1007V92.5Z" stroke="currentColor" />
              <path d="M1026 92.5H1007V73.5H1026V92.5Z" stroke="currentColor" />
              <path d="M1045 92.5H1026V73.5H1045V92.5Z" stroke="currentColor" />
              <path d="M114 111.5H95V92.5H114V111.5Z" stroke="currentColor" />
              <path d="M133 111.5H114V92.5H133V111.5Z" stroke="currentColor" />
              <path d="M152 111.5H133V92.5H152V111.5Z" stroke="currentColor" />
              <path d="M171 111.5H152V92.5H171V111.5Z" stroke="currentColor" />
              <path d="M190 111.5H171V92.5H190V111.5Z" stroke="currentColor" />
              <path d="M209 111.5H190V92.5H209V111.5Z" stroke="currentColor" />
              <path d="M228 111.5H209V92.5H228V111.5Z" stroke="currentColor" />
              <path d="M247 111.5H228V92.5H247V111.5Z" stroke="currentColor" />
              <path d="M266 111.5H247V92.5H266V111.5Z" stroke="currentColor" />
              <path d="M285 111.5H266V92.5H285V111.5Z" stroke="currentColor" />
              <path d="M304 111.5H285V92.5H304V111.5Z" stroke="currentColor" />
              <path d="M323 111.5H304V92.5H323V111.5Z" stroke="currentColor" />
              <path d="M342 111.5H323V92.5H342V111.5Z" stroke="currentColor" />
              <path d="M361 111.5H342V92.5H361V111.5Z" stroke="currentColor" />
              <path d="M380 111.5H361V92.5H380V111.5Z" stroke="currentColor" />
              <path d="M399 111.5H380V92.5H399V111.5Z" stroke="currentColor" />
              <path d="M418 111.5H399V92.5H418V111.5Z" stroke="currentColor" />
              <path d="M437 111.5H418V92.5H437V111.5Z" stroke="currentColor" />
              <path d="M456 111.5H437V92.5H456V111.5Z" stroke="currentColor" />
              <path d="M475 111.5H456V92.5H475V111.5Z" stroke="currentColor" />
              <path d="M494 111.5H475V92.5H494V111.5Z" stroke="currentColor" />
              <path d="M513 111.5H494V92.5H513V111.5Z" stroke="currentColor" />
              <path d="M532 111.5H513V92.5H532V111.5Z" stroke="currentColor" />
              <path d="M551 111.5H532V92.5H551V111.5Z" stroke="currentColor" />
              <path d="M570 111.5H551V92.5H570V111.5Z" stroke="currentColor" />
              <path d="M589 111.5H570V92.5H589V111.5Z" stroke="currentColor" />
              <path d="M608 111.5H589V92.5H608V111.5Z" stroke="currentColor" />
              <path d="M627 111.5H608V92.5H627V111.5Z" stroke="currentColor" />
              <path d="M646 111.5H627V92.5H646V111.5Z" stroke="currentColor" />
              <path d="M665 111.5H646V92.5H665V111.5Z" stroke="currentColor" />
              <path d="M684 111.5H665V92.5H684V111.5Z" stroke="currentColor" />
              <path d="M703 111.5H684V92.5H703V111.5Z" stroke="currentColor" />
              <path d="M722 111.5H703V92.5H722V111.5Z" stroke="currentColor" />
              <path d="M741 111.5H722V92.5H741V111.5Z" stroke="currentColor" />
              <path d="M760 111.5H741V92.5H760V111.5Z" stroke="currentColor" />
              <path d="M779 111.5H760V92.5H779V111.5Z" stroke="currentColor" />
              <path d="M798 111.5H779V92.5H798V111.5Z" stroke="currentColor" />
              <path d="M817 111.5H798V92.5H817V111.5Z" stroke="currentColor" />
              <path d="M836 111.5H817V92.5H836V111.5Z" stroke="currentColor" />
              <path d="M855 111.5H836V92.5H855V111.5Z" stroke="currentColor" />
              <path d="M874 111.5H855V92.5H874V111.5Z" stroke="currentColor" />
              <path d="M893 111.5H874V92.5H893V111.5Z" stroke="currentColor" />
              <path d="M912 111.5H893V92.5H912V111.5Z" stroke="currentColor" />
              <path d="M931 111.5H912V92.5H931V111.5Z" stroke="currentColor" />
              <path d="M950 111.5H931V92.5H950V111.5Z" stroke="currentColor" />
              <path d="M969 111.5H950V92.5H969V111.5Z" stroke="currentColor" />
              <path d="M988 111.5H969V92.5H988V111.5Z" stroke="currentColor" />
              <path
                d="M1007 111.5H988V92.5H1007V111.5Z"
                stroke="currentColor"
              />
              <path
                d="M1026 111.5H1007V92.5H1026V111.5Z"
                stroke="currentColor"
              />
              <path
                d="M1045 111.5H1026V92.5H1045V111.5Z"
                stroke="currentColor"
              />
              <path d="M114 130.5H95V111.5H114V130.5Z" stroke="currentColor" />
              <path d="M133 130.5H114V111.5H133V130.5Z" stroke="currentColor" />
              <path d="M152 130.5H133V111.5H152V130.5Z" stroke="currentColor" />
              <path d="M171 130.5H152V111.5H171V130.5Z" stroke="currentColor" />
              <path d="M190 130.5H171V111.5H190V130.5Z" stroke="currentColor" />
              <path d="M209 130.5H190V111.5H209V130.5Z" stroke="currentColor" />
              <path d="M228 130.5H209V111.5H228V130.5Z" stroke="currentColor" />
              <path d="M247 130.5H228V111.5H247V130.5Z" stroke="currentColor" />
              <path d="M266 130.5H247V111.5H266V130.5Z" stroke="currentColor" />
              <path d="M285 130.5H266V111.5H285V130.5Z" stroke="currentColor" />
              <path d="M304 130.5H285V111.5H304V130.5Z" stroke="currentColor" />
              <path d="M323 130.5H304V111.5H323V130.5Z" stroke="currentColor" />
              <path d="M342 130.5H323V111.5H342V130.5Z" stroke="currentColor" />
              <path d="M361 130.5H342V111.5H361V130.5Z" stroke="currentColor" />
              <path d="M380 130.5H361V111.5H380V130.5Z" stroke="currentColor" />
              <path d="M399 130.5H380V111.5H399V130.5Z" stroke="currentColor" />
              <path d="M418 130.5H399V111.5H418V130.5Z" stroke="currentColor" />
              <path d="M437 130.5H418V111.5H437V130.5Z" stroke="currentColor" />
              <path d="M456 130.5H437V111.5H456V130.5Z" stroke="currentColor" />
              <path d="M475 130.5H456V111.5H475V130.5Z" stroke="currentColor" />
              <path d="M494 130.5H475V111.5H494V130.5Z" stroke="currentColor" />
              <path d="M513 130.5H494V111.5H513V130.5Z" stroke="currentColor" />
              <path d="M532 130.5H513V111.5H532V130.5Z" stroke="currentColor" />
              <path d="M551 130.5H532V111.5H551V130.5Z" stroke="currentColor" />
              <path d="M570 130.5H551V111.5H570V130.5Z" stroke="currentColor" />
              <path d="M589 130.5H570V111.5H589V130.5Z" stroke="currentColor" />
              <path d="M608 130.5H589V111.5H608V130.5Z" stroke="currentColor" />
              <path d="M627 130.5H608V111.5H627V130.5Z" stroke="currentColor" />
              <path d="M646 130.5H627V111.5H646V130.5Z" stroke="currentColor" />
              <path d="M665 130.5H646V111.5H665V130.5Z" stroke="currentColor" />
              <path d="M684 130.5H665V111.5H684V130.5Z" stroke="currentColor" />
              <path d="M703 130.5H684V111.5H703V130.5Z" stroke="currentColor" />
              <path d="M722 130.5H703V111.5H722V130.5Z" stroke="currentColor" />
              <path d="M741 130.5H722V111.5H741V130.5Z" stroke="currentColor" />
              <path d="M760 130.5H741V111.5H760V130.5Z" stroke="currentColor" />
              <path d="M779 130.5H760V111.5H779V130.5Z" stroke="currentColor" />
              <path d="M798 130.5H779V111.5H798V130.5Z" stroke="currentColor" />
              <path d="M817 130.5H798V111.5H817V130.5Z" stroke="currentColor" />
              <path d="M836 130.5H817V111.5H836V130.5Z" stroke="currentColor" />
              <path d="M855 130.5H836V111.5H855V130.5Z" stroke="currentColor" />
              <path d="M874 130.5H855V111.5H874V130.5Z" stroke="currentColor" />
              <path d="M893 130.5H874V111.5H893V130.5Z" stroke="currentColor" />
              <path d="M912 130.5H893V111.5H912V130.5Z" stroke="currentColor" />
              <path d="M931 130.5H912V111.5H931V130.5Z" stroke="currentColor" />
              <path d="M950 130.5H931V111.5H950V130.5Z" stroke="currentColor" />
              <path d="M969 130.5H950V111.5H969V130.5Z" stroke="currentColor" />
              <path d="M988 130.5H969V111.5H988V130.5Z" stroke="currentColor" />
              <path
                d="M1007 130.5H988V111.5H1007V130.5Z"
                stroke="currentColor"
              />
              <path
                d="M1026 130.5H1007V111.5H1026V130.5Z"
                stroke="currentColor"
              />
              <path
                d="M1045 130.5H1026V111.5H1045V130.5Z"
                stroke="currentColor"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_34073_49244">
              <rect width="1140" height="140" fill="currentColor" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </Card>
  );
}
