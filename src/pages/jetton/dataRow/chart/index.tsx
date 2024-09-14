import { Box } from "@mui/material";
import { useRef, useMemo, useEffect, useState } from "react";
import {
  createChart,
  UTCTimestamp,
  CrosshairMode,
  LineStyle,
  isBusinessDay,
  BusinessDay,
  TickMarkType,
  PriceLineSource,
} from "lightweight-charts";
import { StyledBlock } from "pages/jetton/styled";
import useJettonStore from "store/jetton-store/useJettonStore";
import { DECIMAL_SCALER } from "consts";

export const Chart = () => {
  const { getJettonPrice, jettonPriceList, decimals } = useJettonStore();
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  function formatTime(utcTimestamp: UTCTimestamp): string {
    const dt = new Date(utcTimestamp * 1000);
    const hour = dt.getUTCHours() < 10 ? `0${dt.getUTCHours()}` : dt.getUTCHours().toString();
    const minute =
      dt.getUTCMinutes() < 10 ? `0${dt.getUTCMinutes()}` : dt.getUTCMinutes().toString();

    return `${hour}:${minute}`;
  }

  const chart = useMemo(() => {
    if (containerRef.current && jettonPriceList && jettonPriceList.length > 1) {
      const chartOptions: any = {
        layout: { textColor: "white", background: { type: "solid", color: "#1E1E1E" } },
        timeScale: {
          tickMarkFormatter: (
            time: UTCTimestamp | BusinessDay,
            tickMarkType: TickMarkType,
            locale: string,
          ) => {
            if (isBusinessDay(time)) {
              return "";
            } else {
              return formatTime(time);
            }
          },
        },
        localization: {
          timeFormatter: (time: BusinessDay | UTCTimestamp) => {
            if (isBusinessDay(time)) {
              return "";
            } else {
              return formatTime(time);
            }
          },
        },
      };
      return createChart(containerRef.current, chartOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jettonPriceList, containerRef.current]);

  let candlestickSeries = useMemo(() => {
    if (chart) {
      return chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
    }
  }, [chart]);

  let lineLeft = useMemo(() => {
    if (chart) {
      return chart.addLineSeries({
        priceScaleId: "left",
        color: "#71649C", // Red Transparent
        lineStyle: LineStyle.Solid,
        lineWidth: 1,
        priceLineSource: PriceLineSource.LastVisible,
      });
    }
  }, [chart]);

  useEffect(() => {
    getJettonPrice(50);

    const interval = setInterval(() => {
      getJettonPrice(1);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [getJettonPrice]);

  useEffect(() => {
    if (chart && jettonPriceList && candlestickSeries) {
      if (jettonPriceList.length > 1) {
        const priceList = [...jettonPriceList]
          .filter((item, i) => {
            const nextItem = jettonPriceList[i + 1];
            if (nextItem) {
              return Math.floor(nextItem.timestamp / 1000) < Math.floor(item.timestamp / 1000);
            }
            return item;
          })
          .sort((a, b) => b.timestamp - a.timestamp)
          .reverse();

        const candlestickData = priceList.map((data) => ({
          time: Math.floor(data.timestamp / 1000) as UTCTimestamp,
          open: Number(data.price),
          high: Number(data.price),
          low: Number(data.price),
          close: Number(data.price),
        }));
        candlestickSeries.setData(candlestickData);

        candlestickSeries.priceScale().applyOptions({
          autoScale: false, // disables auto scaling based on visible content
          scaleMargins: {
            top: 0.5,
            bottom: 0.2,
          },
        });

        // Convert the candlestick data for use with a line series
        const lineData = candlestickData.map((data) => ({
          time: data.time,
          value: (data.close + data.open) / 2,
        }));

        const areaSeries = chart.addAreaSeries({
          lastValueVisible: false, // hide the last value marker for this series
          crosshairMarkerVisible: false, // hide the crosshair marker for this series
          lineColor: "transparent", // hide the line
          topColor: "rgba(56, 33, 110,0.6)",
          bottomColor: "rgba(56, 33, 110, 0.1)",
        });
        // Set the data for the Area Series
        areaSeries.setData(lineData);

        chart.applyOptions({
          crosshair: {
            // Change mode from default 'magnet' to 'normal'.
            // Allows the crosshair to move freely without snapping to datapoints
            mode: CrosshairMode.Normal,

            // Vertical crosshair line (showing Date in Label)
            vertLine: {
              width: 4,
              color: "#C3BCDB44",
              style: LineStyle.Solid,
              labelBackgroundColor: "#9B7DFF",
            },

            // Horizontal crosshair line (showing Price in Label)
            horzLine: {
              color: "#9B7DFF",
              labelBackgroundColor: "#9B7DFF",
            },
          },
        });
        chart.timeScale().applyOptions({
          borderColor: "#71649C",
          // barSpacing: 10,
        });
        chart.timeScale().fitContent();
      } else if (jettonPriceList.length === 1) {
        const newCandle = jettonPriceList.map((data) => ({
          time: Math.floor(data.timestamp / 1000) as UTCTimestamp,
          open: data.price / DECIMAL_SCALER,
          high: data.price / DECIMAL_SCALER,
          low: data.price / DECIMAL_SCALER,
          close: data.price / DECIMAL_SCALER,
        }))[0];

        candlestickSeries.update(newCandle);
      }
    }
  }, [chart, candlestickSeries, jettonPriceList, decimals, lineLeft]);

  useEffect(() => {
    if (visible === false && jettonPriceList?.some((j) => j.price > 0)) {
      setVisible(true);
    } else if (visible === true && jettonPriceList?.every((j) => j.price <= 0)) {
      setVisible(false);
    }
  }, [visible, jettonPriceList]);

  if (!visible) {
    return <></>;
  }

  return (
    <StyledBlock
      height="320px"
      style={{
        padding: "10px 0 0 10px",
      }}>
      <Box width="100%" height="320px" ref={containerRef} />
    </StyledBlock>
  );
};
