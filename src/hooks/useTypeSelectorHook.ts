import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootType} from "../state/store";

export const useAppSelector: TypedUseSelectorHook<AppRootType> = useSelector