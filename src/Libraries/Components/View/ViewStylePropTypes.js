import { PropTypes } from 'react'
import BorderPropTypes from '../../StyleSheet/BorderPropTypes'
import ColorPropType from '../../StyleSheet/ColorPropType'
import LayoutPropTypes from '../../StyleSheet/LayoutPropTypes'
import TransformPropTypes from '../../StyleSheet/TransformPropTypes'

const { number, oneOf, string } = PropTypes
const autoOrHiddenOrVisible = oneOf(['auto', 'hidden', 'visible'])
const hiddenOrVisible = oneOf(['hidden', 'visible'])

module.exports = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  opacity: number,
  overflow: autoOrHiddenOrVisible,
  /*
   * @platform web
   */
  backgroundAttachment: string,
  backgroundClip: string,
  backgroundImage: string,
  backgroundPosition: string,
  backgroundOrigin: oneOf(['border-box', 'content-box', 'padding-box']),
  backgroundRepeat: string,
  backgroundSize: string,
  boxShadow: string,
  cursor: string,
  outline: string,
  overflowX: autoOrHiddenOrVisible,
  overflowY: autoOrHiddenOrVisible,
  userSelect: string,
  visibility: hiddenOrVisible,
  zIndex: number,
  WebkitOverflowScrolling: oneOf(['auto', 'touch'])
}
