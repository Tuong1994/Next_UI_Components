import React from "react";
import useToastStore from "./ToastStore";

type MessageOptions = {
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  warningIcon?: React.ReactNode;
  infoIcon?: React.ReactNode;
};

const useMessage = (options?: MessageOptions) => {
  const [addToast, configOptions] = useToastStore((state) => [state.addToast, state.configOptions]);

  React.useEffect(() => {
    if (options) configOptions(options);
  }, []);

  const success = (message: string) => addToast("success", message);

  const error = (message: string) => addToast("error", message);

  const warning = (message: string) => addToast("warning", message);

  const info = (message: string) => addToast("info", message);

  const messageApi = { success, error, warning, info };

  return messageApi;
};

export default useMessage;
