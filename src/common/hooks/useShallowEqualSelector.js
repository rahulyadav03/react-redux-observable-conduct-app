import { useSelector, shallowEqual } from "react-redux";

export function useShallowEqualSelector(selector) {
  console.log("selector ", selector);
  return useSelector(selector, shallowEqual);
}
