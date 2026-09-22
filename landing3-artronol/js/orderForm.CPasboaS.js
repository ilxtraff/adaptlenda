import { g as et } from "./_commonjsHelpers.Cpj98o6Y.js";

function getLangAndCountryFromHtml() {
    const langAttr = (document.documentElement && document.documentElement.lang) || "";
    if (!langAttr) return { language: null, country: null };

    const parts = langAttr.split(/[-_]/); // поддержим и hu-HU, и hu_HU
    const language = (parts[0] || "").toLowerCase() || null;
    const country = (parts[1] || "").toLowerCase() || null;

    return { language, country };
}

const it = "modulepreload";

const st = function (u) {
    return "/" + u;
};

const U = {};

const nt = function (h, d, _) {
    let C = Promise.resolve();

    if (d && d.length > 0) {
        let S = function (I) {
            return Promise.all(
                I.map((D) =>
                    Promise.resolve(D).then(
                        (A) => ({ status: "fulfilled", value: A }),
                        (A) => ({ status: "rejected", reason: A })
                    )
                )
            );
        };

        document.getElementsByTagName("link");

        const L = document.querySelector("meta[property=csp-nonce]");
        const k = L?.nonce || L?.getAttribute("nonce");

        C = S(
            d.map((I) => {
                if ((I = st(I), I in U)) return;
                U[I] = !0;

                const D = I.endsWith(".css");
                const A = D ? '[rel="stylesheet"]' : "";

                if (document.querySelector(`link[href="${I}"]${A}`)) return;

                const g = document.createElement("link");
                g.rel = D ? "stylesheet" : it;

                if (!D) {
                    g.as = "script";
                }

                g.crossOrigin = "";
                g.href = I;

                if (k) {
                    g.setAttribute("nonce", k);
                }

                document.head.appendChild(g);

                if (D) {
                    return new Promise((M, F) => {
                        g.addEventListener("load", M);
                        g.addEventListener("error", () =>
                            F(new Error(`Unable to preload CSS for ${I}`))
                        );
                    });
                }
            })
        );
    }

    function v(S) {
        const L = new Event("vite:preloadError", { cancelable: !0 });
        L.payload = S;
        window.dispatchEvent(L);
        if (!L.defaultPrevented) throw S;
    }

    return C.then((S) => {
        for (const L of S || []) {
            if (L.status === "rejected") v(L.reason);
        }
        return h().catch(v);
    });
};

var O = { exports: {} };
var H;

