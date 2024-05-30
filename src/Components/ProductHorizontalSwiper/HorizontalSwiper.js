import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from "react-redux";

const HorizontalSwiper = (props) => {
  const drinks = useSelector((state) => state.productsFetchSlice.drinks.data);
  return (
    <Grid
      item
      xs={8}
      md={8}
      sx={{
        display: "flex",
        flexGrow: "1",
        overflow: "hidden",
        // border: "1px solid red",
        px: "32px",
        py: "16px",
        width: "90%",
        margin: "0 auto",
        mb: "32px",
      }}
    >
      <Swiper
        slidesPerView={3}
        spaceBetween={16}
        grabCursor={true}
        s
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
          }}
        >
          {drinks?.map((drink) => (
            <SwiperSlide>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  backgroundImage: `url(${drink.background})`,

                  //   backgroundImage: `url(${localData.background})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
                  backgroundPosition: "center",

                  // py: !isComment ? "8px" : "0",
                  borderRadius: "32px",

                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  color: "#fff",
                }}
              >
                <Typography>{drink.name}</Typography>
              </Box>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            1{/* <ProductMainQuest key={product.id} product={product} /> */}
          {/* </SwiperSlide> */}
        </Box>
      </Swiper>
    </Grid>
  );
};

HorizontalSwiper.propTypes = {};

export default HorizontalSwiper;
