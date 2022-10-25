import { Box, Skeleton } from "@chakra-ui/react";
import { BumpDatum } from "@nivo/bump";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../server/auth/AuthContext";
import RangeButtons from "./RangeButtons";
import TimeSeriesPlot from "./TimeSeriesPlot";

interface AggregatedTimeSeriesViewProps {
  series: {
    id: string;
    data: BumpDatum[];
  }[];
}

const AggregatedTimeSeriesView: React.FC<AggregatedTimeSeriesViewProps> = ({
  series,
}) => {
  const { user } = useAuth();
  const [habitHistory, setHabitHistory] = useState<BumpDatum[]>([]);
  const [range, setRange] = useState<"5d" | "10d" | "1m" | "3m" | "1y" | "all">(
    "5d"
  );
  const [showAxes, setShowAxes] = useState<boolean>(false);
  const [stonk, setStonk] = useState<number>(0);

  useEffect(() => {
    if (!series || !series.length) return;
    console.log(series);
    const data = series[0].data;
    setStonk(data[data.length - 1].y! * -1 || 0);
  }, [series]);

  return (
    <Box>
      <Box className="h-1/2">
        <p className="mb-2 text-3xl font-bold">Investing</p>
        <p className="mb-4 text-3xl font-bold">${stonk.toFixed(2)}</p>

        {series && series.length > 0 ? null : ( //<TimeSeriesPlot data={series} range={range} showAxes={showAxes} />
          <Skeleton height="300px" mt={3} my={12} rounded="2xl" />
        )}
        <RangeButtons
          range={range}
          setRange={setRange}
          showAxes={showAxes}
          setShowAxes={setShowAxes}
          habitHistory={habitHistory}
        />
      </Box>
    </Box>
  );
};

export default AggregatedTimeSeriesView;
