// // ** React Import
// import { useRef, useState } from 'react'

// // ** MUI Imports
// import List from '@mui/material/List'
// import Box from '@mui/material/Box'

// import {
//   createTheme,
//   responsiveFontSizes,
//   styled,
//   ThemeProvider
// } from '@mui/material/styles'

// // ** Third Party Components
// import PerfectScrollbar from 'react-perfect-scrollbar'

// // ** Theme Config
// import themeConfig from 'src/configs/themeConfig'

// // ** Component Imports
// import Drawer from './Drawer'
// import VerticalNavItems from './VerticalNavItems'
// import VerticalNavHeader from './VerticalNavHeader'

// // ** Theme Options
// import themeOptions from 'src/@core/theme/ThemeOptions'

// // ** Util Import
// import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// const StyledBoxForShadow = styled(Box)(({ theme }) => ({
//   top: 60,
//   left: -8,
//   zIndex: 2,
//   opacity: 0,
//   position: 'absolute',
//   pointerEvents: 'none',
//   width: 'calc(100% + 15px)',
//   height: theme.mixins.toolbar.minHeight,
//   transition: 'opacity .15s ease-in-out',
//   background: `linear-gradient(${theme.palette.background.paper} ${
//     theme.direction === 'rtl' ? '95%' : '5%'
//   },${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
//     theme.palette.background.paper,
//     0.5
//   )} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
//   '&.scrolled': {
//     opacity: 1
//   }
// }))

// const Navigation = (props) => {
//   // ** Props
//   const {
//     hidden,
//     settings,
//     afterNavMenuContent,
//     beforeNavMenuContent,
//     navigationBorderWidth,
//     navMenuContent: userNavMenuContent
//   } = props

//   // ** States
//   const [navHover, setNavHover] = useState(false)
//   const [groupActive, setGroupActive] = useState([])
//   const [currentActiveGroup, setCurrentActiveGroup] = useState([])

//   // ** Ref
//   const shadowRef = useRef(null)

//   // ** Var
//   const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } =
//     themeConfig

//   const navMenuContentProps = {
//     ...props,
//     navHover,
//     groupActive,
//     setGroupActive,
//     currentActiveGroup,
//     setCurrentActiveGroup
//   }

//   // ** Create new theme for the navigation menu when mode is `semi-dark`
//   let darkTheme = createTheme(themeOptions(settings, 'dark'))

//   // ** Set responsive font sizes to true
//   if (themeConfig.responsiveFontSizes) {
//     darkTheme = responsiveFontSizes(darkTheme)
//   }

//   // ** Fixes Navigation InfiniteScroll
//   const handleInfiniteScroll = (ref) => {
//     if (ref) {
//       // @ts-ignore
//       ref._getBoundingClientRect = ref.getBoundingClientRect
//       ref.getBoundingClientRect = () => {
//         // @ts-ignore
//         const original = ref._getBoundingClientRect()

//         return { ...original, height: Math.floor(original.height) }
//       }
//     }
//   }

//   // ** Scroll Menu
//   const scrollMenu = (container) => {
//     if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
//       container = hidden ? container.target : container
//       if (shadowRef && container.scrollTop > 0) {
//         // @ts-ignore
//         if (!shadowRef.current.classList.contains('scrolled')) {
//           // @ts-ignore
//           shadowRef.current.classList.add('scrolled')
//         }
//       } else {
//         // @ts-ignore
//         shadowRef.current.classList.remove('scrolled')
//       }
//     }
//   }
//   const ScrollWrapper = hidden ? Box : PerfectScrollbar

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Drawer
//         {...props}
//         navHover={navHover}
//         setNavHover={setNavHover}
//         navigationBorderWidth={navigationBorderWidth}
//       >
//         <VerticalNavHeader {...props} navHover={navHover} />
//         {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
//           ? beforeNavMenuContent(navMenuContentProps)
//           : null}
//         {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
//           <StyledBoxForShadow ref={shadowRef} />
//         )}
//         <Box sx={{ position: 'relative', overflow: 'hidden' }}>
//           {/* @ts-ignore */}
//           <ScrollWrapper
//             {...(hidden
//               ? {
//                   onScroll: (container) => scrollMenu(container),
//                   sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
//                 }
//               : {
//                   options: { wheelPropagation: false },
//                   onScrollY: (container) => scrollMenu(container),
//                   containerRef: (ref) => handleInfiniteScroll(ref)
//                 })}
//           >
//             {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
//               ? beforeNavMenuContent(navMenuContentProps)
//               : null}
//             {userNavMenuContent ? (
//               userNavMenuContent(navMenuContentProps)
//             ) : (
//               <List className='nav-items' sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
//                 <VerticalNavItems
//                   navHover={navHover}
//                   groupActive={groupActive}
//                   setGroupActive={setGroupActive}
//                   currentActiveGroup={currentActiveGroup}
//                   setCurrentActiveGroup={setCurrentActiveGroup}
//                   {...props}
//                 />
//               </List>
//             )}
//             {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
//               ? afterNavMenuContent(navMenuContentProps)
//               : null}
//           </ScrollWrapper>
//         </Box>
//         {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
//           ? afterNavMenuContent(navMenuContentProps)
//           : null}
//       </Drawer>
//     </ThemeProvider>
//   )
// }

// export default Navigation

import React from 'react'
import Link from 'next/link'

const Navigation = ({ menuItems }) => {
  console.log('menu items', menuItems)

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '18rem',
        padding: '3rem 0'
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems &&
          menuItems.map((menuItem, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              {menuItem.children ? (
                <React.Fragment>
                  <input
                    style={{ display: 'none' }}
                    type='checkbox'
                    id={`menu-${index}`}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '0.75rem',
                      border: '1px solid #d1d5db',
                      backgroundColor: '#f9fafb',
                      padding: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Icon */}
                    <label
                      htmlFor={`menu-${index}`}
                      style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
                    ></label>
                  </div>
                  <ul
                    style={{
                      maxHeight: 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease'
                    }}
                  >
                    {menuItem.children.map((child, childIndex) => (
                      <Link href={child.path || '/'} key={childIndex}>
                        <li
                          style={{
                            cursor: 'pointer',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            backgroundColor: '#f3f4f6',
                            margin: '0.5rem'
                          }}
                        >
                          {child.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </React.Fragment>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '0.75rem',
                    backgroundColor: '#f9fafb',
                    padding: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {menuItem.title}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Navigation
