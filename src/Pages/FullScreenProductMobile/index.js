import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import useMobileCheck from "../../Components/MobileCheck";
import ProductHomePage from "../../Components/ProductHomePage";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import { Pagination } from "swiper/modules";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import LikeComponent from "../../Components/Likes";
import CommentsComponent from "../../Components/Comments";
import Product from "../../Components/Product";
import GipoBanner from "../../Components/Banners/GipoBanner";
import swiperIndex, { setSwiperIndex } from "../../Redux/slices/swiperIndex";
import ProductInSwiper from "../../Components/ProductInSwiper";

const ProductSwiper = () => {
  const isMobile = useMobileCheck();
  const restaurantData = useSelector((state) => state.restaurantDataFromMain);
  const navigate = useNavigate();
  const id = useParams();
  console.log("restaurantData from swiper", restaurantData);

  const foodId = id.id;

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);
  //   const restaurantData = useSelector((state) => state.oneRestaurantData);
  const handleCheck = () => {
    setIsChecked((open) => !open);
    setSettingsOn((open) => !open);
  };

  const handleComment = () => {
    setIsComment((open) => !open);
  };
  const [isHovered, setHovered] = useState(false);

  const goTo = (id) => {
    navigate(`/${id}`);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex); // Verwende `realIndex`, um den tatsächlichen Index des Swiperslides zu erhalten
  };

  console.log("swiperIndex", currentIndex);

  useEffect(() => {
    dispatch(setSwiperIndex(currentIndex));
  }, [currentIndex, dispatch]);

  return (
    <Swiper
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
      onSlideChange={handleSlideChange}

      //   initialSlide={selectedIndex}
    >
      <SwiperSlide>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            border: "1px solid black",
            height: "100%",
          }}
        >
          <GipoBanner />
        </Box>
      </SwiperSlide>
      {restaurantData?.map((restaurant) =>
        restaurant.menus.food.map((menu) =>
          menu.products.map((product) => (
            <SwiperSlide key={product.id}>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: "1",
                  border: "1px solid black",
                  height: "100%",
                }}
              >
                <ProductInSwiper product={product} />
              </Box>
            </SwiperSlide>
          ))
        )
      )}
    </Swiper>
  );
};

export default ProductSwiper;
{
  /* <Box
                // onClick={() => onClickProduct(product)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // flexGrow: 1,
                  backgroundImage: `url(${product.product.background})`,

                  //   backgroundImage: `url(${localData.background})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
                  backgroundPosition: "center",

                  // py: !isComment ? "8px" : "0",
                  borderRadius: "32px",
                  boxShadow: !isHovered
                    ? "0px 0px 25px 0px #000 inset"
                    : "0px 0px 200px 0px #000 inset",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  flexGrow: "1",
                }}
              >
                {/* {foodId === product.product.id && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "1000",
            background: "#936FF9",
            opacity: "0.6",
          }}
        ></Box>
      )} */
}
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         flexGrow: "1",
//         // border: "1px solid red",
//       }}
//     >
//       {!isChecked && !isComment && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             px: "16px",
//             transition: "150ms",
//             position: "relative",
//             top: !isHovered ? "-100px" : "8px",
//             visibility: isHovered ? "visible" : "hidden",
//             position: "relative",
//             zIndex: "1",
//             flexDirection: "column",
//             textAlign: "end",
//             // border: "1px solid red",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexGrow: "1",
//               alignItems: "center",
//               gap: "8px",
//               px: "16px",
//               py: "4px",
//               justifyContent: "center",
//               position: "relative",
//               zIndex: "1500",
//               // border: "1px solid red",
//               "&&:hover": {
//                 borderRadius: "32px",
//                 background: "rgba(225,225,225,0.3)",
//               },
//             }}
//           >
//             {/* <Avatar
//     onClick={() => goTo(product.product.restaurantsId)}
//     src={restaurantData.restaurantData.logo}
//     sx={{
//       width: "24px",
//       height: "24px",
//     }}
//   />
//   <Typography
//     sx={{
//       color: "#fff",
//       fontFamily: "Noto Sans",
//       fontWeight: "400",
//       fontSize: "12px",
//     }}
//   >
//     {restaurantData.restaurantData.name}
//   </Typography> */}
//           </Box>
//           <Typography
//             sx={{
//               color: "#fff",
//               fontFamily: "Noto Sans",
//               fontWeight: "400",
//               fontSize: "16px",
//             }}
//           >
//             {product.product.name}
//           </Typography>
//         </Box>
//       )}
//       {!isChecked && !isComment && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             px: "16px",
//             transition: "150ms",
//             position: "relative",
//             top: !isHovered ? "-36px" : "8px",
//             visibility: isHovered ? "visible" : "hidden",
//             position: "relative",
//             zIndex: "1",
//             // border: "1px solid red",
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#fff",
//               fontFamily: "Noto Sans",
//               fontWeight: "300",
//               fontSize: "16px",
//             }}
//           >
//             {product.product.price}$
//           </Typography>
//         </Box>
//       )}
//       {!isChecked && !isComment && (
//         <Box
//           sx={{
//             display: "flex",
//             flexGrow: 1,
//             // border: "1px solid red",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexGrow: 1,
//               // border: "1px solid blue",
//               flexDirection: "column",
//             }}
//           >
//             <Box
//               className="description"
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 // border: "1px solid red",
//                 px: "8px",
//                 overflow: "auto",
//                 position: "relative",
//                 zIndex: "1",
//                 justifyContent: "flex-start",
//                 alignItems: "flex-start",
//               }}
//             >
//               {/* {isHovered && !isComment && (
//       <Typography
//         sx={{
//           fontFamily: "Noto Sans",
//           color: "#fff",
//           fontSize: "12px",
//           fontWeight: "400",
//         }}
//       >
//         {product.product.description}
//       </Typography>
//     )} */}
//             </Box>

