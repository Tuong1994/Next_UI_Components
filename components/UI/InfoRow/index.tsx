import React from "react";
import { UI } from "@/components";
import { SpaceProps } from "@/components/UI/Space";
import { ParagraphProps } from "@/components/UI/Typography/Paragraph";

const { Space, Typography } = UI;

const { Paragraph } = Typography;

interface InfoRowProps extends SpaceProps {
  label?: React.ReactNode;
  text?: React.ReactNode;
  labelProps?: ParagraphProps;
  textProps?: ParagraphProps;
}

const InfoRow: React.ForwardRefRenderFunction<HTMLDivElement, InfoRowProps> = (
  { label, text, size = "md", labelProps, textProps, ...restProps },
  ref
) => {
  const labelDefaultProps: ParagraphProps = { ...labelProps, rootClassName: "row-label" };

  const textDefaultProps: ParagraphProps = { ...textProps, strong: true };
  return (
    <Space {...restProps} ref={ref} size={size} rootClassName="info-row">
      <Paragraph {...labelDefaultProps}>{label} :</Paragraph>
      <Paragraph {...textDefaultProps}>{text}</Paragraph>
    </Space>
  );
};

export default React.forwardRef(InfoRow);
