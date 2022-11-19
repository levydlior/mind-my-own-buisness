import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReceiptCard from "./ReceiptCard";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardCollapse({ receipt, onReceiptDelete }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 1500, borerBottom: "1px" }}>
      {!receipt ? (
        <h2>Loading!</h2>
      ) : (
        <>
          <CardContent>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions disableSpacing>
            <div>
              <h2>{receipt.name}</h2>
              <h5 style={{ color: "gray" }}>${receipt.amount}</h5>
            </div>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <ReceiptCard
                  receipt={receipt}
                  onReceiptDelete={onReceiptDelete}
                />
              </Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
}