//             <Box sx={{ flexGrow: "1" }}></Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 mt: "8px",
//                 ml: "8px",
//                 gap: "4px",
//                 maxWidth: "100%",
//                 flexWrap: "wrap",
//                 mb: "16px",
//                 // border: "1px solid red",
//                 transition: "150ms",
//                 position: "relative",
//                 bottom: !isHovered ? "-30px" : "0",
//                 visibility: isHovered ? "visible" : "hidden",
//                 position: "relative",
//                 zIndex: "1",
//                 flexDirection: "column",
//               }}
//             >
//               {isHovered && !isComment && (
//                 <Typography
//                   sx={{
//                     fontFamily: "Noto Sans",
//                     color: "#fff",
//                     fontSize: "14px",
//                     fontWeight: "400",
//                   }}
//                 >
//                   {product.product.description}
//                 </Typography>
//               )}
//               {!isChecked &&
//                 !isComment &&
//                 product.product.items && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexGrow: "1",
//                       flexWrap: "wrap",
//                       gap: "4px",
//                     }}
//                   >
//                     {Object.values(product.product.items).map(
//                       (item) => (
//                         <Box sx={{ display: "flex" }}>
//                           <Box
//                             sx={{
//                               background: "#fff",
//                               px: "4px",
//                               py: "2px",
//                               borderRadius: "32px",
//                             }}
//                           >
//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontFamily: "Noto Sans",
//                               }}
//                             >
//                               {item}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       )
//                     )}
//                   </Box>
//                 )}
//             </Box>
//           </Box>
//           {!isComment && (
//             <Box
//               sx={{
//                 display: "flex",
//                 my: "16px",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 transition: "150ms",
//                 position: "relative",
//                 right: !isHovered ? "-30px" : "4px",
//                 visibility: isHovered ? "visible" : "hidden",
//                 zIndex: "1",
//                 // border: "1px solid red",
//               }}
//             >
//               <Box
//                 sx={{
//                   // border: "1px solid red",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   gap: "8px",
//                 }}
//               >
//                 <a
//                   data-tooltip-id="my-tooltip"
//                   data-tooltip-content={
//                     restaurantData.restaurantData.name
//                   }
//                 >
//                   <Avatar
//                     onClick={() =>
//                       goTo(product.product.restaurantsId)
//                     }
//                     src={restaurantData.restaurantData.logo}
//                     sx={{
//                       width: "24px",
//                       height: "24px",
//                       transition: "150ms",
//                       "&&:hover": {
//                         outline: "2px solid #fff",
//                       },
//                     }}
//                   />
//                 </a>
//                 <Tooltip
//                   id="my-tooltip"
//                   style={{
//                     // backgroundColor: "rgb(0, 255, 30)",
//                     color: "#fff",
//                     background: "rgba(0, 0, 0, 0.8)",
//                     backdropFilter: "blur(3.5px)",
//                   }}
//                 />

//                 <LikeComponent product={product} />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     flexDirection: "column",
//                     // border: "1px solid green",
//                   }}
//                 >
//                   <IconButton
//                     onClick={handleComment}
//                     sx={{
//                       // border: "1px solid red",
//                       width: "24px",
//                       height: "24px",
//                     }}
//                   >
//                     <img
//                       src={Comment}
//                       alt=""
//                       style={{ width: "16px", height: "16px" }}
//                     />
//                   </IconButton>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       color: "#fff",
//                       display: "flex",
//                       justifyContent: "center",
//                       fontFamily: "Noto Sans",
//                       fontWeight: "300",
//                     }}
//                   >
//                     123
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     flexDirection: "column",
//                     // border: "1px solid green",
//                   }}
//                 >
//                   <IconButton
//                     sx={{
//                       // border: "1px solid red",
//                       width: "24px",
//                       height: "24px",
//                       // border: "1px solid red",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         // border: "1px solid red",
//                         display: "flex",
//                       }}
//                     >
//                       <svg
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
//                           fill="white"
//                           stroke="white"
//                           stroke-width="1.5"
//                         />
//                         <path
//                           d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
//                           fill="white"
//                           stroke="white"
//                           stroke-width="1.5"
//                         />
//                         <path
//                           d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
//                           fill="white"
//                           stroke="white"
//                           stroke-width="1.5"
//                         />
//                       </svg>
//                     </Box>
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       )}
//       {isComment && (
//         <CommentsComponent
//           product={product}
//           handleComment={handleComment}
//         />
//       )}
//     </Box>
//     {!isChecked && !isComment && (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           transition: "150ms",
//           position: "relative",
//           bottom: !isHovered ? "-50px" : "0",
//           visibility: isHovered ? "visible" : "hidden",
//           zIndex: "1",
//           mb: "8px",
//           // border: "1px solid blue",
//           px: "16px",
//         }}
//       >
//         <Button
//           fullWidth
//           sx={{
//             // background: "#929292",
//             color: "#fff",
//             background: "rgba(225, 225, 225, 0.1)",
//             backdropFilter: "blur(3.5px)",
//             borderRadius: "32px",
//             // border: "1px solid red",
//             "&:hover": {
//               background: "rgba(225, 225, 225, 0.3)",
//               color: "#fff",
//             },
//           }}
//         >
//           <Typography
//             sx={{
//               fontFamily: "Quicksand",
//               fontWeight: "400",
//             }}
//           >
//             MENU
//           </Typography>
//         </Button>
//       </Box>
//     )}
//   </Box>
