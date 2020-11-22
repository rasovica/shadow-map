import React from "react";
import styled from "styled-components";

import { Filed } from "./Field";
import { useDebounce } from "../hooks/useDebounce";
import { Location } from "../util/location";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";

const SearchWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  z-index: 400;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

export const Search: React.FC = () => {
  const map = useMap();
  const [search, setSearch] = React.useState("");
  const debouncedValue = useDebounce(search, 500);

  React.useEffect(() => {
    Location.search(debouncedValue).then((res) => {
      if (res) {
        map.fitBounds(
          new LatLngBounds(res.bounds.southwest, res.bounds.northeast)
        );
      }
    });
  }, [debouncedValue]);

  return (
    <SearchWrapper>
      <Filed
        fullWidth={false}
        value={search}
        label={"Search"}
        onChange={setSearch}
        readOnly={false}
      />
    </SearchWrapper>
  );
};
