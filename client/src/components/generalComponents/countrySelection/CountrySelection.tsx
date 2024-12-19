import { Button, InputProps } from "antd";
import React from "react";
import 'react-international-phone/style.css';
import { CountryIso2, CountrySelector } from "react-international-phone";

interface ICountrySelect extends InputProps {
  iso2: CountryIso2;
  setIso2: (iso2: CountryIso2) => void;
}

export const CountrySelect: React.FC<ICountrySelect> = React.memo(
  (props: ICountrySelect) => {
    return (
      <CountrySelector
        selectedCountry={props.iso2}
        onSelect={(country) => props.setIso2(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => (
          <Button
            {...rootProps}
            style={{
              backgroundColor:
                props?.variant === "filled" ? "#f5f5f5" : "transparent",
              height: "100%",
              zIndex: 1, // fix focus overlap
            }}
            size={props?.size}
            type={props?.variant !== "outlined" ? "text" : "default"}
          >
            {children}
          </Button>
        )}
        dropdownStyleProps={{
          style: {
            top: "35px",
          },
        }}
      />
    );
  }
);
