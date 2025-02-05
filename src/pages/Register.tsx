import React, { useState, useRef, useEffect } from "react";
import cardiologist from "../img/cardiologist.png";
import Select from "react-select";
const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    birthday: "",
    city: "",
    phone: "",
    assurance: "",
    num_assurance: "",
    password: "",
    confirm_password: "",
  });
  const marocCities = [
    {
      "label": "Casablanca",
      "value": "Casablanca"
    },
    {
      "label": "Fès",
      "value": "Fès"
    },
    {
      "label": "Marrakech",
      "value": "Marrakech"
    },
    {
      "label": "Tangier",
      "value": "Tangier"
    },
    {
      "label": "Sale",
      "value": "Sale"
    },
    {
      "label": "Rabat",
      "value": "Rabat"
    },
    {
      "label": "Meknès",
      "value": "Meknès"
    },
    {
      "label": "Oujda-Angad",
      "value": "Oujda-Angad"
    },
    {
      "label": "Kenitra",
      "value": "Kenitra"
    },
    {
      "label": "Agadir",
      "value": "Agadir"
    },
    {
      "label": "Tétouan",
      "value": "Tétouan"
    },
    {
      "label": "Taourirt",
      "value": "Taourirt"
    },
    {
      "label": "Temara",
      "value": "Temara"
    },
    {
      "label": "Safi",
      "value": "Safi"
    },
    {
      "label": "Khénifra",
      "value": "Khénifra"
    },
    {
      "label": "El Jadid",
      "value": "El Jadid"
    },
    {
      "label": "Laâyoune",
      "value": "Laâyoune"
    },
    {
      "label": "Mohammedia",
      "value": "Mohammedia"
    },
    {
      "label": "Kouribga",
      "value": "Kouribga"
    },
    {
      "label": "Béni Mellal",
      "value": "Béni Mellal"
    },
    {
      "label": "Ait Melloul",
      "value": "Ait Melloul"
    },
    {
      "label": "Nador",
      "value": "Nador"
    },
    {
      "label": "Taza",
      "value": "Taza"
    },
    {
      "label": "Settat",
      "value": "Settat"
    },
    {
      "label": "Barrechid",
      "value": "Barrechid"
    },
    {
      "label": "Al Khmissat",
      "value": "Al Khmissat"
    },
    {
      "label": "Inezgane",
      "value": "Inezgane"
    },
    {
      "label": "Ksar El Kebir",
      "value": "Ksar El Kebir"
    },
    {
      "label": "My Drarga",
      "value": "My Drarga"
    },
    {
      "label": "Larache",
      "value": "Larache"
    },
    {
      "label": "Guelmim",
      "value": "Guelmim"
    },
    {
      "label": "Berkane",
      "value": "Berkane"
    },
    {
      "label": "Ad Dakhla",
      "value": "Ad Dakhla"
    },
    {
      "label": "Bouskoura",
      "value": "Bouskoura"
    },
    {
      "label": "Al Fqih Ben Çalah",
      "value": "Al Fqih Ben Çalah"
    },
    {
      "label": "Oued Zem",
      "value": "Oued Zem"
    },
    {
      "label": "Sidi Slimane",
      "value": "Sidi Slimane"
    },
    {
      "label": "Errachidia",
      "value": "Errachidia"
    },
    {
      "label": "Guercif",
      "value": "Guercif"
    },
    {
      "label": "Oulad Teïma",
      "value": "Oulad Teïma"
    },
    {
      "label": "Ben Guerir",
      "value": "Ben Guerir"
    },
    {
      "label": "Wislane",
      "value": "Wislane"
    },
    {
      "label": "Tiflet",
      "value": "Tiflet"
    },
    {
      "label": "Lqoliaa",
      "value": "Lqoliaa"
    },
    {
      "label": "Taroudannt",
      "value": "Taroudannt"
    },
    {
      "label": "Sefrou",
      "value": "Sefrou"
    },
    {
      "label": "Essaouira",
      "value": "Essaouira"
    },
    {
      "label": "Fnidq",
      "value": "Fnidq"
    },
    {
      "label": "Ait Ali",
      "value": "Ait Ali"
    },
    {
      "label": "Sidi Qacem",
      "value": "Sidi Qacem"
    },
    {
      "label": "Tiznit",
      "value": "Tiznit"
    },
    {
      "label": "Moulay Abdallah",
      "value": "Moulay Abdallah"
    },
    {
      "label": "Tan-Tan",
      "value": "Tan-Tan"
    },
    {
      "label": "Warzat",
      "value": "Warzat"
    },
    {
      "label": "Youssoufia",
      "value": "Youssoufia"
    },
    {
      "label": "Sa’ada",
      "value": "Sa’ada"
    },
    {
      "label": "Martil",
      "value": "Martil"
    },
    {
      "label": "Aïn Harrouda",
      "value": "Aïn Harrouda"
    },
    {
      "label": "Souq Sebt Oulad Nemma",
      "value": "Souq Sebt Oulad Nemma"
    },
    {
      "label": "Skhirate",
      "value": "Skhirate"
    },
    {
      "label": "Ouezzane",
      "value": "Ouezzane"
    },
    {
      "label": "Sidi Yahya Zaer",
      "value": "Sidi Yahya Zaer"
    },
    {
      "label": "Benslimane",
      "value": "Benslimane"
    },
    {
      "label": "Semara",
      "value": "Semara"
    },
    {
      "label": "Al Hoceïma",
      "value": "Al Hoceïma"
    },
    {
      "label": "Beni Enzar",
      "value": "Beni Enzar"
    },
    {
      "label": "M’diq",
      "value": "M’diq"
    },
    {
      "label": "Sidi Bennour",
      "value": "Sidi Bennour"
    },
    {
      "label": "Midalt",
      "value": "Midalt"
    },
    {
      "label": "Douar Ain Chkef",
      "value": "Douar Ain Chkef"
    },
    {
      "label": "Azrou",
      "value": "Azrou"
    },
    {
      "label": "El Kelaa des Srarhna",
      "value": "El Kelaa des Srarhna"
    },
    {
      "label": "Ain El Aouda",
      "value": "Ain El Aouda"
    },
    {
      "label": "Beni Yakhlef",
      "value": "Beni Yakhlef"
    },
    {
      "label": "Ad Darwa",
      "value": "Ad Darwa"
    },
    {
      "label": "Al Aaroui",
      "value": "Al Aaroui"
    },
    {
      "label": "Qasbat Tadla",
      "value": "Qasbat Tadla"
    },
    {
      "label": "Boujad",
      "value": "Boujad"
    },
    {
      "label": "Tinajdad",
      "value": "Tinajdad"
    },
    {
      "label": "Jerada",
      "value": "Jerada"
    },
    {
      "label": "Douar Bni Malek",
      "value": "Douar Bni Malek"
    },
    {
      "label": "Chefchaouene",
      "value": "Chefchaouene"
    },
    {
      "label": "Mrirt",
      "value": "Mrirt"
    },
    {
      "label": "Cabo Bojador",
      "value": "Cabo Bojador"
    },
    {
      "label": "Sidi Mohamed Lahmar",
      "value": "Sidi Mohamed Lahmar"
    },
    {
      "label": "Tineghir",
      "value": "Tineghir"
    },
    {
      "label": "El Aïoun",
      "value": "El Aïoun"
    },
    {
      "label": "Azemmour",
      "value": "Azemmour"
    },
    {
      "label": "Temsia",
      "value": "Temsia"
    },
    {
      "label": "Zoumi",
      "value": "Zoumi"
    },
    {
      "label": "Douar Laouamra",
      "value": "Douar Laouamra"
    },
    {
      "label": "Zagora",
      "value": "Zagora"
    },
    {
      "label": "Ait Ourir",
      "value": "Ait Ourir"
    },
    {
      "label": "Sidi Bibi",
      "value": "Sidi Bibi"
    },
    {
      "label": "Aziylal",
      "value": "Aziylal"
    },
    {
      "label": "Sidi Yahia El Gharb",
      "value": "Sidi Yahia El Gharb"
    },
    {
      "label": "Biougra",
      "value": "Biougra"
    },
    {
      "label": "Taounate",
      "value": "Taounate"
    },
    {
      "label": "Bouznika",
      "value": "Bouznika"
    },
    {
      "label": "Aourir",
      "value": "Aourir"
    },
    {
      "label": "Zaïo",
      "value": "Zaïo"
    },
    {
      "label": "Aguelmous",
      "value": "Aguelmous"
    },
    {
      "label": "El Hajeb",
      "value": "El Hajeb"
    },
    {
      "label": "Dabouziya",
      "value": "Dabouziya"
    },
    {
      "label": "Mnasra",
      "value": "Mnasra"
    },
    {
      "label": "Zeghanghane",
      "value": "Zeghanghane"
    },
    {
      "label": "Imzouren",
      "value": "Imzouren"
    },
    {
      "label": "Oulad Zemam",
      "value": "Oulad Zemam"
    },
    {
      "label": "Ben Ahmed",
      "value": "Ben Ahmed"
    },
    {
      "label": "Tit Mellil",
      "value": "Tit Mellil"
    },
    {
      "label": "Arbaoua",
      "value": "Arbaoua"
    },
    {
      "label": "Douar Oulad Hssine",
      "value": "Douar Oulad Hssine"
    },
    {
      "label": "Bahharet Oulad Ayyad",
      "value": "Bahharet Oulad Ayyad"
    },
    {
      "label": "Mechraa Bel Ksiri",
      "value": "Mechraa Bel Ksiri"
    },
    {
      "label": "Mograne",
      "value": "Mograne"
    },
    {
      "label": "Dar Ould Zidouh",
      "value": "Dar Ould Zidouh"
    },
    {
      "label": "Asilah",
      "value": "Asilah"
    },
    {
      "label": "Al ’Attawia",
      "value": "Al ’Attawia"
    },
    {
      "label": "Demnat",
      "value": "Demnat"
    },
    {
      "label": "Lalla Mimouna",
      "value": "Lalla Mimouna"
    },
    {
      "label": "Fritissa",
      "value": "Fritissa"
    },
    {
      "label": "Arfoud",
      "value": "Arfoud"
    },
    {
      "label": "Tameslouht",
      "value": "Tameslouht"
    },
    {
      "label": "Bou Arfa",
      "value": "Bou Arfa"
    },
    {
      "label": "Sidi Smai’il",
      "value": "Sidi Smai’il"
    },
    {
      "label": "Taza",
      "value": "Taza"
    },
    {
      "label": "Souk et Tnine Jorf el Mellah",
      "value": "Souk et Tnine Jorf el Mellah"
    },
    {
      "label": "Mehdya",
      "value": "Mehdya"
    },
    {
      "label": "Oulad Hammou",
      "value": "Oulad Hammou"
    },
    {
      "label": "Douar Oulad Aj-jabri",
      "value": "Douar Oulad Aj-jabri"
    },
    {
      "label": "Aïn Taoujdat",
      "value": "Aïn Taoujdat"
    },
    {
      "label": "Dar Bel Hamri",
      "value": "Dar Bel Hamri"
    },
    {
      "label": "Chichaoua",
      "value": "Chichaoua"
    },
    {
      "label": "Tahla",
      "value": "Tahla"
    },
    {
      "label": "Bellaa",
      "value": "Bellaa"
    },
    {
      "label": "Oulad Yaïch",
      "value": "Oulad Yaïch"
    },
    {
      "label": "Ksebia",
      "value": "Ksebia"
    },
    {
      "label": "Ourika Wawrmas",
      "value": "Ourika Wawrmas"
    },
    {
      "label": "Tamorot",
      "value": "Tamorot"
    },
    {
      "label": "Moulay Bousselham",
      "value": "Moulay Bousselham"
    },
    {
      "label": "Iheddadene",
      "value": "Iheddadene"
    },
    {
      "label": "Sabaa Aiyoun",
      "value": "Sabaa Aiyoun"
    },
    {
      "label": "Bourdoud",
      "value": "Bourdoud"
    },
    {
      "label": "Aït Faska",
      "value": "Aït Faska"
    },
    {
      "label": "Rich",
      "value": "Rich"
    },
    {
      "label": "Boureït",
      "value": "Boureït"
    },
    {
      "label": "Lamzoudia",
      "value": "Lamzoudia"
    },
    {
      "label": "Oulad Said",
      "value": "Oulad Said"
    },
    {
      "label": "Missour",
      "value": "Missour"
    },
    {
      "label": "Ain Aicha",
      "value": "Ain Aicha"
    },
    {
      "label": "Zawyat ech Cheïkh",
      "value": "Zawyat ech Cheïkh"
    },
    {
      "label": "Bouknadel",
      "value": "Bouknadel"
    },
    {
      "label": "El Ghiate",
      "value": "El Ghiate"
    },
    {
      "label": "Safsaf",
      "value": "Safsaf"
    },
    {
      "label": "Ouaoula",
      "value": "Ouaoula"
    },
    {
      "label": "Douar Olad. Salem",
      "value": "Douar Olad. Salem"
    },
    {
      "label": "Oulad Tayeb",
      "value": "Oulad Tayeb"
    },
    {
      "label": "Ain Dfali",
      "value": "Ain Dfali"
    },
    {
      "label": "Echemmaia Est",
      "value": "Echemmaia Est"
    },
    {
      "label": "Oulad Barhil",
      "value": "Oulad Barhil"
    },
    {
      "label": "Douar ’Ayn Dfali",
      "value": "Douar ’Ayn Dfali"
    },
    {
      "label": "Bir Jdid",
      "value": "Bir Jdid"
    },
    {
      "label": "Setti Fatma",
      "value": "Setti Fatma"
    },
    {
      "label": "Skoura",
      "value": "Skoura"
    },
    {
      "label": "Douar Ouled Ayad",
      "value": "Douar Ouled Ayad"
    },
    {
      "label": "Zawyat an Nwaçer",
      "value": "Zawyat an Nwaçer"
    },
    {
      "label": "Khenichet-sur Ouerrha",
      "value": "Khenichet-sur Ouerrha"
    },
    {
      "label": "Ayt Mohamed",
      "value": "Ayt Mohamed"
    },
    {
      "label": "Gueznaia",
      "value": "Gueznaia"
    },
    {
      "label": "Oulad Hassoune",
      "value": "Oulad Hassoune"
    },
    {
      "label": "Bni Frassen",
      "value": "Bni Frassen"
    },
    {
      "label": "Douar Imoukkane",
      "value": "Douar Imoukkane"
    },
    {
      "label": "Tnine Lgharbia",
      "value": "Tnine Lgharbia"
    },
    {
      "label": "Tighedouine",
      "value": "Tighedouine"
    },
    {
      "label": "Alnif",
      "value": "Alnif"
    },
    {
      "label": "Sidi Lmokhtar",
      "value": "Sidi Lmokhtar"
    },
    {
      "label": "Souk Tlet El Gharb",
      "value": "Souk Tlet El Gharb"
    },
    {
      "label": "Arbi’a Tighadwiyn",
      "value": "Arbi’a Tighadwiyn"
    },
    {
      "label": "Had Oulad Issa",
      "value": "Had Oulad Issa"
    },
    {
      "label": "Tidili Masfiywat",
      "value": "Tidili Masfiywat"
    },
    {
      "label": "Sidi Ifni",
      "value": "Sidi Ifni"
    },
    {
      "label": "Tamgrout",
      "value": "Tamgrout"
    },
    {
      "label": "Selouane",
      "value": "Selouane"
    },
    {
      "label": "Amizmiz",
      "value": "Amizmiz"
    },
    {
      "label": "Afourar",
      "value": "Afourar"
    },
    {
      "label": "Asni",
      "value": "Asni"
    },
    {
      "label": "Tabount",
      "value": "Tabount"
    },
    {
      "label": "Imi n’Oulaoun",
      "value": "Imi n’Oulaoun"
    },
    {
      "label": "Saka",
      "value": "Saka"
    },
    {
      "label": "Bni Rzine",
      "value": "Bni Rzine"
    },
    {
      "label": "El Gara",
      "value": "El Gara"
    },
    {
      "label": "Sidi Abdelkader",
      "value": "Sidi Abdelkader"
    },
    {
      "label": "Imi-n-Tanout",
      "value": "Imi-n-Tanout"
    },
    {
      "label": "Sidi Chiker",
      "value": "Sidi Chiker"
    },
    {
      "label": "Sidi Rahal",
      "value": "Sidi Rahal"
    },
    {
      "label": "Station des Essais M.V.A.",
      "value": "Station des Essais M.V.A."
    },
    {
      "label": "Reçani",
      "value": "Reçani"
    },
    {
      "label": "Aïn Cheggag",
      "value": "Aïn Cheggag"
    },
    {
      "label": "Sidi Jaber",
      "value": "Sidi Jaber"
    },
    {
      "label": "Jdour",
      "value": "Jdour"
    },
    {
      "label": "Douar Lamrabih",
      "value": "Douar Lamrabih"
    },
    {
      "label": "El Ksiba",
      "value": "El Ksiba"
    },
    {
      "label": "Sidi Taibi",
      "value": "Sidi Taibi"
    },
    {
      "label": "’Ali Ben Sliman",
      "value": "’Ali Ben Sliman"
    },
    {
      "label": "Tarhzirt",
      "value": "Tarhzirt"
    },
    {
      "label": "Aït Tamlil",
      "value": "Aït Tamlil"
    },
    {
      "label": "Had Zraqtane",
      "value": "Had Zraqtane"
    },
    {
      "label": "El Mansouria",
      "value": "El Mansouria"
    },
    {
      "label": "Oulad Embarek",
      "value": "Oulad Embarek"
    },
    {
      "label": "Oulad Fraj",
      "value": "Oulad Fraj"
    },
    {
      "label": "Jnane Bouih",
      "value": "Jnane Bouih"
    },
    {
      "label": "Ahfir",
      "value": "Ahfir"
    },
    {
      "label": "Ait Bousarane",
      "value": "Ait Bousarane"
    },
    {
      "label": "Ait Bouziyane",
      "value": "Ait Bouziyane"
    },
    {
      "label": "Oulad Salmane",
      "value": "Oulad Salmane"
    },
    {
      "label": "Douar Ait Sidi Daoud",
      "value": "Douar Ait Sidi Daoud"
    },
    {
      "label": "Al Brouj",
      "value": "Al Brouj"
    },
    {
      "label": "Sidi Redouane",
      "value": "Sidi Redouane"
    },
    {
      "label": "Zaouïa Aït Ishak",
      "value": "Zaouïa Aït Ishak"
    },
    {
      "label": "Imouzzer Kandar",
      "value": "Imouzzer Kandar"
    },
    {
      "label": "Douar Toulal",
      "value": "Douar Toulal"
    },
    {
      "label": "Ait Ben Daoudi",
      "value": "Ait Ben Daoudi"
    },
    {
      "label": "Beni Zouli",
      "value": "Beni Zouli"
    },
    {
      "label": "Oulmes",
      "value": "Oulmes"
    },
    {
      "label": "Karia Ba Mohamed",
      "value": "Karia Ba Mohamed"
    },
    {
      "label": "Tata",
      "value": "Tata"
    },
    {
      "label": "Jbabra",
      "value": "Jbabra"
    },
    {
      "label": "Tamri",
      "value": "Tamri"
    },
    {
      "label": "Sebt Gzoula",
      "value": "Sebt Gzoula"
    },
    {
      "label": "Chouafa",
      "value": "Chouafa"
    },
    {
      "label": "Foum el Anser",
      "value": "Foum el Anser"
    },
    {
      "label": "Assa",
      "value": "Assa"
    },
    {
      "label": "Lamrasla",
      "value": "Lamrasla"
    },
    {
      "label": "Aït Bouchta",
      "value": "Aït Bouchta"
    },
    {
      "label": "Bni Bouayach",
      "value": "Bni Bouayach"
    },
    {
      "label": "Ikniwn",
      "value": "Ikniwn"
    },
    {
      "label": "Bouarouss",
      "value": "Bouarouss"
    },
    {
      "label": "Ghouazi",
      "value": "Ghouazi"
    },
    {
      "label": "Sidi Allal Tazi",
      "value": "Sidi Allal Tazi"
    },
    {
      "label": "Douar Oulad Mbarek",
      "value": "Douar Oulad Mbarek"
    },
    {
      "label": "Laatatra",
      "value": "Laatatra"
    },
    {
      "label": "Aït Majdane",
      "value": "Aït Majdane"
    },
    {
      "label": "Sahel",
      "value": "Sahel"
    },
    {
      "label": "Dar Chaifat",
      "value": "Dar Chaifat"
    },
    {
      "label": "Awlouz",
      "value": "Awlouz"
    },
    {
      "label": "Milla’ab",
      "value": "Milla’ab"
    },
    {
      "label": "Ketama",
      "value": "Ketama"
    },
    {
      "label": "Galaz",
      "value": "Galaz"
    },
    {
      "label": "Chouafaa",
      "value": "Chouafaa"
    },
    {
      "label": "Tagounite",
      "value": "Tagounite"
    },
    {
      "label": "Sidi Yakoub",
      "value": "Sidi Yakoub"
    },
    {
      "label": "Knemis Dades",
      "value": "Knemis Dades"
    },
    {
      "label": "Oulad Amrane",
      "value": "Oulad Amrane"
    },
    {
      "label": "Qal’at Mgouna",
      "value": "Qal’at Mgouna"
    },
    {
      "label": "Douar Lamjaara",
      "value": "Douar Lamjaara"
    },
    {
      "label": "Ratba",
      "value": "Ratba"
    },
    {
      "label": "Sidi Lamine",
      "value": "Sidi Lamine"
    },
    {
      "label": "Ouaouzgane",
      "value": "Ouaouzgane"
    },
    {
      "label": "Ribat Al Khayr",
      "value": "Ribat Al Khayr"
    },
    {
      "label": "Agourai",
      "value": "Agourai"
    },
    {
      "label": "Sidi Ettiji",
      "value": "Sidi Ettiji"
    },
    {
      "label": "Douar Tabouda",
      "value": "Douar Tabouda"
    },
    {
      "label": "Zirara",
      "value": "Zirara"
    },
    {
      "label": "Mensora",
      "value": "Mensora"
    },
    {
      "label": "Tamallalt",
      "value": "Tamallalt"
    },
    {
      "label": "Goulmima",
      "value": "Goulmima"
    },
    {
      "label": "Outat Oulad Al Haj",
      "value": "Outat Oulad Al Haj"
    },
    {
      "label": "Sebt Aït Saghiouchen",
      "value": "Sebt Aït Saghiouchen"
    },
    {
      "label": "’Ayn Bni Mathar",
      "value": "’Ayn Bni Mathar"
    },
    {
      "label": "Timezgana",
      "value": "Timezgana"
    },
    {
      "label": "Talsint",
      "value": "Talsint"
    },
    {
      "label": "Al Qbab",
      "value": "Al Qbab"
    },
    {
      "label": "Bni Tajjit",
      "value": "Bni Tajjit"
    },
    {
      "label": "Zegzel",
      "value": "Zegzel"
    },
    {
      "label": "Douar Azla",
      "value": "Douar Azla"
    },
    {
      "label": "Masmouda",
      "value": "Masmouda"
    },
    {
      "label": "Ait Yaazem",
      "value": "Ait Yaazem"
    },
    {
      "label": "Bouchabel",
      "value": "Bouchabel"
    },
    {
      "label": "Bni Quolla",
      "value": "Bni Quolla"
    },
    {
      "label": "Bou Djeniba",
      "value": "Bou Djeniba"
    },
    {
      "label": "Khat Azakane",
      "value": "Khat Azakane"
    },
    {
      "label": "Sidi Azzouz",
      "value": "Sidi Azzouz"
    },
    {
      "label": "Zemrane",
      "value": "Zemrane"
    },
    {
      "label": "Caidat Sidi Boubker El Haj",
      "value": "Caidat Sidi Boubker El Haj"
    },
    {
      "label": "L’Oulja",
      "value": "L’Oulja"
    },
    {
      "label": "Ras el Oued",
      "value": "Ras el Oued"
    },
    {
      "label": "Haddada",
      "value": "Haddada"
    },
    {
      "label": "Sidi Allal el Bahraoui",
      "value": "Sidi Allal el Bahraoui"
    },
    {
      "label": "Tamazouzt",
      "value": "Tamazouzt"
    },
    {
      "label": "Ras El Oued",
      "value": "Ras El Oued"
    },
    {
      "label": "Aïn Mediouna",
      "value": "Aïn Mediouna"
    },
    {
      "label": "Sebt Bni Smith",
      "value": "Sebt Bni Smith"
    },
    {
      "label": "Skhour Rehamna",
      "value": "Skhour Rehamna"
    },
    {
      "label": "Al Hammam",
      "value": "Al Hammam"
    },
    {
      "label": "Ezzhiliga",
      "value": "Ezzhiliga"
    },
    {
      "label": "Anazzou",
      "value": "Anazzou"
    },
    {
      "label": "Tendrara",
      "value": "Tendrara"
    },
    {
      "label": "Aç-çahrij",
      "value": "Aç-çahrij"
    },
    {
      "label": "Moul El Bergui",
      "value": "Moul El Bergui"
    },
    {
      "label": "Aïn Jemaa",
      "value": "Aïn Jemaa"
    },
    {
      "label": "Tazert",
      "value": "Tazert"
    },
    {
      "label": "Souk Et-Tleta des Oulad Hamdane",
      "value": "Souk Et-Tleta des Oulad Hamdane"
    },
    {
      "label": "Tirhassaline",
      "value": "Tirhassaline"
    },
    {
      "label": "Douar El Arbaa Bou Quorra",
      "value": "Douar El Arbaa Bou Quorra"
    },
    {
      "label": "Oulad Bou Rahmoun",
      "value": "Oulad Bou Rahmoun"
    },
    {
      "label": "Mellila",
      "value": "Mellila"
    },
    {
      "label": "Sabbah",
      "value": "Sabbah"
    },
    {
      "label": "Midar",
      "value": "Midar"
    },
    {
      "label": "Esbiaat",
      "value": "Esbiaat"
    },
    {
      "label": "Douar Souk L‘qolla",
      "value": "Douar Souk L‘qolla"
    },
    {
      "label": "Tabant",
      "value": "Tabant"
    },
    {
      "label": "’Tlat Bni Oukil",
      "value": "’Tlat Bni Oukil"
    },
    {
      "label": "Sidi Zouine",
      "value": "Sidi Zouine"
    },
    {
      "label": "Oued Jdida",
      "value": "Oued Jdida"
    },
    {
      "label": "Gourrama",
      "value": "Gourrama"
    },
    {
      "label": "Aghbal",
      "value": "Aghbal"
    },
    {
      "label": "Nzalat Laadam",
      "value": "Nzalat Laadam"
    },
    {
      "label": "Ighrem n’Ougdal",
      "value": "Ighrem n’Ougdal"
    },
    {
      "label": "Bni Darkoul",
      "value": "Bni Darkoul"
    },
    {
      "label": "Driouch",
      "value": "Driouch"
    },
    {
      "label": "Douar Oulad Driss",
      "value": "Douar Oulad Driss"
    },
    {
      "label": "Oulad Driss",
      "value": "Oulad Driss"
    },
    {
      "label": "Mediouna",
      "value": "Mediouna"
    },
    {
      "label": "Ifrane",
      "value": "Ifrane"
    },
    {
      "label": "Wawizaght",
      "value": "Wawizaght"
    },
    {
      "label": "Ayt ’Attou ou L’Arbi",
      "value": "Ayt ’Attou ou L’Arbi"
    },
    {
      "label": "Madagh",
      "value": "Madagh"
    },
    {
      "label": "Boula’wane",
      "value": "Boula’wane"
    },
    {
      "label": "Tagalft",
      "value": "Tagalft"
    },
    {
      "label": "Ourtzagh",
      "value": "Ourtzagh"
    },
    {
      "label": "Sidi Azzouz",
      "value": "Sidi Azzouz"
    },
    {
      "label": "Zaouiat Moulay Bouchta El Khammar",
      "value": "Zaouiat Moulay Bouchta El Khammar"
    },
    {
      "label": "Ihaddadene",
      "value": "Ihaddadene"
    },
    {
      "label": "Ait Yazza",
      "value": "Ait Yazza"
    },
    {
      "label": "Ben Taieb",
      "value": "Ben Taieb"
    },
    {
      "label": "Tafrant",
      "value": "Tafrant"
    },
    {
      "label": "Bou Izakarn",
      "value": "Bou Izakarn"
    },
    {
      "label": "Douar Hammadi",
      "value": "Douar Hammadi"
    },
    {
      "label": "Bezou",
      "value": "Bezou"
    },
    {
      "label": "Talwat",
      "value": "Talwat"
    },
    {
      "label": "Sidi Abdelkarim",
      "value": "Sidi Abdelkarim"
    },
    {
      "label": "Temsamane",
      "value": "Temsamane"
    },
    {
      "label": "Oulad Chikh",
      "value": "Oulad Chikh"
    },
    {
      "label": "Toulal",
      "value": "Toulal"
    },
    {
      "label": "Khmis Sidi al ’Aydi",
      "value": "Khmis Sidi al ’Aydi"
    },
    {
      "label": "Arbaa Laaounate",
      "value": "Arbaa Laaounate"
    },
    {
      "label": "Douar Lehgagcha",
      "value": "Douar Lehgagcha"
    },
    {
      "label": "Mqam at Tolba",
      "value": "Mqam at Tolba"
    },
    {
      "label": "Targuist",
      "value": "Targuist"
    },
    {
      "label": "Kissane Ltouqi",
      "value": "Kissane Ltouqi"
    },
    {
      "label": "Tounfit",
      "value": "Tounfit"
    },
    {
      "label": "Reggada",
      "value": "Reggada"
    },
    {
      "label": "Sebt Labrikiyne",
      "value": "Sebt Labrikiyne"
    },
    {
      "label": "El Kansera",
      "value": "El Kansera"
    },
    {
      "label": "Douar Sidi Laaroussi",
      "value": "Douar Sidi Laaroussi"
    },
    {
      "label": "Zayda",
      "value": "Zayda"
    },
    {
      "label": "Asjen",
      "value": "Asjen"
    },
    {
      "label": "Bhalil",
      "value": "Bhalil"
    },
    {
      "label": "Ksar Sghir",
      "value": "Ksar Sghir"
    },
    {
      "label": "Sebt Bni Garfett",
      "value": "Sebt Bni Garfett"
    },
    {
      "label": "Bou Fekrane",
      "value": "Bou Fekrane"
    },
    {
      "label": "Bni Khloug",
      "value": "Bni Khloug"
    },
    {
      "label": "Douar Oulad Youssef",
      "value": "Douar Oulad Youssef"
    },
    {
      "label": "Kasba Tanora",
      "value": "Kasba Tanora"
    },
    {
      "label": "Aghbala",
      "value": "Aghbala"
    },
    {
      "label": "Tizgane",
      "value": "Tizgane"
    },
    {
      "label": "Zag",
      "value": "Zag"
    },
    {
      "label": "Oulad Rahmoun",
      "value": "Oulad Rahmoun"
    },
    {
      "label": "Laamarna",
      "value": "Laamarna"
    },
    {
      "label": "Bou Adel",
      "value": "Bou Adel"
    },
    {
      "label": "Aït Youssef Ou Ali",
      "value": "Aït Youssef Ou Ali"
    },
    {
      "label": "Ahermoumou",
      "value": "Ahermoumou"
    },
    {
      "label": "El Menzel",
      "value": "El Menzel"
    },
    {
      "label": "Souakene",
      "value": "Souakene"
    },
    {
      "label": "Teroual",
      "value": "Teroual"
    },
    {
      "label": "Tamsaout",
      "value": "Tamsaout"
    },
    {
      "label": "Oulad Ouchchih",
      "value": "Oulad Ouchchih"
    },
    {
      "label": "Ounagha",
      "value": "Ounagha"
    },
    {
      "label": "Boumia",
      "value": "Boumia"
    },
    {
      "label": "Oulad Fares",
      "value": "Oulad Fares"
    },
    {
      "label": "Oulad Aïssa",
      "value": "Oulad Aïssa"
    },
    {
      "label": "Jaidte Lbatma",
      "value": "Jaidte Lbatma"
    },
    {
      "label": "Boumalne",
      "value": "Boumalne"
    },
    {
      "label": "Nkheila",
      "value": "Nkheila"
    },
    {
      "label": "Aj Jourf",
      "value": "Aj Jourf"
    },
    {
      "label": "Ar Rommani",
      "value": "Ar Rommani"
    },
    {
      "label": "Ain Kansara",
      "value": "Ain Kansara"
    },
    {
      "label": "Guisser",
      "value": "Guisser"
    },
    {
      "label": "Gharbia",
      "value": "Gharbia"
    },
    {
      "label": "Oulad Hamdane",
      "value": "Oulad Hamdane"
    },
    {
      "label": "Malloussa",
      "value": "Malloussa"
    },
    {
      "label": "Tahannawt",
      "value": "Tahannawt"
    },
    {
      "label": "Mayate",
      "value": "Mayate"
    },
    {
      "label": "Steha",
      "value": "Steha"
    },
    {
      "label": "Al Fayd",
      "value": "Al Fayd"
    },
    {
      "label": "Oulad Daoud",
      "value": "Oulad Daoud"
    },
    {
      "label": "Ain Beida",
      "value": "Ain Beida"
    },
    {
      "label": "Souq Jamaa Fdalate",
      "value": "Souq Jamaa Fdalate"
    },
    {
      "label": "Sidi Yahia",
      "value": "Sidi Yahia"
    },
    {
      "label": "Aït I’yach",
      "value": "Aït I’yach"
    },
    {
      "label": "Matmata",
      "value": "Matmata"
    },
    {
      "label": "Tizi Nisly",
      "value": "Tizi Nisly"
    },
    {
      "label": "Zemamra",
      "value": "Zemamra"
    },
    {
      "label": "Oulad Amrane el Mekki",
      "value": "Oulad Amrane el Mekki"
    },
    {
      "label": "El Arba Des Bir Lenni",
      "value": "El Arba Des Bir Lenni"
    },
    {
      "label": "Tiddas",
      "value": "Tiddas"
    },
    {
      "label": "Toualet",
      "value": "Toualet"
    },
    {
      "label": "Sidi Amer El Hadi",
      "value": "Sidi Amer El Hadi"
    },
    {
      "label": "Tifni",
      "value": "Tifni"
    },
    {
      "label": "Tamezmout",
      "value": "Tamezmout"
    },
    {
      "label": "Moulay Driss Zerhoun",
      "value": "Moulay Driss Zerhoun"
    },
    {
      "label": "Oulad Friha",
      "value": "Oulad Friha"
    },
    {
      "label": "Oulad Hamdane",
      "value": "Oulad Hamdane"
    },
    {
      "label": "Derdara",
      "value": "Derdara"
    },
    {
      "label": "Sidi Kasem",
      "value": "Sidi Kasem"
    },
    {
      "label": "Taïneste",
      "value": "Taïneste"
    },
    {
      "label": "Al M’aziz",
      "value": "Al M’aziz"
    },
    {
      "label": "Dzouz",
      "value": "Dzouz"
    },
    {
      "label": "Bouabout",
      "value": "Bouabout"
    },
    {
      "label": "Tawnza",
      "value": "Tawnza"
    },
    {
      "label": "Douar Trougout",
      "value": "Douar Trougout"
    },
    {
      "label": "Ahlaf",
      "value": "Ahlaf"
    },
    {
      "label": "Sidi Moussa Ben Ali",
      "value": "Sidi Moussa Ben Ali"
    },
    {
      "label": "El Khemis des Beni Chegdal",
      "value": "El Khemis des Beni Chegdal"
    },
    {
      "label": "Amdel",
      "value": "Amdel"
    },
    {
      "label": "Ain Legdah",
      "value": "Ain Legdah"
    },
    {
      "label": "Laqraqra",
      "value": "Laqraqra"
    },
    {
      "label": "Douar Sgarta",
      "value": "Douar Sgarta"
    },
    {
      "label": "Lahfayr",
      "value": "Lahfayr"
    },
    {
      "label": "Boudenib",
      "value": "Boudenib"
    },
    {
      "label": "Tilmi",
      "value": "Tilmi"
    },
    {
      "label": "Douar Oulad Naoual",
      "value": "Douar Oulad Naoual"
    },
    {
      "label": "Lamsabih",
      "value": "Lamsabih"
    },
    {
      "label": "Ouaklim Oukider",
      "value": "Ouaklim Oukider"
    },
    {
      "label": "Jem’at Oulad ’Abbou",
      "value": "Jem’at Oulad ’Abbou"
    },
    {
      "label": "Lafrayta",
      "value": "Lafrayta"
    },
    {
      "label": "Commune Sidi Youssef Ben Ahmed",
      "value": "Commune Sidi Youssef Ben Ahmed"
    },
    {
      "label": "El Ghourdane",
      "value": "El Ghourdane"
    },
    {
      "label": "Jamaat Shaim",
      "value": "Jamaat Shaim"
    },
    {
      "label": "Touama",
      "value": "Touama"
    },
    {
      "label": "Sidi Abdellah Ben Taazizt",
      "value": "Sidi Abdellah Ben Taazizt"
    },
    {
      "label": "Iygli",
      "value": "Iygli"
    },
    {
      "label": "Tissa",
      "value": "Tissa"
    },
    {
      "label": "Douar Jwalla",
      "value": "Douar Jwalla"
    },
    {
      "label": "Boujediane",
      "value": "Boujediane"
    },
    {
      "label": "Douar Ain Maatouf",
      "value": "Douar Ain Maatouf"
    },
    {
      "label": "Zaouiet Says",
      "value": "Zaouiet Says"
    },
    {
      "label": "Iazizatene",
      "value": "Iazizatene"
    },
    {
      "label": "Kariat Ben Aouda",
      "value": "Kariat Ben Aouda"
    },
    {
      "label": "Farkhâna",
      "value": "Farkhâna"
    },
    {
      "label": "Takad Sahel",
      "value": "Takad Sahel"
    },
    {
      "label": "Timahdit",
      "value": "Timahdit"
    },
    {
      "label": "Bni Drar",
      "value": "Bni Drar"
    },
    {
      "label": "Figuig",
      "value": "Figuig"
    },
    {
      "label": "Imi Mokorn",
      "value": "Imi Mokorn"
    },
    {
      "label": "Douar Bouchfaa",
      "value": "Douar Bouchfaa"
    },
    {
      "label": "Tanant",
      "value": "Tanant"
    },
    {
      "label": "Arbaa Sahel",
      "value": "Arbaa Sahel"
    },
    {
      "label": "Taouloukoult",
      "value": "Taouloukoult"
    },
    {
      "label": "Agdz",
      "value": "Agdz"
    },
    {
      "label": "Sebt Ait Ikkou",
      "value": "Sebt Ait Ikkou"
    },
    {
      "label": "Lamhadi",
      "value": "Lamhadi"
    },
    {
      "label": "Hetane",
      "value": "Hetane"
    },
    {
      "label": "Itzer",
      "value": "Itzer"
    },
    {
      "label": "Toundout",
      "value": "Toundout"
    },
    {
      "label": "Abadou",
      "value": "Abadou"
    },
    {
      "label": "Aïn Zora",
      "value": "Aïn Zora"
    },
    {
      "label": "Aït Hani",
      "value": "Aït Hani"
    },
    {
      "label": "Tamanar",
      "value": "Tamanar"
    },
    {
      "label": "Had Laaounate",
      "value": "Had Laaounate"
    },
    {
      "label": "Tourza",
      "value": "Tourza"
    },
    {
      "label": "Amtar",
      "value": "Amtar"
    },
    {
      "label": "Mokrisset",
      "value": "Mokrisset"
    },
    {
      "label": "Tilougguit",
      "value": "Tilougguit"
    },
    {
      "label": "Sidi Bousber",
      "value": "Sidi Bousber"
    },
    {
      "label": "Souq Sebt Says",
      "value": "Souq Sebt Says"
    },
    {
      "label": "Sidi Abdallah",
      "value": "Sidi Abdallah"
    },
    {
      "label": "Sidi Boushab",
      "value": "Sidi Boushab"
    },
    {
      "label": "Zawyat Ahançal",
      "value": "Zawyat Ahançal"
    },
    {
      "label": "Awfouss",
      "value": "Awfouss"
    },
    {
      "label": "Oulad Slim",
      "value": "Oulad Slim"
    },
    {
      "label": "Oued Amlil",
      "value": "Oued Amlil"
    },
    {
      "label": "Brikcha",
      "value": "Brikcha"
    },
    {
      "label": "Douar Echbanat",
      "value": "Douar Echbanat"
    },
    {
      "label": "Tnine Sidi Lyamani",
      "value": "Tnine Sidi Lyamani"
    },
    {
      "label": "Beni Oulid",
      "value": "Beni Oulid"
    },
    {
      "label": "Aghbalou n’Kerdous",
      "value": "Aghbalou n’Kerdous"
    },
    {
      "label": "Bounaamane",
      "value": "Bounaamane"
    },
    {
      "label": "Jaqma",
      "value": "Jaqma"
    },
    {
      "label": "Dar Si Aissa",
      "value": "Dar Si Aissa"
    },
    {
      "label": "Sgamna",
      "value": "Sgamna"
    },
    {
      "label": "Ksar Lmajaz",
      "value": "Ksar Lmajaz"
    },
    {
      "label": "Douar Mzoura",
      "value": "Douar Mzoura"
    },
    {
      "label": "Jemaat Oulad Mhamed",
      "value": "Jemaat Oulad Mhamed"
    },
    {
      "label": "Msila",
      "value": "Msila"
    },
    {
      "label": "Aïn Zohra",
      "value": "Aïn Zohra"
    },
    {
      "label": "Za’roura",
      "value": "Za’roura"
    },
    {
      "label": "La’tamna",
      "value": "La’tamna"
    },
    {
      "label": "Jafra",
      "value": "Jafra"
    },
    {
      "label": "Taghbalt",
      "value": "Taghbalt"
    },
    {
      "label": "Bou’nane",
      "value": "Bou’nane"
    },
    {
      "label": "Zaggota",
      "value": "Zaggota"
    },
    {
      "label": "Tarhjicht",
      "value": "Tarhjicht"
    },
    {
      "label": "Kenafif",
      "value": "Kenafif"
    },
    {
      "label": "Dar El Kebdani",
      "value": "Dar El Kebdani"
    },
    {
      "label": "Sidi Rahhal",
      "value": "Sidi Rahhal"
    },
    {
      "label": "Kourimat",
      "value": "Kourimat"
    },
    {
      "label": "Ech Chaïbat",
      "value": "Ech Chaïbat"
    },
    {
      "label": "Foum Jam’a",
      "value": "Foum Jam’a"
    },
    {
      "label": "Douar Snada",
      "value": "Douar Snada"
    },
    {
      "label": "Boudinar",
      "value": "Boudinar"
    },
    {
      "label": "Outa Bouabane",
      "value": "Outa Bouabane"
    },
    {
      "label": "Oulad ’Azzouz",
      "value": "Oulad ’Azzouz"
    },
    {
      "label": "Imlil",
      "value": "Imlil"
    },
    {
      "label": "Tiztoutine",
      "value": "Tiztoutine"
    },
    {
      "label": "Tadla",
      "value": "Tadla"
    },
    {
      "label": "Ain Karma",
      "value": "Ain Karma"
    },
    {
      "label": "Aghbalou Aqourar",
      "value": "Aghbalou Aqourar"
    },
    {
      "label": "Douar Lehouifrat",
      "value": "Douar Lehouifrat"
    },
    {
      "label": "Aklim",
      "value": "Aklim"
    },
    {
      "label": "Sidi Ahmed El Khadir",
      "value": "Sidi Ahmed El Khadir"
    },
    {
      "label": "’Aïn Leuh",
      "value": "’Aïn Leuh"
    },
    {
      "label": "Oued Laou",
      "value": "Oued Laou"
    },
    {
      "label": "Bni Boufrah",
      "value": "Bni Boufrah"
    },
    {
      "label": "Oulad Imloul",
      "value": "Oulad Imloul"
    },
    {
      "label": "Bou Zemou",
      "value": "Bou Zemou"
    },
    {
      "label": "Oulad Ayyad",
      "value": "Oulad Ayyad"
    },
    {
      "label": "Tatoufet",
      "value": "Tatoufet"
    },
    {
      "label": "Zawyat Sidi Ben Hamdoun",
      "value": "Zawyat Sidi Ben Hamdoun"
    },
    {
      "label": "Bni Gmil",
      "value": "Bni Gmil"
    },
    {
      "label": "Douar Messassa",
      "value": "Douar Messassa"
    },
    {
      "label": "Gaada",
      "value": "Gaada"
    },
    {
      "label": "Berkine",
      "value": "Berkine"
    },
    {
      "label": "El Amim",
      "value": "El Amim"
    },
    {
      "label": "Tissaf",
      "value": "Tissaf"
    },
    {
      "label": "Tissint",
      "value": "Tissint"
    },
    {
      "label": "Sidi El Hattab",
      "value": "Sidi El Hattab"
    },
    {
      "label": "Gammasa",
      "value": "Gammasa"
    },
    {
      "label": "Mhâjâr",
      "value": "Mhâjâr"
    },
    {
      "label": "Douar Oulad Bouziane",
      "value": "Douar Oulad Bouziane"
    },
    {
      "label": "Ameskroud",
      "value": "Ameskroud"
    },
    {
      "label": "Laanoussar",
      "value": "Laanoussar"
    },
    {
      "label": "Laghzawna",
      "value": "Laghzawna"
    },
    {
      "label": "Douar Oulad Sidi Moussa",
      "value": "Douar Oulad Sidi Moussa"
    },
    {
      "label": "Sidi Lahsene",
      "value": "Sidi Lahsene"
    },
    {
      "label": "Douar Ezzerarda",
      "value": "Douar Ezzerarda"
    },
    {
      "label": "Oulad Cherif",
      "value": "Oulad Cherif"
    },
    {
      "label": "Tanakoub",
      "value": "Tanakoub"
    },
    {
      "label": "Sidi Bou Othmane",
      "value": "Sidi Bou Othmane"
    },
    {
      "label": "Douar El Mellaliyine",
      "value": "Douar El Mellaliyine"
    },
    {
      "label": "Bir Tam Tam",
      "value": "Bir Tam Tam"
    },
    {
      "label": "Tafersit",
      "value": "Tafersit"
    },
    {
      "label": "Mwaline al Oued",
      "value": "Mwaline al Oued"
    },
    {
      "label": "Chtiba",
      "value": "Chtiba"
    },
    {
      "label": "Iguidiy",
      "value": "Iguidiy"
    },
    {
      "label": "Sidi Ouassay",
      "value": "Sidi Ouassay"
    },
    {
      "label": "Gtarna",
      "value": "Gtarna"
    },
    {
      "label": "Aïn el Mediour",
      "value": "Aïn el Mediour"
    },
    {
      "label": "Had Dra",
      "value": "Had Dra"
    },
    {
      "label": "Foum Zguid",
      "value": "Foum Zguid"
    },
    {
      "label": "Bni Sidel",
      "value": "Bni Sidel"
    },
    {
      "label": "Zawyat Sidi al Mekki",
      "value": "Zawyat Sidi al Mekki"
    },
    {
      "label": "Douar Ait Taleb",
      "value": "Douar Ait Taleb"
    },
    {
      "label": "Imilchil",
      "value": "Imilchil"
    },
    {
      "label": "Iskourane",
      "value": "Iskourane"
    },
    {
      "label": "Msemrir",
      "value": "Msemrir"
    },
    {
      "label": "Ait Ikkou",
      "value": "Ait Ikkou"
    },
    {
      "label": "Aït Ouaoumana",
      "value": "Aït Ouaoumana"
    },
    {
      "label": "Agadir Melloul",
      "value": "Agadir Melloul"
    },
    {
      "label": "Amarzgane",
      "value": "Amarzgane"
    },
    {
      "label": "Hassi Berkane",
      "value": "Hassi Berkane"
    },
    {
      "label": "Saidia",
      "value": "Saidia"
    },
    {
      "label": "Tiqqi",
      "value": "Tiqqi"
    },
    {
      "label": "Bouhlou",
      "value": "Bouhlou"
    },
    {
      "label": "Iaboutene",
      "value": "Iaboutene"
    },
    {
      "label": "Tleta Taghramt",
      "value": "Tleta Taghramt"
    },
    {
      "label": "Sidi el Mokhfi",
      "value": "Sidi el Mokhfi"
    },
    {
      "label": "Sidi Dahbi",
      "value": "Sidi Dahbi"
    },
    {
      "label": "Zawiat Moulay Brahim",
      "value": "Zawiat Moulay Brahim"
    },
    {
      "label": "Oulad Khallouf",
      "value": "Oulad Khallouf"
    },
    {
      "label": "Oulad Khallouf",
      "value": "Oulad Khallouf"
    },
    {
      "label": "Lakhzazra",
      "value": "Lakhzazra"
    },
    {
      "label": "Lambarkiyine",
      "value": "Lambarkiyine"
    },
    {
      "label": "Bir Anzarane",
      "value": "Bir Anzarane"
    },
    {
      "label": "Tifariti",
      "value": "Tifariti"
    },
    {
      "label": "Uad Damran",
      "value": "Uad Damran"
    },
    {
      "label": "Lemsid",
      "value": "Lemsid"
    }
  ]
  const assurance = [
    {
      "label": "CNSS",
      "value": "CNSS"
    },
    {
      "label": "CNOPS ",
      "value": "CNOPS "
    },
    {
      "label": "RMA",
      "value": " RMA"
    },
    {
      "label": "AMO ",
      "value": "AMO "
    },
    
  ]
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const inputs = useRef<HTMLInputElement[]>([]);
  const handleCityChange = (selectedOption: { value: string }) => {
    setFormData({ ...formData, city: selectedOption.value });
    setErrors({ ...errors, city: "" });
  };
  const handlassuranceChange = (selectedOption: { value: string }) => {
    setFormData({ ...formData, assurance: selectedOption.value });
    setErrors({ ...errors, assurance: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value);
  };

  const validateField = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
        }
        break;
      case "password":
        if (value.length < 8  && value.length > 32) {
          error = "Password must be at least 6 characters long";
        }
        break;
      case "confirm_password":
        if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      default:
        if (!value) {
          error = "This field is required";
        }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
  
      // Send to API
      try {
        const response = await fetch("http://127.0.0.1:8000/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error during submission:", error);
      }
    }
  };
  
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("light");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (!/^[0-9]{1}$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && !e.metaKey) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (index > 0) {
        inputs.current[index - 1].focus();
        inputs.current[index - 1].value = "";
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const { value } = e.currentTarget;
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${inputs.current.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    inputs.current.forEach((input, index) => {
      input.value = digits[index];
    });
  };

  const handleVerify = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const combinedValue = inputs.current.map((input) => input.value).join("");

    if (combinedValue === "1937") {
      setStep(step + 1);
      console.log("Verified");
    } else {
      alert("Verification failed. Please try again.");
      inputs.current.forEach((input) => {
        input.value = "";
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100  text-gray-900  flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white  shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 "
          >
            <svg className="fill-violet-700 block " fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg className="fill-yellow-500 hidden " fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="my-12 border-b text-center">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-blue-800 sm:text-4xl sm:leading-10 text-center">
              <span className="bg-gradient-to-r from-gray-400 via-blue-300 to-purple-500 text-transparent bg-clip-text inline-block text-center">
                Welcome! Let's Get Started.
              </span>
            </h2>
            <br />
            <p className="text-lg text-gray-800  leading-relaxed mb-6">
              We're excited to have you join us. Please fill out the form below to get started with your registration. Make sure to provide accurate information for smooth processing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              {step === 1 && (
                <div className="mx-auto max-w-xs">
                  <label htmlFor="last_name" className="sr-only">Last Name</label>
                  <input
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white  ${errors.last_name ? "border-red-500" : ""}`}
                    type="text"
                    placeholder="Enter Your Last Name"
                  />
                  {errors.last_name && <p className="text-red-500 text-sm mt-2">{errors.last_name}</p>}
                  <label htmlFor="first_name" className="sr-only">First Name</label>
                  <input
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`mt-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white  ${errors.first_name ? "border-red-500" : ""}`}
                    type="text"
                    placeholder="Enter Your First Name"
                  />
                  {errors.first_name && <p className="text-red-500 text-sm mt-2">{errors.first_name}</p>}
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white  ${errors.email ? "border-red-500" : ""}`}
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="mt-4 w-full py-4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="mx-auto max-w-xs">
                  <label htmlFor="birthday" className="sr-only">Birthday</label>
                  <input
                    id="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white ${errors.birthday ? "border-red-500" : ""}`}
                    type="date"
                    placeholder="Enter Your Birthday"
                  />
                  {errors.birthday && <p className="text-red-500 text-sm mt-2">{errors.birthday}</p>}
                  <label htmlFor="city" className="sr-only">City</label>
                  <Select
                    id="city"
                    value={marocCities.find(city => city.value === formData.city)}
                    onChange={handleCityChange}
                    options={marocCities}
                    className={`mt-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white  ${errors.city ? "border-red-500" : ""}`}
                    placeholder="Select Your City"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-2">{errors.city}</p>}
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="w-1/2 mr-2 py-4 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-1/2 ml-2 py-4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="mx-auto max-w-xs">
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white ${errors.phone ? "border-red-500" : ""}`}
                    type="tel"
                    placeholder="Enter Your Phone"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                  <label htmlFor="assurance" className="sr-only">Assurance</label>
                
                  <Select
                    id="city"
                    value={assurance.find(type => type.value === formData.assurance)}
                    onChange={handlassuranceChange}
                    options={assurance}
                    className={`mt-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white ${errors.city ? "border-red-500" : ""}`}
                    placeholder="Select Your Assurance"
                  />
                  {errors.assurance && <p className="text-red-500 text-sm mt-2">{errors.assurance}</p>}
                  <label htmlFor="num_assurance" className="sr-only">Assurance Number</label>
                  <input
                    id="num_assurance"
                    value={formData.num_assurance}
                    onChange={handleChange}
                    className={`mt-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white ${errors.num_assurance ? "border-red-500" : ""}`}
                    type="text"
                    placeholder="Enter Your Assurance Number"
                  />
                  {errors.num_assurance && <p className="text-red-500 text-sm mt-2">{errors.num_assurance}</p>}
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="w-1/2 mr-2 py-4 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-1/2 ml-2 py-4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="mx-auto max-w-xs">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    minLength={8}
                    maxLength={32}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white  ${errors.password ? "border-red-500" : ""}`}
                    type="password"
                    placeholder="Enter Your Password"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                  <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className={`mt-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-300  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white  ${errors.confirm_password ? "border-red-500" : ""}`}
                    type="password"
                    placeholder="Confirm Your Password"
                  />
                  {errors.confirm_password && <p className="text-red-500 text-sm mt-2">{errors.confirm_password}</p>}
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="w-1/2 mr-2 py-4 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 ml-2 py-4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                  <header className="mb-8">
                    <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
                    <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
                  </header>
                  <div id="otp-form">
                    <div className="flex items-center justify-center gap-3">
                      {[...Array(4)].map((_, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputs.current[index] = el!)}
                          type="text"
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          maxLength={1}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onInput={(e) => handleInput(e, index)}
                          onFocus={handleFocus}
                          onPaste={handlePaste}
                        />
                      ))}
                    </div>
                    <div className="max-w-[260px] mx-auto mt-4">
                      <button
                        onClick={handleVerify}
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                      >
                        Verify Account
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 mt-4">
                    Didn't receive code?{" "}
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              )}
              {step === 6 && (
                <div className="mx-auto max-w-xs text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900  sm:text-4xl">
                    Registration Successful!
                  </h2>
                  <p className="mt-4 text-lg text-gray-600  leading-relaxed">
                    Thank you for registering. We're delighted to have you on
                    board. Enjoy our services!
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="flex-1 bg-indigo-100  text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${cardiologist})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;