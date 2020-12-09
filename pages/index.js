import Head from "next/head";
import { forwardRef, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import et from "date-fns/locale/et";
import { add, format } from "date-fns";
import Button from "@components/Button";

registerLocale("et", et);

export default function Home() {
  const [patientType, setPatientType] = useState("");
  const [symptomType, setSymptomType] = useState("");
  const [closeContactType, setCloseContactType] = useState("");
  const [closeContactSymptoms, setCloseContactSymptoms] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <div className="flex space-x-5 items-center text-lg">
      <label htmlFor="" className="">
        Vali kuupäev:
      </label>
      <div className="relative">
        <svg
          width="24px"
          height="24px"
          className="absolute transform translate-y-3 translate-x-3.5 pointer-events-none text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <input
          ref={ref}
          value={value}
          onClick={onClick}
          className="text-center text-xl px-5 py-2 text-blue-900 border-blue-700 rounded-md shadow-md border-2 bg-gray-50 pl-11 font-bold w-52"
        />
      </div>
    </div>
  ));

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Head>
        <title>Covid-19 isolatsioonikalkulaator</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl text-center font-bold leading-none mb-8">
          SARS-CoV2
          <br />
          <span className="text-blue-600 uppercase text-2xl">
            isolatsioonikalkulaator
          </span>
        </h1>
        <div className="prose prose-xl max-w-none mb-12 text-center leading-normal">
          <p>
            Kalkulaator on abistav vahend, et arvutada välja esimesed võimalikud
            isolatsiooni lõpetamise kuupäevad. Isolatsiooni lõpetamiseks peavad
            olema lisaks täidetud kõik Terviseameti poolt kinnitatud kehtivad
            kriteeriumid.
          </p>
        </div>

        {/* (1) First Step */}
        <div className="shadow-sm bg-white rounded-md py-8 px-4">
          <h2 className="text-center text-2xl mb-6 text-blue-600">
            Kas patsient on SARS-CoV2 positiivne või SARS-CoV2 positiivse lähikontaktne?
          </h2>

          <div className="flex flex-col md:flex-row justify-center md:space-x-5 items-center max-w-3xl mx-auto mb-12">
            <Button
              isActive={patientType === "positive"}
              isDisabled={patientType === "close-contact"}
              handleClick={() => {
                setPatientType("positive");
                setSymptomType("");
                setCloseContactType("");
                setCloseContactSymptoms(undefined);
                setStartDate(new Date());
              }}
            >
              <span className="font-light text-blue-200 normal-case">
                SARS-CoV2
              </span>{" "}
              POSITIIVNE
            </Button>
            <span className="text-gray-400">või</span>
            <Button
              isActive={patientType === "close-contact"}
              isDisabled={patientType === "positive"}
              handleClick={() => {
                setPatientType("close-contact");
              }}
            >
              <span className="font-light text-blue-200 normal-case">
                SARS-CoV2
              </span>{" "}
              LÄHIKONTAKTNE
            </Button>
          </div>

          {/* (1.1) Positive */}
          {patientType === "positive" ? (
            <>
              <hr className="my-12" />
              <div>
                <h2 className="text-center text-2xl mb-6 text-blue-600">
                  Kas patsiendil esinevad sümptomid?
                </h2>
                <div className="flex flex-col md:flex-row justify-center md:space-x-5 items-center max-w-3xl mx-auto mb-12">
                  <Button
                    isActive={symptomType === "symptomatic"}
                    isDisabled={symptomType === "asymptomatic"}
                    handleClick={() => {
                      setSymptomType("symptomatic");
                    }}
                  >
                    JAH
                  </Button>
                  <span className="text-gray-400">või</span>
                  <Button
                    isActive={symptomType === "asymptomatic"}
                    isDisabled={symptomType === "symptomatic"}
                    handleClick={() => {
                      setSymptomType("asymptomatic");
                    }}
                  >
                    EI
                  </Button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {/* (1.1b) Positive and asymptomatic */}
          {symptomType === "asymptomatic" && patientType === "positive" ? (
            <>
              <hr className="my-12" />
              <div>
                <h2 className="text-center text-2xl mb-6 text-blue-600">
                  Millal oli{" "}
                  <span className="underline">ilma sümptomiteta</span> SARS-CoV2
                  positiivse patsiendi testi tegemise kuupäev?
                </h2>
                <div className="text-center mb-8">
                  <DatePicker
                    id="datepicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    locale="et"
                    customInput={<CustomDatePicker />}
                  />
                </div>
                <hr className="my-6 border-none" />
                <p className="text-lg text-center mb-8">
                  Viimane isolatsioonipäev* on patsiendile <br />
                  <span className="text-gray-500">[ Kui haigusnähte pole ilmnenud, lõpetatakse isolatsioon 10 päeva möödumisel alates positiivsest testist. Testi tegemise päeva loetakse päevaks 0. ]</span>
                  <br />
                  <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                    {format(
                      add(startDate, {
                        days: 10,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                
 <span className="text-gray-500">[ Kui haigusnähte pole ilmnenud, lõpetatakse isolatsioon 10 päeva möödumisel alates positiivsest testist. Testi tegemise päeva loetakse päevaks 0. ]</span>
                  <br />
               </p> <p>
                  * Isolatsiooni võib lõpetada ainult siis, kui sümptomeid ei
                  ole tekkinud.{" "}
                  <strong>
                    Kui isolatsiooni ajal tekivad sümptomid, algab isolatsioon
                    sümptomite tekke hetkest algusest peale ning patsient on
                    sümptomaatiline SARS-CoV2 positiivne.
                  </strong>
                </p>
              </div>
            </>
          ) : (
            ""
          )}

          {/* (1.1a) Positive and symptomatic */}
          {symptomType === "symptomatic" && patientType === "positive" ? (
            <>
              <hr className="my-12" />
              <div>
                <h2 className="text-center text-2xl mb-6 text-blue-600">
                  Millal oli <span className="underline">sümptomaatilise</span>{" "}
                  SARS-CoV2 patsiendi esimeste sümptomite tekkimise kuupäev?
                </h2>
                <div className="text-center mb-8">
                  <DatePicker
                    id="datepicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    locale="et"
                    customInput={<CustomDatePicker />}
                  />
                </div>
                <hr className="my-6 border-none" />
                <p className="text-lg text-center mb-8">
                  Viimane isolatsioonipäev* on patsiendile <br />
                  <span className="text-gray-500">
                    (COVID-19-le iseloomulike sümptomite algusest on möödunud vähemalt 10 päeva. Sümptomite tekkepäev on päev 0.)
                  </span>
                  <br />
                  <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                    {format(
                      add(startDate, {
                        days: 10,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                </p>
                <p>
                  * Isolatsiooni võib lõpetada ainult siis, kui lisaks ajalistele kriteeriumitele on viimasest
                  palavikust on möödas 72 tundi ja ägedad sümptomid on
                  taandunud. 
                </p>
              </div>
            </>
          ) : (
            ""
          )}

          {/* (2) Close Contact */}
          {patientType === "close-contact" ? (
            <div>
              <hr className="my-12" />
              <h2 className="text-center text-2xl mb-6 text-blue-600">
                Kas lähikontaktne elab SARS-CoV2 positiivsega samas
                majapidamises?
              </h2>
              <div className="flex flex-col md:flex-row justify-center md:space-x-5 items-center max-w-3xl mx-auto mb-12">
                <div>
                  <Button
                    className="mb-2"
                    isActive={closeContactType === "active"}
                    isDisabled={closeContactType === "inactive"}
                    handleClick={() => {
                      setCloseContactType("active");
                    }}
                  >
                    Jah
                  </Button>
                  <p className="text-sm text-gray-600 leading-none px-4">
                    Kokkupuude haigega on pidev ja igapäevane
                  </p>
                </div>
                <span className="text-gray-400">või</span>
                <div>
                  <Button
                    className="mb-2"
                    isActive={closeContactType === "inactive"}
                    isDisabled={closeContactType === "active"}
                    handleClick={() => {
                      setCloseContactType("inactive");
                    }}
                  >
                    Ei
                  </Button>
                  <p className="text-sm text-gray-600 leading-none px-4">
                    Kokkupuude haigega on olnud lühiaegne
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* (2.1a) Close Contact and in active contact */}
          {patientType === "close-contact" && closeContactType === "active" ? (
            <div>
              <hr className="my-12" />
              <h2 className="text-center text-2xl mb-6 text-blue-600">
                Kas <span class="underline">samas majapidamises</span> elaval
                SARS-CoV2 <span class="underline">positiivsel</span> esinevad
                haigussümptomid?
              </h2>

              <div className="flex flex-col md:flex-row justify-center md:space-x-5 items-center max-w-3xl mx-auto mb-12">
                <Button
                  isActive={closeContactSymptoms === true}
                  isDisabled={closeContactSymptoms === false}
                  handleClick={() => {
                    setCloseContactSymptoms(true);
                  }}
                >
                  Jah
                </Button>

                <span className="text-gray-400">või</span>
                <Button
                  isActive={closeContactSymptoms === false}
                  isDisabled={closeContactSymptoms === true}
                  handleClick={() => {
                    setCloseContactSymptoms(false);
                  }}
                >
                  Ei
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* (2.1.a1) Close Contact, in active contact and positive person has symptoms */}
          {patientType === "close-contact" &&
          closeContactType === "active" &&
          closeContactSymptoms === true ? (
            <div>
              <hr className="my-12" />
              <h2 className="text-center text-2xl mb-6 text-blue-600">
                Mis kuupäeval tekkisid lähikontaktsega koos elaval SARS-CoV2 positiivsel esimesed sümptomid?
              </h2>
              <div className="text-center mb-8">
                <DatePicker
                  id="datepicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale="et"
                  customInput={<CustomDatePicker />}
                />
              </div>
              <hr className="my-6 border-none" />

              <p className="text-lg text-center mb-8">
                Esimene võimalus ilma sümptomiteta lähikontaktsele SARS-CoV2 testi teha, et
                isolatsiooni lühendada* <br />
                <span className="text-gray-500">
                  (Vähemalt 10 päeva möödas esimesest kontaktist - samas majapidamises elavate inimeste puhul on esimene kontakt tavaliselt COVID-19 haige esimene sümptomipäev. Esimest kontaktipäeva loetakse päevaks 0)
                </span>
                :
                <br />
                <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                  {format(
                    add(startDate, {
                      days: 10,
                    }),
                    "dd.MM.yyyy"
                  )}
                </span>
              </p>

              <p className="text-lg text-center mb-8">
                Viimane isolatsioonipäev lähikontaktsele, kui testi ei tehta ja patsiendil sümptomeid ei ole tekkinud:
                <br />
                <span className="text-gray-500">
                  (Vähemalt 14 päeva möödas esimesest kontaktist - samas majapidamises elavate inimeste puhul on esimene kontakt tavaliselt COVID-19 haige esimene sümptomipäev. Esimest kontaktipäeva loetakse päevaks 0)
                </span>
                <br />
                <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                  {format(
                    add(startDate, {
                      days: 14,
                    }),
                    "dd.MM.yyyy"
                  )}
                </span>
              </p>

              <p>
                * Kui tehtud SARS-CoV2 test osutub positiivseks, algab
                isolatsioon testi tegemise päevast algusest peale ning kestab 10
                päeva.
              </p>
            </div>
          ) : (
            ""
          )}

          {/* (2.1a2) Close Contact, in active contact and positive person is asymptomatic */}
          {patientType === "close-contact" &&
          closeContactType === "active" &&
          closeContactSymptoms === false ? (
            <div>
              <hr className="my-12" />
              <h2 className="text-center text-2xl mb-6 text-blue-600">
                Mis kuupäeval lähikontaktsega koos elav asümptomaatiline SARS-CoV2 positiivne testi tegi?
              </h2>

              <div className="text-center mb-8">
                <DatePicker
                  id="datepicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale="et"
                  customInput={<CustomDatePicker />}
                />
              </div>
              <hr className="my-6 border-none" />

              <p className="text-lg text-center mb-8">
                Esimene võimalus lähikontaktsele SARS-CoV2 testi teha, et
                isolatsiooni lühendada* <br />
                <span className="text-gray-500">
                  (Lähikontaktsega koos elava SARS-CoV2 positiivse testi tegemisest on möödas vähemalt 10 päeva. Testi tegemise päeva loetakse päevaks 0)
                </span>
                :
                <br />
                <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                  {format(
                    add(startDate, {
                      days: 10,
                    }),
                    "dd.MM.yyyy"
                  )}
                </span>
              </p>

              <p className="text-lg text-center mb-8">
                Viimane isolatsioonipäev lähikontaktsele, kui testi ei tehta ja sümptomeid ei ole tekkinud:
                <br />
                <span className="text-gray-500">
                  (Lähikontaktsega koos elava asümptomaatilise SARS-CoV2 positiivse testi tegemisest on möödas 14 päeva. Testi tegemise päeva loetakse päevaks 0.)
                </span>
                <br />
                <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                  {format(
                    add(startDate, {
                      days: 14,
                    }),
                    "dd.MM.yyyy"
                  )}
                </span>
              </p>

              <p>
                * Kui tehtud SARS-CoV2 test osutub positiivseks, algab
                isolatsioon testi tegemise päevast algusest peale ning kestab 10
                päeva.
              </p>
            </div>
          ) : (
            ""
          )}

          {/* (2.1b) Close Contact, in inactive contact */}
          {patientType === "close-contact" &&
          closeContactType === "inactive" ? (
            <div>
              <hr className="my-12" />
              <h2 className="text-center text-2xl mb-6 text-blue-600">
                Mis kuupäeval lähikontaktne viimast korda SARS-CoV2 positiivsega kokku puutus?
              </h2>
              <div className="text-center mb-8">
                <DatePicker
                  id="datepicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale="et"
                  customInput={<CustomDatePicker />}
                />
              </div>
              <hr className="my-6 border-none" />

              <p className="text-lg text-center mb-8">
                Esimene võimalus ilma sümptomiteta lähikontaktsele SARS-CoV2 testi teha, et
                isolatsiooni lühendada* <br />
                <span className="text-gray-500">
                  (10 päeva alates viimasest kontaktist. Viimast kontaktipäeva loetakse päevaks 0.)
                </span>
                :
                <br />
                <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                  {format(
                    add(startDate, {
                      days: 10,
                    }),
                    "dd.MM.yyyy"
                  )}
                </span>
              </p>

              <p className="text-lg text-center mb-8">
               Viimane isolatsioonipäev lähikontaktsele, kui testi ei tehta ja sümptomeid ei ole tekkinud:
                <br />
                <span className="text-gray-500">
                  (14 päeva alates viimasest kontaktist. Viimast kontaktipäeva loetakse päevaks 0.)
                </span>
                <br />
                <span className="text-red-500 font-bold inline-block text-2xl border-b-2 border-red-400">
                  {format(
                    add(startDate, {
                      days: 14,
                    }),
                    "dd.MM.yyyy"
                  )}
                </span>
              </p>

              <p>
                * Kui tehtud SARS-CoV2 test osutub positiivseks, algab
                isolatsioon testi tegemise päevast algusest peale ning kestab 10
                päeva.
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
