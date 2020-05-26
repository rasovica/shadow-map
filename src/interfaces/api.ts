import {LatLngTuple} from "leaflet";

enum Routes {
    location = 'location/',
}

enum Methods {
    get = 'GET',
    post = 'POST',
}

type ApiResponsesLocation = {
    location: LatLngTuple;
    proxy: boolean;
}

type ApiResponse<T> = {
    isLoading: boolean;
    data: null | T;
    error: null | Error;
}

type ApiRequest = (props: {location: Routes.location, method: Methods, query?: {q: string}}) => ApiResponse<ApiResponsesLocation>;


export {ApiResponse, ApiRequest, Routes, Methods}