function ot() {
    return (
        H ||
        (H = 1,
            function (u) {
                (function (h) {
                    u.exports ? (u.exports = h()) : (window.intlTelInput = h());
                })(() => {
                    // >>> ВЕСЬ vendor-код intl-tel-input,
                    // СКОЛЬКО ТЫ ПРИСЛАЛ, Я ОСТАВЛЯЮ БЕЗ ИЗМЕНЕНИЙ:

                    var h = (() => {
                        var d = Object.defineProperty,
                            _ = Object.getOwnPropertyDescriptor,
                            C = Object.getOwnPropertyNames,
                            v = Object.prototype.hasOwnProperty,
                            S = (t, e) => {
                                for (var i in e) d(t, i, { get: e[i], enumerable: !0 });
                            },
                            L = (t, e, i, s) => {
                                if ((e && typeof e == "object") || typeof e == "function")
                                    for (let n of C(e))
                                        !v.call(t, n) &&
                                            n !== i &&
                                            d(t, n, {
                                                get: () => e[n],
                                                enumerable: !(s = _(e, n)) || s.enumerable
                                            });
                                return t;
                            },
                            k = (t) => L(d({}, "__esModule", { value: !0 }), t),
                            I = {};

                        S(I, { Iti: () => $, default: () => X });

                        var D = [
                            ["af", "93"],
                            ["ax", "358", 1],
                            ["al", "355"],
                            ["dz", "213"],
                            ["as", "1", 5, ["684"]],
                            ["ad", "376"],
                            ["ao", "244"],
                            ["ai", "1", 6, ["264"]],
                            ["ag", "1", 7, ["268"]],
                            ["ar", "54"],
                            ["am", "374"],
                            ["aw", "297"],
                            ["ac", "247"],
                            ["au", "61", 0, null, "0"],
                            ["at", "43"],
                            ["az", "994"],
                            ["bs", "1", 8, ["242"]],
                            ["bh", "973"],
                            ["bd", "880"],
                            ["bb", "1", 9, ["246"]],
                            ["by", "375"],
                            ["be", "32"],
                            ["bz", "501"],
                            ["bj", "229"],
                            ["bm", "1", 10, ["441"]],
                            ["bt", "975"],
                            ["bo", "591"],
                            ["ba", "387"],
                            ["bw", "267"],
                            ["br", "55"],
                            ["io", "246"],
                            ["vg", "1", 11, ["284"]],
                            ["bn", "673"],
                            ["bg", "359"],
                            ["bf", "226"],
                            ["bi", "257"],
                            ["kh", "855"],
                            ["cm", "237"],
                            [
                                "ca",
                                "1",
                                1,
                                [
                                    "204",
                                    "226",
                                    "236",
                                    "249",
                                    "250",
                                    "263",
                                    "289",
                                    "306",
                                    "343",
                                    "354",
                                    "365",
                                    "367",
                                    "368",
                                    "382",
                                    "387",
                                    "403",
                                    "416",
                                    "418",
                                    "428",
                                    "431",
                                    "437",
                                    "438",
                                    "450",
                                    "584",
                                    "468",
                                    "474",
                                    "506",
                                    "514",
                                    "519",
                                    "548",
                                    "579",
                                    "581",
                                    "584",
                                    "587",
                                    "604",
                                    "613",
                                    "639",
                                    "647",
                                    "672",
                                    "683",
                                    "705",
                                    "709",
                                    "742",
                                    "753",
                                    "778",
                                    "780",
                                    "782",
                                    "807",
                                    "819",
                                    "825",
                                    "867",
                                    "873",
                                    "879",
                                    "902",
                                    "905"
                                ]
                            ],
                            ["cv", "238"],
                            ["bq", "599", 1, ["3", "4", "7"]],
                            ["ky", "1", 12, ["345"]],
                            ["cf", "236"],
                            ["td", "235"],
                            ["cl", "56"],
                            ["cn", "86"],
                            ["cx", "61", 2, ["89164"], "0"],
                            ["cc", "61", 1, ["89162"], "0"],
                            ["co", "57"],
                            ["km", "269"],
                            ["cg", "242"],
                            ["cd", "243"],
                            ["ck", "682"],
                            ["cr", "506"],
                            ["ci", "225"],
                            ["hr", "385"],
                            ["cu", "53"],
                            ["cw", "599", 0],
                            ["cy", "357"],
                            ["cz", "420"],
                            ["dk", "45"],
                            ["dj", "253"],
                            ["dm", "1", 13, ["767"]],
                            ["do", "1", 2, ["809", "829", "849"]],
                            ["ec", "593"],
                            ["eg", "20"],
                            ["sv", "503"],
                            ["gq", "240"],
                            ["er", "291"],
                            ["ee", "372"],
                            ["sz", "268"],
                            ["et", "251"],
                            ["fk", "500"],
                            ["fo", "298"],
                            ["fj", "679"],
                            ["fi", "358", 0],
                            ["fr", "33"],
                            ["gf", "594"],
                            ["pf", "689"],
                            ["ga", "241"],
                            ["gm", "220"],
                            ["ge", "995"],
                            ["de", "49"],
                            ["gh", "233"],
                            ["gi", "350"],
                            ["gr", "30"],
                            ["gl", "299"],
                            ["gd", "1", 14, ["473"]],
                            ["gp", "590", 0],
                            ["gu", "1", 15, ["671"]],
                            ["gt", "502"],
                            ["gg", "44", 1, ["1481", "7781", "7839", "7911"], "0"],
                            ["gn", "224"],
                            ["gw", "245"],
                            ["gy", "592"],
                            ["ht", "509"],
                            ["hn", "504"],
                            ["hk", "852"],
                            ["hu", "36"],
                            ["is", "354"],
                            ["in", "91"],
                            ["id", "62"],
                            ["ir", "98"],
                            ["iq", "964"],
                            ["ie", "353"],
                            ["im", "44", 2, ["1624", "74576", "7524", "7924", "7624"], "0"],
                            ["il", "972"],
                            ["it", "39", 0],
                            ["jm", "1", 4, ["876", "658"]],
                            ["jp", "81"],
                            ["je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"], "0"],
                            ["jo", "962"],
                            ["kz", "7", 1, ["33", "7"], "8"],
                            ["ke", "254"],
                            ["ki", "686"],
                            ["xk", "383"],
                            ["kw", "965"],
                            ["kg", "996"],
                            ["la", "856"],
                            ["lv", "371"],
                            ["lb", "961"],
                            ["ls", "266"],
                            ["lr", "231"],
                            ["ly", "218"],
                            ["li", "423"],
                            ["lt", "370"],
                            ["lu", "352"],
                            ["mo", "853"],
                            ["mg", "261"],
                            ["mw", "265"],
                            ["my", "60"],
                            ["mv", "960"],
                            ["ml", "223"],
                            ["mt", "356"],
                            ["mh", "692"],
                            ["mq", "596"],
                            ["mr", "222"],
                            ["mu", "230"],
                            ["yt", "262", 1, ["269", "639"], "0"],
                            ["mx", "52"],
                            ["fm", "691"],
                            ["md", "373"],
                            ["mc", "377"],
                            ["mn", "976"],
                            ["me", "382"],
                            ["ms", "1", 16, ["664"]],
                            ["ma", "212", 0, null, "0"],
                            ["mz", "258"],
                            ["mm", "95"],
                            ["na", "264"],
                            ["nr", "674"],
                            ["np", "977"],
                            ["nl", "31"],
                            ["nc", "687"],
                            ["nz", "64"],
                            ["ni", "505"],
                            ["ne", "227"],
                            ["ng", "234"],
                            ["nu", "683"],
                            ["nf", "672"],
                            ["kp", "850"],
                            ["mk", "389"],
                            ["mp", "1", 17, ["670"]],
                            ["no", "47", 0],
                            ["om", "968"],
                            ["pk", "92"],
                            ["pw", "680"],
                            ["ps", "970"],
                            ["pa", "507"],
                            ["pg", "675"],
                            ["py", "595"],
                            ["pe", "51"],
                            ["ph", "63"],
                            ["pl", "48"],
                            ["pt", "351"],
                            ["pr", "1", 3, ["787", "939"]],
                            ["qa", "974"],
                            ["re", "262", 0, null, "0"],
                            ["ro", "40"],
                            ["ru", "7", 0, null, "8"],
                            ["rw", "250"],
                            ["ws", "685"],
                            ["sm", "378"],
                            ["st", "239"],
                            ["sa", "966"],
                            ["sn", "221"],
                            ["rs", "381"],
                            ["sc", "248"],
                            ["sl", "232"],
                            ["sg", "65"],
                            ["sx", "1", 21, ["721"]],
                            ["sk", "421"],
                            ["si", "386"],
                            ["sb", "677"],
                            ["so", "252"],
                            ["za", "27"],
                            ["kr", "82"],
                            ["ss", "211"],
                            ["es", "34"],
                            ["lk", "94"],
                            ["bl", "590", 1],
                            ["sh", "290"],
                            ["kn", "1", 18, ["869"]],
                            ["lc", "1", 19, ["758"]],
                            ["mf", "590", 2],
                            ["pm", "508"],
                            ["vc", "1", 20, ["784"]],
                            ["sd", "249"],
                            ["sr", "597"],
                            ["sj", "47", 1, ["79"]],
                            ["se", "46"],
                            ["ch", "41"],
                            ["sy", "963"],
                            ["tw", "886"],
                            ["tj", "992"],
                            ["tz", "255"],
                            ["th", "66"],
                            ["tl", "670"],
                            ["tg", "228"],
                            ["tk", "690"],
                            ["to", "676"],
                            ["tt", "1", 22, ["868"]],
                            ["tn", "216"],
                            ["tr", "90"],
                            ["tm", "993"],
                            ["tc", "1", 23, ["649"]],
                            ["tv", "688"],
                            ["ug", "256"],
                            ["ua", "380"],
                            ["ae", "971"],
                            ["gb", "44", 0, null, "0"],
                            ["us", "1", 0],
                            ["uy", "598"],
                            ["vi", "1", 24, ["340"]],
                            ["uz", "998"],
                            ["vu", "678"],
                            ["va", "39", 1, ["06698"]],
                            ["ve", "58"],
                            ["vn", "84"],
                            ["wf", "681"],
                            ["eh", "212", 1, ["5288", "5289"], "0"],
                            ["ye", "967"],
                            ["zm", "260"],
                            ["zw", "263"]
                        ],
                            A = [];

                        for (let t = 0; t < D.length; t++) {
                            const e = D[t];
                            A[t] = {
                                name: "",
                                iso2: e[0],
                                dialCode: e[1],
                                priority: e[2] || 0,
                                areaCodes: e[3] || null,
                                nodeById: {},
                                nationalPrefix: e[4] || null
                            };
                        }

                        var g = A,
                            M = {
                                ad: "Andorra",
                                ae: "United Arab Emirates",
                                af: "Afghanistan",
                                ag: "Antigua & Barbuda",
                                ai: "Anguilla",
                                al: "Albania",
                                am: "Armenia",
                                ao: "Angola",
                                ar: "Argentina",
                                as: "American Samoa",
                                at: "Austria",
                                au: "Australia",
                                aw: "Aruba",
                                ax: "Åland Islands",
                                az: "Azerbaijan",
                                ba: "Bosnia & Herzegovina",
                                bb: "Barbados",
                                bd: "Bangladesh",
                                be: "Belgium",
                                bf: "Burkina Faso",
                                bg: "Bulgaria",
                                bh: "Bahrain",
                                bi: "Burundi",
                                bj: "Benin",
                                bl: "St. Barthélemy",
                                bm: "Bermuda",
                                bn: "Brunei",
                                bo: "Bolivia",
                                bq: "Caribbean Netherlands",
                                br: "Brazil",
                                bs: "Bahamas",
                                bt: "Bhutan",
                                bw: "Botswana",
                                by: "Belarus",
                                bz: "Belize",
                                ca: "Canada",
                                cc: "Cocos (Keeling) Islands",
                                cd: "Congo - Kinshasa",
                                cf: "Central African Republic",
                                cg: "Congo - Brazzaville",
                                ch: "Switzerland",
                                ci: "Côte d’Ivoire",
                                ck: "Cook Islands",
                                cl: "Chile",
                                cm: "Cameroon",
                                cn: "China",
                                co: "Colombia",
                                cr: "Costa Rica",
                                cu: "Cuba",
                                cv: "Cape Verde",
                                cw: "Curaçao",
                                cx: "Christmas Island",
                                cy: "Cyprus",
                                cz: "Czechia",
                                de: "Germany",
                                dj: "Djibouti",
                                dk: "Denmark",
                                dm: "Dominica",
                                do: "Dominican Republic",
                                dz: "Algeria",
                                ec: "Ecuador",
                                ee: "Estonia",
                                eg: "Egypt",
                                eh: "Western Sahara",
                                er: "Eritrea",
                                es: "Spain",
                                et: "Ethiopia",
                                fi: "Finland",
                                fj: "Fiji",
                                fk: "Falkland Islands",
                                fm: "Micronesia",
                                fo: "Faroe Islands",
                                fr: "France",
                                ga: "Gabon",
                                gb: "United Kingdom",
                                gd: "Grenada",
                                ge: "Georgia",
                                gf: "French Guiana",
                                gg: "Guernsey",
                                gh: "Ghana",
                                gi: "Gibraltar",
                                gl: "Greenland",
                                gm: "Gambia",
                                gn: "Guinea",
                                gp: "Guadeloupe",
                                gq: "Equatorial Guinea",
                                gr: "Greece",
                                gt: "Guatemala",
                                gu: "Guam",
                                gw: "Guinea-Bissau",
                                gy: "Guyana",
                                hk: "Hong Kong SAR China",
                                hn: "Honduras",
                                hr: "Croatia",
                                ht: "Haiti",
                                hu: "Hungary",
                                id: "Indonesia",
                                ie: "Ireland",
                                il: "Israel",
                                im: "Isle of Man",
                                in: "India",
                                io: "British Indian Ocean Territory",
                                iq: "Iraq",
                                ir: "Iran",
                                is: "Iceland",
                                it: "Italy",
                                je: "Jersey",
                                jm: "Jamaica",
                                jo: "Jordan",
                                jp: "Japan",
                                ke: "Kenya",
                                kg: "Kyrgyzstan",
                                kh: "Cambodia",
                                ki: "Kiribati",
                                km: "Comoros",
                                kn: "St. Kitts & Nevis",
                                kp: "North Korea",
                                kr: "South Korea",
                                kw: "Kuwait",
                                ky: "Cayman Islands",
                                kz: "Kazakhstan",
                                la: "Laos",
                                lb: "Lebanon",
                                lc: "St. Lucia",
                                li: "Liechtenstein",
                                lk: "Sri Lanka",
                                lr: "Liberia",
                                ls: "Lesotho",
                                lt: "Lithuania",
                                lu: "Luxembourg",
                                lv: "Latvia",
                                ly: "Libya",
                                ma: "Morocco",
                                mc: "Monaco",
                                md: "Moldova",
                                me: "Montenegro",
                                mf: "St. Martin",
                                mg: "Madagascar",
                                mh: "Marshall Islands",
                                mk: "North Macedonia",
                                ml: "Mali",
                                mm: "Myanmar (Burma)",
                                mn: "Mongolia",
                                mo: "Macao SAR China",
                                mp: "Northern Mariana Islands",
                                mq: "Martinique",
                                mr: "Mauritania",
                                ms: "Montserrat",
                                mt: "Malta",
                                mu: "Mauritius",
                                mv: "Maldives",
                                mw: "Malawi",
                                mx: "Mexico",
                                my: "Malaysia",
                                mz: "Mozambique",
                                na: "Namibia",
                                nc: "New Caledonia",
                                ne: "Niger",
                                nf: "Norfolk Island",
                                ng: "Nigeria",
                                ni: "Nicaragua",
                                nl: "Netherlands",
                                no: "Norway",
                                np: "Nepal",
                                nr: "Nauru",
                                nu: "Niue",
                                nz: "New Zealand",
                                om: "Oman",
                                pa: "Panama",
                                pe: "Peru",
                                pf: "French Polynesia",
                                pg: "Papua New Guinea",
                                ph: "Philippines",
                                pk: "Pakistan",
                                pl: "Poland",
                                pm: "St. Pierre & Miquelon",
                                pr: "Puerto Rico",
                                ps: "Palestinian Territories",
                                pt: "Portugal",
                                pw: "Palau",
                                py: "Paraguay",
                                qa: "Qatar",
                                re: "Réunion",
                                ro: "Romania",
                                rs: "Serbia",
                                ru: "Russia",
                                rw: "Rwanda",
                                sa: "Saudi Arabia",
                                sb: "Solomon Islands",
                                sc: "Seychelles",
                                sd: "Sudan",
                                se: "Sweden",
                                sg: "Singapore",
                                sh: "St. Helena",
                                si: "Slovenia",
                                sj: "Svalbard & Jan Mayen",
                                sk: "Slovakia",
                                sl: "Sierra Leone",
                                sm: "San Marino",
                                sn: "Senegal",
                                so: "Somalia",
                                sr: "Suriname",
                                ss: "South Sudan",
                                st: "São Tomé & Príncipe",
                                sv: "El Salvador",
                                sx: "Sint Maarten",
                                sy: "Syria",
                                sz: "Eswatini",
                                tc: "Turks & Caicos Islands",
                                td: "Chad",
                                tg: "Togo",
                                th: "Thailand",
                                tj: "Tajikistan",
                                tk: "Tokelau",
                                tl: "Timor-Leste",
                                tm: "Turkmenistan",
                                tn: "Tunisia",
                                to: "Tonga",
                                tr: "Turkey",
                                tt: "Trinidad & Tobago",
                                tv: "Tuvalu",
                                tw: "Taiwan",
                                tz: "Tanzania",
                                ua: "Ukraine",
                                ug: "Uganda",
                                us: "United States",
                                uy: "Uruguay",
                                uz: "Uzbekistan",
                                va: "Vatican City",
                                vc: "St. Vincent & Grenadines",
                                ve: "Venezuela",
                                vg: "British Virgin Islands",
                                vi: "U.S. Virgin Islands",
                                vn: "Vietnam",
                                vu: "Vanuatu",
                                wf: "Wallis & Futuna",
                                ws: "Samoa",
                                ye: "Yemen",
                                yt: "Mayotte",
                                za: "South Africa",
                                zm: "Zambia",
                                zw: "Zimbabwe"
                            },
                            F = M,
                            q = {
                                selectedCountryAriaLabel: "Selected country",
                                noCountrySelected: "No country selected",
                                countryListAriaLabel: "List of countries",
                                searchPlaceholder: "Search",
                                zeroSearchResults: "No results found",
                                oneSearchResult: "1 result found",
                                multipleSearchResults: "${count} results found",
                                ac: "Ascension Island",
                                xk: "Kosovo"
                            },
                            W = q,
                            G = { ...F, ...W },
                            R = G;

                        for (let t = 0; t < g.length; t++) g[t].name = R[g[t].iso2];

                        var Y = 0,
                            j = {
                                allowDropdown: !0,
                                autoPlaceholder: "polite",
                                containerClass: "",
                                countryOrder: null,
                                countrySearch: !0,
                                customPlaceholder: null,
                                dropdownContainer: null,
                                excludeCountries: [],
                                fixDropdownWidth: !0,
                                formatAsYouType: !0,
                                formatOnDisplay: !0,
                                geoIpLookup: null,
                                hiddenInput: null,
                                i18n: {},
                                initialCountry: "",
                                loadUtils: null,
                                nationalMode: !0,
                                onlyCountries: [],
                                placeholderNumberType: "MOBILE",
                                showFlags: !0,
                                separateDialCode: !1,
                                strictMode: !1,
                                useFullscreenPopup:
                                    typeof navigator < "u" && typeof window < "u"
                                        ? /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                            navigator.userAgent
                                        ) || window.innerWidth <= 500
                                        : !1,
                                validationNumberTypes: ["MOBILE"]
                            },
                            J = [
                                "800",
                                "822",
                                "833",
                                "844",
                                "855",
                                "866",
                                "877",
                                "880",
                                "881",
                                "882",
                                "883",
                                "884",
                                "885",
                                "886",
                                "887",
                                "888",
                                "889"
                            ],
                            T = (t) => t.replace(/\D/g, ""),
                            B = (t = "") =>
                                t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
                            z = (t) => {
                                const e = T(t);
                                if (e.charAt(0) === "1") {
                                    const i = e.substr(1, 3);
                                    return J.includes(i);
                                }
                                return !1;
                            },
                            Z = (t, e, i, s) => {
                                if (i === 0 && !s) return 0;
                                let n = 0;
                                for (let o = 0; o < e.length; o++) {
                                    if (/[+0-9]/.test(e[o]) && n++, n === t && !s) return o + 1;
                                    if (s && n === t + 1) return o;
                                }
                                return e.length;
                            },
                            m = (t, e, i) => {
                                const s = document.createElement(t);
                                e &&
                                    Object.entries(e).forEach(([n, o]) =>
                                        s.setAttribute(n, o)
                                    );
                                i && i.appendChild(s);
                                return s;
                            },
                            P = (t, ...e) => {
                                const { instances: i } = r;
                                Object.values(i).forEach((s) => s[t](...e));
                            },
                            $ = class {
                                constructor(t, e = {}) {
                                    this.id = Y++;
                                    this.telInput = t;
                                    this.highlightedItem = null;
                                    this.options = Object.assign({}, j, e);
                                    this.hadInitialPlaceholder = !!t.getAttribute("placeholder");
                                }

                                _init() {
                                    this.options.useFullscreenPopup &&
                                        (this.options.fixDropdownWidth = !1);
                                    this.options.onlyCountries.length === 1 &&
                                        (this.options.initialCountry =
                                            this.options.onlyCountries[0]);
                                    this.options.separateDialCode &&
                                        (this.options.nationalMode = !1);
                                    this.options.allowDropdown &&
                                        !this.options.showFlags &&
                                        !this.options.separateDialCode &&
                                        (this.options.nationalMode = !1);
                                    this.options.useFullscreenPopup &&
                                        !this.options.dropdownContainer &&
                                        (this.options.dropdownContainer = document.body);
                                    this.isAndroid =
                                        typeof navigator < "u"
                                            ? /Android/i.test(navigator.userAgent)
                                            : !1;
                                    this.isRTL = !!this.telInput.closest("[dir=rtl]");
                                    const t =
                                        this.options.allowDropdown ||
                                        this.options.separateDialCode;
                                    this.showSelectedCountryOnLeft = this.isRTL ? !t : t;
                                    this.options.separateDialCode &&
                                        (this.isRTL
                                            ? (this.originalPaddingRight =
                                                this.telInput.style.paddingRight)
                                            : (this.originalPaddingLeft =
                                                this.telInput.style.paddingLeft));
                                    this.options.i18n = { ...R, ...this.options.i18n };
                                    const e = new Promise((s, n) => {
                                        this.resolveAutoCountryPromise = s;
                                        this.rejectAutoCountryPromise = n;
                                    });
                                    const i = new Promise((s, n) => {
                                        this.resolveUtilsScriptPromise = s;
                                        this.rejectUtilsScriptPromise = n;
                                    });
                                    this.promise = Promise.all([e, i]);
                                    this.selectedCountryData = {};
                                    this._processCountryData();
                                    this._generateMarkup();
                                    this._setInitialState();
                                    this._initListeners();
                                    this._initRequests();
                                }

                                _processCountryData() {
                                    this._processAllCountries();
                                    this._processDialCodes();
                                    this._translateCountryNames();
                                    this._sortCountries();
                                }

                                _sortCountries() {
                                    this.options.countryOrder &&
                                        (this.options.countryOrder =
                                            this.options.countryOrder.map((t) =>
                                                t.toLowerCase()
                                            ));

                                    this.countries.sort((t, e) => {
                                        const { countryOrder: i } = this.options;
                                        if (i) {
                                            const s = i.indexOf(t.iso2),
                                                n = i.indexOf(e.iso2),
                                                o = s > -1,
                                                l = n > -1;
                                            if (o || l) return o && l ? s - n : o ? -1 : 1;
                                        }
                                        return t.name.localeCompare(e.name);
                                    });
                                }

                                _addToDialCodeMap(t, e, i) {
                                    e.length > this.dialCodeMaxLen &&
                                        (this.dialCodeMaxLen = e.length);
                                    this.dialCodeToIso2Map.hasOwnProperty(e) ||
                                        (this.dialCodeToIso2Map[e] = []);
                                    for (let n = 0; n < this.dialCodeToIso2Map[e].length; n++)
                                        if (this.dialCodeToIso2Map[e][n] === t) return;
                                    const s =
                                        i !== void 0 ? i : this.dialCodeToIso2Map[e].length;
                                    this.dialCodeToIso2Map[e][s] = t;
                                }

                                _processAllCountries() {
                                    const { onlyCountries: t, excludeCountries: e } =
                                        this.options;
                                    if (t.length) {
                                        const i = t.map((s) => s.toLowerCase());
                                        this.countries = g.filter((s) =>
                                            i.includes(s.iso2)
                                        );
                                    } else if (e.length) {
                                        const i = e.map((s) => s.toLowerCase());
                                        this.countries = g.filter((s) => !i.includes(s.iso2));
                                    } else {
                                        this.countries = g;
                                    }
                                }

                                _translateCountryNames() {
                                    for (let t = 0; t < this.countries.length; t++) {
                                        const e = this.countries[t].iso2.toLowerCase();
                                        this.options.i18n.hasOwnProperty(e) &&
                                            (this.countries[t].name = this.options.i18n[e]);
                                    }
                                }

                                _processDialCodes() {
                                    this.dialCodes = {};
                                    this.dialCodeMaxLen = 0;
                                    this.dialCodeToIso2Map = {};
                                    for (let t = 0; t < this.countries.length; t++) {
                                        const e = this.countries[t];
                                        this.dialCodes[e.dialCode] ||
                                            (this.dialCodes[e.dialCode] = !0);
                                        this._addToDialCodeMap(
                                            e.iso2,
                                            e.dialCode,
                                            e.priority
                                        );
                                    }
                                    for (let t = 0; t < this.countries.length; t++) {
                                        const e = this.countries[t];
                                        if (e.areaCodes) {
                                            const i = this.dialCodeToIso2Map[e.dialCode][0];
                                            for (let s = 0; s < e.areaCodes.length; s++) {
                                                const n = e.areaCodes[s];
                                                for (let o = 1; o < n.length; o++) {
                                                    const l = n.substr(0, o),
                                                        a = e.dialCode + l;
                                                    this._addToDialCodeMap(i, a);
                                                    this._addToDialCodeMap(e.iso2, a);
                                                }
                                                this._addToDialCodeMap(
                                                    e.iso2,
                                                    e.dialCode + n
                                                );
                                            }
                                        }
                                    }
                                }

                                _generateMarkup() {
                                    this.telInput.classList.add("iti__tel-input");
                                    !this.telInput.hasAttribute("autocomplete") &&
                                        !(
                                            this.telInput.form &&
                                            this.telInput.form.hasAttribute("autocomplete")
                                        ) &&
                                        this.telInput.setAttribute("autocomplete", "off");

                                    const {
                                        allowDropdown: t,
                                        separateDialCode: e,
                                        showFlags: i,
                                        containerClass: s,
                                        hiddenInput: n,
                                        dropdownContainer: o,
                                        fixDropdownWidth: l,
                                        useFullscreenPopup: a,
                                        countrySearch: p,
                                        i18n: c
                                    } = this.options;

                                    let y = "iti";
                                    t && (y += " iti--allow-dropdown");
                                    i && (y += " iti--show-flags");
                                    s && (y += ` ${s}`);
                                    a || (y += " iti--inline-dropdown");

                                    const f = m("div", { class: y });

                                    this.telInput.parentNode?.insertBefore(
                                        f,
                                        this.telInput
                                    );

                                    if (t || i || e) {
                                        this.countryContainer = m(
                                            "div",
                                            { class: "iti__country-container" },
                                            f
                                        );

                                        this.showSelectedCountryOnLeft
                                            ? (this.countryContainer.style.left = "0px")
                                            : (this.countryContainer.style.right = "0px");

                                        if (t) {
                                            this.selectedCountry = m(
                                                "button",
                                                {
                                                    type: "button",
                                                    class: "iti__selected-country",
                                                    "aria-expanded": "false",
                                                    "aria-label":
                                                        this.options.i18n.selectedCountryAriaLabel,
                                                    "aria-haspopup": "true",
                                                    "aria-controls": `iti-${this.id}__dropdown-content`,
                                                    role: "combobox"
                                                },
                                                this.countryContainer
                                            );
                                            this.telInput.disabled &&
                                                this.selectedCountry.setAttribute(
                                                    "disabled",
                                                    "true"
                                                );
                                        } else {
                                            this.selectedCountry = m(
                                                "div",
                                                { class: "iti__selected-country" },
                                                this.countryContainer
                                            );
                                        }

                                        const N = m(
                                            "div",
                                            { class: "iti__selected-country-primary" },
                                            this.selectedCountry
                                        );

                                        this.selectedCountryInner = m(
                                            "div",
                                            { class: "iti__flag" },
                                            N
                                        );
                                        this.selectedCountryA11yText = m(
                                            "span",
                                            { class: "iti__a11y-text" },
                                            this.selectedCountryInner
                                        );

                                        t &&
                                            (this.dropdownArrow = m(
                                                "div",
                                                { class: "iti__arrow", "aria-hidden": "true" },
                                                N
                                            ));

                                        e &&
                                            (this.selectedDialCode = m(
                                                "div",
                                                { class: "iti__selected-dial-code" },
                                                this.selectedCountry
                                            ));

                                        if (t) {
                                            const b = l ? "" : "iti--flexible-dropdown-width";

                                            this.dropdownContent = m(
                                                "div",
                                                {
                                                    id: `iti-${this.id}__dropdown-content`,
                                                    class: `iti__dropdown-content iti__hide ${b}`
                                                }
                                            );

                                            if (p) {
                                                this.searchInput = m(
                                                    "input",
                                                    {
                                                        type: "text",
                                                        class: "iti__search-input",
                                                        placeholder: c.searchPlaceholder,
                                                        role: "combobox",
                                                        "aria-expanded": "true",
                                                        "aria-label": c.searchPlaceholder,
                                                        "aria-controls": `iti-${this.id}__country-listbox`,
                                                        "aria-autocomplete": "list",
                                                        autocomplete: "off"
                                                    },
                                                    this.dropdownContent
                                                );

                                                this.searchResultsA11yText = m(
                                                    "span",
                                                    { class: "iti__a11y-text" },
                                                    this.dropdownContent
                                                );
                                            }

                                            this.countryList = m(
                                                "ul",
                                                {
                                                    class: "iti__country-list",
                                                    id: `iti-${this.id}__country-listbox`,
                                                    role: "listbox",
                                                    "aria-label": c.countryListAriaLabel
                                                },
                                                this.dropdownContent
                                            );

                                            this._appendListItems();

                                            p && this._updateSearchResultsText();

                                            if (o) {
                                                let w = "iti iti--container";
                                                a
                                                    ? (w += " iti--fullscreen-popup")
                                                    : (w += " iti--inline-dropdown");

                                                this.dropdown = m("div", { class: w });
                                                this.dropdown.appendChild(this.dropdownContent);
                                            } else {
                                                this.countryContainer.appendChild(
                                                    this.dropdownContent
                                                );
                                            }
                                        }
                                    }

                                    f.appendChild(this.telInput);
                                    this._updateInputPadding();

                                    if (n) {
                                        const N = this.telInput.getAttribute("name") || "";
                                        const b = n(N);

                                        if (b.phone) {
                                            const w =
                                                this.telInput.form?.querySelector(
                                                    `input[name="${b.phone}"]`
                                                );
                                            if (w) {
                                                this.hiddenInput = w;
                                            } else {
                                                this.hiddenInput = m(
                                                    "input",
                                                    { type: "hidden", name: b.phone },
                                                    f
                                                );
                                            }
                                        }

                                        if (b.country) {
                                            const w =
                                                this.telInput.form?.querySelector(
                                                    `input[name="${b.country}"]`
                                                );
                                            if (w) {
                                                this.hiddenInputCountry = w;
                                            } else {
                                                this.hiddenInputCountry = m(
                                                    "input",
                                                    { type: "hidden", name: b.country },
                                                    f
                                                );
                                            }
                                        }
                                    }
                                }

                                _appendListItems() {
                                    for (let t = 0; t < this.countries.length; t++) {
                                        const e = this.countries[t];
                                        const i = t === 0 ? "iti__highlight" : "";
                                        const s = m(
                                            "li",
                                            {
                                                id: `iti-${this.id}__item-${e.iso2}`,
                                                class: `iti__country ${i}`,
                                                tabindex: "-1",
                                                role: "option",
                                                "data-dial-code": e.dialCode,
                                                "data-country-code": e.iso2,
                                                "aria-selected": "false"
                                            },
                                            this.countryList
                                        );
                                        e.nodeById[this.id] = s;

                                        let n = "";
                                        this.options.showFlags &&
                                            (n += `<div class='iti__flag iti__${e.iso2}'></div>`);
                                        n += `<span class='iti__country-name'>${e.name}</span>`;
                                        n += `<span class='iti__dial-code'>+${e.dialCode}</span>`;

                                        s.insertAdjacentHTML("beforeend", n);
                                    }
                                }

                                _setInitialState(t = !1) {
                                    const e = this.telInput.getAttribute("value");
                                    const i = this.telInput.value;

                                    const n =
                                        e && e.charAt(0) === "+" && (!i || i.charAt(0) !== "+")
                                            ? e
                                            : i;

                                    const o = this._getDialCode(n);
                                    const l = z(n);
                                    const { initialCountry: a, geoIpLookup: p } =
                                        this.options;
                                    const c = a === "auto" && p;

                                    if (o && !l) {
                                        this._updateCountryFromNumber(n);
                                    } else if (!c || t) {
                                        const y = a ? a.toLowerCase() : "";
                                        y && this._getCountryData(y, !0)
                                            ? this._setCountry(y)
                                            : o && l
                                                ? this._setCountry("us")
                                                : this._setCountry();
                                    }

                                    n && this._updateValFromNumber(n);
                                }

                                _initListeners() {
                                    this._initTelInputListeners();
                                    this.options.allowDropdown &&
                                        this._initDropdownListeners();

                                    (this.hiddenInput || this.hiddenInputCountry) &&
                                        this.telInput.form &&
                                        this._initHiddenInputListener();
                                }

                                _initHiddenInputListener() {
                                    this._handleHiddenInputSubmit = () => {
                                        this.hiddenInput &&
                                            (this.hiddenInput.value = this.getNumber());
                                        this.hiddenInputCountry &&
                                            (this.hiddenInputCountry.value =
                                                this.getSelectedCountryData().iso2 || "");
                                    };
                                    this.telInput.form?.addEventListener(
                                        "submit",
                                        this._handleHiddenInputSubmit
                                    );
                                }

                                _initDropdownListeners() {
                                    this._handleLabelClick = (e) => {
                                        this.dropdownContent.classList.contains("iti__hide")
                                            ? this.telInput.focus()
                                            : e.preventDefault();
                                    };

                                    const t = this.telInput.closest("label");
                                    t && t.addEventListener("click", this._handleLabelClick);

                                    this._handleClickSelectedCountry = () => {
                                        this.dropdownContent.classList.contains("iti__hide") &&
                                            !this.telInput.disabled &&
                                            !this.telInput.readOnly &&
                                            this._openDropdown();
                                    };

                                    this.selectedCountry.addEventListener(
                                        "click",
                                        this._handleClickSelectedCountry
                                    );

                                    this._handleCountryContainerKeydown = (e) => {
                                        if (
                                            this.dropdownContent.classList.contains(
                                                "iti__hide"
                                            ) &&
                                            ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key)
                                        ) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this._openDropdown();
                                        }
                                        e.key === "Tab" && this._closeDropdown();
                                    };

                                    this.countryContainer.addEventListener(
                                        "keydown",
                                        this._handleCountryContainerKeydown
                                    );
                                }

                                _initRequests() {
                                    let { loadUtils: t, initialCountry: e, geoIpLookup: i } =
                                        this.options;

                                    t && !r.utils
                                        ? ((this._handlePageLoad = () => {
                                            window.removeEventListener(
                                                "load",
                                                this._handlePageLoad
                                            );
                                            r.attachUtils(t)?.catch(() => { });
                                        }),
                                            r.documentReady()
                                                ? this._handlePageLoad()
                                                : window.addEventListener("load", this._handlePageLoad))
                                        : this.resolveUtilsScriptPromise();

                                    e === "auto" && i && !this.selectedCountryData.iso2
                                        ? this._loadAutoCountry()
                                        : this.resolveAutoCountryPromise();
                                }

                                _loadAutoCountry() {
                                    r.autoCountry
                                        ? this.handleAutoCountry()
                                        : r.startedLoadingAutoCountry ||
                                        ((r.startedLoadingAutoCountry = !0),
                                            typeof this.options.geoIpLookup == "function" &&
                                            this.options.geoIpLookup(
                                                (t = "") => {
                                                    const e = t.toLowerCase();
                                                    e && this._getCountryData(e, !0)
                                                        ? ((r.autoCountry = e),
                                                            setTimeout(() =>
                                                                P("handleAutoCountry")
                                                            ))
                                                        : (this._setInitialState(!0),
                                                            P("rejectAutoCountryPromise"));
                                                },
                                                () => {
                                                    this._setInitialState(!0);
                                                    P("rejectAutoCountryPromise");
                                                }
                                            ));
                                }

                                _openDropdownWithPlus() {
                                    this._openDropdown();
                                    this.searchInput.value = "+";
                                    this._filterCountries("", !0);
                                }

                                _initTelInputListeners() {
                                    const {
                                        strictMode: t,
                                        formatAsYouType: e,
                                        separateDialCode: i,
                                        formatOnDisplay: s,
                                        allowDropdown: n,
                                        countrySearch: o
                                    } = this.options;

                                    let l = !1;
                                    /\p{L}/u.test(this.telInput.value) && (l = !0);

                                    this._handleInputEvent = (a) => {
                                        if (
                                            this.isAndroid &&
                                            a?.data === "+" &&
                                            i &&
                                            n &&
                                            o
                                        ) {
                                            const f = this.telInput.selectionStart || 0;
                                            const N = this.telInput.value.substring(0, f - 1);
                                            const b = this.telInput.value.substring(f);
                                            this.telInput.value = N + b;
                                            this._openDropdownWithPlus();
                                            return;
                                        }

                                        this._updateCountryFromNumber(this.telInput.value) &&
                                            this._triggerCountryChange();

                                        const p = a?.data && /[^+0-9]/.test(a.data);
                                        const c =
                                            a?.inputType === "insertFromPaste" &&
                                            this.telInput.value;

                                        p || (c && !t) ? (l = !0) : /[^+0-9]/.test(
                                            this.telInput.value
                                        ) || (l = !1);

                                        const y = a?.detail && a.detail.isSetNumber && !s;

                                        if (e && !l && !y) {
                                            const f = this.telInput.selectionStart || 0;
                                            const b = this.telInput.value
                                                .substring(0, f)
                                                .replace(/[^+0-9]/g, "").length;
                                            const w =
                                                a?.inputType === "deleteContentForward";
                                            const x = this._formatNumberAsYouType();
                                            const E = Z(b, x, f, w);

                                            this.telInput.value = x;
                                            this.telInput.setSelectionRange(E, E);
                                        }
                                    };

                                    this.telInput.addEventListener(
                                        "input",
                                        this._handleInputEvent
                                    );

                                    (t || i) &&
                                        (this._handleKeydownEvent = (a) => {
                                            if (
                                                a.key &&
                                                a.key.length === 1 &&
                                                !a.altKey &&
                                                !a.ctrlKey &&
                                                !a.metaKey
                                            ) {
                                                if (i && n && o && a.key === "+") {
                                                    a.preventDefault();
                                                    this._openDropdownWithPlus();
                                                    return;
                                                }

                                                if (t) {
                                                    const p = this.telInput.value;
                                                    const c = p.charAt(0) === "+";
                                                    const y =
                                                        !c &&
                                                        this.telInput.selectionStart === 0 &&
                                                        a.key === "+";
                                                    const f = /^[0-9]$/.test(a.key);
                                                    const N = i ? f : y || f;
                                                    const b =
                                                        p.slice(0, this.telInput.selectionStart) +
                                                        a.key +
                                                        p.slice(this.telInput.selectionEnd);
                                                    const w = this._getFullNumber(b);
                                                    const x = r.utils.getCoreNumber(
                                                        w,
                                                        this.selectedCountryData.iso2
                                                    );
                                                    const E =
                                                        this.maxCoreNumberLength &&
                                                        x.length > this.maxCoreNumberLength;
                                                    let V = !1;

                                                    if (c) {
                                                        const tt = this.selectedCountryData.iso2;
                                                        V = this._getCountryFromNumber(w) !== tt;
                                                    }

                                                    (!N || (E && !V && !y)) && a.preventDefault();
                                                }
                                            }
                                        });

                                    this._handleKeydownEvent &&
                                        this.telInput.addEventListener(
                                            "keydown",
                                            this._handleKeydownEvent
                                        );
                                }

                                _cap(t) {
                                    const e = parseInt(
                                        this.telInput.getAttribute("maxlength") || "",
                                        10
                                    );
                                    return e && t.length > e ? t.substr(0, e) : t;
                                }

                                _trigger(t, e = {}) {
                                    const i = new CustomEvent(t, {
                                        bubbles: !0,
                                        cancelable: !0,
                                        detail: e
                                    });
                                    this.telInput.dispatchEvent(i);
                                }

                                _openDropdown() {
                                    const { fixDropdownWidth: t, countrySearch: e } =
                                        this.options;

                                    if (t) {
                                        this.dropdownContent.style.width =
                                            `${this.telInput.offsetWidth}px`;
                                    }

                                    this.dropdownContent.classList.remove("iti__hide");
                                    this.selectedCountry.setAttribute(
                                        "aria-expanded",
                                        "true"
                                    );

                                    this._setDropdownPosition();

                                    if (e) {
                                        const i = this.countryList.firstElementChild;
                                        i &&
                                            (this._highlightListItem(i, !1),
                                                (this.countryList.scrollTop = 0));
                                        this.searchInput.focus();
                                    }

                                    this._bindDropdownListeners();
                                    this.dropdownArrow.classList.add("iti__arrow--up");
                                    this._trigger("open:countrydropdown");
                                }

                                _setDropdownPosition() {
                                    if (this.options.dropdownContainer) {
                                        this.options.dropdownContainer.appendChild(
                                            this.dropdown
                                        );
                                    }

                                    if (!this.options.useFullscreenPopup) {
                                        const t = this.telInput.getBoundingClientRect();
                                        const e = this.telInput.offsetHeight;

                                        this.options.dropdownContainer &&
                                            ((this.dropdown.style.top = `${t.top + e}px`),
                                                (this.dropdown.style.left = `${t.left}px`),
                                                (this._handleWindowScroll = () =>
                                                    this._closeDropdown()),
                                                window.addEventListener(
                                                    "scroll",
                                                    this._handleWindowScroll
                                                ));
                                    }
                                }

                                _bindDropdownListeners() {
                                    this._handleMouseoverCountryList = (s) => {
                                        const n =
                                            s.target?.closest(".iti__country");
                                        n && this._highlightListItem(n, !1);
                                    };

                                    this.countryList.addEventListener(
                                        "mouseover",
                                        this._handleMouseoverCountryList
                                    );

                                    this._handleClickCountryList = (s) => {
                                        const n =
                                            s.target?.closest(".iti__country");
                                        n && this._selectListItem(n);
                                    };

                                    this.countryList.addEventListener(
                                        "click",
                                        this._handleClickCountryList
                                    );

                                    let t = !0;

                                    this._handleClickOffToClose = () => {
                                        t || this._closeDropdown();
                                        t = !1;
                                    };

                                    document.documentElement.addEventListener(
                                        "click",
                                        this._handleClickOffToClose
                                    );

                                    let e = "";
                                    let i = null;

                                    this._handleKeydownOnDropdown = (s) => {
                                        ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(
                                            s.key
                                        ) &&
                                            (s.preventDefault(),
                                                s.stopPropagation(),
                                                s.key === "ArrowUp" || s.key === "ArrowDown"
                                                    ? this._handleUpDownKey(s.key)
                                                    : s.key === "Enter"
                                                        ? this._handleEnterKey()
                                                        : s.key === "Escape" && this._closeDropdown());

                                        !this.options.countrySearch &&
                                            /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(s.key) &&
                                            (s.stopPropagation(),
                                                i && clearTimeout(i),
                                                (e += s.key.toLowerCase()),
                                                this._searchForCountry(e),
                                                (i = setTimeout(() => {
                                                    e = "";
                                                }, 1e3)));
                                    };

                                    document.addEventListener(
                                        "keydown",
                                        this._handleKeydownOnDropdown
                                    );

                                    if (this.options.countrySearch) {
                                        const s = () => {
                                            const o = this.searchInput.value.trim();
                                            o
                                                ? this._filterCountries(o)
                                                : this._filterCountries("", !0);
                                        };

                                        let n = null;

                                        this._handleSearchChange = () => {
                                            n && clearTimeout(n);
                                            n = setTimeout(() => {
                                                s();
                                                n = null;
                                            }, 100);
                                        };

                                        this.searchInput.addEventListener(
                                            "input",
                                            this._handleSearchChange
                                        );
                                        this.searchInput.addEventListener(
                                            "click",
                                            (o) => o.stopPropagation()
                                        );
                                    }
                                }

                                _searchForCountry(t) {
                                    for (let e = 0; e < this.countries.length; e++) {
                                        const i = this.countries[e];
                                        if (
                                            i.name
                                                .substr(0, t.length)
                                                .toLowerCase() === t
                                        ) {
                                            const n = i.nodeById[this.id];
                                            this._highlightListItem(n, !1);
                                            this._scrollTo(n);
                                            break;
                                        }
                                    }
                                }

                                _filterCountries(t, e = !1) {
                                    let i = !0;
                                    this.countryList.innerHTML = "";

                                    const s = B(t);

                                    for (let n = 0; n < this.countries.length; n++) {
                                        const o = this.countries[n];
                                        const l = B(o.name);
                                        const a = o.name
                                            .split(/[^a-zA-ZÀ-ÿа-яА-Я]/)
                                            .map((c) => c[0])
                                            .join("")
                                            .toLowerCase();
                                        const p = `+${o.dialCode}`;

                                        if (
                                            e ||
                                            l.includes(s) ||
                                            p.includes(s) ||
                                            o.iso2.includes(s) ||
                                            a.includes(s)
                                        ) {
                                            const c = o.nodeById[this.id];
                                            c && this.countryList.appendChild(c);
                                            i &&
                                                (this._highlightListItem(c, !1), (i = !1));
                                        }
                                    }

                                    i && this._highlightListItem(null, !1);
                                    this.countryList.scrollTop = 0;
                                    this._updateSearchResultsText();
                                }

                                _updateSearchResultsText() {
                                    const { i18n: t } = this.options;
                                    const e = this.countryList.childElementCount;

                                    let i;
                                    e === 0
                                        ? (i = t.zeroSearchResults)
                                        : e === 1
                                            ? (i = t.oneSearchResult)
                                            : (i = t.multipleSearchResults.replace(
                                                "${count}",
                                                e.toString()
                                            ));

                                    this.searchResultsA11yText.textContent = i;
                                }

                                _handleUpDownKey(t) {
                                    let e =
                                        t === "ArrowUp"
                                            ? this.highlightedItem?.previousElementSibling
                                            : this.highlightedItem?.nextElementSibling;

                                    !e &&
                                        this.countryList.childElementCount > 1 &&
                                        (e =
                                            t === "ArrowUp"
                                                ? this.countryList.lastElementChild
                                                : this.countryList.firstElementChild);

                                    e &&
                                        (this._scrollTo(e),
                                            this._highlightListItem(e, !1));
                                }

                                _handleEnterKey() {
                                    this.highlightedItem &&
                                        this._selectListItem(this.highlightedItem);
                                }

                                _updateValFromNumber(t) {
                                    let e = t;
                                    if (
                                        this.options.formatOnDisplay &&
                                        r.utils &&
                                        this.selectedCountryData
                                    ) {
                                        const i =
                                            this.options.nationalMode ||
                                            (e.charAt(0) !== "+" &&
                                                !this.options.separateDialCode);
                                        const {
                                            NATIONAL: s,
                                            INTERNATIONAL: n
                                        } = r.utils.numberFormat;
                                        const o = i ? s : n;
                                        e = r.utils.formatNumber(
                                            e,
                                            this.selectedCountryData.iso2,
                                            o
                                        );
                                    }

                                    e = this._beforeSetNumber(e);
                                    this.telInput.value = e;
                                }

                                _updateCountryFromNumber(t) {
                                    const e = this._getCountryFromNumber(t);
                                    return e !== null ? this._setCountry(e) : !1;
                                }

                                _ensureHasDialCode(t) {
                                    const {
                                        dialCode: e,
                                        nationalPrefix: i
                                    } = this.selectedCountryData;
                                    if (t.charAt(0) === "+" || !e) return t;

                                    const o =
                                        i &&
                                            t.charAt(0) === i &&
                                            !this.options.separateDialCode
                                            ? t.substring(1)
                                            : t;

                                    return `+${e}${o}`;
                                }

                                _getCountryFromNumber(t) {
                                    const e = t.indexOf("+");
                                    let i = e ? t.substring(e) : t;

                                    const s = this.selectedCountryData.iso2;
                                    const n = this.selectedCountryData.dialCode;

                                    i = this._ensureHasDialCode(i);
                                    const o = this._getDialCode(i, !0);
                                    const l = T(i);

                                    if (o) {
                                        const a = T(o);
                                        const p = this.dialCodeToIso2Map[a];

                                        if (!s && this.defaultCountry && p.includes(this.defaultCountry))
                                            return this.defaultCountry;

                                        const c =
                                            s &&
                                            p.includes(s) &&
                                            (l.length === a.length ||
                                                !this.selectedCountryData.areaCodes);

                                        if (!(n === "1" && z(l)) && !c) {
                                            for (let f = 0; f < p.length; f++) {
                                                if (p[f]) return p[f];
                                            }
                                        }
                                    } else {
                                        if (i.charAt(0) === "+" && l.length) return "";
                                        if ((!i || i === "+") && !this.selectedCountryData.iso2)
                                            return this.defaultCountry;
                                    }

                                    return null;
                                }

                                _highlightListItem(t, e) {
                                    const i = this.highlightedItem;

                                    if (i) {
                                        i.classList.remove("iti__highlight");
                                        i.setAttribute("aria-selected", "false");
                                    }

                                    this.highlightedItem = t;

                                    if (this.highlightedItem) {
                                        this.highlightedItem.classList.add("iti__highlight");
                                        this.highlightedItem.setAttribute(
                                            "aria-selected",
                                            "true"
                                        );

                                        const s = this.highlightedItem.getAttribute("id") || "";

                                        this.selectedCountry.setAttribute(
                                            "aria-activedescendant",
                                            s
                                        );

                                        this.options.countrySearch &&
                                            this.searchInput.setAttribute(
                                                "aria-activedescendant",
                                                s
                                            );
                                    }

                                    e && this.highlightedItem && this.highlightedItem.focus();
                                }

                                _getCountryData(t, e) {
                                    for (let i = 0; i < this.countries.length; i++)
                                        if (this.countries[i].iso2 === t) return this.countries[i];
                                    if (e) return null;
                                    throw new Error(`No country data for '${t}'`);
                                }

                                _setCountry(t) {
                                    const {
                                        separateDialCode: e,
                                        showFlags: i,
                                        i18n: s
                                    } = this.options;

                                    const n = this.selectedCountryData.iso2
                                        ? this.selectedCountryData
                                        : {};

                                    this.selectedCountryData = t
                                        ? this._getCountryData(t, !1) || {}
                                        : {};

                                    this.selectedCountryData.iso2 &&
                                        (this.defaultCountry = this.selectedCountryData.iso2);

                                    if (this.selectedCountryInner) {
                                        let o = "";
                                        let l = "";

                                        if (t && i) {
                                            o = `iti__flag iti__${t}`;
                                            l = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`;
                                        } else {
                                            o = "iti__flag iti__globe";
                                            l = s.noCountrySelected;
                                        }

                                        this.selectedCountryInner.className = o;
                                        this.selectedCountryA11yText.textContent = l;
                                    }

                                    this._setSelectedCountryTitleAttribute(t, e);

                                    if (e) {
                                        const o = this.selectedCountryData.dialCode
                                            ? `+${this.selectedCountryData.dialCode}`
                                            : "";
                                        this.selectedDialCode.innerHTML = o;
                                        this._updateInputPadding();
                                    }

                                    this._updatePlaceholder();
                                    this._updateMaxLength();

                                    return n.iso2 !== t;
                                }

                                _updateInputPadding() {
                                    if (this.selectedCountry) {
                                        const e =
                                            (this.selectedCountry.offsetWidth ||
                                                this._getHiddenSelectedCountryWidth()) + 6;

                                        this.showSelectedCountryOnLeft
                                            ? (this.telInput.style.paddingLeft = `${e}px`)
                                            : (this.telInput.style.paddingRight = `${e}px`);
                                    }
                                }

                                _updateMaxLength() {
                                    const {
                                        strictMode: t,
                                        placeholderNumberType: e,
                                        validationNumberTypes: i
                                    } = this.options;

                                    const { iso2: s } = this.selectedCountryData;

                                    if (t && r.utils) {
                                        if (s) {
                                            const n = r.utils.numberType[e];
                                            let o = r.utils.getExampleNumber(
                                                s,
                                                !1,
                                                n,
                                                !0
                                            );
                                            let l = o;

                                            for (; r.utils.isPossibleNumber(o, s, i);)
                                                l = o, (o += "0");

                                            const a = r.utils.getCoreNumber(l, s);
                                            this.maxCoreNumberLength = a.length;
                                            s === "by" &&
                                                (this.maxCoreNumberLength = a.length + 1);
                                        } else {
                                            this.maxCoreNumberLength = null;
                                        }
                                    }
                                }

                                _setSelectedCountryTitleAttribute(t = null, e) {
                                    if (!this.selectedCountry) return;

                                    let i;

                                    if (t && !e) {
                                        i = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}`;
                                    } else if (t) {
                                        i = this.selectedCountryData.name;
                                    } else {
                                        i = "Unknown";
                                    }

                                    this.selectedCountry.setAttribute("title", i);
                                }

                                _getHiddenSelectedCountryWidth() {
                                    if (this.telInput.parentNode) {
                                        const t =
                                            this.telInput.parentNode.cloneNode(!1);
                                        t.style.visibility = "hidden";
                                        document.body.appendChild(t);

                                        const e = this.countryContainer.cloneNode();
                                        t.appendChild(e);

                                        const i = this.selectedCountry.cloneNode(!0);
                                        e.appendChild(i);

                                        const s = i.offsetWidth;
                                        document.body.removeChild(t);
                                        return s;
                                    }
                                    return 0;
                                }

                                _updatePlaceholder() {
                                    const {
                                        autoPlaceholder: t,
                                        placeholderNumberType: e,
                                        nationalMode: i,
                                        customPlaceholder: s
                                    } = this.options;

                                    const n =
                                        t === "aggressive" ||
                                        (!this.hadInitialPlaceholder && t === "polite");

                                    if (r.utils && n) {
                                        const o = r.utils.numberType[e];
                                        let l = this.selectedCountryData.iso2
                                            ? r.utils.getExampleNumber(
                                                this.selectedCountryData.iso2,
                                                i,
                                                o
                                            )
                                            : "";
                                        l = this._beforeSetNumber(l);

                                        typeof s == "function" &&
                                            (l = s(l, this.selectedCountryData));

                                        this.telInput.setAttribute("placeholder", l);
                                    }
                                }

                                _selectListItem(t) {
                                    const e = this._setCountry(
                                        t.getAttribute("data-country-code")
                                    );
                                    this._closeDropdown();
                                    this._updateDialCode(t.getAttribute("data-dial-code"));
                                    this.telInput.focus();
                                    e && this._triggerCountryChange();
                                }

                                _closeDropdown() {
                                    this.dropdownContent.classList.add("iti__hide");
                                    this.selectedCountry.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );
                                    this.selectedCountry.removeAttribute(
                                        "aria-activedescendant"
                                    );
                                    this.highlightedItem &&
                                        this.highlightedItem.setAttribute(
                                            "aria-selected",
                                            "false"
                                        );
                                    this.options.countrySearch &&
                                        this.searchInput.removeAttribute(
                                            "aria-activedescendant"
                                        );

                                    this.dropdownArrow.classList.remove("iti__arrow--up");

                                    document.removeEventListener(
                                        "keydown",
                                        this._handleKeydownOnDropdown
                                    );
                                    this.options.countrySearch &&
                                        this.searchInput.removeEventListener(
                                            "input",
                                            this._handleSearchChange
                                        );

                                    document.documentElement.removeEventListener(
                                        "click",
                                        this._handleClickOffToClose
                                    );

                                    this.countryList.removeEventListener(
                                        "mouseover",
                                        this._handleMouseoverCountryList
                                    );
                                    this.countryList.removeEventListener(
                                        "click",
                                        this._handleClickCountryList
                                    );

                                    this.options.dropdownContainer &&
                                        (this.options.useFullscreenPopup ||
                                            window.removeEventListener(
                                                "scroll",
                                                this._handleWindowScroll
                                            ),
                                            this.dropdown.parentNode &&
                                            this.dropdown.parentNode.removeChild(
                                                this.dropdown
                                            ));

                                    this._handlePageLoad &&
                                        window.removeEventListener(
                                            "load",
                                            this._handlePageLoad
                                        );

                                    this._trigger("close:countrydropdown");
                                }

                                _scrollTo(t) {
                                    const e = this.countryList;
                                    const i = document.documentElement.scrollTop;
                                    const s = e.offsetHeight;
                                    const n = e.getBoundingClientRect().top + i;
                                    const o = n + s;
                                    const l = t.offsetHeight;
                                    const a = t.getBoundingClientRect().top + i;
                                    const p = a + l;
                                    const c = a - n + e.scrollTop;

                                    if (a < n) {
                                        e.scrollTop = c;
                                    } else if (p > o) {
                                        const y = s - l;
                                        e.scrollTop = c - y;
                                    }
                                }

                                _updateDialCode(t) {
                                    const e = this.telInput.value;
                                    const i = `+${t}`;
                                    let s;

                                    if (e.charAt(0) === "+") {
                                        const n = this._getDialCode(e);
                                        n ? (s = e.replace(n, i)) : (s = i);
                                        this.telInput.value = s;
                                    }
                                }

                                _getDialCode(t, e) {
                                    let i = "";

                                    if (t.charAt(0) === "+") {
                                        let s = "";

                                        for (let n = 0; n < t.length; n++) {
                                            const o = t.charAt(n);
                                            if (!isNaN(parseInt(o, 10))) {
                                                s += o;

                                                if (e) {
                                                    this.dialCodeToIso2Map[s] &&
                                                        (i = t.substr(0, n + 1));
                                                } else if (this.dialCodes[s]) {
                                                    i = t.substr(0, n + 1);
                                                    break;
                                                }

                                                if (s.length === this.dialCodeMaxLen) break;
                                            }
                                        }
                                    }

                                    return i;
                                }

                                _getFullNumber(t) {
                                    const e = t || this.telInput.value.trim();
                                    const { dialCode: i } = this.selectedCountryData;

                                    let s;
                                    const n = T(e);

                                    this.options.separateDialCode &&
                                        e.charAt(0) !== "+" &&
                                        i &&
                                        n
                                        ? (s = `+${i}`)
                                        : (s = "");

                                    return s + e;
                                }

                                _beforeSetNumber(t) {
                                    let e = t;

                                    if (this.options.separateDialCode) {
                                        let i = this._getDialCode(e);
                                        if (i) {
                                            i = `+${this.selectedCountryData.dialCode}`;
                                            const s =
                                                e[i.length] === " " || e[i.length] === "-"
                                                    ? i.length + 1
                                                    : i.length;
                                            e = e.substr(s);
                                        }
                                    }

                                    return this._cap(e);
                                }

                                _triggerCountryChange() {
                                    this._trigger("countrychange");
                                }

                                _formatNumberAsYouType() {
                                    const t = this._getFullNumber();
                                    const e = r.utils
                                        ? r.utils.formatNumberAsYouType(
                                            t,
                                            this.selectedCountryData.iso2
                                        )
                                        : t;
                                    const { dialCode: i } = this.selectedCountryData;

                                    return this.options.separateDialCode &&
                                        this.telInput.value.charAt(0) !== "+" &&
                                        e.includes(`+${i}`)
                                        ? (e.split(`+${i}`)[1] || "").trim()
                                        : e;
                                }

                                handleAutoCountry() {
                                    this.options.initialCountry === "auto" &&
                                        r.autoCountry &&
                                        (this.defaultCountry = r.autoCountry,
                                            this.selectedCountryData.iso2 ||
                                            this.selectedCountryInner.classList.contains(
                                                "iti__globe"
                                            ) ||
                                            this.setCountry(this.defaultCountry),
                                            this.resolveAutoCountryPromise());
                                }

                                handleUtils() {
                                    r.utils &&
                                        (this.telInput.value &&
                                            this._updateValFromNumber(this.telInput.value),
                                            this.selectedCountryData.iso2 &&
                                            (this._updatePlaceholder(),
                                                this._updateMaxLength()));
                                    this.resolveUtilsScriptPromise();
                                }

                                destroy() {
                                    const { allowDropdown: t, separateDialCode: e } =
                                        this.options;

                                    if (t) {
                                        this._closeDropdown();
                                        this.selectedCountry.removeEventListener(
                                            "click",
                                            this._handleClickSelectedCountry
                                        );
                                        this.countryContainer.removeEventListener(
                                            "keydown",
                                            this._handleCountryContainerKeydown
                                        );
                                        const n = this.telInput.closest("label");
                                        n &&
                                            n.removeEventListener(
                                                "click",
                                                this._handleLabelClick
                                            );
                                    }

                                    const { form: i } = this.telInput;

                                    this._handleHiddenInputSubmit &&
                                        i &&
                                        i.removeEventListener(
                                            "submit",
                                            this._handleHiddenInputSubmit
                                        );

                                    this.telInput.removeEventListener(
                                        "input",
                                        this._handleInputEvent
                                    );
                                    this._handleKeydownEvent &&
                                        this.telInput.removeEventListener(
                                            "keydown",
                                            this._handleKeydownEvent
                                        );

                                    this.telInput.removeAttribute("data-intl-tel-input-id");

                                    e &&
                                        (this.isRTL
                                            ? (this.telInput.style.paddingRight =
                                                this.originalPaddingRight)
                                            : (this.telInput.style.paddingLeft =
                                                this.originalPaddingLeft));

                                    const s = this.telInput.parentNode;
                                    s?.parentNode?.insertBefore(this.telInput, s);
                                    s?.parentNode?.removeChild(s);

                                    delete r.instances[this.id];
                                }

                                getExtension() {
                                    return r.utils
                                        ? r.utils.getExtension(
                                            this._getFullNumber(),
                                            this.selectedCountryData.iso2
                                        )
                                        : "";
                                }

                                getNumber(t) {
                                    if (r.utils) {
                                        const { iso2: e } = this.selectedCountryData;
                                        return r.utils.formatNumber(
                                            this._getFullNumber(),
                                            e,
                                            t
                                        );
                                    }
                                    return "";
                                }

                                getNumberType() {
                                    return r.utils
                                        ? r.utils.getNumberType(
                                            this._getFullNumber(),
                                            this.selectedCountryData.iso2
                                        )
                                        : -99;
                                }

                                getSelectedCountryData() {
                                    return this.selectedCountryData;
                                }

                                getValidationError() {
                                    if (r.utils) {
                                        const { iso2: t } = this.selectedCountryData;
                                        return r.utils.getValidationError(
                                            this._getFullNumber(),
                                            t
                                        );
                                    }
                                    return -99;
                                }

                                isValidNumber() {
                                    if (!this.selectedCountryData.iso2) return !1;

                                    const t = this._getFullNumber();
                                    const e = t.search(/\p{L}/u);

                                    if (e > -1) {
                                        const i = t.substring(0, e);
                                        const s = this._utilsIsPossibleNumber(i);
                                        const n = this._utilsIsPossibleNumber(t);
                                        return s && n;
                                    }

                                    return this._utilsIsPossibleNumber(t);
                                }

                                _utilsIsPossibleNumber(t) {
                                    return r.utils
                                        ? r.utils.isPossibleNumber(
                                            t,
                                            this.selectedCountryData.iso2,
                                            this.options.validationNumberTypes
                                        )
                                        : null;
                                }

                                isValidNumberPrecise() {
                                    if (!this.selectedCountryData.iso2) return !1;

                                    const t = this._getFullNumber();
                                    const e = t.search(/\p{L}/u);

                                    if (e > -1) {
                                        const i = t.substring(0, e);
                                        const s = this._utilsIsValidNumber(i);
                                        const n = this._utilsIsValidNumber(t);
                                        return s && n;
                                    }

                                    return this._utilsIsValidNumber(t);
                                }

                                _utilsIsValidNumber(t) {
                                    return r.utils
                                        ? r.utils.isValidNumber(
                                            t,
                                            this.selectedCountryData.iso2,
                                            this.options.validationNumberTypes
                                        )
                                        : null;
                                }

                                setCountry(t) {
                                    const e = t?.toLowerCase();
                                    const i = this.selectedCountryData.iso2;
                                    (t && e !== i) || (!t && i) &&
                                        (this._setCountry(e),
                                            this._updateDialCode(
                                                this.selectedCountryData.dialCode
                                            ),
                                            this._triggerCountryChange());
                                }

                                setNumber(t) {
                                    const e = this._updateCountryFromNumber(t);
                                    this._updateValFromNumber(t);
                                    e && this._triggerCountryChange();
                                    this._trigger("input", { isSetNumber: !0 });
                                }

                                setPlaceholderNumberType(t) {
                                    this.options.placeholderNumberType = t;
                                    this._updatePlaceholder();
                                }

                                setDisabled(t) {
                                    this.telInput.disabled = t;
                                    t
                                        ? this.selectedCountry.setAttribute(
                                            "disabled",
                                            "true"
                                        )
                                        : this.selectedCountry.removeAttribute("disabled");
                                }
                            },
                            Q = (t) => {
                                if (!r.utils && !r.startedLoadingUtilsScript) {
                                    let e;
                                    if (typeof t == "function")
                                        try {
                                            e = Promise.resolve(t());
                                        } catch (i) {
                                            return Promise.reject(i);
                                        }
                                    else
                                        return Promise.reject(
                                            new TypeError(
                                                `The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof t}`
                                            )
                                        );
                                    return (
                                        (r.startedLoadingUtilsScript = !0),
                                        e
                                            .then((i) => {
                                                const s = i?.default;
                                                if (!s || typeof s != "object")
                                                    throw new TypeError(
                                                        "The loader function passed to attachUtils did not resolve to a module object with utils as its default export."
                                                    );
                                                return (
                                                    (r.utils = s),
                                                    P("handleUtils"),
                                                    !0
                                                );
                                            })
                                            .catch((i) => {
                                                throw (P("rejectUtilsScriptPromise", i), i);
                                            })
                                    );
                                }
                                return null;
                            },
                            r = Object.assign(
                                (t, e) => {
                                    const i = new $(t, e);
                                    i._init();
                                    t.setAttribute(
                                        "data-intl-tel-input-id",
                                        i.id.toString()
                                    );
                                    r.instances[i.id] = i;
                                    return i;
                                },
                                {
                                    defaults: j,
                                    documentReady: () => document.readyState === "complete",
                                    getCountryData: () => g,
                                    getInstance: (t) => {
                                        const e = t.getAttribute(
                                            "data-intl-tel-input-id"
                                        );
                                        return e ? r.instances[e] : null;
                                    },
                                    instances: {},
                                    attachUtils: Q,
                                    startedLoadingUtilsScript: !1,
                                    startedLoadingAutoCountry: !1,
                                    version: "25.3.1"
                                }
                            ),
                            X = r;

                        return k(I);
                    })();

                    return h.default;
                });
            })(O)),
        O.exports

}

