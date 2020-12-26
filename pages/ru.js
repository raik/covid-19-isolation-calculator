import PageLayout from "@components/PageLayout";
import { getContent } from "@lib/content";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export default function Home({ content, locale }) {
  return <PageLayout content={content} locale={locale} />;
}

export async function getStaticProps() {
  const locale = "ru";
  const content = getContent(locale);

  return {
    props: {
      locale,
      content,
    },
  };
}
