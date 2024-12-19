import {
  defaultCountries,
  FlagImage,
  parseCountry,
} from 'react-international-phone';

export const getCountryByDialCode = (dialCode?: string) => {
  if (!dialCode) return null;
  // Check if defaultCountries is an array
  if (!Array.isArray(defaultCountries)) {
    return null;
  }

  const foundCountry = defaultCountries.find((country) => {
    const parsedCountry = parseCountry(country);
    return parsedCountry && parsedCountry.iso2 === dialCode;
  });

  return foundCountry ? parseCountry(foundCountry) : null;
}

export const renderPhoneWithDialCode = (phone?: string, dialCode?: string) => {
  if (!phone || !dialCode) return null;
  const country = getCountryByDialCode(dialCode);
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {country ? (
        <FlagImage
          iso2={country ? country?.iso2 : undefined}
          size="30px"
        />
      ) : (
        <img
          src="https://img.icons8.com/?size=100&id=113370&format=png&color=A4A4A4"
          alt="flag"
          width="30px"
        />
      )}
      {(country ? `(+${country?.dialCode}) ` : '') + phone}
    </div>
  )
}