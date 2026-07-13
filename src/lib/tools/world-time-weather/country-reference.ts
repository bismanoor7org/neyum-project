// Country capitals with coordinates + IANA timezones (Open-Meteo geocoding)
export type CountryReference = {
  name: string;
  capital: string;
  lat: number;
  lng: number;
  timezone: string;
  aliases?: string[];
};

export const COUNTRY_REFERENCE: CountryReference[] = [
  {
    "name": "Afghanistan",
    "capital": "Afghanistan",
    "lat": 33,
    "lng": 66,
    "timezone": "Asia/Kabul",
    "aliases": []
  },
  {
    "name": "Albania",
    "capital": "Albania",
    "lat": 41,
    "lng": 20,
    "timezone": "Europe/Tirane",
    "aliases": []
  },
  {
    "name": "Algeria",
    "capital": "Algeria",
    "lat": 28,
    "lng": 3,
    "timezone": "Africa/Algiers",
    "aliases": []
  },
  {
    "name": "Andorra",
    "capital": "Andorra",
    "lat": 40.97655,
    "lng": -0.44721,
    "timezone": "Europe/Madrid",
    "aliases": []
  },
  {
    "name": "Angola",
    "capital": "Angola",
    "lat": -12.5,
    "lng": 18.5,
    "timezone": "Africa/Luanda",
    "aliases": []
  },
  {
    "name": "Antigua and Barbuda",
    "capital": "Antigua and Barbuda",
    "lat": 17.05,
    "lng": -61.8,
    "timezone": "America/Antigua",
    "aliases": []
  },
  {
    "name": "Argentina",
    "capital": "Argentina",
    "lat": -34,
    "lng": -64,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Armenia",
    "capital": "Armenia",
    "lat": 4.53656,
    "lng": -75.67263,
    "timezone": "America/Bogota",
    "aliases": []
  },
  {
    "name": "Australia",
    "capital": "Canberra",
    "lat": -35.282,
    "lng": 149.129,
    "timezone": "Australia/Sydney",
    "aliases": []
  },
  {
    "name": "Austria",
    "capital": "Austria",
    "lat": 47.33333,
    "lng": 13.33333,
    "timezone": "Europe/Vienna",
    "aliases": []
  },
  {
    "name": "Azerbaijan",
    "capital": "Azerbaijan",
    "lat": 40.5,
    "lng": 47.5,
    "timezone": "Asia/Baku",
    "aliases": []
  },
  {
    "name": "Bahamas",
    "capital": "Bahamas",
    "lat": 25.04082,
    "lng": -77.37122,
    "timezone": "America/Nassau",
    "aliases": []
  },
  {
    "name": "Bahrain",
    "capital": "Bahrain",
    "lat": 26.03333,
    "lng": 50.55,
    "timezone": "Asia/Bahrain",
    "aliases": []
  },
  {
    "name": "Bangladesh",
    "capital": "Bangladesh",
    "lat": 24,
    "lng": 90,
    "timezone": "Asia/Dhaka",
    "aliases": []
  },
  {
    "name": "Barbados",
    "capital": "Barbados",
    "lat": 13.16453,
    "lng": -59.55165,
    "timezone": "America/Barbados",
    "aliases": []
  },
  {
    "name": "Belarus",
    "capital": "Belarus",
    "lat": 53,
    "lng": 28,
    "timezone": "Europe/Minsk",
    "aliases": []
  },
  {
    "name": "Belgium",
    "capital": "Belgium",
    "lat": 50.75,
    "lng": 4.5,
    "timezone": "Europe/Brussels",
    "aliases": []
  },
  {
    "name": "Belize",
    "capital": "Belize",
    "lat": 17.25,
    "lng": -88.75,
    "timezone": "America/Belize",
    "aliases": []
  },
  {
    "name": "Benin",
    "capital": "Benin",
    "lat": 9.5,
    "lng": 2.25,
    "timezone": "Africa/Porto-Novo",
    "aliases": []
  },
  {
    "name": "Bhutan",
    "capital": "Bhutan",
    "lat": 27.5,
    "lng": 90.5,
    "timezone": "Asia/Thimphu",
    "aliases": []
  },
  {
    "name": "Bolivia",
    "capital": "Bolivia",
    "lat": -17,
    "lng": -65,
    "timezone": "America/La_Paz",
    "aliases": []
  },
  {
    "name": "Bosnia and Herzegovina",
    "capital": "Bosnia and Herzegovina",
    "lat": 44.25,
    "lng": 17.83333,
    "timezone": "Europe/Sarajevo",
    "aliases": []
  },
  {
    "name": "Botswana",
    "capital": "Botswana",
    "lat": -22,
    "lng": 24,
    "timezone": "Africa/Gaborone",
    "aliases": []
  },
  {
    "name": "Brazil",
    "capital": "Brazil",
    "lat": -10,
    "lng": -55,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Brunei",
    "capital": "Brunei",
    "lat": 4.5,
    "lng": 114.66667,
    "timezone": "Asia/Brunei",
    "aliases": []
  },
  {
    "name": "Bulgaria",
    "capital": "Bulgaria",
    "lat": 42.66667,
    "lng": 25.25,
    "timezone": "Europe/Sofia",
    "aliases": []
  },
  {
    "name": "Burkina Faso",
    "capital": "Burkina Faso",
    "lat": 12.5,
    "lng": -1.66667,
    "timezone": "Africa/Ouagadougou",
    "aliases": []
  },
  {
    "name": "Burundi",
    "capital": "Burundi",
    "lat": -3.35,
    "lng": 29.88333,
    "timezone": "Africa/Bujumbura",
    "aliases": []
  },
  {
    "name": "Cambodia",
    "capital": "Cambodia",
    "lat": 13,
    "lng": 105,
    "timezone": "Asia/Phnom_Penh",
    "aliases": []
  },
  {
    "name": "Cameroon",
    "capital": "Cameroon",
    "lat": 6,
    "lng": 12.5,
    "timezone": "Africa/Douala",
    "aliases": []
  },
  {
    "name": "Canada",
    "capital": "Ottawa",
    "lat": 45.421,
    "lng": -75.697,
    "timezone": "America/Toronto",
    "aliases": []
  },
  {
    "name": "Cape Verde",
    "capital": "Cape Verde",
    "lat": 14.7221,
    "lng": -17.50449,
    "timezone": "Africa/Dakar",
    "aliases": []
  },
  {
    "name": "Central African Republic",
    "capital": "Central African Republic",
    "lat": 7,
    "lng": 21,
    "timezone": "Africa/Bangui",
    "aliases": []
  },
  {
    "name": "Chad",
    "capital": "Chad",
    "lat": 15,
    "lng": 19,
    "timezone": "Africa/Ndjamena",
    "aliases": []
  },
  {
    "name": "Chile",
    "capital": "Chile",
    "lat": -30,
    "lng": -71,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "China",
    "capital": "China",
    "lat": 35,
    "lng": 105,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Colombia",
    "capital": "Colombia",
    "lat": 4,
    "lng": -73.25,
    "timezone": "America/Bogota",
    "aliases": []
  },
  {
    "name": "Comoros",
    "capital": "Comoros",
    "lat": -12.23333,
    "lng": 44.44553,
    "timezone": "Indian/Comoro",
    "aliases": []
  },
  {
    "name": "Congo",
    "capital": "Congo",
    "lat": -7.79694,
    "lng": -36.65972,
    "timezone": "America/Fortaleza",
    "aliases": []
  },
  {
    "name": "Congo (DRC)",
    "capital": "Kinshasa",
    "lat": -4.322,
    "lng": 15.322,
    "timezone": "Africa/Kinshasa",
    "aliases": []
  },
  {
    "name": "Costa Rica",
    "capital": "Costa Rica",
    "lat": 10,
    "lng": -84,
    "timezone": "America/Costa_Rica",
    "aliases": []
  },
  {
    "name": "Côte d'Ivoire",
    "capital": "Abidjan",
    "lat": 5.36,
    "lng": -4.008,
    "timezone": "Africa/Abidjan",
    "aliases": []
  },
  {
    "name": "Croatia",
    "capital": "Croatia",
    "lat": 45.16667,
    "lng": 15.5,
    "timezone": "Europe/Zagreb",
    "aliases": []
  },
  {
    "name": "Cuba",
    "capital": "Cuba",
    "lat": 22,
    "lng": -79.5,
    "timezone": "America/Havana",
    "aliases": []
  },
  {
    "name": "Cyprus",
    "capital": "Cyprus",
    "lat": 35,
    "lng": 33,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Czech Republic",
    "capital": "Prague",
    "lat": 50.075,
    "lng": 14.437,
    "timezone": "Europe/Prague",
    "aliases": [
      "czechia"
    ]
  },
  {
    "name": "Denmark",
    "capital": "Denmark",
    "lat": 56,
    "lng": 10,
    "timezone": "Europe/Copenhagen",
    "aliases": []
  },
  {
    "name": "Djibouti",
    "capital": "Djibouti",
    "lat": 11.58901,
    "lng": 43.14503,
    "timezone": "Africa/Djibouti",
    "aliases": []
  },
  {
    "name": "Dominica",
    "capital": "Dominica",
    "lat": 15.5,
    "lng": -61.33333,
    "timezone": "America/Dominica",
    "aliases": []
  },
  {
    "name": "Dominican Republic",
    "capital": "Dominican Republic",
    "lat": 19,
    "lng": -70.66667,
    "timezone": "America/Santo_Domingo",
    "aliases": []
  },
  {
    "name": "Ecuador",
    "capital": "Ecuador",
    "lat": -1.25,
    "lng": -78.25,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Egypt",
    "capital": "Egypt",
    "lat": 27,
    "lng": 30,
    "timezone": "Africa/Cairo",
    "aliases": []
  },
  {
    "name": "El Salvador",
    "capital": "El Salvador",
    "lat": 13.83333,
    "lng": -88.91667,
    "timezone": "America/El_Salvador",
    "aliases": []
  },
  {
    "name": "Equatorial Guinea",
    "capital": "Equatorial Guinea",
    "lat": 1.7,
    "lng": 10.5,
    "timezone": "Africa/Malabo",
    "aliases": []
  },
  {
    "name": "Eritrea",
    "capital": "Eritrea",
    "lat": 15,
    "lng": 39,
    "timezone": "Africa/Asmara",
    "aliases": []
  },
  {
    "name": "Estonia",
    "capital": "Estonia",
    "lat": 59,
    "lng": 26,
    "timezone": "Europe/Tallinn",
    "aliases": []
  },
  {
    "name": "Eswatini",
    "capital": "Eswatini",
    "lat": -26.5,
    "lng": 31.5,
    "timezone": "Africa/Mbabane",
    "aliases": []
  },
  {
    "name": "Ethiopia",
    "capital": "Ethiopia",
    "lat": 9,
    "lng": 39.5,
    "timezone": "Africa/Addis_Ababa",
    "aliases": []
  },
  {
    "name": "Fiji",
    "capital": "Fiji",
    "lat": -18,
    "lng": 178,
    "timezone": "Pacific/Fiji",
    "aliases": []
  },
  {
    "name": "Finland",
    "capital": "Finland",
    "lat": 64,
    "lng": 26,
    "timezone": "Europe/Helsinki",
    "aliases": []
  },
  {
    "name": "France",
    "capital": "France",
    "lat": 46,
    "lng": 2,
    "timezone": "Europe/Paris",
    "aliases": []
  },
  {
    "name": "Gabon",
    "capital": "Gabon",
    "lat": -1,
    "lng": 11.75,
    "timezone": "Africa/Libreville",
    "aliases": []
  },
  {
    "name": "Gambia",
    "capital": "Gambia",
    "lat": 7.07616,
    "lng": -11.33737,
    "timezone": "Africa/Monrovia",
    "aliases": []
  },
  {
    "name": "Georgia",
    "capital": "Georgia",
    "lat": 41.99998,
    "lng": 43.4999,
    "timezone": "Asia/Tbilisi",
    "aliases": []
  },
  {
    "name": "Germany",
    "capital": "Germany",
    "lat": 51.5,
    "lng": 10.5,
    "timezone": "Europe/Berlin",
    "aliases": []
  },
  {
    "name": "Ghana",
    "capital": "Ghana",
    "lat": 8.1,
    "lng": -1.2,
    "timezone": "Africa/Accra",
    "aliases": []
  },
  {
    "name": "Greece",
    "capital": "Greece",
    "lat": 39,
    "lng": 22,
    "timezone": "Europe/Athens",
    "aliases": []
  },
  {
    "name": "Grenada",
    "capital": "Grenada",
    "lat": 33.769,
    "lng": -89.80842,
    "timezone": "America/Chicago",
    "aliases": []
  },
  {
    "name": "Guatemala",
    "capital": "Guatemala",
    "lat": 15.5,
    "lng": -90.25,
    "timezone": "America/Guatemala",
    "aliases": []
  },
  {
    "name": "Guinea",
    "capital": "Guinea",
    "lat": 10.83333,
    "lng": -10.66667,
    "timezone": "Africa/Conakry",
    "aliases": []
  },
  {
    "name": "Guinea-Bissau",
    "capital": "Guinea-Bissau",
    "lat": 12,
    "lng": -15,
    "timezone": "Africa/Bissau",
    "aliases": []
  },
  {
    "name": "Guyana",
    "capital": "Guyana",
    "lat": 5,
    "lng": -59,
    "timezone": "America/Guyana",
    "aliases": []
  },
  {
    "name": "Haiti",
    "capital": "Haiti",
    "lat": 19.07582,
    "lng": -72.29616,
    "timezone": "America/Port-au-Prince",
    "aliases": []
  },
  {
    "name": "Honduras",
    "capital": "Honduras",
    "lat": 15,
    "lng": -86.5,
    "timezone": "America/Tegucigalpa",
    "aliases": []
  },
  {
    "name": "Hong Kong",
    "capital": "Hong Kong",
    "lat": 22.27832,
    "lng": 114.17469,
    "timezone": "Asia/Hong_Kong",
    "aliases": []
  },
  {
    "name": "Hungary",
    "capital": "Hungary",
    "lat": 47,
    "lng": 20,
    "timezone": "Europe/Budapest",
    "aliases": []
  },
  {
    "name": "Iceland",
    "capital": "Iceland",
    "lat": 65,
    "lng": -18,
    "timezone": "Atlantic/Reykjavik",
    "aliases": []
  },
  {
    "name": "India",
    "capital": "India",
    "lat": 22,
    "lng": 79,
    "timezone": "Asia/Kolkata",
    "aliases": []
  },
  {
    "name": "Indonesia",
    "capital": "Indonesia",
    "lat": -5,
    "lng": 120,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Iran",
    "capital": "Iran",
    "lat": 32,
    "lng": 53,
    "timezone": "Asia/Tehran",
    "aliases": []
  },
  {
    "name": "Iraq",
    "capital": "Iraq",
    "lat": 33,
    "lng": 44,
    "timezone": "Asia/Baghdad",
    "aliases": []
  },
  {
    "name": "Ireland",
    "capital": "Ireland",
    "lat": 53,
    "lng": -8,
    "timezone": "Europe/Dublin",
    "aliases": []
  },
  {
    "name": "Israel",
    "capital": "Israel",
    "lat": 31.5,
    "lng": 34.75,
    "timezone": "Asia/Jerusalem",
    "aliases": []
  },
  {
    "name": "Italy",
    "capital": "Italy",
    "lat": 42.83333,
    "lng": 12.83333,
    "timezone": "Europe/Rome",
    "aliases": []
  },
  {
    "name": "Jamaica",
    "capital": "Jamaica",
    "lat": 18.16667,
    "lng": -77.25,
    "timezone": "America/Jamaica",
    "aliases": []
  },
  {
    "name": "Japan",
    "capital": "Japan",
    "lat": 35.68536,
    "lng": 139.7531,
    "timezone": "Asia/Tokyo",
    "aliases": []
  },
  {
    "name": "Jordan",
    "capital": "Jordan",
    "lat": 31,
    "lng": 36,
    "timezone": "Asia/Amman",
    "aliases": []
  },
  {
    "name": "Kazakhstan",
    "capital": "Kazakhstan",
    "lat": 48,
    "lng": 68,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Kenya",
    "capital": "Kenya",
    "lat": 1,
    "lng": 38,
    "timezone": "Africa/Nairobi",
    "aliases": []
  },
  {
    "name": "Kiribati",
    "capital": "Kiribati",
    "lat": 1.421,
    "lng": 172.984,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Kuwait",
    "capital": "Kuwait",
    "lat": 29.5,
    "lng": 47.75,
    "timezone": "Asia/Kuwait",
    "aliases": []
  },
  {
    "name": "Kyrgyzstan",
    "capital": "Kyrgyzstan",
    "lat": 41.5,
    "lng": 75,
    "timezone": "Asia/Bishkek",
    "aliases": []
  },
  {
    "name": "Laos",
    "capital": "Laos",
    "lat": 18,
    "lng": 105,
    "timezone": "Asia/Vientiane",
    "aliases": []
  },
  {
    "name": "Latvia",
    "capital": "Latvia",
    "lat": 57,
    "lng": 25,
    "timezone": "Europe/Riga",
    "aliases": []
  },
  {
    "name": "Lebanon",
    "capital": "Lebanon",
    "lat": 33.83333,
    "lng": 35.83333,
    "timezone": "Asia/Beirut",
    "aliases": []
  },
  {
    "name": "Lesotho",
    "capital": "Lesotho",
    "lat": -29.5,
    "lng": 28.25,
    "timezone": "Africa/Maseru",
    "aliases": []
  },
  {
    "name": "Liberia",
    "capital": "Liberia",
    "lat": 6.5,
    "lng": -9.5,
    "timezone": "Africa/Monrovia",
    "aliases": []
  },
  {
    "name": "Libya",
    "capital": "Libya",
    "lat": 28,
    "lng": 17,
    "timezone": "Africa/Tripoli",
    "aliases": []
  },
  {
    "name": "Liechtenstein",
    "capital": "Liechtenstein",
    "lat": 47.16667,
    "lng": 9.53333,
    "timezone": "Europe/Vaduz",
    "aliases": []
  },
  {
    "name": "Lithuania",
    "capital": "Lithuania",
    "lat": 55.41667,
    "lng": 24,
    "timezone": "Europe/Vilnius",
    "aliases": []
  },
  {
    "name": "Luxembourg",
    "capital": "Luxembourg",
    "lat": 49.75,
    "lng": 6.16667,
    "timezone": "Europe/Luxembourg",
    "aliases": []
  },
  {
    "name": "Macau",
    "capital": "Macau",
    "lat": 45.0064,
    "lng": -0.61947,
    "timezone": "Europe/Paris",
    "aliases": []
  },
  {
    "name": "Madagascar",
    "capital": "Madagascar",
    "lat": -20,
    "lng": 47,
    "timezone": "Indian/Antananarivo",
    "aliases": []
  },
  {
    "name": "Malawi",
    "capital": "Malawi",
    "lat": -13.5,
    "lng": 34,
    "timezone": "Africa/Blantyre",
    "aliases": []
  },
  {
    "name": "Malaysia",
    "capital": "Malaysia",
    "lat": 2.5,
    "lng": 112.5,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Maldives",
    "capital": "Maldives",
    "lat": 3.2,
    "lng": 73,
    "timezone": "Indian/Maldives",
    "aliases": []
  },
  {
    "name": "Mali",
    "capital": "Mali",
    "lat": 18,
    "lng": -2,
    "timezone": "Africa/Bamako",
    "aliases": []
  },
  {
    "name": "Malta",
    "capital": "Malta",
    "lat": 35.91667,
    "lng": 14.43333,
    "timezone": "Europe/Malta",
    "aliases": []
  },
  {
    "name": "Marshall Islands",
    "capital": "Marshall Islands",
    "lat": 7.113,
    "lng": 171.236,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Mauritania",
    "capital": "Mauritania",
    "lat": 20.25,
    "lng": -10.5,
    "timezone": "Africa/Nouakchott",
    "aliases": []
  },
  {
    "name": "Mauritius",
    "capital": "Mauritius",
    "lat": -20.3,
    "lng": 57.58333,
    "timezone": "Indian/Mauritius",
    "aliases": []
  },
  {
    "name": "Mexico",
    "capital": "Mexico",
    "lat": 23,
    "lng": -102,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Micronesia",
    "capital": "Federated States of Micronesia",
    "lat": 6.924,
    "lng": 158.162,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Moldova",
    "capital": "Moldova",
    "lat": 47.25,
    "lng": 28.58333,
    "timezone": "Europe/Chisinau",
    "aliases": []
  },
  {
    "name": "Monaco",
    "capital": "Monaco",
    "lat": 43.73718,
    "lng": 7.42145,
    "timezone": "Europe/Monaco",
    "aliases": []
  },
  {
    "name": "Mongolia",
    "capital": "Mongolia",
    "lat": 46,
    "lng": 105,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Montenegro",
    "capital": "Montenegro",
    "lat": 42.75,
    "lng": 19.25,
    "timezone": "Europe/Podgorica",
    "aliases": []
  },
  {
    "name": "Morocco",
    "capital": "Morocco",
    "lat": 28.5,
    "lng": -10,
    "timezone": "Africa/Casablanca",
    "aliases": []
  },
  {
    "name": "Mozambique",
    "capital": "Mozambique",
    "lat": -18.25,
    "lng": 35,
    "timezone": "Africa/Maputo",
    "aliases": []
  },
  {
    "name": "Myanmar",
    "capital": "Myanmar",
    "lat": 21,
    "lng": 96,
    "timezone": "Asia/Yangon",
    "aliases": []
  },
  {
    "name": "Namibia",
    "capital": "Namibia",
    "lat": -22,
    "lng": 17,
    "timezone": "Africa/Windhoek",
    "aliases": []
  },
  {
    "name": "Nauru",
    "capital": "Nauru",
    "lat": -11.13333,
    "lng": 38.61667,
    "timezone": "Africa/Dar_es_Salaam",
    "aliases": []
  },
  {
    "name": "Nepal",
    "capital": "Nepal",
    "lat": 28,
    "lng": 84,
    "timezone": "Asia/Kathmandu",
    "aliases": []
  },
  {
    "name": "Netherlands",
    "capital": "Netherlands",
    "lat": 36.29923,
    "lng": -89.75119,
    "timezone": "America/Chicago",
    "aliases": []
  },
  {
    "name": "New Zealand",
    "capital": "New Zealand",
    "lat": -42,
    "lng": 174,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Nicaragua",
    "capital": "Nicaragua",
    "lat": 13,
    "lng": -85,
    "timezone": "America/Managua",
    "aliases": []
  },
  {
    "name": "Niger",
    "capital": "Niger",
    "lat": 18,
    "lng": 9,
    "timezone": "Africa/Niamey",
    "aliases": []
  },
  {
    "name": "Nigeria",
    "capital": "Nigeria",
    "lat": 10,
    "lng": 8,
    "timezone": "Africa/Lagos",
    "aliases": []
  },
  {
    "name": "North Korea",
    "capital": "North Korea",
    "lat": 40,
    "lng": 127,
    "timezone": "Asia/Pyongyang",
    "aliases": []
  },
  {
    "name": "North Macedonia",
    "capital": "North Macedonia",
    "lat": 41.66667,
    "lng": 21.75,
    "timezone": "Europe/Skopje",
    "aliases": []
  },
  {
    "name": "Norway",
    "capital": "Norway",
    "lat": 62,
    "lng": 10,
    "timezone": "Europe/Oslo",
    "aliases": []
  },
  {
    "name": "Oman",
    "capital": "Oman",
    "lat": 21,
    "lng": 57,
    "timezone": "Asia/Muscat",
    "aliases": []
  },
  {
    "name": "Pakistan",
    "capital": "Pakistan",
    "lat": 30,
    "lng": 70,
    "timezone": "Asia/Karachi",
    "aliases": []
  },
  {
    "name": "Palau",
    "capital": "Palau",
    "lat": 41.17936,
    "lng": 9.3819,
    "timezone": "Europe/Rome",
    "aliases": []
  },
  {
    "name": "Palestine",
    "capital": "Palestine",
    "lat": 31.92157,
    "lng": 35.20329,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Panama",
    "capital": "Panama",
    "lat": 9,
    "lng": -80,
    "timezone": "America/Panama",
    "aliases": []
  },
  {
    "name": "Papua New Guinea",
    "capital": "Papua New Guinea",
    "lat": -6,
    "lng": 147,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Paraguay",
    "capital": "Paraguay",
    "lat": -23.33333,
    "lng": -58,
    "timezone": "America/Asuncion",
    "aliases": []
  },
  {
    "name": "Peru",
    "capital": "Peru",
    "lat": -10,
    "lng": -75.25,
    "timezone": "America/Lima",
    "aliases": []
  },
  {
    "name": "Philippines",
    "capital": "Philippines",
    "lat": 13.40882,
    "lng": 122.56155,
    "timezone": "Asia/Manila",
    "aliases": []
  },
  {
    "name": "Poland",
    "capital": "Poland",
    "lat": 52,
    "lng": 20,
    "timezone": "Europe/Warsaw",
    "aliases": []
  },
  {
    "name": "Portugal",
    "capital": "Portugal",
    "lat": 39.6945,
    "lng": -8.13057,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Qatar",
    "capital": "Qatar",
    "lat": 25.5,
    "lng": 51.25,
    "timezone": "Asia/Qatar",
    "aliases": []
  },
  {
    "name": "Romania",
    "capital": "Romania",
    "lat": 46,
    "lng": 25,
    "timezone": "Europe/Bucharest",
    "aliases": []
  },
  {
    "name": "Russia",
    "capital": "Russia",
    "lat": 60,
    "lng": 100,
    "timezone": "UTC",
    "aliases": [
      "russian federation"
    ]
  },
  {
    "name": "Rwanda",
    "capital": "Rwanda",
    "lat": -2,
    "lng": 30,
    "timezone": "Africa/Kigali",
    "aliases": []
  },
  {
    "name": "Saint Kitts and Nevis",
    "capital": "Saint Kitts and Nevis",
    "lat": 17.33333,
    "lng": -62.75,
    "timezone": "America/St_Kitts",
    "aliases": []
  },
  {
    "name": "Saint Lucia",
    "capital": "Saint Lucia",
    "lat": 13.88333,
    "lng": -60.96667,
    "timezone": "America/St_Lucia",
    "aliases": []
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "capital": "Saint Vincent and the Grenadines",
    "lat": 13.08333,
    "lng": -61.2,
    "timezone": "America/St_Vincent",
    "aliases": []
  },
  {
    "name": "Samoa",
    "capital": "Samoa",
    "lat": -13.8,
    "lng": -172.13333,
    "timezone": "Pacific/Apia",
    "aliases": []
  },
  {
    "name": "San Marino",
    "capital": "San Marino",
    "lat": 43.93667,
    "lng": 12.44639,
    "timezone": "Europe/San_Marino",
    "aliases": []
  },
  {
    "name": "São Tomé and Príncipe",
    "capital": "São Tomé and Príncipe",
    "lat": 1,
    "lng": 7,
    "timezone": "Africa/Sao_Tome",
    "aliases": []
  },
  {
    "name": "Saudi Arabia",
    "capital": "Saudi Arabia",
    "lat": 25,
    "lng": 45,
    "timezone": "Asia/Riyadh",
    "aliases": []
  },
  {
    "name": "Senegal",
    "capital": "Senegal",
    "lat": 14.5,
    "lng": -14.25,
    "timezone": "Africa/Dakar",
    "aliases": []
  },
  {
    "name": "Serbia",
    "capital": "Serbia",
    "lat": 44.81892,
    "lng": 20.45998,
    "timezone": "Europe/Belgrade",
    "aliases": []
  },
  {
    "name": "Seychelles",
    "capital": "Seychelles",
    "lat": -4.58333,
    "lng": 55.66667,
    "timezone": "Indian/Mahe",
    "aliases": []
  },
  {
    "name": "Sierra Leone",
    "capital": "Sierra Leone",
    "lat": 8.5,
    "lng": -11.5,
    "timezone": "Africa/Freetown",
    "aliases": []
  },
  {
    "name": "Singapore",
    "capital": "Singapore",
    "lat": 1.28967,
    "lng": 103.85007,
    "timezone": "Asia/Singapore",
    "aliases": []
  },
  {
    "name": "Slovakia",
    "capital": "Slovakia",
    "lat": 48.66667,
    "lng": 19.5,
    "timezone": "Europe/Bratislava",
    "aliases": []
  },
  {
    "name": "Slovenia",
    "capital": "Slovenia",
    "lat": 46.08333,
    "lng": 15,
    "timezone": "Europe/Ljubljana",
    "aliases": []
  },
  {
    "name": "Solomon Islands",
    "capital": "Solomon Islands",
    "lat": -8,
    "lng": 159,
    "timezone": "Pacific/Guadalcanal",
    "aliases": []
  },
  {
    "name": "Somalia",
    "capital": "Somalia",
    "lat": 6,
    "lng": 48,
    "timezone": "Africa/Mogadishu",
    "aliases": []
  },
  {
    "name": "South Africa",
    "capital": "South Africa",
    "lat": -29,
    "lng": 24,
    "timezone": "Africa/Johannesburg",
    "aliases": []
  },
  {
    "name": "South Korea",
    "capital": "South Korea",
    "lat": 36.5,
    "lng": 127.75,
    "timezone": "Asia/Seoul",
    "aliases": [
      "korea",
      "republic of korea"
    ]
  },
  {
    "name": "South Sudan",
    "capital": "South Sudan",
    "lat": 7.5,
    "lng": 30,
    "timezone": "Africa/Juba",
    "aliases": []
  },
  {
    "name": "Spain",
    "capital": "Spain",
    "lat": 40,
    "lng": -4,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Sri Lanka",
    "capital": "Sri Lanka",
    "lat": 7.75,
    "lng": 80.75,
    "timezone": "Asia/Colombo",
    "aliases": []
  },
  {
    "name": "Sudan",
    "capital": "Sudan",
    "lat": 16,
    "lng": 30,
    "timezone": "Africa/Khartoum",
    "aliases": []
  },
  {
    "name": "Suriname",
    "capital": "Suriname",
    "lat": 4,
    "lng": -56,
    "timezone": "America/Paramaribo",
    "aliases": []
  },
  {
    "name": "Sweden",
    "capital": "Sweden",
    "lat": 62,
    "lng": 15,
    "timezone": "Europe/Stockholm",
    "aliases": []
  },
  {
    "name": "Switzerland",
    "capital": "Switzerland",
    "lat": 47.00016,
    "lng": 8.01427,
    "timezone": "Europe/Zurich",
    "aliases": []
  },
  {
    "name": "Syria",
    "capital": "Syria",
    "lat": 35,
    "lng": 38,
    "timezone": "Asia/Damascus",
    "aliases": []
  },
  {
    "name": "Taiwan",
    "capital": "Taiwan",
    "lat": 24,
    "lng": 121,
    "timezone": "Asia/Taipei",
    "aliases": []
  },
  {
    "name": "Tajikistan",
    "capital": "Tajikistan",
    "lat": 39,
    "lng": 71,
    "timezone": "Asia/Dushanbe",
    "aliases": []
  },
  {
    "name": "Tanzania",
    "capital": "Tanzania",
    "lat": -6,
    "lng": 35,
    "timezone": "Africa/Dar_es_Salaam",
    "aliases": []
  },
  {
    "name": "Thailand",
    "capital": "Thailand",
    "lat": 15.5,
    "lng": 101,
    "timezone": "Asia/Bangkok",
    "aliases": []
  },
  {
    "name": "Timor-Leste",
    "capital": "Timor-Leste",
    "lat": -8.83333,
    "lng": 125.75,
    "timezone": "Asia/Dili",
    "aliases": []
  },
  {
    "name": "Togo",
    "capital": "Togo",
    "lat": 8.66667,
    "lng": 1.08333,
    "timezone": "Africa/Lome",
    "aliases": []
  },
  {
    "name": "Tonga",
    "capital": "Tonga",
    "lat": -20,
    "lng": -175,
    "timezone": "Pacific/Tongatapu",
    "aliases": []
  },
  {
    "name": "Trinidad and Tobago",
    "capital": "Trinidad and Tobago",
    "lat": 11,
    "lng": -61,
    "timezone": "America/Port_of_Spain",
    "aliases": []
  },
  {
    "name": "Tunisia",
    "capital": "Tunisia",
    "lat": 34,
    "lng": 9,
    "timezone": "Africa/Tunis",
    "aliases": []
  },
  {
    "name": "Turkey",
    "capital": "Turkey",
    "lat": 34.39256,
    "lng": -100.89764,
    "timezone": "America/Chicago",
    "aliases": []
  },
  {
    "name": "Turkmenistan",
    "capital": "Turkmenistan",
    "lat": 39.75,
    "lng": 59.66667,
    "timezone": "Asia/Ashgabat",
    "aliases": []
  },
  {
    "name": "Tuvalu",
    "capital": "Tuvalu",
    "lat": -8.51719,
    "lng": 179.14478,
    "timezone": "Pacific/Funafuti",
    "aliases": []
  },
  {
    "name": "Uganda",
    "capital": "Uganda",
    "lat": 1.25,
    "lng": 32.5,
    "timezone": "Africa/Kampala",
    "aliases": []
  },
  {
    "name": "Ukraine",
    "capital": "Ukraine",
    "lat": 49,
    "lng": 32,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "United Arab Emirates",
    "capital": "United Arab Emirates",
    "lat": 23.75,
    "lng": 54.5,
    "timezone": "Asia/Dubai",
    "aliases": [
      "uae",
      "emirates"
    ]
  },
  {
    "name": "United Kingdom",
    "capital": "United Kingdom",
    "lat": 54.75844,
    "lng": -2.69531,
    "timezone": "Europe/London",
    "aliases": [
      "uk",
      "britain",
      "great britain",
      "england"
    ]
  },
  {
    "name": "United States",
    "capital": "Washington D.C.",
    "lat": 38.907,
    "lng": -77.037,
    "timezone": "America/New_York",
    "aliases": [
      "usa",
      "us",
      "america",
      "united states of america"
    ]
  },
  {
    "name": "Uruguay",
    "capital": "Uruguay",
    "lat": -33,
    "lng": -56,
    "timezone": "America/Montevideo",
    "aliases": []
  },
  {
    "name": "Uzbekistan",
    "capital": "Uzbekistan",
    "lat": 41.66667,
    "lng": 63.83333,
    "timezone": "UTC",
    "aliases": []
  },
  {
    "name": "Vanuatu",
    "capital": "Vanuatu",
    "lat": -16.3333,
    "lng": 167.5,
    "timezone": "Pacific/Efate",
    "aliases": []
  },
  {
    "name": "Vatican City",
    "capital": "Vatican City",
    "lat": 41.90268,
    "lng": 12.45414,
    "timezone": "Europe/Vatican",
    "aliases": []
  },
  {
    "name": "Venezuela",
    "capital": "Venezuela",
    "lat": 8,
    "lng": -66,
    "timezone": "America/Caracas",
    "aliases": []
  },
  {
    "name": "Vietnam",
    "capital": "Vietnam",
    "lat": 16.16667,
    "lng": 107.83333,
    "timezone": "UTC",
    "aliases": [
      "viet nam"
    ]
  },
  {
    "name": "Yemen",
    "capital": "Yemen",
    "lat": 15.5,
    "lng": 47.5,
    "timezone": "Asia/Aden",
    "aliases": []
  },
  {
    "name": "Zambia",
    "capital": "Zambia",
    "lat": -14.33333,
    "lng": 28.5,
    "timezone": "Africa/Lusaka",
    "aliases": []
  },
  {
    "name": "Zimbabwe",
    "capital": "Zimbabwe",
    "lat": -19,
    "lng": 29.75,
    "timezone": "Africa/Harare",
    "aliases": []
  }
];

export const COUNTRY_REFERENCE_BY_NAME = new Map(
  COUNTRY_REFERENCE.map((c) => [c.name.toLowerCase(), c]),
);

export const COUNTRY_ALIAS_INDEX: Array<{ alias: string; country: string }> = COUNTRY_REFERENCE.flatMap((c) =>
  (c.aliases ?? []).map((alias) => ({ alias: alias.toLowerCase(), country: c.name })),
);
