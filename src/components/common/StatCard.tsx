import {
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";


import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
}

const StatCard = ({
  title,
  value,
  icon,
}: Props) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
          alignItems: "center",
        }}
        >
          <div>
            <Typography
              sx={{
                variant:"body2",
                color:"text.secondary"
              }}

            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              {value}
            </Typography>
          </div>

          {icon}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;