var rt = ot();
const at = et(rt);

const lt = (iso2) => {
    const country = (iso2 || "us").toLowerCase();

    // чтобы выбранная страна оказалась первой, но без дублей
    const preferred = [country, "us", "gb", "ca", "au"];
    const preferredUnique = [...new Set(preferred)];

    return {
        initialCountry: country,
        preferredCountries: preferredUnique,
        separateDialCode: !0,
        nationalMode: !0,
        autoPlaceholder: "aggressive",
        loadUtils: () => nt(() => import("./utils.BGFvLBaw.js"), [])
    };
};

function ut(u, h) {
    const d = () => u.classList.toggle("error", !h.isValidNumber());
    u.addEventListener("blur", d);
    u.addEventListener("input", d);
}

function dt(u, h) {
    const d = u.getNumber();
    if (d) return d;

    const _ = (h.value || "").replace(/\D+/g, "");
    return _ ? `+${_}` : "";
}

window.__phoneInputs = window.__phoneInputs || new Map;

const K = new WeakSet;

function ht(u, h = ".phone-input") {
    if (!u || K.has(u)) return;

    u.addEventListener("submit", (d) => {
        let _ = !0;

        u.querySelectorAll(h).forEach((C) => {
            const v = window.__phoneInputs.get(C);
            if (!v) return;

            if (v.isValidNumber()) {
                C.value = dt(v, C);
                C.classList.remove("error");
            } else {
                _ = !1;
                C.classList.add("error");
            }
        });

        if (!_) {
            d.preventDefault();
            d.stopPropagation();
            u.querySelector(`${h}.error`)?.focus();
        }
    });

    K.add(u);
}

