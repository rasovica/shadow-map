import * as React from "react";
import * as h3 from 'h3-js';
import {Polyline} from "react-leaflet";

export const Debug = ({position}) => {
    const h3Index = h3.geoToH3(position[0], position[1], 8);
    const hexBoundary = h3.h3ToGeoBoundary(h3Index) as any;
    console.log(h3Index);

    return (
        <>
            <Polyline color="lime" positions={[...hexBoundary, hexBoundary[0]]} />
        </>
    )
};
