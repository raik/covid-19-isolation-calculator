import PageLayout from "@components/PageLayout";
import { getContent } from "@lib/content";
import { registerLocale } from "react-datepicker";
import et from "date-fns/locale/et";
registerLocale("et", et);

export default function Home({ content, locale }) {
  return <PageLayout content={content} locale={locale} />;
}

export async function getStaticProps() {
  const locale = "et";
  const content = getContent(locale);

  return {
    props: {
      locale,
      content,
    },
  };
}
