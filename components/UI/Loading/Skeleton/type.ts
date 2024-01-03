import { ComponentShape } from "@/common/type";

type CommonOptions = {
  width?: number;
  height?: number;
  shape?: Exclude<ComponentShape, "circle">;
};

type TitleOptions = CommonOptions;

type ButtonOptions = CommonOptions;

type ParagraphOptions = CommonOptions & {
  lines?: number;
};

type ImageOptions = {
  size?: number;
  shape?: ComponentShape;
};

export type SkeletonType = "title" | "paragraph" | "image" | "button";

export type TitleSkeletonProps = {
  type: "title";
  options?: TitleOptions;
};

export type ParagraphSkeletonProps = {
  type: "paragraph";
  options?: ParagraphOptions;
};

export type ImageSkeletonProps = {
  type: "image";
  options?: ImageOptions;
};

export type ButtonSkeletonProps = {
  type: "button";
  options?: ButtonOptions;
};
