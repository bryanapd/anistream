import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  colors: {
    gray: {
      '50': '#F2F2F2',
      '100': '#DBDBDB',
      '200': "#C4C4C4",
      '300': "#ADADAD",
      '400': "#969696",
      '500': "#808080",
      '600': "#666666",
      '700': "#4D4D4D",
      '800': "#222",
      '900': "#1A1A1A"
    },
    primary: {
      '500': '#00B58F',
      '600': '#007E57'
    },
    secondary: {
      '500': '#FFD79A',
      '600': '#FFF7E9',
      '700': '#FFAF17'
    },
    tertiary: {
      '500': '#FF621A',
      '600': '#FBEBE5'
    }
  },
  // fonts: {
  //   heading: 'Urbanist',
  //   body: 'Urbanist'
  // },
  styles: {
    global: {
      outline: '0px !important',
      '-webkit-tap-highlight-color': 'transparent'
    }
  },
  layerStyles: {
    showcaseLinearTop: {
      bgGradient: 'linear(to-t, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)',
      pos: 'absolute', 
      h: 'full', 
      w: 'full', 
      bottom: 0, 
      left: 0
    },
    showcaseLinearRight: {
      pos: 'absolute', 
      h: 'full', 
      w: 'full', 
      bottom: 0, 
      left: 0,
      bgGradient: 'linear(to-r, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)'
    },
    showcaseLinearBottom: {
      pos: 'absolute', 
      h: 'full', 
      w: 'full', 
      bottom: 0, 
      left: 0,
      bgGradient: 'linear(to-b, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)'
    }
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'orange.500',
      }
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'orange.500',
      }
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'orange.500',
      }
    },
    Tabs: {
      baseStyle: {
        button: {
          _focus: {
            boxShadow: 'none',
          },
          _hover: {
            boxShadow: 'none',
          },
          _active: {
            boxShadow: 'none',
          }
        }
      }
    },
    Button: {
      baseStyle: {
        transition: `all 500ms ease`,
        _focus: {
          boxShadow: 'none',
        },
        _hover: {
          boxShadow: 'none',
        }
      },
      variants: {
        primary: {
          color: 'white',
          fontSize: 'lg',
          fontWeight: 'black',
          transition: 'all 300ms ease',
          bgGradient: 'linear(to-r, #00B58F 0%, #007E57 95%)',
          rounded: 'full',
          _hover: {
            boxShadow: '0px 0px 7px green',
          }
        },
        secondary: {
          fontSize: 'lg',
          fontWeight: 'black',
          transition: 'all 300ms ease',
          borderWidth : 1.6,
          borderColor: '#FFAF17',
          rounded: 'full',
          _hover: {
            boxShadow: '0px 0px 7px orange',
          }
        }
      },
    }
  }
})