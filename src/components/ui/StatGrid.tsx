import React from "react";
import { Grid } from "@mui/material";
import StatCard from "./StatCard";

export interface StatGridItem {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: number[];
}

export interface StatGridProps {
  items: StatGridItem[];
  spacing?: number;
  gridSizes?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const StatGrid: React.FC<StatGridProps> = ({
  items,
  spacing = 3,
  gridSizes = { xs: 12, sm: 6, lg: 3 },
}) => {
  return (
    <Grid container spacing={spacing}>
      {items.map((item, index) => (
        <Grid size={gridSizes} key={index}>
          <StatCard
            title={item.title}
            value={item.value}
            interval={item.interval}
            trend={item.trend}
            data={item.data}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatGrid;
