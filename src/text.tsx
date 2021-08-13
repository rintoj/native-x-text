import { COLOR, TextStyleProps, useTextStyle } from 'native-x-theme'
import React, { ReactElement, ReactText, useMemo } from 'react'
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { styles as s } from 'tachyons-react-native'

type TextType = ReactText | ReactElement<Text> | boolean | null | undefined

export interface TextProps extends Pick<RNTextProps, 'onLayout'>, TextStyleProps {
  fill?: boolean
  bold?: boolean
  semiBold?: boolean
  italic?: boolean
  thin?: boolean
  alignLeft?: boolean
  alignCenter?: boolean
  alignRight?: boolean
  children?: TextType | Array<TextType>
  upperCase?: boolean
  style?: StyleProp<TextStyle>
  numberOfLines?: number
  onPress?: () => void
}

export function Text(props: TextProps) {
  const {
    style,
    alignCenter,
    alignRight,
    fill,
    bold,
    semiBold,
    thin,
    italic,
    upperCase,
    children,
    onPress,
    numberOfLines,
    onLayout,
    fontSize,
    textColor,
  } = props

  const textStyle = useTextStyle({ ...props, fontSize, textColor })

  const composedStyle = useMemo(
    () => [
      alignCenter ? s.tc : alignRight ? s.tr : s.tl,
      fill && s.w100,
      upperCase && { textTransform: 'uppercase' },
      bold && s.b,
      semiBold && s.fw5,
      thin && s.fw2,
      italic && s.i,
      textStyle,
      !fontSize && { fontSize: 'inherit' },
      !textColor && { color: 'inherit' },
      style,
    ],
    [alignCenter, alignRight, fill, style, upperCase, bold, semiBold, thin, italic, textStyle],
  )
  if (props.children == null) {
    return null
  }
  return (
    <RNText
      style={composedStyle as never}
      onPress={onPress}
      numberOfLines={numberOfLines}
      onLayout={onLayout}
    >
      {children}
    </RNText>
  )
}
