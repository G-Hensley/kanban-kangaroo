// Import the useDispatch and useSelector hooks from the react-redux library
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";

// Create a custom hook for dispatching actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a custom hook for selecting state from the store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
