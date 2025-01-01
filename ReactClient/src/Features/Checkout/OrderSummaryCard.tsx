import { Typography, Box, Grid } from "@mui/material";



const OrderSummaryCard = () => {


  
  return (
    
        <Box sx={{marginTop:2}}>
          {[
            { label: "Items (3):", value: "$217.98" },
            { label: "Shipping & Handling:", value: "$9.60" },
            { label: "Estimated GST/HST:", value: "$24.31" },
            { label: "Estimated PST/RST/QST:", value: "$0.00" },
            { label: "Total:", value: "$251.89" },
            { label: "Gift Certificates:", value: "-$30.00" },
            { label: "Order Total:", value: "$221.89", bold: true },
          ].map((item, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{
                marginBottom: index === 6 ? 0 : 1,
              }}
            >
              {/* Label Column */}
              <Grid item xs={8}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: item.bold ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Typography>
              </Grid>
              {/* Value Column */}
              <Grid item xs={4} textAlign="right">
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: item.bold ? "bold" : "normal",
                  }}
                >
                  {item.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
  );
};

export default OrderSummaryCard;
