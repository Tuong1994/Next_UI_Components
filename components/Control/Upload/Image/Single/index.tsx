"use client";

import React from "react";
import { ACCEPT_IMAGE_FILE_TYPE, DEFAULT_FILE_SIZE } from "../../constant";
import { ControlColor, ControlShape, UploadError } from "@/components/Control/type";
import { NoteMessage } from "@/components/UI";
import Loading from "./Loading";
import Control from "./Control";
import Image from "@/components/UI/Image";
import FormContext from "@/components/Control/Form/FormContext";
import utils from "@/utils";

export interface SingleImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  controlClassName?: string;
  rootStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  shape?: ControlShape;
  color?: ControlColor;
  limit?: number;
  defaultImageUrl?: string;
  fileAccepted?: string;
  loading?: boolean;
  onUpload?: (imageFile: File | null) => void;
}

const SingleImageUpload: React.ForwardRefRenderFunction<HTMLInputElement, SingleImageUploadProps> = (
  {
    rootClassName = "",
    controlClassName = "",
    rootStyle,
    controlStyle,
    shape = "square",
    color = "blue",
    defaultImageUrl = "",
    disabled,
    loading = false,
    limit = DEFAULT_FILE_SIZE,
    fileAccepted = ACCEPT_IMAGE_FILE_TYPE.join(","),
    onUpload,
    ...restProps
  },
  ref
) => {
  const { isForm, color: rhfColor, shape: rhfShape } = React.useContext(FormContext);

  const [image, setImage] = React.useState<File | null>(null);

  const [viewImage, setViewImage] = React.useState<string>("");

  const [error, setError] = React.useState<UploadError | null>(null);

  const [dragged, setDragged] = React.useState<boolean>(false);

  const [uploading, setUploading] = React.useState<boolean>(loading);

  const controlColor = isForm ? rhfColor : color;

  const controlShape = isForm ? rhfShape : shape;

  const shapeClassName = `single-image-upload-${controlShape}`;

  const colorClassName = `single-image-upload-${controlColor}`;

  const gapClassName = isForm ? "single-image-upload-gap" : "";

  const disabledClassName = disabled ? "upload-group-disabled" : "";

  const errorClassName = error?.active ? "upload-group-error" : "";

  const dragClassName = dragged ? "upload-group-dragged" : "";

  const mainClassName = utils.formatClassName(
    "single-image-upload",
    gapClassName,
    shapeClassName,
    colorClassName,
    rootClassName
  );

  const groupClassName = utils.formatClassName(
    "upload-group",
    errorClassName,
    dragClassName,
    disabledClassName
  );

  // Set default image
  React.useEffect(() => {
    if (defaultImageUrl) setViewImage(defaultImageUrl);
  }, [defaultImageUrl]);

  // Generate view image
  React.useEffect(() => {
    if (!image) return;
    const reader = new FileReader();
    reader.onloadstart = () => setUploading(true);
    reader.onloadend = () => {
      setViewImage(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(image);
    setError(null);
  }, [image]);

  const errorMessage = () => {
    if (!error) return "";
    if (error.type === "fileSize") return `File size must not greater than ${limit / (1024 * 1024)}MB`;
    if (error.type === "fileType") {
      const types = fileAccepted.split(",").map((type) => type.replace("image/", ""));
      return `Only accept file type ${types.join(", ")}`;
    }
  };

  const handleUpload = (imageFile: File) => {
    if (!fileAccepted.includes(imageFile.type)) return setError({ active: true, type: "fileType" });
    if (imageFile.size > limit) return setError({ active: true, type: "fileSize" });
    setImage(imageFile);
    onUpload?.(imageFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null;
    if (imageFile) handleUpload(imageFile);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragged(true);
    else if (e.type === "dragleave") setDragged(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageFile = e.dataTransfer.files[0];
      handleUpload(imageFile);
    }
  };

  const handleRemove = () => {
    const inputEl = document.getElementById("singleUpload") as HTMLInputElement;
    if (image && inputEl && inputEl.files) {
      const fileTransfer = new DataTransfer();
      const uploadedImages: File[] = Array.from(inputEl.files);
      const filterImages: File[] = uploadedImages.filter((img) => img.name !== image.name);

      filterImages.forEach((file) => {
        const remainImage = new File([file.name], file.name);
        fileTransfer.items.add(remainImage);
      });

      inputEl.files = fileTransfer.files;
    }
    setViewImage("");
    setImage(null);
    onUpload?.(null);
  };

  return (
    <div style={rootStyle} className={mainClassName}>
      <div
        className={groupClassName}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!uploading ? (
          viewImage ? (
            <Image src={viewImage} size="sm" objectFit="cover" hasView hasRemove onRemove={handleRemove} />
          ) : (
            <Control
              {...restProps}
              ref={ref}
              id="singleUpload"
              controlClassName={controlClassName}
              controlStyle={controlStyle}
              disabled={disabled}
              accept={fileAccepted}
              onChange={handleChange}
            />
          )
        ) : (
          <Loading />
        )}
      </div>

      {error && error.active && <NoteMessage type="error" message={errorMessage()} />}
    </div>
  );
};

export default React.forwardRef(SingleImageUpload);
