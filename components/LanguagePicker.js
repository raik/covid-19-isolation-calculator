import Link from "next/link";

export default function LanguagePicker({ locale }) {
  return (
    <nav className="text-blue-900 flex space-x-4 items-center justify-end">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1247 7.46997C11.1247 9.80716 10.4288 11.8552 9.38519 12.995"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.1247 7.4701C11.1247 5.13292 10.4288 3.08491 9.38519 1.94507"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.83502 7.46997C3.83502 9.80716 4.53099 11.8552 5.57457 12.995"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.83502 7.4701C3.83502 5.13292 4.53099 3.08491 5.57457 1.94507"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.47986 1.65894V13.9496"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1.67041 7.46997H13.2893"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.01105 11.0437H11.9487"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.01105 3.8938H11.9487"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.59703 13.852C10.2405 13.5629 11.7088 12.6504 12.6958 11.3049C13.6829 9.95944 14.1123 8.28485 13.8947 6.63042C13.677 4.97599 12.829 3.46946 11.5276 2.42506C10.2262 1.38065 8.57175 0.87901 6.90944 1.02476C5.24713 1.17051 3.70527 1.9524 2.60544 3.20735C1.50561 4.4623 0.932734 6.0934 1.0063 7.76047C1.07987 9.42753 1.7942 11.0018 3.0003 12.155C4.2064 13.3082 5.81114 13.9512 7.47983 13.95"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      {locale === "et" ? (
        <Link href="/ru">
          <a className="underline">по русски</a>
        </Link>
      ) : (
        <Link href="/">
          <a className="underline">eesti keeles</a>
        </Link>
      )}
    </nav>
  );
}
