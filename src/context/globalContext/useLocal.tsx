import { useState } from "react";

const useLocale = () => {
  const [locallan, setLocallan] = useState<string>('zh_cn')
  return {
    locallan,
    setLocallan
  }
};

// const useLocale = () => {
//   const context = useContext(LocaleContext);
//   if (!context) {
//     throw new Error('useLocale must be used within a LocaleProvider');
//   }
//   return context;
// };

export default useLocale;
