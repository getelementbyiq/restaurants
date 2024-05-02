import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import MainFilter from '../../MainFilter';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../Auth/Auth';
import useMobileCheck from '../../MobileCheck';
import { useDispatch, useSelector } from 'react-redux';
import { filterBy } from '../../../app/features/ProductsSlice';

const Secondheader = (props) => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => {
    // take menu only if it exist
    const restaurantData = state.restaurantDataFromMain;
    if (restaurantData && restaurantData.length > 0) {
      return restaurantData[0].menus;
    }
    return [];
  });

  const { user, logout } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const isMobile = useMobileCheck();
  const [searchByName, setSearchByName] = useState(null); // search food state

  // searching handles
  const handleSearchFood = (value) => {
    setSearchByName(value);
  };
  const handleSearchSubmit = () => {
    let dependencyObj = {
      menus,
      searchDependencies: {
        searchByName,
      },
    };
    console.warn(menus);
    dispatch(filterBy(dependencyObj));
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const goTo = (txt) => {
    navigate(`${txt}`);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '0',
        zIndex: '2600',
        width: '100%',
        justifyContent: 'center',
      }}>
      <Grid
        container
        sx={{
          display: 'flex',
          // border: "1px solid red",
          py: '8px',
          px: '24px',
          justifyContent: 'space-between',

          backgroundColor: isMobile ? 'transparent' : '#fff',
          transition: '200ms',
          height: isFocused ? '120px' : '60px',
        }}>
        <Grid
          item
          xs={4}
          md={4}
          lg={4}
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            // border: "1px solid red",
          }}>
          <Box
            onClick={() => goTo('/')}
            sx={{
              cursor: 'pointer',
              '&&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            // sx={{ border: "1px solid red" }}
          >
            <svg
              width="73"
              height="45"
              viewBox="0 0 73 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M61.1939 22.1285C61.6118 21.8299 62.1293 21.7603 62.7463 21.9195C62.8657 21.9394 62.9852 21.9493 63.1046 21.9493C63.5424 21.0537 64.2988 20.586 65.3735 20.5462C65.6522 20.5263 66.0403 20.4765 66.5379 20.3969C67.0354 20.3173 67.6325 20.3372 68.3291 20.4566C69.0456 20.576 69.6726 20.785 70.21 21.0835C71.3843 21.7204 72.0908 22.636 72.3297 23.8302C72.8073 25.5816 72.7377 27.4923 72.1207 29.5623C71.4639 31.8511 70.3493 33.6822 68.777 35.0555C68.0604 35.6924 67.3041 36.0905 66.508 36.2497C65.7119 36.4288 64.9954 36.5283 64.3585 36.5483C63.7216 36.5682 63.1344 36.5682 62.597 36.5483C62.0796 36.5483 61.572 36.4985 61.0745 36.399C59.9997 36.18 59.114 35.6725 58.4174 34.8764C57.6014 33.9808 57.2531 32.5875 57.3725 30.6967C57.4521 29.0249 57.8701 27.3431 58.6264 25.6513C59.4026 23.9396 60.2584 22.7654 61.1939 22.1285ZM66.4483 28.1292C65.9507 28.2885 65.483 28.3581 65.0451 28.3382C64.8262 28.5572 64.6272 28.796 64.448 29.0547C64.2888 29.2936 64.0699 29.5225 63.7912 29.7414C63.5126 29.9404 63.3733 30.02 63.3733 29.9802C63.0349 30.4579 62.7563 30.9555 62.5373 31.473C62.3184 31.9705 62.3184 32.4781 62.5373 32.9956C63.3335 33.0752 63.9206 33.0553 64.2988 32.9358C64.6769 32.8164 65.0252 32.5875 65.3437 32.2492C65.682 31.9108 65.9408 31.5128 66.1199 31.055C66.4781 30.1992 66.5876 29.2239 66.4483 28.1292Z"
                fill="black"
              />
              <path
                d="M46.6581 22.6657C47.6533 21.173 49.0365 20.2774 50.8079 19.9788C51.3851 19.8793 52.0917 19.8096 52.9276 19.7698C53.7834 19.73 54.5099 19.9191 55.107 20.3371C55.724 20.755 56.1818 21.2924 56.4803 21.9492C56.9978 23.1235 57.0774 24.5665 56.7191 26.2782C56.5201 27.2136 56.2813 28.2486 56.0026 29.383C55.724 30.4976 55.306 31.6022 54.7487 32.6969C54.1914 33.7916 53.465 34.8166 52.5693 35.7719C51.6737 36.7273 50.5094 37.4836 49.0763 38.0409C48.2205 38.3792 47.4642 38.4987 46.8074 38.3991C46.1705 38.3195 45.6928 38.1902 45.3744 38.011C45.0559 37.8319 44.837 37.5732 44.7176 37.2348C44.3195 38.3693 43.9413 39.5137 43.5831 40.6681C43.2447 41.8424 42.787 42.9569 42.2098 44.0118C41.8117 44.2706 41.3241 44.4596 40.7469 44.5791C40.1697 44.7184 39.6025 44.6885 39.0452 44.4895C38.4879 44.3104 38.0898 43.972 37.851 43.4744C37.5923 42.9968 37.4629 42.4693 37.4629 41.8921C37.4629 41.1159 37.652 40.1705 38.0301 39.0559C38.5874 37.404 39.0452 36.1302 39.4034 35.2345C39.7418 34.3389 39.9607 33.7617 40.0602 33.503C40.1598 33.2243 40.2593 32.9357 40.3588 32.6372C40.7967 31.4828 41.1151 30.5474 41.3141 29.8309C41.5331 29.0944 41.7321 28.4575 41.9112 27.9202V27.8903C42.1103 27.0146 42.4188 26.0891 42.8367 25.1138C43.2746 24.1187 43.5731 23.5116 43.7324 23.2927C44.0707 22.9543 44.419 22.7454 44.7773 22.6657C45.1355 22.5861 45.5435 22.5364 46.0013 22.5165H46.0909L46.6581 22.6657ZM48.9271 27.6515C48.6882 28.0694 48.2902 28.4575 47.7329 28.8158L47.4642 29.4427C47.2652 29.9602 47.0761 30.4877 46.897 31.025C46.7178 31.5624 46.5188 32.0899 46.2999 32.6073C46.4989 32.8064 46.6482 32.9954 46.7477 33.1746C47.8623 32.1993 48.8773 30.9156 49.7929 29.3233C50.1511 28.6665 50.38 28.0097 50.4795 27.3529C50.5989 26.6961 50.6288 26.2782 50.5691 26.099C50.5094 25.9199 50.4099 25.8303 50.2705 25.8303C50.1511 25.8303 50.0217 25.8701 49.8824 25.9498C49.763 26.0095 49.6635 26.0791 49.5839 26.1587C49.5242 26.2184 49.5341 26.2184 49.6137 26.1587C49.3948 26.4175 49.2356 26.6464 49.1361 26.8454C49.0365 27.0245 48.9669 27.2932 48.9271 27.6515Z"
                fill="black"
              />
              <path
                d="M33.8114 21.9483C34.0701 21.2915 34.6871 20.8437 35.6624 20.6048C36.5779 20.366 37.4338 20.3959 38.2299 20.6944C39.0459 21.0129 39.4141 21.5303 39.3345 22.2469C39.1156 22.9435 38.8369 23.7993 38.4986 24.8144C38.1801 25.8095 37.8716 26.8345 37.5731 27.8894C36.777 30.5962 36.3192 32.5069 36.1998 33.6215C35.9012 35.4128 35.4036 36.3781 34.707 36.5174C34.508 36.5572 34.3189 36.587 34.1398 36.6069C33.7019 36.6268 33.4233 36.7463 33.3039 36.9652C33.1844 37.1841 32.9854 37.3434 32.7068 37.4429C32.4281 37.5623 32.1196 37.612 31.7813 37.5921C31.4628 37.5921 31.1344 37.5125 30.7961 37.3533C30.4577 37.214 30.1691 37.005 29.9303 36.7264C29.373 36.0497 29.2635 35.1441 29.6019 34.0096C29.9203 31.8401 30.7264 29.0836 32.0201 25.7398C32.6371 24.0879 33.2342 22.824 33.8114 21.9483ZM39.4539 17.4701C38.4787 17.6691 37.6825 17.6094 37.0656 17.291C36.4685 16.9725 36.1202 16.5944 36.0206 16.1565C35.9211 15.6987 36.0604 15.231 36.4386 14.7533C36.8765 14.1562 37.5333 13.7681 38.409 13.589C38.8071 13.5492 39.0957 13.5293 39.2748 13.5293C39.4539 13.5293 39.6729 13.5691 39.9316 13.6487C40.5884 13.7084 41.0163 13.997 41.2153 14.5145C41.494 14.9524 41.5139 15.4499 41.2751 16.0072C41.0561 16.5645 40.4491 17.0521 39.4539 17.4701Z"
                fill="black"
              />
              <path
                d="M19.0499 1.06569C23.349 0.19991 26.6927 0.737294 29.0811 2.67785C30.2155 3.60334 30.9619 4.9468 31.3201 6.70822C31.7083 8.46965 31.5142 10.4401 30.738 12.6194C30.4096 13.6345 29.8423 14.3958 29.0363 14.9033C28.2302 15.4109 27.3943 15.7094 26.5285 15.799C25.6925 15.8587 24.9313 15.7542 24.2446 15.4855C23.5579 15.1869 23.1848 14.769 23.125 14.2316L22.722 13.336C22.0055 12.2612 20.7665 12.1268 19.0051 12.9329C17.4825 13.6196 15.9599 14.8138 14.4373 16.5155C12.8252 18.3366 11.7803 19.9786 11.3026 21.4415C10.7652 23.0536 10.4965 24.1135 10.4965 24.621C10.4368 25.7555 10.8399 26.7705 11.7056 27.6662C12.9595 28.4723 14.2134 28.8454 15.4673 28.7857C16.7212 28.6962 17.8408 28.4126 18.826 27.9349C19.8112 27.4273 20.6173 26.8601 21.2442 26.2332C21.8712 25.6062 22.1846 25.1584 22.1846 24.8897C22.2742 24.7106 22.3638 24.5314 22.4533 24.3523C22.5429 24.1732 22.6175 23.9941 22.6772 23.8149C22.5578 23.8149 22.5877 23.8149 22.7668 23.8149C22.9459 23.7851 22.9907 23.7851 22.9011 23.8149C22.8116 23.8149 22.8564 23.8299 23.0355 23.8597L23.3042 23.9493C21.8413 25.2629 20.4232 25.5316 19.0499 24.7554C18.5125 24.427 18.0348 24.0836 17.6169 23.7254C17.1989 23.3373 16.8108 23.1581 16.4525 23.188C15.7957 22.8297 15.6465 22.1281 16.0047 21.0832C16.154 20.6653 16.4227 20.2772 16.8108 19.9189C17.2288 19.5308 17.7512 19.2621 18.3782 19.1128C21.3636 17.8291 24.1252 17.5305 26.6628 18.2172C27.7973 18.5157 28.5735 19.1278 28.9915 20.0533C29.4393 20.9489 29.6334 21.9639 29.5737 23.0984C29.5139 24.2329 29.2602 25.3823 28.8124 26.5466C28.3944 27.711 27.9316 28.6514 27.4241 29.3679C26.9166 30.0546 26.2001 30.8756 25.2746 31.8309C24.3789 32.7863 23.2445 33.7118 21.8712 34.6074C18.4976 36.7868 14.8852 37.8317 11.0339 37.7421C5.4511 37.6526 2.15216 35.3687 1.1371 30.8905C0.808697 29.4575 0.659424 27.8453 0.689279 26.054C0.987825 20.8593 2.54027 16.0079 5.3466 11.4999C6.69006 9.35036 8.49627 7.23068 10.7652 5.14085C12.1982 3.8571 13.8104 2.8719 15.6017 2.18525C16.557 1.79713 17.7064 1.42395 19.0499 1.06569Z"
                fill="black"
              />
            </svg>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99997 10.0726C10.2923 10.0726 11.34 9.02492 11.34 7.73258C11.34 6.44023 10.2923 5.39258 8.99997 5.39258C7.70763 5.39258 6.65997 6.44023 6.65997 7.73258C6.65997 9.02492 7.70763 10.0726 8.99997 10.0726Z"
                stroke="#333333"
                stroke-width="1.5"
              />
              <path
                d="M2.71503 6.3675C4.19253 -0.127498 13.815 -0.119998 15.285 6.375C16.1475 10.185 13.7775 13.41 11.7 15.405C10.1925 16.86 7.80753 16.86 6.29253 15.405C4.22253 13.41 1.85253 10.1775 2.71503 6.3675Z"
                stroke="#333333"
                stroke-width="1.5"
              />
            </svg>

            <Typography>Villach, Technologiepark</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          lg={4}
          sx={{
            display: 'flex',
            // backgroundColor: "#333333",
            flexDirection: 'column',
            // border: "1px solid red",
            justifyContent: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              border: '1px solid black',
              py: '4px',
              px: '16px',
              borderRadius: '32px',
              alignItems: 'center',
            }}>
            <svg
              width="18"
              height="18"
              viewGrid="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleSearchSubmit()}>
              <path
                d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.1974 15.5171C14.5949 16.7171 15.5024 16.8371 16.1999 15.7871C16.8374 14.8271 16.4174 14.0396 15.2624 14.0396C14.4074 14.0321 13.9274 14.6996 14.1974 15.5171Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            {/* main search */}
            <InputBase
              fullWidth
              placeholder="Search for dish, drinks or cusine..."
              onChange={(e) => handleSearchFood(e.target.value)}
              value={searchByName}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <svg
              width="18"
              height="18"
              viewGrid="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.5 4.875H12"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.5 4.875H1.5"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 7.5C8.94975 7.5 10.125 6.32475 10.125 4.875C10.125 3.42525 8.94975 2.25 7.5 2.25C6.05025 2.25 4.875 3.42525 4.875 4.875C4.875 6.32475 6.05025 7.5 7.5 7.5Z"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.5 13.125H13.5"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 13.125H1.5"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 15.75C11.9497 15.75 13.125 14.5747 13.125 13.125C13.125 11.6753 11.9497 10.5 10.5 10.5C9.05025 10.5 7.875 11.6753 7.875 13.125C7.875 14.5747 9.05025 15.75 10.5 15.75Z"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Box>
          {/* <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ border: "1px solid red" }}>On Fokus</Box>
            </motion.div>
          )}
        </AnimatePresence> */}
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          lg={4}
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            // border: "1px solid red",
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
            {!user ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                {!location.pathname.includes('signin') && (
                  <Button
                    onClick={() => goTo('signin')}
                    sx={{
                      px: '32px',
                      py: '8px',
                      borderRadius: '32px',
                      backgroundColor: location.pathname.includes('signup') ? '#FF00D6' : '#fff',
                      color: '#000',
                      cusor: 'pointer',
                      textTransform: 'lowercase',
                      '&&:hover': {
                        backgroundColor: '#000',
                        color: '#FF00D6',
                      },
                    }}>
                    <Typography>
                      <span style={{ textTransform: 'uppercase' }}>S</span>ign in
                    </Typography>
                  </Button>
                )}
                {!location.pathname.includes('signup') && (
                  <Button
                    onClick={() => goTo('signup')}
                    sx={{
                      px: '32px',
                      py: '8px',
                      borderRadius: '32px',
                      backgroundColor: '#EBFF00',
                      color: '#000',
                      cusor: 'pointer',
                      textTransform: 'lowercase',
                      '&&:hover': {
                        backgroundColor: '#000',
                        color: '#EBFF00',
                      },
                    }}>
                    <Typography>
                      <span style={{ textTransform: 'uppercase' }}>S</span>ign up
                    </Typography>
                  </Button>
                )}
              </Box>
            ) : (
              <IconButton onClick={logout}>
                <Avatar />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexGrow: '1',
          justifyContent: 'center',
        }}>
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', gap: '16px' }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  border: '1px solid black',
                  py: '4px',
                  px: '16px',
                  borderRadius: '32px',
                  alignItems: 'center',
                }}>
                <svg
                  width="18"
                  height="18"
                  viewGrid="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1974 15.5171C14.5949 16.7171 15.5024 16.8371 16.1999 15.7871C16.8374 14.8271 16.4174 14.0396 15.2624 14.0396C14.4074 14.0321 13.9274 14.6996 14.1974 15.5171Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <InputBase
                  fullWidth
                  placeholder="Choose your Items"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  border: '1px solid black',
                  py: '4px',
                  px: '16px',
                  borderRadius: '32px',
                  alignItems: 'center',
                }}>
                <svg
                  width="18"
                  height="18"
                  viewGrid="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1974 15.5171C14.5949 16.7171 15.5024 16.8371 16.1999 15.7871C16.8374 14.8271 16.4174 14.0396 15.2624 14.0396C14.4074 14.0321 13.9274 14.6996 14.1974 15.5171Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <InputBase
                  fullWidth
                  placeholder="Choose your Price"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

Secondheader.propTypes = {};

export default Secondheader;
