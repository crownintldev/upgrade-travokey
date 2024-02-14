// ** Util Import
import { Avatar } from '@mui/material'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'src/@core/theme/overrides/link'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import Image from 'next/image'

const LayoutAppBar = (props) => {
  // ** Props
  const { settings, appBarProps, appBarContent: userAppBarContent } = props

  // ** Vars
  const { skin, appBar, appBarBlur, contentWidth } = settings

  // const appBarBlurEffect = appBarBlur && {
  //   '&:after': {
  //     top: 0,
  //     left: 0,
  //     zIndex: -20,
  //     width: '100%',
  //     content: '""',
  //     position: 'absolute',
  //     backdropFilter: 'blur(10px)',
  //     height: (theme) =>
  //       `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(4)})`,
  //     mask: (theme) =>
  //       `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default} 18%, transparent 100%)`,
  //     background: (theme) =>
  //       `linear-gradient(180deg,${hexToRGBA(
  //         theme.palette.background.default,
  //         0.7
  //       )} 44%, ${hexToRGBA(theme.palette.background.default, 0.43)} 73%, ${hexToRGBA(
  //         theme.palette.background.default,
  //         0
  //       )})`
  //   }
  // }

  if (appBar === 'hidden') {
    return null
  }
  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  return (
    <div
      className='border bg-dark p-5'
      // sx={{ ...appBarBlurEffect, ...userAppBarStyle }}
      // position={appBar === 'fixed' ? 'sticky' : 'static'}
      {...userAppBarProps}
    >
      {/* <Link href='/'>
        <Avatar>
          <AvatarImage
            src='https://travokey.up.railway.app/images/favicon.svg'
            className='h-14 pb-4'
          />
          <AvatarFallback>crown logo</AvatarFallback>
        </Avatar>
      </Link> */}
      <Link href='/'>
        <Image
          src='https://travokey.up.railway.app/images/favicon.svg'
          height={26}
          width={26}
          alt='TravoKey Logo'
        />
      </Link>
      <div
        sx={{
          ...(appBarBlur && { backdropFilter: 'blur(6px)' }),
          minHeight: (theme) => `${theme.mixins.toolbar.minHeight}px !important`,
          backgroundColor: (theme) =>
            hexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
          ...(skin === 'bordered'
            ? { border: (theme) => `1px solid ${theme.palette.divider}` }
            : { boxShadow: 2 }),
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': {
              maxWidth: (theme) => `calc(1440px - ${theme.spacing(6 * 2)})`
            }
          })
        }}
      >
        {(userAppBarContent && userAppBarContent(props)) || null}
      </div>
    </div>
  )
}

export default LayoutAppBar
