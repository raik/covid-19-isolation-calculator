import Head from "next/head";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { add, format } from "date-fns";
import Button from "@components/Button";
import LanguagePicker from "./LanguagePicker";

export default function PageLayout({ content, locale }) {
  const [patientType, setPatientType] = useState("");
  const [symptomType, setSymptomType] = useState("");
  const [closeContactType, setCloseContactType] = useState("");
  const [closeContactSymptoms, setCloseContactSymptoms] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const CustomDatePicker = forwardRef(
    ({ value, onClick, pickerLabel }, ref) => (
      <div className="flex space-x-5 items-center text-lg">
        <label htmlFor="" className="">
          {pickerLabel}
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
    )
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Head>
        <title>{content.title}</title>
      </Head>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <LanguagePicker locale={locale} />
        <h1
          className="text-4xl text-center font-bold leading-none mb-10"
          dangerouslySetInnerHTML={{ __html: content.hero }}
        />
        <div className="prose prose-xl max-w-none mb-12 text-center leading-normal">
          <p>{content.description}</p>
        </div>
        {/* (1) First Step */}
        <div className="shadow-sm bg-white rounded-md py-8 px-4">
          <h2 className="text-center text-2xl mb-6 text-blue-600">
            {content.q1.question}
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
              {content.q1.button_positive}
            </Button>
            <span className="text-gray-400">{content.or}</span>
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
              {content.q1.button_closecontact}
            </Button>
          </div>

          {/* (1.1) Positive */}
          {patientType === "positive" ? (
            <>
              <hr className="my-12" />
              <div>
                <h2 className="text-center text-2xl mb-6 text-blue-600">
                  {content.q1_1.question}
                </h2>
                <div className="flex flex-col md:flex-row justify-center md:space-x-5 items-center max-w-3xl mx-auto mb-12">
                  <Button
                    isActive={symptomType === "symptomatic"}
                    isDisabled={symptomType === "asymptomatic"}
                    handleClick={() => {
                      setSymptomType("symptomatic");
                    }}
                  >
                    {content.q1_1.button_yes}
                  </Button>
                  <span className="text-gray-400">{content.or}</span>
                  <Button
                    isActive={symptomType === "asymptomatic"}
                    isDisabled={symptomType === "symptomatic"}
                    handleClick={() => {
                      setSymptomType("asymptomatic");
                    }}
                  >
                    {content.q1_1.button_no}
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
                <h2
                  className="text-center text-2xl mb-6 text-blue-600"
                  dangerouslySetInnerHTML={{ __html: content.q1_1b.question }}
                />

                <div className="text-center mb-8">
                  <DatePicker
                    id="datepicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    locale={locale}
                    customInput={
                      <CustomDatePicker pickerLabel={content.select_date} />
                    }
                  />
                </div>
                <hr className="my-6 border-none" />
                <div className="mb-8">
                  <p className="text-lg text-center">
                    {content.q1_1b.answer_prefix} <br />
                    <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                      {format(
                        add(startDate, {
                          days: 10,
                        }),
                        "dd.MM.yyyy"
                      )}
                    </span>
                  </p>
                  <p
                    className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                    dangerouslySetInnerHTML={{ __html: content.q1_1b.text }}
                  />
                </div>
                <p dangerouslySetInnerHTML={{ __html: content.q1_1b.text2 }} />
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
                <h2
                  className="text-center text-2xl mb-6 text-blue-600"
                  dangerouslySetInnerHTML={{ __html: content.q1_1a.question }}
                />
                <div className="text-center mb-8">
                  <DatePicker
                    id="datepicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    locale={locale}
                    customInput={
                      <CustomDatePicker pickerLabel={content.select_date} />
                    }
                  />
                </div>
                <hr className="my-6 border-none" />
                <div className="mb-8">
                  <p className="text-lg text-center">
                    {content.q1_1a.answer_prefix} <br />
                    <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                      {format(
                        add(startDate, {
                          days: 10,
                        }),
                        "dd.MM.yyyy"
                      )}
                    </span>
                  </p>
                  <p
                    className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                    dangerouslySetInnerHTML={{ __html: content.q1_1a.text }}
                  />
                </div>
                <p dangerouslySetInnerHTML={{ __html: content.q1_1a.text2 }} />
              </div>
            </>
          ) : (
            ""
          )}

          {/* (2) Close Contact */}
          {patientType === "close-contact" ? (
            <div>
              <hr className="my-12" />
              <h2
                className="text-center text-2xl mb-6 text-blue-600"
                dangerouslySetInnerHTML={{ __html: content.q2.question }}
              />
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
                    {content.q2.button_yes}
                  </Button>
                  <p className="text-sm text-gray-600 leading-none px-4">
                    {content.q2.button_yes_helper}
                  </p>
                </div>
                <span className="text-gray-400">{content.or}</span>
                <div>
                  <Button
                    className="mb-2"
                    isActive={closeContactType === "inactive"}
                    isDisabled={closeContactType === "active"}
                    handleClick={() => {
                      setCloseContactType("inactive");
                    }}
                  >
                    {content.q2.button_no}
                  </Button>
                  <p className="text-sm text-gray-600 leading-none px-4">
                    {content.q2.button_no_helper}
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
              <h2
                className="text-center text-2xl mb-6 text-blue-600"
                dangerouslySetInnerHTML={{ __html: content.q2_1a.question }}
              />

              <div className="flex flex-col md:flex-row justify-center md:space-x-5 items-center max-w-3xl mx-auto mb-12">
                <Button
                  isActive={closeContactSymptoms === true}
                  isDisabled={closeContactSymptoms === false}
                  handleClick={() => {
                    setCloseContactSymptoms(true);
                  }}
                >
                  {content.q2_1a.button_yes}
                </Button>

                <span className="text-gray-400">{content.or}</span>
                <Button
                  isActive={closeContactSymptoms === false}
                  isDisabled={closeContactSymptoms === true}
                  handleClick={() => {
                    setCloseContactSymptoms(false);
                  }}
                >
                  {content.q2_1a.button_no}
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* (2.1a.1) Close Contact, in active contact and positive person has symptoms */}
          {patientType === "close-contact" &&
          closeContactType === "active" &&
          closeContactSymptoms === true ? (
            <div>
              <hr className="my-12" />
              <h2
                className="text-center text-2xl mb-6 text-blue-600"
                dangerouslySetInnerHTML={{ __html: content.q2_1a_1.question }}
              />
              <div className="text-center mb-8">
                <DatePicker
                  id="datepicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale={locale}
                  customInput={
                    <CustomDatePicker pickerLabel={content.select_date} />
                  }
                />
              </div>
              <hr className="my-6 border-none" />
              <div className="">
                <p className="text-lg text-center">
                  {content.q2_1a_1.answer_prefix}
                  <br />
                  <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                    {format(
                      add(startDate, {
                        days: 10,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                </p>
                <p
                  className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                  dangerouslySetInnerHTML={{ __html: content.q2_1a_1.text }}
                />
              </div>
              <hr className="my-8 max-w-3xl mx-auto" />
              <div>
                <p
                  className="text-lg text-center"
                  dangerouslySetInnerHTML={{ __html: content.q2_1a_1.text2 }}
                />
                <div className="mb-8">
                  <p className="text-lg text-center">
                    <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                      {format(
                        add(startDate, {
                          days: 14,
                        }),
                        "dd.MM.yyyy"
                      )}
                    </span>
                  </p>
                  <p
                    className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                    dangerouslySetInnerHTML={{ __html: content.q2_1a_1.text3 }}
                  />
                </div>
              </div>
              <p dangerouslySetInnerHTML={{ __html: content.q2_1a_1.text4 }} />
            </div>
          ) : (
            ""
          )}

          {/* (2.1a.2) Close Contact, in active contact and positive person is asymptomatic */}
          {patientType === "close-contact" &&
          closeContactType === "active" &&
          closeContactSymptoms === false ? (
            <div>
              <hr className="my-12" />
              <h2
                className="text-center text-2xl mb-6 text-blue-600"
                dangerouslySetInnerHTML={{ __html: content.q2_1a_2.question }}
              />
              <div className="text-center mb-8">
                <DatePicker
                  id="datepicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale={locale}
                  customInput={
                    <CustomDatePicker pickerLabel={content.select_date} />
                  }
                />
              </div>
              <hr className="my-6 border-none" />
              <div>
                <p className="text-lg text-center">
                  {content.q2_1a_2.answer_prefix} <br />
                  <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                    {format(
                      add(startDate, {
                        days: 10,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                </p>
                <p
                  className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                  dangerouslySetInnerHTML={{ __html: content.q2_1a_2.text }}
                />
              </div>
              <hr className="my-8 max-w-3xl mx-auto" />

              <div className="mb-8">
                <p className="text-lg text-center">
                  {content.q2_1a_2.text2}
                  <br />
                  <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                    {format(
                      add(startDate, {
                        days: 14,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                </p>
                <p
                  className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                  dangerouslySetInnerHTML={{ __html: content.q2_1a_2.text3 }}
                />
              </div>
              <p dangerouslySetInnerHTML={{ __html: content.q2_1a_2.text4 }} />
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
                {content.q2_1b.question}
              </h2>
              <div className="text-center mb-8">
                <DatePicker
                  id="datepicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale={locale}
                  customInput={
                    <CustomDatePicker pickerLabel={content.select_date} />
                  }
                />
              </div>
              <hr className="my-6 border-none" />
              <div>
                <p className="text-lg text-center">
                  {content.q2_1b.answer_prefix}
                  <br />
                  <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                    {format(
                      add(startDate, {
                        days: 10,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                </p>
                <p
                  className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                  dangerouslySetInnerHTML={{ __html: content.q2_1b.text }}
                />
              </div>
              <hr className="my-8 max-w-3xl mx-auto" />
              <div className="mb-8">
                <p className="text-lg text-center">
                  {content.q2_1b.text2}
                  <br />
                  <span className="my-3 text-red-500 font-bold inline-block text-2xl border-red-400 bg-red-50 px-4 py-2 ring-1 ring-red-100 rounded-sm">
                    {format(
                      add(startDate, {
                        days: 14,
                      }),
                      "dd.MM.yyyy"
                    )}
                  </span>
                </p>
                <p
                  className="text-gray-500 text-sm text-center max-w-3xl mx-auto pt-3"
                  dangerouslySetInnerHTML={{ __html: content.q2_1b.text3 }}
                />
              </div>
              <p dangerouslySetInnerHTML={{ __html: content.q2_1b.text4 }} />
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
