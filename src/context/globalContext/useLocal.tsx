import { useState } from "react";

const useLocale = () => {
  const [locallan, setLocallan] = useState<string>('zh_cn')
  return {
    locallan,
    setLocallan
  }
};

export default useLocale;
