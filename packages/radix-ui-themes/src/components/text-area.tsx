import * as React from 'react';
import {useEffect, useRef} from "react";
import classNames from 'classnames';
import { textAreaPropDefs } from './text-area.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type TextAreaElement = React.ElementRef<'textarea'>;
type TextAreaOwnProps = GetPropDefTypes<typeof textAreaPropDefs>;
interface TextAreaProps
  extends Omit<PropsWithoutRefOrColor<'textarea'>, 'size'>,
    MarginProps,
    TextAreaOwnProps {}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = textAreaPropDefs.size.default,
    variant = textAreaPropDefs.variant.default,
    color = textAreaPropDefs.color.default,
    style,
    ...textAreaProps
  } = marginRest;

    const texteAreaRef = useRef<React.ElementRef<"textearea">>(null);

  useEffect(() => {
    const ref = texteAreaRef.current;

    const updateTextareaHeight = () => {
      ref.style.height = "auto";
      ref.style.height = ref.scrollHeight + "px";
    };

    updateTextareaHeight();
    ref.addEventListener("input", updateTextareaHeight);

    return () => ref.removeEventListener("input", updateTextareaHeight);
  }, []);
  return (
    <div
      data-accent-color={color}
      style={style}
      className={classNames(
        'rt-TextAreaRoot',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        withMarginProps(marginProps)
      )}
    >
      <textarea className="rt-TextAreaInput" ref={texteAreaRef} {...textAreaProps} />
      <div className="rt-TextAreaChrome" />
    </div>
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
export type { TextAreaProps };