function Ct({ selector: u = ".phone-input", options: h = {} } = {}) {
    // читаем <html lang="hu-HU">
    const { country: htmlCountry } = getLangAndCountryFromHtml();

    // если в lang не указана страна — дефолтнемся в "us"
    const defaultCountry = htmlCountry || "us";

    const inputs = Array.from(document.querySelectorAll(u));
    if (!inputs.length) return new Map();

    inputs.forEach((C) => {
        if (window.__phoneInputs.has(C)) return;

        const instance = at(C, {
            ...lt(defaultCountry), // сюда уже попадает iso2 вроде "hu", "mx", "tr"
            ...h                   // опции, если сверху что-то переопределяешь
        });

        ut(C, instance);              // вешаем валидацию по blur/input
        C.form && ht(C.form, u);      // вешаем submit-хендлер
        C.dataset.phoneReady = "1";
        window.__phoneInputs.set(C, instance);
    });

    return window.__phoneInputs;
}

function ct(u, { selector: h = ".phone-input" } = {}) {
    if (!u || !window.__phoneInputs) return null;
    const d = u.querySelector(h);
    return d ? window.__phoneInputs.get(d) : null;
}

function mt() {
    const u = document.getElementById("stock-count");
    if (u) {
        u.textContent = "17";
    }
}

function yt() {
    document.addEventListener(
        "submit",
        (u) => {
            const h = u.target.closest("form");
            if (!h) return;

            const d = ct(h);
            if (!d || !d.isValidNumber()) {
                u.preventDefault();
                alert("Please enter a valid phone number.");
                return;
            }

            const _ = h.querySelector(".js-phone");
            if (_) {
                _.value = d.getNumber();
            }
        },
        !0
    );
}

export { Ct as i, yt as s, mt as u };