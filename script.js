const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

const fromText = document.querySelector(`.from-text`),
  toText = document.querySelector(`.to-text`),
  selectTags = document.querySelectorAll(`select`),
  exchangeIcon = document.getElementById(`exchange`),
  translateBtn = document.querySelector(`button`),
  icons = document.querySelectorAll(`.row i`);

exchangeIcon.addEventListener(`click`, () => {
  let tempText = fromText.value,
    tempLang = selectTags[0].value;
  fromText.value = toText.value;
  selectTags[0].value = selectTags[1].value;
  toText.value = tempText;
  selectTags[1].value = tempLang;
});

selectTags.forEach((tag, id) => {
  for (let country_code in countries) {
    let selected;

    if (id === 0 && country_code === `GB`) {
      selected = `selected`;
    } else if (id === 1 && country_code === `hi-IN`) {
      selected = `selected`;
    }

    let option = `
      <option value="${country_code}">${countries[country_code]}</option>
    `;
    tag.insertAdjacentHTML(`beforeend`, option);
  }
});

translateBtn.addEventListener(`click`, () => {
  let text = fromText.value,
    translateFrom = selectTags[0].value,
    translateTo = selectTags[1].value;

  if (!text) return;

  toText.setAttribute("placeholder", `Translating...`);
  let API_URL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains`fa-copy`) {
      if (target.id === "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
      alert(`Text copied to clipboard!`);
    } else {
      let utterance;
      if (target.id === "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTags[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTags[1].value;
      }
      window.speechSynthesis.speak(utterance);
    }
  });
});
